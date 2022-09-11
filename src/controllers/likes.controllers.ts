import { IFriend } from '../model/friends.model';
import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express"
import routes from "../route/likes.route";
import LikesServices from "../services/likes.services";


export default class LikesController extends Controller{
    protected routes: APIRoute[] = routes(this);
    services:LikesServices = new LikesServices();

    constructor(path:string) {
        super(path) 
    }

    async likeHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            await this.services.likes(req.body.post  , req.user?.id!)

            super.setResponseSuccess({res , status:200})
        } catch (error) {
            next(error)
        }
    }

} 