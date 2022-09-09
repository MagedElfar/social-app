import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import { Options } from "../utils/database";

export interface IPost extends Model {
    user:number;
    content:string;
}


export class PostRepository extends BaseRepository<IPost>{
    constructor() {
        super('posts')
    }

    async findMany(query?: Partial<IPost>, option?: Options): Promise<IPost[]> {
        try {
            const posts = this.db(`${this.table} as p`)
            .leftJoin("users as u" , "u.id" , "=" , "p.user")
            .select("p.*" , "u.username" , "u.first_name" , "u.last_name" , "u.user_img")
            .where(query!)
            
            if(option?.others![0] === "true") {
                posts.orWhereIn("p.user" , 
                    this.db("friends as f").select("f.user_2")
                    .where("f.user_1" , "=" ,query?.user!)
                    .andWhere("status" , "=" , "accepted")
                    .union(
                        this.db("friends as f2").select("f2.user_1")
                        .where("f2.user_2" , "=" , query?.user! )
                        .andWhere("status" , "=" , "accepted")
                    )
                )
            }

            return await posts            
            .orderBy("p.created_at" , "desc")
            .limit(option?.limit!)
            .offset((option?.offset! - 1) * option?.limit!)

        } catch (error) {
            throw error
        }
    }
    async findOne(query: any): Promise<IPost> {
        try {
            const post = await this.db("posts as  p").where({"p.id": query?.id!})
            .leftJoin("users as u" , "u.id" , "=" , "p.user")
            .select("p.*" , "u.username" , "u.first_name" , "u.last_name" , "u.user_img")
            .first()

            return post
        } catch (error) {
            throw error
        }
    }
}
