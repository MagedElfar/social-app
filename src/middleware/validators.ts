import  {check , validationResult} from "express-validator";
import {Request , Response , NextFunction} from "express"

//signup validation
const signupValidation = [
    check("username").toLowerCase().not().isEmpty().withMessage("username is required"),
    
    check("email").not().isEmpty().isEmail().withMessage("Invalid Email Provided"),
    
    check('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$!%*#?&]{8,}$/).withMessage('Invalid Password Format Provided ( Must be at least 8 characters, 1 number and at least one uppercase character )'),
] 

const updateUserValidation = [
    check("username").toLowerCase().not().isEmpty().withMessage("username is required").custom(value => !/\d/.test(value)).withMessage('Name Must not contain numbers'),
    
    check("email").not().isEmpty().isEmail().withMessage("Invalid Email Provided"),
    
    check('password').isEmpty().withMessage('Password is not allowed field)'),
]


//login validation
const loginValidation = [
    check("email").not().isEmpty().withMessage("Email is required"),
    
    check('password').not().isEmpty().withMessage("password is required"),
]

//add friend validation
const addFriendValidation = [    
    check('receiver').isInt().withMessage("receiver should be integer"),
]

const updateFriendRequest = [
    check("status").toLowerCase().matches(/\b(?:accepted|rejected)\b/).withMessage('Invalid value'),
]


//check validation
const isValidate = (req:Request , res:Response , next:NextFunction) => {
    if(validationResult(req).isEmpty()) {
        next()
    } else {
        const errors = validationResult(req).array().reduce((obj:any , item:any) => {
            if(!obj[item.param]){
                obj[item.param] = [item.msg]
                return obj
            }

            obj[item.param].push(item.msg);
            return obj
        } , {});
        return next({
            status:400,
            message: "Please Correct the following errors before proceeding",
            errors
        })
    }
}

export {
    isValidate , 
    addFriendValidation ,
    signupValidation , 
    loginValidation , 
    updateUserValidation,
    updateFriendRequest
}  