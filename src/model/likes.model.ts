import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import { Options } from "../utils/database";

export interface ILike extends Model {
    user:number;
    post:number;
}


export class LikeRepository extends BaseRepository<ILike>{
    constructor() {
        super('likes')
    }
}
