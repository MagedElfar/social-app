import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";

export interface IToken extends Model {
    user:number | string;
    token:string;
}

export default class TokenList implements IToken {
    user:number | string;
    token:string;

    constructor(user:number , token:string){
        this.token = token;
        this.user = user
    }
}

export class TokenRepository extends BaseRepository<IToken>{
    constructor() {
        super('tokens')
    }
}
