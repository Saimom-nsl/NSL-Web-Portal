const router = require("express").Router();
const { crudModulePermission, Authorize, isEmailAlreadyUsed, passwordVerification } = require("../middleware/commonMiddlewares");
const {
    employeeInvitation, 
    employeeActivation, 
    getAllEmployee, 
    getSingleEmployee, 
    updateSingleEmployee,
    deleteSingleEmployee
} = require("../controllers/employeeController");
const { 
    dateValidation, 
    firstName, 
    lastName, 
    passwordValidation 
} = require("../middleware/validation/commonValidator");
const { employeeModulePermission } = require("../middleware/employeeMiddleware");

router.route("/employees").
    get(Authorize, employeeModulePermission, getAllEmployee);
    
router.route("/employeeinvites")
        .post(Authorize, employeeModulePermission, firstName, lastName,
        dateValidation,isEmailAlreadyUsed ,employeeInvitation);

router.route("/:id")
    .get(Authorize, employeeModulePermission, getSingleEmployee)
    .put(Authorize, employeeModulePermission, updateSingleEmployee)
    .delete(Authorize, employeeModulePermission, passwordVerification, deleteSingleEmployee)


router.route("/activation/:token")
    .post(passwordValidation, employeeActivation)


module.exports = router;