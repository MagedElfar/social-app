import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";

export interface IPost extends Model {
    user:number;
    content:string;
}


export class PostRepository extends BaseRepository<IPost>{
    constructor() {
        super('posts')
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
