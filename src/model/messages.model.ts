import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import { Options } from "../utils/database";

export interface IMessage extends Model {
    sender:number;
    room:number;
    message:string;
    type:string;
}       


export default class MessageRepository extends BaseRepository<IMessage>{
    constructor() {
        super('messages')
    }

    async findMany(query: any, option?: Options): Promise<IMessage[]> {
        try {
            const messages = await this.db(`${this.table} as m`)
            .leftJoin("users as u" , "u.id" , "=" , "m.sender")
            .select(
                "m.*" , 
                "u.id as userId" , 
                "u.username" , 
                "u.first_name" ,
                "u.last_name" , 
                "u.user_img"
            )
            .where("m.room" , "=" , query.room)
            .orderBy("m.created_at" , "desc")
            .limit(option?.limit!)
            .offset((option?.offset! - 1) * option?.limit!)

            return messages;
        } catch (error) {
            throw error
        }
    }
    async findOne(query: any): Promise<IMessage> {
        try {
            const message = await this.db(`${this.table} as m`)
            .leftJoin("users as u" , "u.id" , "=" , "m.sender")
            .select("m.*" , "u.id as userId" , "u.username" , "u.first_name" , "u.last_name" , "u.user_img")
            .where("m.id" , "=" , query.id)
            .first()
        
            return message
        } catch (error) {
            throw error
        }
    }
}
