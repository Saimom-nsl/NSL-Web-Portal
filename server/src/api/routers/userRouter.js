const router = require("express").Router();
const {
    verify_Sign_In_Module, 
    emailValidation
} = require("../middleware/validation/commonValidator")
const { 
    
    userSignin, 
    employeeInvitation,
    masterUserInvitation,
    masterUserCreation,
    forgotPasswordInviteLink,
    userUpdate,
    userDelete,
    } = require("../controllers/userController");
const { Authorize, isMasterUser } = require("../middleware/commonMiddlewares");
// const { Authorize, isMasterUser } = require("../middleware/commonMiddlewares");

router.route("/signin")
    .post(verify_Sign_In_Module,userSignin);

router.route("/forgotpassword")
    .post(emailValidation,forgotPasswordInviteLink);


router.route("/muinvite")
            .post(verify_Sign_In_Module, masterUserInvitation);

//role update
router.route("/:userid")
    .put(Authorize, isMasterUser, userUpdate)
    .delete(Authorize, isMasterUser, userDelete);

router.route("/muactivation/:token")
            .post(masterUserCreation);



module.exports = router;