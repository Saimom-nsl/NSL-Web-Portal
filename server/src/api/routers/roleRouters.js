const router = require("express").Router();
const {nameValidation} = require("../middleware/validation/commonValidator")
const {
    Authorize, 
    isMasterUser,
    passwordVerification
} = require("../middleware/commonMiddlewares");
const { createRoll, getAllRoles, getSingleRole, updateSingleRole, deleteSingleRole } = require("../controllers/roleController");

//all role must be on top
router.route("/roles")
    .get(getAllRoles);

router.route("/:id")
    .get(Authorize, isMasterUser, getSingleRole)
    .put(Authorize, isMasterUser, updateSingleRole)
    .delete(Authorize, isMasterUser, passwordVerification, deleteSingleRole);


router.route("/rolladd")
    .post(Authorize, isMasterUser, nameValidation("name"), createRoll);


module.exports = router;