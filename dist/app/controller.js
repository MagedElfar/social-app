"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Methods = void 0;
const express_1 = require("express");
const token_1 = __importDefault(require("../middleware/token"));
const error_format_1 = require("./../utils/error-format");
var Methods;
(function (Methods) {
    Methods["ALL"] = "all";
    Methods["GET"] = "get";
    Methods["POST"] = "post";
    Methods["PUT"] = "put";
    Methods["DELETE"] = "delete";
    Methods["PATCH"] = "patch";
    Methods["OPTIONS"] = "options";
    Methods["HEAD"] = "head";
})(Methods = exports.Methods || (exports.Methods = {}));
class Controller {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    setRoutes() {
        this.routes.forEach((route) => {
            if (route.auth) {
                route.localMiddleware.unshift(token_1.default.authMiddleware);
            }
            this.router[route.method](route.path, route.localMiddleware, route.handler.bind(this));
        });
        return this.router;
    }
    setResponseError(status, message) {
        return (0, error_format_1.setError)(status, message);
    }
    setResponseSuccess({ res, status, data, message }) {
        return res.status(status).json(Object.assign({ type: "success", message }, data));
    }
}
exports.default = Controller;
