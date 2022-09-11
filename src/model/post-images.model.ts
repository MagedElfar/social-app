import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";
import { Options } from "../utils/database";

export interface IPostImage extends Model {
    post:number;
    image:string;
}


export class PostImageRepository extends BaseRepository<IPostImage>{
    constructor() {
        super('post_images')
    }
}
