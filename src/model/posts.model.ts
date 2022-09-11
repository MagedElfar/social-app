import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import { Options } from "../utils/database";
import knex from "knex"

export interface IPost extends Model {
    user:number;
    content:string;
}


export class PostRepository extends BaseRepository<IPost>{
    constructor() {
        super('posts')
    }

    async findMany(query?: Partial<IPost>, option?: Options): Promise<IPost[] | any> {
        try {
            const posts = this.db(`${this.table} as p`)
            .leftJoin("users as u" , "u.id" , "=" , "p.user")
            .leftJoin("likes" , "likes.post" , "=" , "p.id")
            .select(
                "p.*" , 
                "u.username" , 
                "u.first_name" , 
                "u.last_name" , 
                "u.user_img",
                "likes.user as user_like",
            )
            .where({"p.user" : query?.user})
            
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
            .then(r => {

                if(r.length <= 0) return null;

                // const posts = r.map((item:IPost , i:number) => {

                //     const {user_like , obj} = item;

                //     const index = posts.findIndex((p) => p.id === item.id);

                //     if(index > -1) {
                //         posts[index]['likes'] = [...obj['likes'] , {user: user_like}]
                //         return
                //     } else {
                //         obj['likes'] = [{user: user_like}]
                //         return obj

                //     }
                // })
                const posts = r.reduce((arr:IPost [] , item:any) => {
                    const {user_like , ...others} = item

                    const index = arr.findIndex((p) => p.id === item.id);

                    if(index > -1) {
                        if(user_like) arr[index]['likes'] = [...arr[index]['likes'] , {user: user_like}];

                    } else {
                        const obj = {...others , likes: []}

                        if(user_like)  obj['likes'] = [{user: user_like}]
                        arr.push(obj)
                    }
                
                    return arr
                } , [])

                return posts
            })

        } catch (error) {
            throw error
        }
    }
    async findOne(query: any): Promise<IPost> {
        try {
            const post = await this.db("posts as  p")
            .leftJoin("users as u" , "u.id" , "=" , "p.user")
            .select("p.*" , "u.username" , "u.first_name" , "u.last_name" , "u.user_img")
            .where({"p.id": query?.id!})
            .first()

            return post
        } catch (error) {
            throw error
        }
    }
}
