"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../app/controller"));
const error_format_1 = require("../utils/error-format");
class UnHandledRoutes extends controller_1.default {
    constructor() {
        super(...arguments);
        this.path = "";
        this.routes = [];
    }
    static unHandledRoutesHandler(req, res, next) {
        try {
            throw (0, error_format_1.setError)(404, "route not found");
        }
        catch (error) {
            next(error);
        }
    }
    ;
}
exports.default = UnHandledRoutes;
