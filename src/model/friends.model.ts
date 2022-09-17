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

    async findMany(query?: Partial<IFriend>, option?: Options , search?:string): Promise<IFriend[]> {
        try {
            let friends = this.db("friends as f")
            .leftJoin("users as u1" , "u1.id" , "=" , "f.user_1")
            .select("f.id" ,  "f.user_1  as user" , "u1.username as username" , "u1.first_name as first_name" , "u1.last_name as last_name")
            .where({status: query?.status , user_2:query?.user_1})
            .where(function() {
                this.where("username" , "like" , `%${search}%`)
                .orWhere("first_name" , "like" , `%${search}%`)
                .orWhere("last_name" , "like" , `%${search}%`)
                    
            })

            if(query?.status === "accepted") {
                friends.union(
                    this.db("friends as f2")
                    .where({status: query?.status , user_1:query?.user_1})
                    .leftJoin("users as u2" , "u2.id" , "=" , "f2.user_2")
                    .select("f2.id" , "f2.user_2  as user" , "u2.username as username" , "u2.first_name as first_name" , "u2.last_name as last_name")
                    .where(function() {
                        this.where("username" , "like" , `%${search}%`)
                        .orWhere("first_name" , "like" , `%${search}%`)
                        .orWhere("last_name" , "like" , `%${search}%`)
                    })
                )
            }

            if(option?.limit) {
                friends
                .limit(option?.limit!)
                .offset((option?.offset! - 1) * option.limit)
            }

            return await  friends

        } catch (error) {
            throw error
        }
    }

    async findOne(query: Partial<IFriend>): Promise<IFriend> {
        try {
            const req =  this.db(this.table)

            if(query.user_1 || query.user_2) {
                req
                .where({status :"accepted"})
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