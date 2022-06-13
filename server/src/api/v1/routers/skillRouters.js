const { createSkillForAUser, deleteSkillForAUser, getSkillForAEmployee } = require("../../controllers/skillController");
const { Authorize, errorsFoundMiddleware } = require("../../middleware/commonMiddlewares");
const { skillCreationValidation } = require("../../middleware/validation/commonValidator");

const router = require("express").Router();

router.route("/")
    .get(Authorize, getSkillForAEmployee)
    .post(Authorize,skillCreationValidation,errorsFoundMiddleware,createSkillForAUser)
    .delete(Authorize, deleteSkillForAUser)
    // .get()

module.exports = router;