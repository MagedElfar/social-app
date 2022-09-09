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

}
