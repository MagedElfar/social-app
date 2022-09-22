import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express"
import routes from "../route/chat-rooms.route";
import ConversationServices from "../services/room.services";


export default class RoomController extends Controller{
    protected routes: APIRoute[] = routes(this);

    constructor(path:string) {
        super(path) 
    }

    async getRoomsHandler(req:Request , res:Response , next:NextFunction) {
        const {limit = 10 , offset = 1} = req.query

        try {
            const srv = new ConversationServices(req.body.type).createConversation();

            const rooms = await srv.getUserRooms(req.user?.id! , +limit , +offset)

            super.setResponseSuccess({res , status:200 , data:{rooms}})

        } catch (error) {
            return next(error)
        }
    } 

    async createRoomHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const users = [req.user?.id! , ... req.body.users]

            const srv = new ConversationServices(req.body.type).createConversation();

            const room = await srv.createRoom(users)

            super.setResponseSuccess({res , status:201 , data: {room}})
        } catch (error) {
            next(error)
        }
    }

    async inviteUsersToRoomHandler(req:Request , res:Response , next:NextFunction) {

        try {
            const users = [... req.body.users]

            const srv = new ConversationServices().createConversation();

            await srv.inviteUser(users , +req.params.id , req.user?.id!)

            super.setResponseSuccess({res , status:200})

        } catch (error) {
            return next(error)
        }
    } 

    async leaveRoomHandler(req:Request , res:Response , next:NextFunction) {

        try {

            const srv = new ConversationServices().createConversation();

            await srv.leaveRoom(+req.params.id , req.user?.id!)

            super.setResponseSuccess({res , status:200})

        } catch (error) {
            return next(error)
        }
    } 

} 