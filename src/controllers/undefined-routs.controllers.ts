import Controller, { APIRoute } from "../app/controller";
import {Request , Response , NextFunction} from "express"
import { setError } from '../utils/error-format';


export default class UnHandledRoutes extends Controller{
    path: string = "";
    protected routes: APIRoute[] = [];

    static unHandledRoutesHandler(req:Request , res:Response , next:NextFunction) :  void {
        try {

            throw setError(404 , "route not found")

        } catch (error) {
            next(error)
        }
    }; 
} 