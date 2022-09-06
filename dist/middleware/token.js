"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const error_format_1 = require("../utils/error-format");
const config_1 = __importDefault(require("./../config"));
class Token {
    constructor() {
        this.authStrategy = new passport_jwt_1.Strategy({
            secretOrKey: config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.jwt.secret,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        }, (payload, done) => {
            return done(null, payload);
        });
    }
    static generateInstance() {
        if (!Token.instance)
            Token.instance = new (Token);
        return Token.instance;
    }
    authMiddleware(req, res, next) {
        passport_1.default.authenticate("jwt", { session: false }, (error, decryptToken, jwtError) => {
            if (error || jwtError) {
                return next((0, error_format_1.setError)(401, "ACCESS_TOKEN_EXPIRED"));
            }
            req.user = decryptToken;
            next();
        })(req, res, next);
    }
    ;
}
exports.Token = Token;
const token = Token.generateInstance();
const authStrategy = token.authStrategy;
passport_1.default.use(authStrategy);
exports.default = token;
