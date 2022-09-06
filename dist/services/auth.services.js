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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_format_1 = require("../utils/error-format");
const token_1 = __importDefault(require("../middleware/token"));
const password_1 = __importDefault(require("../utils/password"));
const token_services_1 = __importDefault(require("./token.services"));
const user_services_1 = __importDefault(require("./user.services"));
class AuthServices {
    constructor() {
        this.service = new user_services_1.default;
        this.tokenSrv = new token_services_1.default();
        this.token = token_1.default;
    }
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.service.findOne({ email });
                const pass = new password_1.default(password);
                if (!user)
                    throw (0, error_format_1.setError)(400, "Invalid Email or Password");
                const isMatched = yield (pass === null || pass === void 0 ? void 0 : pass.checkPassword(user.password));
                if (!isMatched)
                    throw (0, error_format_1.setError)(400, "Invalid Email or Password");
                const { password: p } = user, others = __rest(user, ["password"]);
                const token = this.tokenSrv.generateAccessToken({ id: user.id });
                const refreshToken = this.tokenSrv.generateRefreshToken({ id: user.id });
                yield this.tokenSrv.create({
                    token: refreshToken,
                    user: user.id,
                });
                return {
                    user: others,
                    token,
                    refreshToken
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.service.findOne({ email: data.email });
                if (user)
                    throw (0, error_format_1.setError)(400, "email is already exist");
                user = yield this.service.create(data);
                const token = this.tokenSrv.generateAccessToken({ id: user.id });
                const refreshToken = this.tokenSrv.generateRefreshToken({ id: user.id });
                yield this.tokenSrv.create({
                    token: refreshToken,
                    user: user.id,
                });
                const { password: pass } = user, others = __rest(user, ["password"]);
                return {
                    user: others,
                    token,
                    refreshToken
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    logout(token, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const t = yield this.tokenSrv.findOne({ token, user });
                if (!t)
                    throw (0, error_format_1.setError)(404, "token not found");
                yield this.tokenSrv.deleteItem({ token });
            }
            catch (error) {
                throw error;
            }
        });
    }
    refreshToken(RToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const t = yield this.tokenSrv.findOne({ token: RToken });
                if (!t)
                    throw (0, error_format_1.setError)(401, "Your session has expired, please login");
                const { id } = yield this.tokenSrv.verifyToken(RToken, 401, "Your session has expired, please login");
                const token = this.tokenSrv.generateAccessToken({ id });
                const refreshToken = this.tokenSrv.generateRefreshToken({ id });
                yield this.tokenSrv.update(+t.id, { token: refreshToken });
                return {
                    token,
                    refreshToken
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = AuthServices;
