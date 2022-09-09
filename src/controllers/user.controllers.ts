import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express"
import routes from "../route/user.route";
import UserServices from "../services/user.services";
import { IUser } from "../model/user.model";
import { setError } from "../utils/error-format";


export default class UserController extends Controller{
    protected routes: APIRoute[] = routes(this);
    userServices:UserServices = new UserServices();

    constructor(path:string) {
        super(path)
    }

    async getUsersHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const {search = "" , limit = 10 , offset = 1} = req.query

            const users:IUser [] = await this.userServices.findAllUsers(search.toString() , +limit , +offset)

            super.setResponseSuccess({res , status:200 , data:{users}})
        } catch (error) {
            next(error)
        }
    }

    async getUserHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            const user:Omit<IUser , "password"> = await this.userServices.findOne({id: req.params.id})

            if(!user) throw setError(404 , "user not found")

            delete user.password
            super.setResponseSuccess({res , status:200 , data:user})
        } catch (error) {
            next(error)
        }
    }

    async updateUserHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            await this.userServices.updateUser(req.body , +req.user?.id!)

            super.setResponseSuccess({res , status:200 , message:"user updated "})
        } catch (error) {
            next(error)
        }
    }
} 