import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import { Options } from "../utils/database";



export interface IUser extends Model {
    username:string;
    email:string;
    password: string;
    is_online:boolean;
    user_img:string;
    first_name?:string;
    last_name?:string;
}


export class UserRepository extends BaseRepository<IUser>{
    constructor() {
        super('users')
    }

    async findMany(query?: Partial<IUser>, option: Options = {limit: 10 , offset: 1}): Promise<IUser[]> {
        try {
            let users = this.db("users")
            .limit(option.limit!)
            .offset(option.offset! - 1)
            .select()

            if(query?.username) {
                users.where("username" , "like" , `%${query.username}%`)
            }

            if(query?.first_name) {
                users.orWhere("first_name" , "like" , `%${query.first_name}%`)
            }

            if(query?.last_name) {
                users.orWhere("first_name" , "like" , `%${query.last_name}%`)
            }

            // users = await users

            console.log("test")
            return await users

        } catch (error) {
            throw error
        }
    }
}