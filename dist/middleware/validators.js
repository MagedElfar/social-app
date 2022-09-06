"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onBoardValidation = exports.updateUserValidation = exports.restPasswordValidation = exports.checkCodeValidation = exports.sendMailValidation = exports.loginValidation = exports.signupValidation = exports.analyticsValidation = exports.remaindersValidation = exports.isValidate = void 0;
const express_validator_1 = require("express-validator");
const signupValidation = [
    (0, express_validator_1.check)("username").toLowerCase().not().isEmpty().withMessage("username is required").custom(value => !/\d/.test(value)).withMessage('Name Must not contain numbers'),
    (0, express_validator_1.check)("email").not().isEmpty().isEmail().withMessage("Invalid Email Provided"),
    (0, express_validator_1.check)('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$!%*#?&]{8,}$/).withMessage('Invalid Password Format Provided ( Must be at least 8 characters, 1 number and at least one uppercase character )'),
    (0, express_validator_1.check)('purchase_date').toDate().isISO8601().withMessage("Invalid Purchase Date Format Provided"),
    (0, express_validator_1.check)('address').optional().matches(/^[A-Za-z0-9 ]+$/).withMessage("Address Must not contain special characters"),
    (0, express_validator_1.check)('insurance_id').optional().isLength({ min: 3 }).withMessage("Invalid Insurance ID Provided")
];
exports.signupValidation = signupValidation;
const loginValidation = [
    (0, express_validator_1.check)("email").not().isEmpty().withMessage("Email is required"),
    (0, express_validator_1.check)('password').not().isEmpty().withMessage("password is required"),
];
exports.loginValidation = loginValidation;
const sendMailValidation = [
    (0, express_validator_1.check)("email").not().isEmpty().withMessage("Email is required"),
];
exports.sendMailValidation = sendMailValidation;
const checkCodeValidation = [
    (0, express_validator_1.check)("code").not().isEmpty().withMessage("code is required"),
];
exports.checkCodeValidation = checkCodeValidation;
const restPasswordValidation = [
    (0, express_validator_1.check)("password").not().isEmpty().withMessage("password is required"),
    (0, express_validator_1.check)('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$!%*#?&]{8,}$/).withMessage('Invalid Password Format Provided ( Must be at least 8 characters, 1 number and at least one uppercase character )')
];
exports.restPasswordValidation = restPasswordValidation;
const updateUserValidation = [
    (0, express_validator_1.check)('purchase_date').toDate().isISO8601().withMessage("Invalid Purchase Date Format Provided"),
    (0, express_validator_1.check)('address').optional().matches(/^[A-Za-z0-9 ]+$/).withMessage("Address Must not contain special characters"),
    (0, express_validator_1.check)('insurance_id').optional().isLength({ min: 3 }).withMessage("Invalid Insurance ID Provided")
];
exports.updateUserValidation = updateUserValidation;
const onBoardValidation = [
    (0, express_validator_1.check)("teeth_condition").toLowerCase().matches(/\b(?:healthy|sensitive|gum bleeding|yellowish)\b/).withMessage('Invalid Choice Selected'),
    (0, express_validator_1.check)("periodontal_condition").toLowerCase().matches(/\b(?:healthy|bleeding|abscess|abscess + bleeding)\b/).withMessage("Invalid Choice Selected"),
    (0, express_validator_1.check)('plague').toLowerCase().matches(/\b(?:healthy|plague)\b/).withMessage('Invalid Choice Selected')
];
exports.onBoardValidation = onBoardValidation;
const analyticsValidation = [
    (0, express_validator_1.check)("date").not().isEmpty().toDate().isISO8601().withMessage('Invalid Date Provided'),
    (0, express_validator_1.check)("brushing_time").not().isEmpty().isInt().withMessage("Invalid Brushing Time Provided, it should be an integer"),
    (0, express_validator_1.check)("coverage").not().isEmpty().isInt().withMessage("Invalid Coverage Provided, it should be an integer"),
    (0, express_validator_1.check)("pressure").not().isEmpty().isInt().withMessage("Invalid Pressure Provided, it should be an integer")
];
exports.analyticsValidation = analyticsValidation;
const remaindersValidation = [
    (0, express_validator_1.check)("date_from").if((value, { req }) => { var _a; return !((_a = req.body) === null || _a === void 0 ? void 0 : _a.recurring); }).toDate().isISO8601().withMessage('Invalid Date Provided').custom(value => {
        const date = new Date();
        if (date.getTime() > value.getTime()) {
            return false;
        }
        return true;
    }).withMessage("Date Should be greater than today"),
    (0, express_validator_1.check)("date_to").if((value, { req }) => { var _a; return !((_a = req.body) === null || _a === void 0 ? void 0 : _a.recurring); }).toDate().isISO8601().withMessage('Invalid Date Provided').custom((value, { req }) => {
        var _a;
        if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.date_from.getTime()) > value.getTime()) {
            return false;
        }
        return true;
    }).withMessage("Date should be greater than From Date"),
    (0, express_validator_1.check)("date_from").if((value, { req }) => { var _a; return (_a = req.body) === null || _a === void 0 ? void 0 : _a.recurring; }).isEmpty().withMessage("date_from (only available when recurring = 0)"),
    (0, express_validator_1.check)("date_to").if((value, { req }) => { var _a; return (_a = req.body) === null || _a === void 0 ? void 0 : _a.recurring; }).isEmpty().withMessage("date_to (only available when recurring = 0)"),
    (0, express_validator_1.check)("recurring").isBoolean().withMessage("Recurring should be 0 or 1"),
    (0, express_validator_1.check)("interval").if((value, { req }) => { var _a; return (_a = req.body) === null || _a === void 0 ? void 0 : _a.recurring; }).isInt().withMessage("Invalid Interval Provided, it should be an integer"),
    (0, express_validator_1.check)("interval").if((value, { req }) => { var _a; return !((_a = req.body) === null || _a === void 0 ? void 0 : _a.recurring); }).isEmpty().withMessage("interval (only available when recurring = 1)"),
];
exports.remaindersValidation = remaindersValidation;
const isValidate = (req, res, next) => {
    try {
        if ((0, express_validator_1.validationResult)(req).isEmpty()) {
            next();
        }
        else {
            const errors = (0, express_validator_1.validationResult)(req).array().reduce((obj, item) => {
                if (!obj[item.param]) {
                    obj[item.param] = [item.msg];
                    return obj;
                }
                obj[item.param].push(item.msg);
                return obj;
            }, {});
            throw ({
                status: 400,
                message: "Please Correct the following errors before proceeding",
                errors
            });
        }
    }
    catch (error) {
        return next(error);
    }
};
exports.isValidate = isValidate;
