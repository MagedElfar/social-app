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

    async findMany(query?: Partial<IUser>, option?: Options , search:string = ""): Promise<IUser[]> {
        try {
            let users = await this.db("users")
            .where("username" , "like" , `%${search}%`)
            .orWhere("first_name" , "like" , `%${search}%`)
            .orWhere("last_name" , "like" , `%${search}%`)
            .limit(option?.limit!)
            .offset((option?.offset! - 1) * option?.limit!)
            .select()

            return users

        } catch (error) {
            throw error
        }
    }
}