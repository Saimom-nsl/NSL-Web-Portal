const router = require("express").Router();
const { isMasterUser, Authorize, passwordVerification } = require("../middleware/commonMiddlewares");
const { 
    departmentAdd,
    getAllDepts,
    getSingleDepartment, 
    departmentUpdate, 
    departmentDelete 
} = require("../controllers/departmentController");
const { nameValidation } = require("../middleware/validation/commonValidator");

//all dept must be on top
router.route("/departments")
    .get(Authorize, isMasterUser, getAllDepts);


router.route("/:id")
    .get(Authorize, isMasterUser, getSingleDepartment)
    .put(Authorize, isMasterUser, departmentUpdate)
    .delete(Authorize, isMasterUser, passwordVerification ,departmentDelete);
    
router.route("/departmentadd")
    .post(Authorize, isMasterUser, nameValidation("name"),departmentAdd);



module.exports = router;