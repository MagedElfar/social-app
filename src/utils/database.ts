export interface Options{
    limit?: number,
    offset?: number,
    from?:string,
    to?:string
}

interface IWrite<T>{
    create:  (item:T) => Promise<T | number>;
    createMany: (items: T[] | any []) => Promise<void> ;
    update:  (id:number | string , item:T | Partial<T> ) => Promise<T>;
    deleteOne:  (query:Partial<T>) => Promise<void>;
}

interface IRead<T>{
    findMany:  (query: Partial<T> , option:Options ,search?:string) => Promise<T[]>;
    findOne: (query: Partial<T>) => Promise<T>;
    checkData: (query:Partial<T> , id:number) => Promise<T>
}


export default abstract class DBRepository <T> implements IRead<T> , IWrite<T>  {

    protected abstract db:any;

    abstract findMany(query: Partial<T> , option:Options , search?:string):Promise<T[]>;

    abstract findOne(query: Partial<T>):Promise<T>;

    abstract checkData(query:Partial<T> , id:number):Promise<T>;

    abstract create(item:T):Promise<T | number>;

    abstract createMany(items: T[] | any []): Promise<void>;

    abstract update(id:number | string , item:T | Partial<T>):Promise<T>;

    abstract deleteOne(query:Partial<T>):Promise<void>

    abstract deleteOne(query:Partial<T>):Promise<void>

}

