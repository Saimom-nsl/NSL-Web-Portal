const Employee = require("../models/Employee");
const Skills = require("../models/Skills")

module.exports.createSkillForAUser = async(data)=> {
    const result = await new Skills(data).save();
    // await Employee.findOneAndUpdate({_id: data.employeeId}, {$push: {
    //     skills: result
    // }});
    if(result) return result;
    else throw Error("Skill not created")
}

module.exports.deleteSkillForAUser = async(data)=> {
    const skill = await Skills.findOne({_id: data.skillId, employeeId: data.employeeId});
    if(!skill) throw new Error("Skill not founded")
    const result = await Skills.findByIdAndDelete({employeeId: data.employeeId, _id: data.skillId});
    // const empSkill = await Employee.findByIdAndUpdate({_id: employeeId}, {$pop: {
    //     skills: data.skillId
    // }});
    if(!result) throw new Error("Not found skill")
    return "Deleted successfully"
}
module.exports.getSkillDetails = async(data)=> {
    const result = await Skills.find({employeeId: data})
    .select({createdAt: 0, updatedAt: 0, __v:0});
    return result;
}