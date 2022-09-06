"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../model/user.model");
class UserServices {
    constructor() {
        this._repository = new user_model_1.UserRepository();
    }
    findOne(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._repository.findOne(item);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._repository.create(data);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserServices;
