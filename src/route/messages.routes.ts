import Controller, { APIRoute , Methods} from '../app/controller';
import {oneToOneValidation , messageValidation , isValidate } from "../middleware/validators";

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
     
        {
            path: "/",
            method: Methods.POST,
            handler: controller.oneToOneMessageHandler,
            localMiddleware:[oneToOneValidation , isValidate],
            auth:true
        }
    ]
    return r;
}


export default routes