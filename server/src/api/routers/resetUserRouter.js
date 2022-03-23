const router = require("express").Router();

const { 
    changePassword
    } = require("../controllers/userController");
const { passwordValidation } = require("../middleware/validation/commonValidator");

router.route("/:token")
    .post(passwordValidation, changePassword);

module.exports = router;