import  express, {Application , RequestHandler , Request , Response , Router, NextFunction} from 'express';
import {createServer} from "http"
import path from 'path';
import { requestErrorFormat } from '../utils/error-format';
import Controller from './controller'
import config from '../config';
import UnHandledRoutes from '../controllers/undefined-routs.controllers';
import {Server as SocketServer} from "socket.io"

export default class Server {
    app:Application;
    private readonly port:string = config.port;
    private router:Router;

    constructor(app:Application){
        this.app = app;
        this.router = Router()
    }
 
    run():void{
        const server = createServer(this.app);
        const io = new SocketServer(server)

        io.on("connection" , (socket) => {
            console.log("socket is connected")

            socket.on("send message" , (data:any) => {
                io.to("join room").emit("test" , "send all user")
            })

            socket.on("join room" , () => {
                
                socket.join("room")
                socket.broadcast.to("room").emit("join room" , "new user join")
            })
            socket.on("join" , (data:any) => {
                socket.join("join room")
                io.to("join room").emit("test" , "new user join")
            })

            socket.in
            socket.on("test" , (data:any) => {
                console.log(data)
                socket.emit("test" , "send from server to current clint")
            })

            socket.on("test all" , (data:any) => {
                console.log(data)
                io.emit("test" , "send from server to all clint")
            })

            socket.on("test all expect current" , (data:any) => {
                console.log(data)
                socket.broadcast.emit("test" , "send from server to all clint test all expect current")
            })
        })
        
        server.listen(this.port , () => {
            console.log(`server is running on port ${this.port}...`)
        })
    }

    loadMiddleware(middlewares: RequestHandler []):void {
        middlewares.forEach((mid:RequestHandler) => {
            this.app.use(mid)
        });

        this.app.use(express.static(path.join(path.dirname(__dirname) , ".." , "public")));

        this.app.use("/media", express.static(path.join(__dirname , ".." , "public" , "media")));

        this.app.get("/" , (req:Request , res:Response) => {
            res.sendFile(path.join(path.dirname(__dirname) , "index.html"))

            // res.send("app backend server")
        })
    }

    setRoutes(controllers:Controller []){
        controllers.forEach((controller:Controller) => {
            this.router.use(controller.path , controller.setRoutes())
        }) 

        this.app.use('/api' , this.router)
        this.app.use('*' , UnHandledRoutes.unHandledRoutesHandler)
    }

    errorHandler():void{
        this.app.use((err:any , req:Request , res:Response , next:NextFunction) =>{
            const error = requestErrorFormat(err)
            res.status(err.status || err.response?.data.code || 500).json(error)
        }) 
    }
}