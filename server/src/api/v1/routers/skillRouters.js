const { createSkillForAUser } = require("../../controllers/skillController");
const { Authorize, errorsFoundMiddleware } = require("../../middleware/commonMiddlewares");
const { skillCreationValidation } = require("../../middleware/validation/commonValidator");

const router = require("express").Router();

router.route("/")
    .post(Authorize,skillCreationValidation,errorsFoundMiddleware,createSkillForAUser)
    // .get()

module.exports = router;