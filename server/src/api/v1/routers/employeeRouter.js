const router = require("express").Router();
const { crudModulePermission, Authorize, isEmailAlreadyUsed, passwordVerification, errorsFoundMiddleware } = require("../../middleware/commonMiddlewares");
const {
    employeeInvitation, 
    employeeActivation, 
    getAllEmployee, 
    getSingleEmployee, 
    updateSingleEmployee,
    deleteSingleEmployee,
    createSingleEmployee
} = require("../../controllers/employeeController");
const { 
    dateValidation, 
    firstName, 
    lastName, 
    passwordValidation 
} = require("../../middleware/validation/commonValidator");
const { employeeModulePermission } = require("../../middleware/employeeMiddleware");
const { employeeCreationValidation } = require("../../middleware/validation/employeeValitor");


router.route("/").post(employeeCreationValidation, errorsFoundMiddleware, createSingleEmployee)
router.route("/all").get(getAllEmployee)

router.route("/:id")
    .get(Authorize,getSingleEmployee)
    .put(Authorize,updateSingleEmployee)
    .delete(Authorize, employeeModulePermission, passwordVerification, deleteSingleEmployee)

router.route("/activation/:token")
    .post(passwordValidation, employeeActivation)


module.exports = router;