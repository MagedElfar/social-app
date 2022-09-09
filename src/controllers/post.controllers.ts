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
            })

            super.setResponseSuccess({res , status:201 , data:post})

        } catch (error) {
            return next(error)
        }
    }
} 