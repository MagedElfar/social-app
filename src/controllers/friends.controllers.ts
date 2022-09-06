import { IFriend } from '../model/friends.model';
import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express"
import routes from "../route/friends.route";
import FriendRequestServices from "../services/friends.services";


export default class FriendsController extends Controller{
    protected routes: APIRoute[] = routes(this);
    services:FriendRequestServices = new FriendRequestServices();

    constructor(path:string) {
        super(path) 
    }

    async addFriendHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const request:IFriend = await this.services.addFriend({
                user_2: req.body.receiver , 
                user_1: req.user?.id!
            })

            super.setResponseSuccess({res , status:201 , message:"friend request has sent"})
        } catch (error) {
            next(error)
        }
    }

    async friendRequestUpdateHandler(req:Request , res:Response , next:NextFunction) {
        try {

            await this.services.friendRequestUpdate(req.body.status , +req.params.id , req.user?.id!)

            super.setResponseSuccess({res , status:200 , message:`friend request has ${
                req.body.status
            }`})

        } catch (error) {
            next (error)
        }
    }
} 