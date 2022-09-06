"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepository = void 0;
const mysqldb_1 = __importDefault(require("../plugins/mysqldb"));
class TokenList {
    constructor(user, token) {
        this.token = token;
        this.user = user;
    }
}
exports.default = TokenList;
class TokenRepository extends mysqldb_1.default {
    constructor() {
        super('tokens_list');
    }
}
exports.TokenRepository = TokenRepository;
