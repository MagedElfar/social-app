import {Request , Response , NextFunction } from "express"

export function setRequestSingletFile(req:Request , res:Response , next:NextFunction){

    if(req.file) {
        req.body.image = req.file.filename
    }

    next()
}