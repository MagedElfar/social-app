import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import { Options } from "../utils/database";
import { setError } from "../utils/error-format";

export interface IRoom extends Model {
    type:string;
}


export default class RoomRepository extends BaseRepository<IRoom>{
    constructor() {
        super('chat_rooms')
    }

    async findMany(query: any, option?: Options): Promise<IRoom[]> {
        try {
            const roomQuery = await this.db(`${this.table} as r`)
            .leftJoin("room_members as rm" , "rm.room" , "=" , "r.id")
            .leftJoin("users as u" , "u.id" , "=" , "rm.user")
            .select("r.*" , "u.id as userId" , "u.username" , "u.first_name" , "u.last_name" , "u.user_img")
            .whereIn("r.id" , 
                this.db("room_members as m")
                .select("m.room")
                .where("m.user" , "=" , query?.user)
            )            
            // .limit(option?.limit!)
            // .offset((option?.offset! - 1) * option?.limit!)

            const room = roomQuery.reduce((arr: IRoom [] , item:IRoom) => {
                const {username , first_name , last_name , user_img , userId , ...others} = item

                const index = arr.findIndex((r) => r.id === item.id);

                if(index > -1) {

                    arr[index]["users"] = [
                        ...arr[index]['users'] ,
                        {
                            id: userId,
                            username , 
                            first_name ,
                            last_name , 
                            user_img
                        }
                    ]

                } else {
                    const obj = {
                        ...others , 
                        users: [{
                            id: userId,
                            username , 
                            first_name ,
                            last_name , 
                            user_img
                        }]
                    }

                    arr.push(obj)
                }
            
                return arr
            } , [])

            return room
        } catch (error) {
            throw error
        }
    }

    async findOne(query: any): Promise<IRoom> {
        try {

            const roomQuery = this.db(`${this.table} as r`)
            .leftJoin("room_members as rm" , "rm.room" , "=" , "r.id")
            .leftJoin("users as u" , "u.id" , "=" , "rm.user")
            .select("r.*" , "u.id as userId" , "u.username" , "u.first_name" , "u.last_name" , "u.user_img")
            
            if(query?.users) {
                roomQuery
                .where("r.type" , "=" , query.type)
                .whereIn("rm.user" , query.users )
                .whereNotIn("r.id" , 
                    this.db("room_members as m")
                    .select("m.room")
                    .whereNotIn("m.user" , query?.users)
                )
            } else if (query?.id){
                roomQuery
                .where("r.id" , "=" , query.id)
            }


            const r = await roomQuery

            const room = r.reduce((obj:IRoom , item:IRoom) => {
                const {username , first_name , last_name , user_img , userId , ...others} = item

                if(!obj) {
                    obj = {
                        ...others,
                        users: []
                    }
                }

                obj.users = [...obj.users , {
                    room: others.id,
                    id: userId,
                    username , 
                    first_name ,
                    last_name , 
                    user_img
                }]

                return obj

            } , null)

            return room;

        } catch (error) {
            throw error
        }
    }
}