import { PostRepository } from '../model/posts.model';
import { LikeRepository } from '../model/likes.model'
import { setError } from "../utils/error-format";

export default class LikeServices{
    
    private _repository:LikeRepository = new LikeRepository();

    async likes(postId:number , user:number):Promise<void> {
        try {
            const postRepository = new PostRepository()
            const post = await postRepository.findOne({id:postId});

            if(!post)  throw setError(404 , "post not found");

            const like = await this._repository.findOne({post:postId , user})

            if(like) {
                await this._repository.deleteOne({id:like.id})
                return
            }

            await this._repository.create({post:postId , user})

            return
        } catch (error) {
            throw error
        }
    }
}
