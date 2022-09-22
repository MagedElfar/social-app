import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express"
import routes from "../route/messages.routes";
import MessageServices from "./../services/messages.services"

export default class MassageController extends Controller{
    protected routes: APIRoute[] = routes(this);

    constructor(path:string) {
        super(path) 
    }

    // async getRoomsHandler(req:Request , res:Response , next:NextFunction) {
    //     const {limit = 10 , offset = 1} = req.query

    //     try {
    //         const srv = new ConversationServices(req.body.type).createConversation();

    //         const rooms = await srv.getUserRooms(req.user?.id! , +limit , +offset)

    //         super.setResponseSuccess({res , status:200 , data:{rooms}})

    //     } catch (error) {
    //         return next(error)
    //     }
    // } 

    async oneToOneMessageHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const srv = new MessageServices();

            const message = await srv.oneTOoneMessage(req.body.message , req.user?.id! , req.body.receiver)

            super.setResponseSuccess({res , status:201 , data: {message}})
        } catch (error) {
            next(error)
        }
    }
} 