const Skills = require("../models/Skills")

module.exports.createSkillForAUser = async(data)=> {
    const result = await new Skills(data).save();
    if(result) return result;
    else throw Error("Skill not created")
}