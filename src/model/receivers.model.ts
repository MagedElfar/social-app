import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";

export interface IReceiver extends Model {
    receiver:number;
    message:number;
    is_read:number;
}       


export default class ReceiversRepository extends BaseRepository<IReceiver>{
    constructor() {
        super('receivers')
    }
}
