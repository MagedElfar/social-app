import { IUser } from './../model/user.model';
import MessageRepository , {IMessage} from './../model/messages.model'
import ReceiversRepository , {IReceiver} from "./../model/receivers.model"
import RoomRepository ,  { IRoom } from "../model/rooms.model"
import ConversationServices from './room.services';
import { setError } from '../utils/error-format';

export default class MessageServices {

    async getMessages(userID:number , roomId:number , limit:number , offset:number) {
        try {

            const roomRep:RoomRepository = new RoomRepository();

            const room = await roomRep.findOne({id:roomId})

            if(!room) throw setError(404 , "room isn't exist")

            if(!room.users.some((item:IUser) => item.id === userID)) throw setError(403 , "Forbidden")

            const msgRep = new MessageRepository();

            const messages = await msgRep.findMany({room:roomId} , {limit , offset})

            return messages;

        } catch (error) {
            throw error
        }
    }

    async getOneTOoneMessages(
        sender:number ,
        receiver:number , 
        limit:number , 
        offset:number
    ) {
        try {
            
            const users =  [sender , receiver]

            const roomRep:RoomRepository = new RoomRepository();

            const room = await roomRep.findOne({users , type: "private"})

            console.log(room)
            if(!room) return []

            const msgRep = new MessageRepository();

            const messages = await msgRep.findMany({room:room.id} , {limit , offset})

            return messages;

        } catch (error) {
            throw error
        }
    }

    async getUnReadMSG(
        receiver:number , 
        limit:number , 
        offset:number
    ) {
        try {

            const receiverRep = new ReceiversRepository();

            const messages = await receiverRep.findMany({receiver} , {limit , offset})

            return messages;

        } catch (error) {
            throw error
        }
    }

    async oneTOoneMessage (message:string , sender:number , receiver:number)  {
        try {

            const users =  [sender , receiver]

            const roomRep:RoomRepository = new RoomRepository();

            let room = await roomRep.findOne({users , type: "private"})

            if(!room) {
                const srv = new ConversationServices().createConversation()

                room = await srv.createRoom(users)
            }

            const msgRep = new MessageRepository();

            const msg = await msgRep.create({sender , room:+room?.id! , message , type:"text"})

            const receiverRep = new ReceiversRepository()

            const receivers = room.users.filter((users:IUser) => users.id !== sender).map((user:IUser) => {
                return {receiver: user.id , message: msg.id}
            })

            await receiverRep.createMany(receivers)

            return msg

        } catch (error) {
            throw error
        }
    }

    async sendMessage (message:string , sender:number , roomId:number)  {
        try {

            const roomRep:RoomRepository = new RoomRepository();

            const room = await roomRep.findOne({id:roomId})

            if(!room) throw setError(404 , "room isn't exist")

            if(!room.users.some((item:IUser) => item.id === sender)) throw setError(403 , "Forbidden")

            const msgRep = new MessageRepository();

            const msg = await msgRep.create({sender , room:+room?.id! , message , type:"text"})

            const receiverRep = new ReceiversRepository()

            const receivers = room.users.filter((users:IUser) => users.id !== sender).map((user:IUser) => {
                return {receiver: user.id , message: msg.id}
            })

            await receiverRep.createMany(receivers)

            return msg

        } catch (error) {
            throw error
        }
    }

    async deleteMessage(userID:number , messageId:number) {
        try {

            const msgRep = new MessageRepository();

            const msg = await msgRep.findOne({id:messageId})

            if(!msg) throw setError(404 , "message not foun")

            if(msg.sender !== userID) throw setError(403 , "Forbidden")

            await msgRep.deleteOne({id: messageId})
            return ;

        } catch (error) {
            throw error
        }
    }

    async markReadMessage(userID:number , messageId:number) {
        try {

            const receiverRep = new ReceiversRepository();

            const msg = await receiverRep.findOne({id:messageId , is_read:0})

            if(!msg) throw setError(404 , "message not found")

            if(msg.receiver !== userID) throw setError(403 , "Forbidden")

            await receiverRep.update(messageId , {is_read: 1})

            return ;

        } catch (error) {
            throw error
        }
    }

    async deleteReadMessages(userID:number) {
        try {

            const receiverRep = new ReceiversRepository();

            await receiverRep.deleteOne({receiver:userID , is_read:1})

            return ;

        } catch (error) {
            throw error
        }
    }

}

