"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
const routes = [
    new auth_controllers_1.default()
];
exports.default = routes;
