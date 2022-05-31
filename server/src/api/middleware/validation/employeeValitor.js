const { body } = require("express-validator");

module.exports.employeeCreationValidation = [
    body("firstName").notEmpty().withMessage("Required"),
    body("lastName").notEmpty().withMessage("Required"),
    body("nslId").notEmpty().withMessage("Required"),
    body("email").notEmpty().withMessage("Required")
]