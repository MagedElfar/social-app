import {Request , Response , NextFunction } from "express"

export function setRequestSingletFile(req:Request , res:Response , next:NextFunction){

    if(req.file) {
        req.body.image = req.file.filename
    }

    next()
}

export function setRequestArrayFile(req:Request , res:Response , next:NextFunction){

    if(Array.isArray(req.files)) {
        req.body.images = req.files.map((item:any) => {
            return item?.filename
        })
    } else {
        req.body.images = []
    }
    
    next()
}