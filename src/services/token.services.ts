import { IUser } from './../model/user.model';
import Service from "./../app/services";
import {IToken, TokenRepository} from "../model/token.model";
import config from "../config";
import {verify, VerifyErrors , sign} from "jsonwebtoken"
import { setError } from "../utils/error-format";

export default class TokenServices extends Service<IToken>{
    
    async findOne(item: Partial<IToken>): Promise<IToken> {
        try {

            const token = await this._repository.findOne(item);
            return token;
        } catch (error) {
            throw error
        }
    }

    _repository:TokenRepository = new TokenRepository();

    generateToken(data:any) {
        const token = sign(data , config.jwt.secret! , {
            expiresIn: "15m"
        })

        return token;
    }

    private generateAccessToken (data:object):string{

        const token = sign(data , config?.jwt.secret! ,{ expiresIn: config?.jwt.accessTokenExpire});

        return token;
    }

    private generateRefreshToken (data:object):string{

        const token = sign(data , config?.jwt.secret! ,{ expiresIn: config?.jwt.accessTokenExpire});

        return token;
    }

    verifyToken(token:string , code:number , message:string):Promise<any> {

        let error:VerifyErrors;
        let data:any;

        return new Promise((resolve , reject) => {
            verify(token , config.jwt.secret! , async (err , decodedData:any) => {
                if(err) {
                    error = err;
                    await this.deleteItem({token})
                    return;
                }
                data = decodedData
            });

            if (error) return reject(setError(code , message));

            return resolve(data)

        })
        

    }

    generateAutTokens(data:object):{token:string , refreshToken:string} {
        const token = this.generateAccessToken(data)
        const refreshToken = this.generateRefreshToken(data);

        return {token , refreshToken}
    }

    async create(data: IToken):Promise<IToken>{
        try {

            const token = await this._repository.create(data)

            return token;

        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: Partial<IToken>): Promise<void> {
        try {
            await this._repository.update(id , data);
            return;
        } catch (error) {
            throw error
        }
    }

    async deleteItem(query:Partial<IToken>): Promise<void> {
        try {
            await this._repository.deleteOne(query);
            return;
        } catch (error) {
            throw error
        }
    }
}
