"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knexfile_1 = __importDefault(require("./knexfile"));
const knex_1 = require("knex");
class DBConnection {
    constructor() {
        this.db = (0, knex_1.knex)(knexfile_1.default);
    }
    dbVariable() {
        return this.db;
    }
    static getInstance() {
        if (!DBConnection.instance) {
            DBConnection.instance = new DBConnection();
        }
        return DBConnection.instance;
    }
}
const db = DBConnection.getInstance().dbVariable();
db.raw("SELECT VERSION()").then(() => {
    console.log("database is connected successfully");
}).catch((err) => console.error('error connecting: ', err));
exports.default = db;
