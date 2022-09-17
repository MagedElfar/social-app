import { FriendsRepository } from './../model/friends.model';
import { CommentRepository } from '../model/comments.model';
import { PostRepository } from '../model/posts.model';
import { setError } from "../utils/error-format";

export default class CommentServices{

    async getComments(postId:number , user:number , limit:number , offset:number) {
        try {
            const postRepository = new PostRepository()

            const post = await postRepository.findOne({id:postId});

            if(!post)  throw setError(404 , "post not found");

            const commentRep = new CommentRepository();

            const comments = await commentRep.findMany({post:postId , user} , {limit , offset})

            return comments;
        } catch (error) {
            throw error
        }
    }
    
    async addComment(postId:number , user:number , comment:string):Promise<void> {
        try {
            const postRepository = new PostRepository()

            const post = await postRepository.findOne({id:postId});

            if(!post)  throw setError(404 , "post not found");

            const commentRep = new CommentRepository();

            if(post.user === user) {
                await commentRep.create({post:postId , user , comment})
                return
            }

            const friendRep = new FriendsRepository() 

            const friend = await friendRep.findOne({user_1:user , user_2:post.user})

            if(!friend) throw setError(403 , "Forbidden");

            await commentRep.create({post:postId , user , comment})

            return
        } catch (error) {
            throw error
        }
    }

    async deleteComment(id:number , user:number):Promise<void> {
        try {

            const commentRep = new CommentRepository();

            const comment = await commentRep.findOne({id})

            if(!comment)  throw setError(404 , "comment not found");

            const postRepository = new PostRepository()

            const post = await postRepository.findOne({id:comment.post});

            if(!post)  throw setError(404 , "post not found");

            if(post.user !== user && comment.user !== user) 
                throw setError(403 , "Forbidden")

            await commentRep.deleteOne({id})

            return;
        } catch (error) {
            throw error
        }
    }
}
