const router = require("express").Router();
const { isMasterUser, Authorize, passwordVerification } = require("../../middleware/commonMiddlewares");
const { 
    createProject, 
    getAllProject, 
    singleProjectDelete, 
    singleProjectInfoUpdate
} = require("../../controllers/projectController");
const { nameValidation } = require("../../middleware/validation/commonValidator");
const { projectModulePermission } = require("../../middleware/projectMiddlewares");

//all projects must be on top
router.route("/projects")
    .get(Authorize ,getAllProject);


router.route("/addproject")
    .post(Authorize, projectModulePermission, nameValidation("teamName"), createProject)



router.route("/:id")
    .put(Authorize, projectModulePermission, singleProjectInfoUpdate)
    .delete(Authorize, projectModulePermission, passwordVerification ,singleProjectDelete);
    



module.exports = router;