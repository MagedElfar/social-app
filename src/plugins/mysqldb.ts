import db from "../../database";
import DBRepository, { Options } from "../utils/database";

export default abstract class BaseRepository<T> extends DBRepository<T> {
    protected table:string;
    protected db;

    constructor(table:string) {
        super()
        this.table = table;
        this.db = db;
    }

    async findMany(query: Partial<T> = {} , option?:Options , search?:string):Promise<T[]>{
        try {
            const data = await this.db(this.table).where(query)

            return data;
        } catch (error) {
            throw error
        }
    }

    async findOne(query:object):Promise<T>{
        try {
            const data = await this.db(this.table)
            
            .where(query).first()
            return data;
        } catch (error) {
            throw error
        }
    }

    async checkData(query: Partial<T>, id: number) :Promise<T> {
        try {
            const data = await this.db(this.table)
            .where(query)
            .andWhereNot({id})
            .first()

            return data
        } catch (error) {
            throw error
        }
    }

    async create(item:T | Partial<T>):Promise<T>{
        try {
            const [id] = await this.db(this.table).insert(item);
            const data = await this.findOne({id});
            return data;
        } catch (error) {
            throw error
        }
    }

    async createMany(items:T[] | string []):Promise<void>{
        try {
            await this.db(this.table).insert(items);
            return;
        } catch (error) {
            throw error
        }
    }

    async update(id:number , item:T | Partial<T>):Promise<T>{
        try {
            await this.db(this.table).where({id}).update(item);
            return  await this.findOne({id});
        } catch (error) {
            throw error
        }
    }

    async updateByUser(user:number , item:T | Partial<T>):Promise<void>{
        try {
            await this.db(this.table).where({user}).update(item);
            return;
        } catch (error) {
            throw error
        }
    }

    async deleteOne(query:Partial<T>):Promise<void> | never{
        try {
            await this.db(this.table).where(query).delete();
            return;
        } catch (error) {
            throw error
        }
    }
}