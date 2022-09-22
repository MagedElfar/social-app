import Model from "../app/model";
import BaseRepository from "../plugins/mysqldb";

export interface IRoomMember extends Model {
    user:number;
    room:number
}


export class RoomMemberRepository extends BaseRepository<IRoomMember>{
    constructor() {
        super('room_members')
    }
}
