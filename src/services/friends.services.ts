import { UserRepository, IUser } from '../model/user.model'
import { FriendsRepository , IFriend, Status } from '../model/friends.model'
import { setError } from "../utils/error-format";

export default class FriendRequestServices{
    
    private _repository:FriendsRepository = new FriendsRepository();
    
    async findOne(item:Partial<IFriend>):Promise<IFriend>{
        try {
            const request = await this._repository.findOne(item);
            return request;
        } catch (error) {
            throw error
        }
    }

    async getFriends(
        status:string , userId:number , search:string , limit:number , offset:number
        ):Promise<IFriend []> {
        try {
            const friends = await this._repository.findMany({
                status,
                user_1:userId,
            } , {limit , offset} , search)

            return friends;
        } catch (error) {
            throw error
        }
    }
    

    async addFriend(data: IFriend):Promise<IFriend>{
        try {

            if(data.user_1 === data.user_2) throw setError(400 , "you can't add yourself")

            const userRepository = new UserRepository()

            const receiver:IUser = await userRepository.findOne({id: data.user_2});

            if(!receiver) throw setError(404 , "the user has sent request to doesn't exist")

            let request:IFriend = await this.findOne({...data})

            console.log("request" , request)
            console.log(data)
            if(request) throw setError(400 , "request already sent")

            request = await this._repository.create({
                user_1: data.user_1,
                user_2:data.user_2,
                status: "pending"
            })
            return request;

        } catch (error) {
            throw error;
        }
    }

    async friendRequestUpdate(status:string , id:number , userId:number) {
        try {
            const req = await this._repository.findOne({id , status:"pending"});

            if(!req) throw setError(404 , "not found")

            if(req.user_2 !== userId) throw setError(403 , "Forbidden")
 
            await this._repository.update(id , {status})

        } catch (error) {
            throw error
        }
    }


}
