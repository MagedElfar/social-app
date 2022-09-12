import Controller, { APIRoute , Methods} from '../app/controller';
import { setRequestArrayFile } from '../middleware/files';
import Multer from '../middleware/multer';
import {likeValidation , isValidate } from "../middleware/validators";

const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "/",
            method: Methods.POST,
            handler: controller.addImagesHandler,
            localMiddleware:[
                Multer.localUpload().array("images"),
                setRequestArrayFile,
                likeValidation,
                isValidate
            ],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.GET,
            handler: controller.getImagesHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.DELETE,
            handler: controller.deleteImagesHandler,
            localMiddleware:[],
            auth:true
        }
    ]
    return r;
}


export default routes