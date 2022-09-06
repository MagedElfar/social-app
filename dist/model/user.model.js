"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const mysqldb_1 = __importDefault(require("../plugins/mysqldb"));
class UserRepository extends mysqldb_1.default {
    constructor() {
        super('users');
    }
}
exports.UserRepository = UserRepository;
