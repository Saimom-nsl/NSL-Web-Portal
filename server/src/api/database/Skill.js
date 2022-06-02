const Employee = require("../models/Employee");
const Skills = require("../models/Skills")

module.exports.createSkillForAUser = async(data)=> {
    const result = await new Skills(data).save();
    await Employee.findOneAndUpdate({_id: data.empId}, {$set: {
        skills: result
    }});
    if(result) return result;
    else throw Error("Skill not created")
}

module.exports.deleteSkillForAUser = async(data)=> {
    const result = await Skills.findOneAndDelete({empId: data.empId, _id: data.skillId})
    if(!result) throw new Error("Not found skill")
    return "Deleted successfully"
}