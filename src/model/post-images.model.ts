import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import { Options } from "../utils/database";

export interface IPostImage extends Model {
    post:number;
    image:string;
}


export class PostImageRepository extends BaseRepository<IPostImage>{
    constructor() {
        super('post_images')
    }

    async findById(id:number , user?:number): Promise<IPostImage> {
        try {
            const img = this.db(`${this.table} as pm`)
            .leftJoin("posts as p" , "p.id" , "=" , "pm.post")
            .select("pm.*" , "p.user")
            .where("pm.id" , "=" , id)

            if(user) {
                img.whereIn("p.user" ,
                this.db("friends as f").select("f.user_2")
                .where("f.user_1" , "=" , user)
                .andWhere("status" , "=" , "accepted")
                .union(
                    this.db("friends as f2").select("f2.user_1")
                    .where("f2.user_2" , "=" , user )
                    .andWhere("status" , "=" , "accepted")
                ))
            }
    
            return await img.first()
        } catch (error) {
            throw error
        }
    }

    async findMany(query?: Partial<IPostImage>, option?: Options | undefined, search?: string | undefined): Promise<IPostImage[]> {
        try {
            const images = await this.db(`${this.table} as pm`)
            .leftJoin("posts as p" , "p.id" , "=" , "pm.post")
            .select("pm.*" , "p.user")
            .where("pm.post" , "=" , query?.post!)
    
            return images
        } catch (error) {
            throw error
        }
    }
}
