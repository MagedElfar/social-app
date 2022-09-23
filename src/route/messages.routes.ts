import Controller, { APIRoute , Methods} from '../app/controller';
import {oneToOneValidation , messageValidation , isValidate } from "../middleware/validators";

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "/",
            method: Methods.GET,
            handler: controller.getPrivateRoomsHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/unread",
            method: Methods.GET,
            handler: controller.getUnreadMSGHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/:roomId",
            method: Methods.GET,
            handler: controller.getRoomsHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/",
            method: Methods.POST,
            handler: controller.oneToOneMessageHandler,
            localMiddleware:[oneToOneValidation , isValidate],
            auth:true
        },
        {
            path: "/:roomId",
            method: Methods.POST,
            handler: controller.sendMessageHandler,
            localMiddleware:[messageValidation , isValidate],
            auth:true
        },
        {
            path: "/mark-read/:id",
            method: Methods.PUT,
            handler: controller.markMessageReadHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/mark-read",
            method: Methods.DELETE,
            handler: controller.deleteReadHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.DELETE,
            handler: controller.deleteMessageHandler,
            localMiddleware:[],
            auth:true
        }
    ]
    return r;
}


export default routes 