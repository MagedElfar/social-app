import { IUser } from './../model/user.model';
import {setError} from "../utils/error-format";
import token , {Token} from "../middleware/token";
import Password from "../utils/password";
import TokenServices from './token.services';
import UserServices from './user.services';


interface ILogin{
    password:string,
    email:string
}

export interface ISignup{
    password:string,
    email:string,
    username:string,
}

interface IAuth {
    user:Partial<IUser> ,
    token:string , 
    refreshToken:string
}

export default class AuthServices{
    private service:UserServices = new UserServices;
    private tokenSrv:TokenServices = new TokenServices();

    async login({email , password}:ILogin):Promise<IAuth> | never {
        try {
            const user = await this.service.findOne({email});

            const pass = new Password(password);

            if(!user) throw setError(400 , "Invalid Email or Password");

            const isMatched = await pass?.checkPassword(user.password);

            if(!isMatched) throw setError(400 , "Invalid Email or Password")

            const {password:p , ...others} = user
            

            const {refreshToken , token} = this.tokenSrv.generateAutTokens({id:user.id})

            await this.tokenSrv.create({
                token:refreshToken,
                user: user.id!,
            })
            
            return {
                user:others,
                token,
                refreshToken
            }
        } catch (error) {
            throw error
        } 
    }

    async signup(data:IUser):Promise<IAuth> | never {
        try {

            let user = await this.service.findOne({email: data.email})
            
            if(user) throw setError(400 , "email is already exist");

            const pass = new Password(data.password);

            data.password = await pass.setPassword()

            user = await this.service.create(data)


            const {refreshToken , token} = this.tokenSrv.generateAutTokens({id:user.id})


            await this.tokenSrv.create({
                token:refreshToken,
                user: user.id!,
            })

            const {password , ...others} = user;

            return {
                user:others,
                token,
                refreshToken
            }
        } catch (error) {
            throw error
        }
    }

    async logout(token:string , user:number):Promise<void> {
        try {
            const t = await this.tokenSrv.findOne({token , user});
            if (!t) throw setError(404 , "token not found")
            await this.tokenSrv.deleteItem({token})
        } catch (error) {
            throw error
        }

        
    }

    async refreshToken(RToken:string):Promise<{token:string , refreshToken:string}> {
        try {

            const dbToken = await this.tokenSrv.findOne({token: RToken});

            if (!dbToken) throw setError(401 , "Your session has expired, please login");
            const {id} = await this.tokenSrv.verifyToken(RToken , 401 , "Your session has expired, please login");

            const {refreshToken , token} = this.tokenSrv.generateAutTokens({id})

            await this.tokenSrv.update(+dbToken.id! , {token: refreshToken})

            return {
                token,
                refreshToken
            }

        } catch (error) {
            throw error
        }
    }
}