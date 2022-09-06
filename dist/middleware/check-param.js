"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParamId = void 0;
const error_format_1 = require("../utils/error-format");
function checkParamId(req, res, next) {
    try {
        const { id } = req.params;
        if (!id)
            throw (0, error_format_1.setError)(400, "ID is required");
        next();
    }
    catch (error) {
        return next(error);
    }
}
exports.checkParamId = checkParamId;
