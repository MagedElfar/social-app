import bcrypt from "bcrypt";

export default class Password {

    private password: string;

    constructor (password:string) {
        this.password = password;
    }

    async setPassword():Promise<string> | never{
        try {
            const hashedPassword = await bcrypt.hash(this.password , 10);
            return hashedPassword;
        } catch (error) {
            throw error
        }
    };

    async checkPassword(password:string):Promise<boolean> | never{
        try {
            const matched =  await bcrypt.compare(this.password , password);
            return matched;
        } catch (error) {
            throw error
        }
    }
}
