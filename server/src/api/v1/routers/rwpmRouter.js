const router = require("express").Router();
const { createResourcePermission, 
        getAllPermission, getSinglePermission, 
        updateSingleResourcePermission, 
        deleteSinglePermission 
} = require("../../controllers/rwpmController");
const {Authorize, isMasterUser, passwordVerification} = require("../../middleware/commonMiddlewares");
const { nameValidation } = require("../../middleware/validation/commonValidator");


router.route("/allpermission")
        .get(Authorize, isMasterUser, getAllPermission);

router.route("/addrwpm")
        .post( Authorize, isMasterUser, nameValidation("resourceName") ,createResourcePermission);

router.route("/:id")
        .get(Authorize, isMasterUser, getSinglePermission)
        .put(Authorize, isMasterUser, updateSingleResourcePermission)
        .delete(Authorize, isMasterUser, passwordVerification, deleteSinglePermission);

module.exports = router;