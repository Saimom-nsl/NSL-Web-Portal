const router = require("express").Router();
const { isMasterUser, Authorize } = require("../../middleware/commonMiddlewares");
const {leaveCreateValidation } = require("../../middleware/validation/commonValidator");
const { createRequest, updateSingleReq, deleteSingleReq, getLeaveRequestForadmin, getsingleLeaveReq } = require("../../controllers/leaveRequestController");
const { LeaveReqMiddleware } = require("../../middleware/leaveRequestMiddleware");

//all dept must be on top
router.route("/create")
    .post(Authorize, leaveCreateValidation, LeaveReqMiddleware, createRequest);
    
router.route("/allreq")
    .get(Authorize, LeaveReqMiddleware, getLeaveRequestForadmin);


router.route("/:id")
    .get(Authorize, LeaveReqMiddleware, getsingleLeaveReq)
    .put(Authorize, LeaveReqMiddleware, updateSingleReq)
    .delete(Authorize, LeaveReqMiddleware, deleteSingleReq);
    
    
    



module.exports = router;