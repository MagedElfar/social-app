import Controller, { APIRoute , Methods} from '../app/controller';
import {commentValidation , isValidate } from "../middleware/validators";

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "/",
            method: Methods.POST,
            handler: controller.addCommentHandler,
            localMiddleware:[commentValidation , isValidate],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.GET,
            handler: controller.getCommentsHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.DELETE,
            handler: controller.deleteCommentHandler,
            localMiddleware:[],
            auth:true
        }
    ]
    return r;
}


export default routes