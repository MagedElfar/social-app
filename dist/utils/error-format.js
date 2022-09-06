"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setError = exports.requestErrorFormat = exports.formatDbError = void 0;
const formatDbError = (err) => {
    if (err.message)
        console.warn(err.message);
    else
        console.warn(err.sqlMessage);
    return {
        code: 500,
        message: "Database failure",
    };
};
exports.formatDbError = formatDbError;
const requestErrorFormat = (err) => {
    var _a, _b, _c, _d;
    const error = Object.assign({}, { type: "error" }, err.errors && err.message ? {
        message: ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.message) || err.message,
        errors: ((_b = err.response) === null || _b === void 0 ? void 0 : _b.data.message) || err.errors
    } :
        err.errors ? {
            errors: ((_c = err.response) === null || _c === void 0 ? void 0 : _c.data.message) || err.errors
        } : {
            message: ((_d = err.response) === null || _d === void 0 ? void 0 : _d.data.message) || err.message
        });
    return error;
};
exports.requestErrorFormat = requestErrorFormat;
const setError = (status, message) => {
    return { status, message };
};
exports.setError = setError;
