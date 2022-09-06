export default abstract class Service <T>{
    abstract findOne(item:Partial<T>): Promise<T>; 

    abstract create(data:T): Promise<T>;
    
    abstract update(id:number , data:Partial<T>): Promise<void>; 

    abstract deleteItem(query:Partial<T>): Promise<void>;
}