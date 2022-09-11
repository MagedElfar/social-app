import Controller, { APIRoute , Methods} from '../app/controller';
import {likeValidation , isValidate } from "../middleware/validators";

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "/",
            method: Methods.POST,
            handler: controller.likeHandler,
            localMiddleware:[likeValidation , isValidate],
            auth:true
        }
    ]
    return r;
}


export default routes