import { PostRepository , IPost } from '../model/posts.model'
import { setError } from "../utils/error-format";

export default class PostServices{
    
    private _repository:PostRepository = new PostRepository();
    
    async createPost(data:IPost):Promise<IPost> {
        try {
            const post = await this._repository.create(data)

            return post
        } catch (error) {
            throw error
        }
    }

    async getPosts(user:number , {friends , limit , offset}:{friends:string , limit:number , offset:number}) {
        try {
            
            const posts = await this._repository.findMany({user} , {limit , offset , others: [friends]});

            return posts
        } catch (error) {
            throw error
        }
    }

    async getPost(id:number , user:number):Promise<IPost> {
        try {
            
            const post = await this._repository.findOne({id , user});

            if(post?.user !== user) 
                throw setError(403 , "post not found or not has a permission for this process")

            return post
        } catch (error) {
            throw error
        }
    }

    async updatePost(id:number , user:number , content:string):Promise<void> {
        try {
            
            const post = await this._repository.findOne({id});

            if(post?.user !== user) 
                throw setError(403 , "post not found or not has a permission for this process")

            await this._repository.update(id , {content})

            return;
        } catch (error) {
            throw error
        }
    }

    async deletePost(id:number , user:number):Promise<void> {
        try {
            
            const post = await this._repository.findOne({id});

            if(post?.user !== user) 
                throw setError(403 , "post not found or not has a permission for this process")

            await this._repository.deleteOne({id})

            return;
        } catch (error) {
            throw error
        }
    }
}
