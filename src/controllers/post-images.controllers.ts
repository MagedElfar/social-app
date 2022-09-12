import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express"
import routes from "../route/post-image.routes";
import PostImageServices from "../services/post-images.services";


export default class PostImagesController extends Controller{
    protected routes: APIRoute[] = routes(this);
    services:PostImageServices = new PostImageServices();

    constructor(path:string) {
        super(path) 
    }

    async getImagesHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const image = await this.services.getPostImages(+req.params.id  , req.user?.id!)

            super.setResponseSuccess({res , status:200 , data: {image}})
        } catch (error) {
            next(error)
        }
    }

    async deleteImagesHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            await this.services.deleteImage(+req.params.id  , req.user?.id!)

            super.setResponseSuccess({res , status:200})
        } catch (error) {
            next(error)
        }
    }

    async addImagesHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const images = await this.services.addImages(+req.body.post  , req.user?.id! , req.body.images)

            super.setResponseSuccess({res , status:201 , data: {images}})
        } catch (error) {
            next(error)
        }
    }

} 