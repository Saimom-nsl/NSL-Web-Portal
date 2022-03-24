const {body} = require("express-validator");
const { capitalizeFirstLetter } = require("../../helpers/commonHelper");
module.exports.verify_Sign_In_Module = [
    body("email")
    .isEmail().withMessage("Please Provide correct email")
    .toLowerCase()
    .trim(),
    
    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({min: 5}).withMessage("Must be 5 Characters")
]

module.exports.passwordValidation = body("password")
.notEmpty().withMessage("Password is required")
.isLength({min: 5}).withMessage("Must be 5 Characters");

module.exports.emailValidation = body("email")
.isEmail().withMessage("Please Provide correct email")
.toLowerCase()
.trim();

module.exports.firstName = body("firstName")
    .notEmpty().withMessage(`Required`)
    .isLength({min:2}).withMessage(`Name must be two characters at least`)

module.exports.lastName = body("lastName")
    .notEmpty().withMessage(`Required`)
    .isLength({min:2}).withMessage(`Name must be two characters at least`)

module.exports.dateValidation = body("employmentDate").notEmpty().withMessage("Required");

//department
module.exports.nameValidation = function(para){
    return body(para)
    .notEmpty().withMessage("Required")
    .isLength({min:2}).withMessage(`Name must be two characters at least`)

}
//leave
module.exports.leaveAmount = body("leaveAmount")
    .notEmpty().withMessage("Required")
    .isInt().withMessage("Please Enter number")
    .custom((val)=> val > 0).withMessage("Must be greater than 0")

module.exports.leaveCreateValidation = [
    body("startDate").isDate().withMessage("Date Required"),
    body("applyer").isString().withMessage("Required id")
]