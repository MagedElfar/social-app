import {Request , Response , NextFunction} from "express"
import { setError } from "../utils/error-format";

export function refreshTokenValidation(req:Request , res:Response , next:NextFunction){
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies;


    if (!refreshToken) return next(setError(400 , "refreshToken is required"))

    req.refreshToken = refreshToken;

    next()
}