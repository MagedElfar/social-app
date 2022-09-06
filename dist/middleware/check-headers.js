"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restPasswordHeaderValidation = exports.remainderHeaderValidation = exports.refreshTokenValidation = void 0;
const error_format_1 = require("../utils/error-format");
function refreshTokenValidation(req, res, next) {
    try {
        if (!req.headers["x-refresh-token"])
            throw (0, error_format_1.setError)(400, "refreshToken is required");
        next();
    }
    catch (error) {
        return next(error);
    }
}
exports.refreshTokenValidation = refreshTokenValidation;
function remainderHeaderValidation(req, res, next) {
    try {
        if (!req.headers["x-registration-token"])
            throw (0, error_format_1.setError)(400, "registration token is required");
        next();
    }
    catch (error) {
        return next(error);
    }
}
exports.remainderHeaderValidation = remainderHeaderValidation;
function restPasswordHeaderValidation(req, res, next) {
    try {
        if (!req.headers["x-token"])
            throw (0, error_format_1.setError)(400, "token is required");
        next();
    }
    catch (error) {
        return next(error);
    }
}
exports.restPasswordHeaderValidation = restPasswordHeaderValidation;
