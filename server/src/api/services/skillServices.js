const { createSkillForAUser } = require("../database/Skill")

module.exports.createSkillForAUser = async(data)=> {
    const result = await createSkillForAUser(data);
    return result;
}