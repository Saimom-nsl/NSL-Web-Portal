const router = require("express").Router();
const { isMasterUser, Authorize } = require("../middleware/commonMiddlewares");
const { 

} = require("../controllers/departmentController");
const { nameValidation } = require("../middleware/validation/commonValidator");
const { createLeaveRequest } = require("../controllers/leaveRequestController");

//all dept must be on top
router.route("/req")
    .post(Authorize, createLeaveRequest);


router.route("/:id")
    
    
router.route("/")
    



module.exports = router;