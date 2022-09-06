import Controller, { APIRoute , Methods} from '../app/controller';
import {setRequestSingletFile} from '../middleware/files';
import Multer from '../middleware/multer';
import {updateUserValidation , isValidate } from "../middleware/validators";

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "/",
            method: Methods.GET,
            handler: controller.getUsersHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.GET,
            handler: controller.getUserHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/",
            method: Methods.PUT,
            handler: controller.updateUserHandler,
            localMiddleware:[
                Multer.localUpload().single("file") ,
                updateUserValidation , 
                isValidate , 
                setRequestSingletFile
            ],
            auth:true
        },
    ]
    return r;
}


export default routes