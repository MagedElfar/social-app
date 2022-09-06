import {IUser, UserRepository } from "../model/user.model";
import { setError } from "../utils/error-format";

export default class UserServices{
    
    private _repository:UserRepository = new UserRepository();

    async findAllUsers(query:Partial<IUser>):Promise<IUser []> {
        try {
            let users:IUser [] = await this._repository.findMany(query);

            users = users.map((user:IUser) => {
                const item:Omit<IUser , "password"> = user
                delete item.password
                return user
            })

            return users
        } catch (error) {
            throw error
        }
    }
    
    async findOne(item:Partial<IUser>):Promise<IUser>{
        try {
            const user = await this._repository.findOne(item);
            return user;
        } catch (error) {
            throw error
        }
    }
    

    async create(data: IUser):Promise<IUser>{
        try {

            const user:IUser = await this._repository.create(data)
            return user;

        } catch (error) {
            throw error;
        }
    }

    async updateUser(data:Partial<IUser> , id:number):Promise<void>{
        try {
            let user = await this._repository.findOne({id});
            if(!user) throw setError(404 , "user not found");
            
            user = await this._repository.checkData({email:data.email} , id)

            if(user) throw setError(400 , "email is existed");

            user = await this._repository.checkData({username:data.username} , id)

            if(user) throw setError(400 , "username is existed");

            if(data?.image) {
                data.user_img = data.image;

                delete data.image
            }

            await this._repository.update(id , data)

            return;
        } catch (error) {
            throw error
        }
    }

}
