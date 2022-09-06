import passport from "passport";
import {Strategy , ExtractJwt} from "passport-jwt";
import {Request , Response , NextFunction} from "express";
import {setError} from "../utils/error-format"
import config from './../config'

declare global {
    namespace Express {
        interface User {
            id: number;
        }
        interface Request {
            refreshToken?: string
        }
    }
}


export class Token {
    private static instance: Token | null;

    private constructor() {}

    authStrategy: Strategy = new Strategy(
        {
            secretOrKey: config?.jwt.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        (payload, done) => {
            return done(null, payload);
        }
    );

    static generateInstance() {
        if(!Token.instance) Token.instance = new (Token);

        return Token.instance
    }

    
    authMiddleware (req:Request , res:Response , next:NextFunction)  {
        passport.authenticate("jwt", { session: false } , (error, decryptToken, jwtError) => {
            if (error || jwtError) {
                return next( setError(401 , "ACCESS_TOKEN_EXPIRED") )
            } 
            req.user = decryptToken;
            next()
        })(req, res, next);
    };

    
}


const token = Token.generateInstance()

const authStrategy = token.authStrategy

passport.use(authStrategy);

export default token

