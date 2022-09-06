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
const controller_1 = __importDefault(require("../app/controller"));
const auth_routes_1 = __importDefault(require("../route/auth.routes"));
const auth_services_1 = __importDefault(require("../services/auth.services"));
class AuthController extends controller_1.default {
    constructor() {
        super(...arguments);
        this.path = "";
        this.routes = (0, auth_routes_1.default)(this);
        this.authServices = new auth_services_1.default();
    }
    loginHandler(req, res, next) {
        const _super = Object.create(null, {
            setResponseSuccess: { get: () => super.setResponseSuccess }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.authServices.login(req.body);
                _super.setResponseSuccess.call(this, { res, status: 200, data });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    signupHandler(req, res, next) {
        const _super = Object.create(null, {
            setResponseSuccess: { get: () => super.setResponseSuccess }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.authServices.signup(req.body);
                _super.setResponseSuccess.call(this, { res, status: 201, data });
            }
            catch (error) {
                next(error);
            }
        });
    }
    logoutHandler(req, res, next) {
        const _super = Object.create(null, {
            setResponseSuccess: { get: () => super.setResponseSuccess }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authServices.logout(req.headers["x-refresh-token"].toString(), (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                _super.setResponseSuccess.call(this, { res, status: 200 });
            }
            catch (error) {
                next(error);
            }
        });
    }
    refreshTokenHandler(req, res, next) {
        const _super = Object.create(null, {
            setResponseSuccess: { get: () => super.setResponseSuccess }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield this.authServices.refreshToken(req.headers["x-refresh-token"].toString());
                _super.setResponseSuccess.call(this, { res, status: 200, data: tokens });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = AuthController;
