import { IPost } from '../model/posts.model';
import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express"
import routes from "../route/post.route";
import PostServices from "../services/posts.services";


export default class PostController extends Controller{
    protected routes: APIRoute[] = routes(this);
    services:PostServices = new PostServices();

    constructor(path:string) {
        super(path) 
    }

    async addPostHandler(req:Request , res:Response , next:NextFunction) {
        try {
            const post = await this.services.createPost({
                content: req.body?.content,
                user: req.user?.id!
            } , req.body.images)

            super.setResponseSuccess({res , status:201 , data:post})

        } catch (error) {
            return next(error)
        }
    }

    async getPostsHandler(req:Request , res:Response , next:NextFunction) {
        const {friends = "false" , limit = 10 , offset = 1} = req.query

        try {
            const posts = await this.services.getPosts(req.user?.id! , {
                friends: friends.toString() , 
                limit: +limit , 
                offset: +offset})

            super.setResponseSuccess({res , status:200 , data:{posts}})

        } catch (error) {
            return next(error)
        }
    } 

    async getPostHandler(req:Request , res:Response , next:NextFunction) {

        try {
            const post = await this.services.getPost(+req.params.id! , +req.user?.id!)

            super.setResponseSuccess({res , status:200 , data:{post}})

        } catch (error) {
            return next(error)
        }
    } 

    async updatePostHandler(req:Request , res:Response , next:NextFunction) {

        try {
            await this.services.updatePost(+req.params.id! , +req.user?.id! , req.body.content)

            super.setResponseSuccess({res , status:200 , message:"post is updated"})

        } catch (error) {
            return next(error)
        }
    } 

    async deletePostHandler(req:Request , res:Response , next:NextFunction) {

        try {
            await this.services.deletePost(+req.params.id! , +req.user?.id!)

            super.setResponseSuccess({res , status:200 , message:"post is deleted"})

        } catch (error) {
            return next(error)
        }
    } 

} 