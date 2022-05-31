const { createSkillForAUser } = require("../services/skillServices");

module.exports.createSkillForAUser = async(req, res)=> {
    const {skillName, skillLevel, empId} = req.body;
    try{

        const response = await createSkillForAUser({skillLevel, skillName, empId});
    }catch(e){
        return res.status(500).json(e.message || {"message": "Something went wrong in creates skill"});
    }

}