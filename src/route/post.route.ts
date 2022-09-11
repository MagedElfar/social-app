import Controller, { APIRoute , Methods} from '../app/controller';
import { setRequestArrayFile } from '../middleware/files';
import Multer from '../middleware/multer';
import {postValidation , isValidate} from "./../middleware/validators"
const routes: (controller:Controller) => APIRoute [] = (controller:any) => {

    const r:APIRoute [] = [
        {
            path: "/",
            method: Methods.POST,
            handler: controller.addPostHandler,
            localMiddleware:[
                Multer.localUpload().array("images"),
                setRequestArrayFile
            ],
            auth:true
        },
        {
            path: "/",
            method: Methods.GET,
            handler: controller.getPostsHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.GET,
            handler: controller.getPostHandler,
            localMiddleware:[],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.PUT,
            handler: controller.updatePostHandler,
            localMiddleware:[postValidation , isValidate],
            auth:true
        },
        {
            path: "/:id",
            method: Methods.DELETE,
            handler: controller.deletePostHandler,
            localMiddleware:[],
            auth:true
        },
    ]
    return r;
}


export default routes