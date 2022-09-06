import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import { Options } from "../utils/database";

export enum Status {
    Pending = 'pending',
    Accepted = 'accepted',
    Rejected = 'rejected'
}


export interface IFriend extends Model {
    user_1:number;
    user_2:number;
    status?: string;
}


export class FriendsRepository extends BaseRepository<IFriend>{
    constructor() {
        super('friends')
    }

    async findOne(query: Partial<IFriend>): Promise<IFriend> {
        try {
            const req =  this.db(this.table)
//                .whereNotIn("status" , ["pending" , "accepted"])

            if(query.user_1 || query.user_2) {
                req
                .whereNot({status :"rejected"})
                .andWhere({user_1:query.user_1 , user_2:query.user_2})
                .orWhere({user_1:query.user_2 , user_2:query.user_1})
            } else {
                req.where(query)
            }

            return await req.first()
        } catch (error) {
            throw error
        }
    }
}