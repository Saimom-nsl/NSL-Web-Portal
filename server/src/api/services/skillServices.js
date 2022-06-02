const { createSkillForAUser, deleteSkillForAUser } = require("../database/Skill")

module.exports.createSkillForAUser = async(data)=> {
    const result = await createSkillForAUser(data);
    return result;
}
module.exports.deleteSkillForAUser = async(data)=> {
    const result = await deleteSkillForAUser(data);
    return result;
}