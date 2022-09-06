import {Request , Response , NextFunction} from "express"
import { setError } from "../utils/error-format";

export function checkParamId(req:Request , res:Response , next:NextFunction){
    try {
        const {id} = req.params
        if (!id) throw setError(400 , "ID is required");
        
        next()
    } catch (error) {
        return next(error)
    }
}