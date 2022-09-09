import Controller, { APIRoute , Methods} from '../app/controller';
import {addFriendValidation , updateFriendRequest , isValidate } from "../middleware/validators";

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "/",
            method: Methods.GET,
            handler: controller.getFriendsHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/",
            method: Methods.POST,
            handler: controller.addFriendHandler,
            localMiddleware:[addFriendValidation , isValidate],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.PUT,
            handler: controller.friendRequestUpdateHandler,
            localMiddleware:[updateFriendRequest , isValidate],
            auth:true
        }
    ]
    return r;
}


export default routes