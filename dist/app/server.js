"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const path_1 = __importDefault(require("path"));
const error_format_1 = require("../utils/error-format");
const config_1 = __importDefault(require("../config"));
const undefined_routs_controllers_1 = __importDefault(require("../controllers/undefined-routs.controllers"));
class Server {
    constructor(app) {
        this.port = config_1.default.port;
        this.app = app;
        this.router = (0, express_1.Router)();
    }
    run() {
        this.app.listen(this.port, () => {
            console.log(`server is running on port ${this.port}...`);
        });
    }
    loadMiddleware(middlewares) {
        middlewares.forEach((mid) => {
            this.app.use(mid);
        });
        this.app.use("/media", express_1.default.static(path_1.default.join(__dirname, "..", "public", "media")));
        this.app.get("/", (req, res) => {
            res.send("app backend server");
        });
    }
    setRoutes(controllers) {
        controllers.forEach((controller) => {
            this.router.use(controller.path, controller.setRoutes());
        });
        this.app.use('/api', this.router);
        this.app.use('*', undefined_routs_controllers_1.default.unHandledRoutesHandler);
    }
    errorHandler() {
        this.app.use((err, req, res, next) => {
            var _a;
            const error = (0, error_format_1.requestErrorFormat)(err);
            res.status(err.status || ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.code) || 500).json(error);
        });
    }
}
exports.default = Server;
