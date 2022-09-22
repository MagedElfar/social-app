import Controller, { APIRoute , Methods} from '../app/controller';
import {createRoomValidation , inviteUserValidation , isValidate } from "../middleware/validators";

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "/",
            method: Methods.GET,
            handler: controller.getRoomsHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/",
            method: Methods.POST,
            handler: controller.createRoomHandler,
            localMiddleware:[createRoomValidation , isValidate],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.PUT,
            handler: controller.inviteUsersToRoomHandler,
            localMiddleware:[inviteUserValidation , isValidate],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.DELETE,
            handler: controller.leaveRoomHandler,
            localMiddleware:[],
            auth:true
        }
    ]
    return r;
}


export default routes