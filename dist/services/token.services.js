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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("./../app/services"));
const token_model_1 = require("../model/token.model");
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const error_format_1 = require("../utils/error-format");
class TokenServices extends services_1.default {
    constructor() {
        super(...arguments);
        this._repository = new token_model_1.TokenRepository();
    }
    findOne(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this._repository.findOne(item);
                return token;
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateToken(data) {
        const token = (0, jsonwebtoken_1.sign)(data, config_1.default.jwt.secret, {
            expiresIn: "15m"
        });
        return token;
    }
    generateAccessToken(data) {
        const token = (0, jsonwebtoken_1.sign)(data, config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.jwt.secret, { expiresIn: config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.jwt.accessTokenExpire });
        return token;
    }
    generateRefreshToken(data) {
        const token = (0, jsonwebtoken_1.sign)(data, config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.jwt.secret, { expiresIn: config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.jwt.accessTokenExpire });
        return token;
    }
    verifyToken(token, code, message) {
        let error;
        let data;
        return new Promise((resolve, reject) => {
            (0, jsonwebtoken_1.verify)(token, config_1.default.jwt.secret, (err, decodedData) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    error = err;
                    yield this.deleteItem({ token });
                    return;
                }
                data = decodedData;
            }));
            if (error)
                return reject((0, error_format_1.setError)(code, message));
            return resolve(data);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this._repository.create(data);
                return token;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._repository.update(id, data);
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteItem(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._repository.deleteOne(query);
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = TokenServices;
