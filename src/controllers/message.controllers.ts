import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express"
import routes from "../route/messages.routes";
import MessageServices from "./../services/messages.services"

export default class MassageController extends Controller{
    protected routes: APIRoute[] = routes(this);

    constructor(path:string) {
        super(path) 
    }

    async getRoomsHandler(req:Request , res:Response , next:NextFunction) {
        const {limit = 10 , offset = 1} = req.query

        try {
            const srv = new MessageServices();

            const messages = await srv.getMessages(
                req.user?.id! , 
                +req.params.roomId , 
                +limit , 
                +offset
            )

            super.setResponseSuccess({res , status:200 , data:{messages}})

        } catch (error) {
            return next(error)
        }
    } 

    async getPrivateRoomsHandler(req:Request , res:Response , next:NextFunction) {
        const {receiver = 0, limit = 10 , offset = 1} = req.query

        try {
            const srv = new MessageServices();

            const messages = await srv.getOneTOoneMessages(
                req.user?.id! , 
                +receiver, 
                +limit , 
                +offset
            )

            super.setResponseSuccess({res , status:200 , data:{messages}})

        } catch (error) {
            return next(error)
        }
    } 


    async getUnreadMSGHandler(req:Request , res:Response , next:NextFunction) {
        const {limit = 10 , offset = 1} = req.query

        try {
            const srv = new MessageServices();

            const messages = await srv.getUnReadMSG(
                req.user?.id! , 
                +limit , 
                +offset
            )

            super.setResponseSuccess({res , status:200 , data:{messages}})

        } catch (error) {
            return next(error)
        }
    } 

    async oneToOneMessageHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const srv = new MessageServices();

            const message = await srv.oneTOoneMessage(
                req.body.message , 
                req.user?.id! , 
                req.body.receiver
            )

            super.setResponseSuccess({res , status:201 , data: {message}})
        } catch (error) {
            next(error)
        }
    }

    async sendMessageHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const srv = new MessageServices();

            const message = await srv.sendMessage(
                req.body.message , 
                req.user?.id! , 
                +req.params.roomId
            )

            super.setResponseSuccess({res , status:201 , data: {message}})
        } catch (error) {
            next(error)
        }
    }

    async deleteMessageHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const srv = new MessageServices();

            const message = await srv.deleteMessage(
                req.user?.id! , 
                +req.params.id
            )

            super.setResponseSuccess({res , status:200})
        } catch (error) {
            next(error)
        }
    }

    async markMessageReadHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const srv = new MessageServices();

            const message = await srv.markReadMessage(
                req.user?.id! , 
                +req.params.id
            )

            super.setResponseSuccess({res , status:200})
        } catch (error) {
            next(error)
        }
    }

    async deleteReadHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const srv = new MessageServices();

            const message = await srv.deleteReadMessages(
                req.user?.id! , 
            )

            super.setResponseSuccess({res , status:200})
        } catch (error) {
            next(error)
        }
    }
} 