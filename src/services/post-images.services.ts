import { IPostImage , PostImageRepository } from './../model/post-images.model';

export default class PostImageServices{
    
    private _repository:PostImageRepository = new PostImageRepository();
    
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
