"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./../config"));
const dbConfiguration = {
    client: "mysql2",
    connection: {
        host: config_1.default.db.host,
        port: config_1.default.db.port,
        user: config_1.default.db.user,
        password: config_1.default.db.password,
        database: config_1.default.db.database
    },
    pool: { min: 0, max: 10 },
    migrations: {
        directory: path_1.default.join(__dirname, "migrations"),
    },
    seeds: {
        directory: path_1.default.join(__dirname, 'seed')
    }
};
Object.freeze(dbConfiguration);
exports.default = dbConfiguration;
