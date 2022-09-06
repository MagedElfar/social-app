import express , {Application , urlencoded , json} from "express";
import Server from "./app/server";
import cors from "cors";
import morgan from "morgan";
import routes from "./route";
import cookieParser from "cookie-parser"
import config from "./config";

const app:Application = express();

const server:Server = new Server(app);

server.loadMiddleware([
    cors(),
    morgan("short"),
    urlencoded({extended: true}),
    cookieParser(config.cookie.secret),
    json(),
])

// process.on("uncaughtException" , (stream)=> {
//     console.log("err")
// })
// process.on("unhandledRejection" , (stream)=> {
//     console.log("err")
// })

server.setRoutes(routes);

server.errorHandler()

server.run()