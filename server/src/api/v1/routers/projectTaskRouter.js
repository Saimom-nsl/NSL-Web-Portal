const router = require("express").Router();
const { createProjectTask, deleteProjectTask, updateProjectTaskInfo } = require("../../controllers/projectTaskController");
const { Authorize } = require("../../middleware/commonMiddlewares");
const { projectTaskPermission, taskPermissionForTeamMember } = require("../../middleware/projectTaskMiddleware");
const { nameValidation } = require("../../middleware/validation/commonValidator");


router.route("/:pid/tasks")


router.route("/:pid/addtask")
    .post(Authorize, projectTaskPermission, nameValidation("taskName"), createProjectTask);


router.route("/:pid/:taskid")
    .put(Authorize,projectTaskPermission, updateProjectTaskInfo)
    .delete(Authorize, projectTaskPermission, deleteProjectTask)

module.exports = router;