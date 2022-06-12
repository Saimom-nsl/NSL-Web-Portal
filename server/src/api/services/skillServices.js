const { createSkillForAUser, deleteSkillForAUser, getSkillDetails } = require("../database/Skill")

module.exports.createSkillForAUser = async(data)=> {
    const result = await createSkillForAUser(data);
    return result;
}
module.exports.deleteSkillForAUser = async(data)=> {
    const result = await deleteSkillForAUser(data);
    return result;
}
module.exports.getSkillDetails = async(data)=> {
    const result = await getSkillDetails(data);
    return result;
}
