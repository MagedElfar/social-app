import { IUser } from './../model/user.model';
import { RoomMemberRepository, IRoomMember } from '../model/room-members';
import { UserRepository } from '../model/user.model';
import RoomRepository , { IRoom } from "../model/rooms.model"
import { setError } from '../utils/error-format';

abstract class ConversationServices {

    abstract createRoom (users: number []): Promise<IRoom>;

    async getUserRooms (user: number , limit:number , offset:number): Promise<IRoom []> {
        try {

            const roomRep:RoomRepository = new RoomRepository();

            const rooms = await roomRep.findMany({user} , {limit , offset});

            return rooms
        } catch (error) {
            throw error
        }
    };


    async inviteUser (users: number [] , roomId:number , userId:number): Promise<void> {
        try {
            const roomRep:RoomRepository = new RoomRepository();

            const room = await roomRep.findOne({id:roomId})

            if(!room) throw setError(404 , "room not found")

            if(room.type === "private") throw setError(403 , "you cant add another user to private chat")

            if(!room.users.some((user:IUser) => userId === user.id)) throw setError(403 , "forbidden")

            users = users.filter((id:number) => {
                if(room.users.some((user:IUser) => id === user.id)) return;
                return id
            })

            const setUsers = new Set(users)

            users = [...setUsers]

            if(users.length === 0) throw setError(400 , "users are exist")

            const roomMember:RoomMemberRepository = new RoomMemberRepository();

            const members:IRoomMember [] = users.map((user:number) => {
                return {room: roomId , user}
            })

            await roomMember.createMany(members)

            return
        } catch (error) {
            throw error
        }
    }

    async leaveRoom (roomId:number , userId:number): Promise<void> {
        try {
            const roomRep:RoomRepository = new RoomRepository();

            const room = await roomRep.findOne({id:roomId})

            if(!room) throw setError(404 , "room not found")

            if(room.type === "private") throw setError(403 , "you cant leave private chat")

            if(!room.users.some((user:IUser) => userId === user.id)) throw setError(403 , "forbidden")

            const roomMember:RoomMemberRepository = new RoomMemberRepository();

            await roomMember.deleteOne({room:roomId , user:userId})

            return
        } catch (error) {
            throw error
        }
    }

}

class PrivetConversationServices extends ConversationServices{
    
    async createRoom (users: number [])  {
        try {

            const setUsers = new Set(users)

            users = [...setUsers]

            if(users.length != 2) throw setError(400 , "chat room have to have 2 users") 

            const userRep = new UserRepository();

            await Promise.all(users.map(async (id:number) => {
                const user = await userRep.findOne({id})
                if(!user) throw setError(400 , "user isn't exist")
            }))

            const roomRep:RoomRepository = new RoomRepository();

            let room = await roomRep.findOne({users , type: "private"})

            if(room) throw setError(400 , "room is exist")

            const roomMember:RoomMemberRepository = new RoomMemberRepository();

            room = await roomRep.create({type: "private"});

            const members:IRoomMember [] = users.map((user:number) => {
                return {room: +room.id! , user}
            })

            await roomMember.createMany(members)

            room = await roomRep.findOne({users , type: "private"})

            return room;

        } catch (error) {
            throw error
        }
    }
}

class GroupConversationServices extends ConversationServices{
    async createRoom (users: number [])  {
        try {

            const setUsers = new Set(users)

            users = [...setUsers]

            console.log(users)

            const userRep = new UserRepository();

            await Promise.all(users.map(async (id:number) => {
                const user = await userRep.findOne({id})
                if(!user) throw setError(400 , "user isn't exist")
            }))

            const roomRep:RoomRepository = new RoomRepository();

            let room = await roomRep.findOne({users , type: "group"})

            const roomMember:RoomMemberRepository = new RoomMemberRepository();

            room = await roomRep.create({type: "group"});

            const members:IRoomMember [] = users.map((user:number) => {
                return {room: +room.id! , user}
            })

            await roomMember.createMany(members)

            room = await roomRep.findOne({id: room.id})

            return room;

        } catch (error) {
            throw error
        }
    }
}

export default class ConversationServicesFactory {
    private type:string;

    constructor(type:string = "private") {
        this.type = type
    }

    createConversation():ConversationServices {
        switch(this.type) {
            case "group":
                return new GroupConversationServices();

            case "private":
            default:
                return new PrivetConversationServices();
        }
    }

}