const router = require("express").Router();
const {
    verify_Sign_In_Module, 
    emailValidation,
    passwordValidation
} = require("../../middleware/validation/commonValidator")
const { 
    forgotPasswordInviteLink,
    u_sign,
    changePassword,
    u_passwordChange,
    getUserInfo,
    getAllUser,
    } = require("../../controllers/userController");
const { Authorize, isMasterUser, errorsFoundMiddleware } = require("../../middleware/commonMiddlewares");

router.route("/signin")
    .post(verify_Sign_In_Module,u_sign);
router.route("/userinfo").get(Authorize,getUserInfo);

router.route("/alluser").get(Authorize, getAllUser)


router.route("/changepassword")
    .put(Authorize,passwordValidation,errorsFoundMiddleware,u_passwordChange);

router.route("/forgotpassword")
    .post(emailValidation,forgotPasswordInviteLink);



module.exports = router;