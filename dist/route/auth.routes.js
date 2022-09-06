"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../app/controller");
const validators_1 = require("../middleware/validators");
const check_headers_1 = require("../middleware/check-headers");
const routes = (controller) => {
    const r = [
        {
            path: "/login",
            method: controller_1.Methods.POST,
            handler: controller.loginHandler,
            localMiddleware: [validators_1.loginValidation, validators_1.isValidate],
            auth: false
        },
        {
            path: "/signup",
            method: controller_1.Methods.POST,
            handler: controller.signupHandler,
            localMiddleware: [validators_1.signupValidation, validators_1.isValidate],
            auth: false
        },
        {
            path: "/logout",
            method: controller_1.Methods.POST,
            handler: controller.logoutHandler,
            localMiddleware: [check_headers_1.refreshTokenValidation],
            auth: true
        },
        {
            path: "/refresh",
            method: controller_1.Methods.POST,
            handler: controller.refreshTokenHandler,
            localMiddleware: [check_headers_1.refreshTokenValidation],
            auth: false
        }
    ];
    return r;
};
exports.default = routes;
