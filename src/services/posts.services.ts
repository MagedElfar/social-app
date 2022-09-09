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

}
