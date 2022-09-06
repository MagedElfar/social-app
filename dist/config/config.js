"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({ path: path_1.default.join(__dirname, "..", "..", '.env') });
const conf = {
    port: process.env.PORT || "5000",
    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME
    },
    jwt: {
        secret: process.env.TOKEN_SECRET,
        accessTokenExpire: process.env.Access_Token_Expire || "15m",
        refreshTokenExpire: process.env.Refresh_Token_Expire || "4h"
    },
    wp: {
        url: process.env.SITE_URL,
        apiKey: process.env.WP_API_KEY,
        consumerKey: process.env.Consumer_key,
        consumerSecret: process.env.Consumer_secret
    },
    mailgun: {
        apiKey: process.env.MAIL_API_KEY || " ",
        domain: process.env.DOMAIN || " ",
        sunder: process.env.SENDER || " "
    },
    fireBase: {
        fcmType: process.env.FCM_TYPE,
        fcmProjectId: process.env.FCM_PROJECT_ID,
        fcmPrivateKeyId: process.env.FCM_PRIVATE_KEY_ID,
        fcmClientEmail: process.env.FCM_CLIENT_EMAIL,
        fcmClientId: process.env.FCM_CLIENT_ID,
        fcAuthUrl: process.env.FCM_AUTH_URL,
        fcmTokenUrl: process.env.FCM_TOKEN_URL,
        fcmAuthProviderX509CertUrl: process.env.FCM_AUTH_PROVIDER_X509_CERT_URL,
        fcmClientX509CertUrl: process.env.FCM_CLIENT_X509_CERT_URL,
        fcmPrivateKey: (_a = process.env.FCM_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n')
    }
};
Object.freeze(conf);
exports.default = conf;
