import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express"
import routes from "../route/auth.routes";
import AuthServices from "../services/auth.services";
import config from "../config";


export default class AuthController extends Controller{
    protected routes: APIRoute[] = routes(this);
    authServices:AuthServices = new AuthServices();

    constructor(path:string) {
        super(path)
    }

    async loginHandler(req:Request , res:Response , next:NextFunction) :  Promise<void> {
        try {

            
            const data = await this.authServices.login(req.body)

            res.cookie("refreshToken" , data.refreshToken ,  config.cookie.option)

            super.setResponseSuccess({res , status:200 , data})

        } catch (error) {
            next(error)
        }
    };

    async signupHandler(req:Request , res:Response , next:NextFunction) {
        try {

            const data = await this.authServices.signup(req.body);

            res.cookie("refreshToken" , data.refreshToken ,  config.cookie.option)

            super.setResponseSuccess({res , status:201 , data});

        } catch (error) {
            next (error)
        }
    }

    async logoutHandler(req:Request , res:Response , next:NextFunction){
        try {

            const refreshToken = req.refreshToken!

            await this.authServices.logout(refreshToken , req.user?.id!);

            super.setResponseSuccess({res , status:200});
            
        } catch (error) {
            next (error)
        }
    }

    async refreshTokenHandler(req:Request , res:Response , next:NextFunction){
        try {


            const refreshToken = req.refreshToken!

            const tokens = await this.authServices.refreshToken(refreshToken)

            res.cookie("refreshToken" , tokens.refreshToken ,  config.cookie.option)


            super.setResponseSuccess({res , status:200 , data:tokens});
            
        } catch (error) {
            next (error)
        }
    }
} 