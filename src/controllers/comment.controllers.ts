import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express"
import routes from "../route/comment.routs";
import CommentServices from "../services/comment.services";


export default class CommentsController extends Controller{
    protected routes: APIRoute[] = routes(this);

    constructor(path:string) {
        super(path) 
    }

    async addCommentHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const srv = new CommentServices()
            await srv.addComment(req.body.post  , req.user?.id! , req.body.comment)

            super.setResponseSuccess({res , status:200})
        } catch (error) {
            next(error)
        }
    }

    async getCommentsHandler(req:Request , res:Response , next:NextFunction) {
        const {limit = 3 , offset = 1} = req.query

        try {
            const srv = new CommentServices()

            const comments = await srv.getComments(+req.params.id! ,req.user?.id! , +limit , +offset)

            super.setResponseSuccess({res , status:200 , data:{comments}})

        } catch (error) {
            return next(error)
        }
    } 

    async deleteCommentHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const srv = new CommentServices()
            await srv.deleteComment(+req.params.id  , req.user?.id!)

            super.setResponseSuccess({res , status:200})
        } catch (error) {
            next(error)
        }
    }


} 