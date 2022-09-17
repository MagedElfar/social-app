import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import { Options } from "../utils/database";

export interface IComment extends Model {
    comment:string;
    post:number;
    user:number
}


export class CommentRepository extends BaseRepository<IComment>{
    constructor() {
        super('comments')
    }

    async findMany(query?: Partial<IComment>, option?: Options): Promise<IComment[]> {
        try {
            const images = await this.db(`${this.table} as c`)
            .leftJoin("posts as p" , "p.id" , "=" , "c.post")
            .leftJoin("users as u" , "u.id" , "=" , "c.user")
            .select("c.*" , "u.username")
            .where("c.post" , "=" , query?.post!)
            .andWhere("p.user" , "=" , query?.user!)
            .orWhereIn("p.user" , 
                this.db("friends as f").select("f.user_2")
                .where("f.user_1" , "=" ,query?.user!)
                .andWhere("status" , "=" , "accepted")
                .union(
                    this.db("friends as f2").select("f2.user_1")
                    .where("f2.user_2" , "=" , query?.user! )
                    .andWhere("status" , "=" , "accepted")
                )
            ).orderBy("c.created_at" , "desc")
            .limit(option?.limit!)
            .offset((option?.offset! - 1) * option?.limit!)
    
            return images
        } catch (error) {
            throw error
        }
    }
} 
