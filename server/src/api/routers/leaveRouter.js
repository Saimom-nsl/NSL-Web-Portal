const router = require("express").Router();
const {nameValidation, leaveAmount} = require("../middleware/validation/commonValidator")
const {
    Authorize, 
    isMasterUser,
    passwordVerification
} = require("../middleware/commonMiddlewares");
const { 
    getAllLeaveType, 
    getSingleLeave, 
    updateSingleLeave, 
    deleteSingleLeave, 
    createLeaveType
} = require("../controllers/leaveController");

//get all leavetype must be on top
router.route("/all")
// Authorize, isMasterUser, 
    .get(getAllLeaveType);

router.route("/leavetypeadd")
    .post(Authorize, isMasterUser, nameValidation("name"), leaveAmount, createLeaveType);

router.route("/:id")
    .get(Authorize, isMasterUser, getSingleLeave)
    .put(Authorize, isMasterUser, updateSingleLeave)
    .delete(Authorize, isMasterUser, passwordVerification, deleteSingleLeave);




module.exports = router;