export default interface Model {
    id?:number | string | undefined;
    created_at?:string;
    updated_at?:string;
    [key: string]: string | any;

}