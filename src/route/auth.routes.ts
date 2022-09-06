import Controller, { APIRoute , Methods} from '../app/controller';
import {loginValidation , signupValidation , isValidate } from "../middleware/validators";
import {refreshTokenValidation} from '../middleware/check-headers';

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "/login",
            method: Methods.POST,
            handler: controller.loginHandler,
            localMiddleware:[loginValidation , isValidate],
            auth:false
        },
        {
            path: "/signup",
            method: Methods.POST,
            handler: controller.signupHandler,
            localMiddleware:[signupValidation , isValidate],
            auth:false
        },
        {
            path: "/logout",
            method: Methods.POST,
            handler: controller.logoutHandler,
            localMiddleware:[refreshTokenValidation],
            auth:true
        },
        {
            path: "/refresh",
            method: Methods.POST,
            handler: controller.refreshTokenHandler,
            localMiddleware:[refreshTokenValidation],
            auth:false
        }
    ]
    return r;
}


export default routes