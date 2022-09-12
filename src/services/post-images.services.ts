import { PostRepository } from '../model/posts.model';
import { setError } from '../utils/error-format';
import { IPostImage , PostImageRepository } from './../model/post-images.model';

export default class PostImageServices{
    
    private _repository:PostImageRepository = new PostImageRepository();

    async getPostImages (post:number , user?:number) {
        try {
            const img = await this._repository.findMany({post , user})
            return img
        } catch (error) {
            throw error
        }
    }

    async addImages(post:number , user:number , images: string []){
        try {

            console.log("dd" , images)
            if(images.length === 0 ) 
                throw setError(400 , "no images provide")

            const postRep = new PostRepository()

            const postData = await postRep.findOne({id:post})

            if(!postData)
                throw setError(404 , "post not found")
            if(postData.user !== user) 
                throw setError(403 , "Forbidden")
            
            await this.saveImages(post , images)

            return await this.getPostImages(post , user)

        } catch (error) {
            throw error
        }
    }

    async deleteImage (id:number , user:number) {
        try {
            const img = await this._repository.findById(id)

            if(img.user !== user) throw setError(403 , "Forbidden")

            await this._repository.deleteOne({id})

        } catch (error) {
            throw error
        }
    }
    
    async saveImages(post:number , images: string []):Promise<void> {
        try {
            const imagesArr: IPostImage[] = images.map((item:string) => {
                return {post , image:item}
            });

            await this._repository.createMany(imagesArr)

            return
        } catch (error) {
            throw error
        }
    }
}
