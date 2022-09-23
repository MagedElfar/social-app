import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import { Options } from "../utils/database";

export interface IReceiver extends Model {
    receiver:number;
    message:number;
    is_read:number;
}       


export default class ReceiversRepository extends BaseRepository<IReceiver>{
    constructor() {
        super('receivers')
    }

    async findMany(query: any, option?: Options): Promise<{
        messages: IReceiver[],
        count: number
    }> {
        try {
            const messagesQuery = this.db(`${this.table} as r`)
            .leftJoin("messages as m" , "m.id" , "=" , "r.message")
            .leftJoin("users as u" , "u.id" , "=" , "m.sender")
            .select(
                "r.*" , 
                "u.id as userId as senderId" , 
                "u.username as senderName" , 
                "u.first_name as senderFirstName" ,
                "u.last_name as senderLastName" , 
                "u.user_img as senderImage"
            )
            .where("r.receiver" , "=" , query.receiver)
            .andWhere("r.is_read" , "=" , 0)

            const messages = await messagesQuery.orderBy("m.created_at" , "desc")
            .limit(option?.limit!)
            .offset((option?.offset! - 1) * option?.limit!)

            const count = await messagesQuery
            .count('r.id as CNT').first();

            
            return {
                count: +count?.CNT!,
                messages,
            };
        } catch (error) {
            throw error
        }
    }
}
