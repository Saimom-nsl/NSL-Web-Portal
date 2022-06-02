const { createSkillForAUser, deleteSkillForAUser } = require("../services/skillServices");

module.exports.createSkillForAUser = async(req, res)=> {
    const {skillName, skillLevel, empId} = req.body;
    try{
        if(req.user.role.name === "superadmin" || req.user.role.name === "admin"){
            const response = await createSkillForAUser({skillLevel, skillName, empId});
            return res.status(200).json({"message": "Created skill successfully"})
        }else{
            return res.status(400).json({"message": "You are not authorize create employee skill"});
        }
    }catch(e){
        return res.status(500).json(e.message || {"message": "Something went wrong in create skill"});
    }

}

module.exports.deleteSkillForAUser = async(req, res)=> {
    try{const {empId, skillId} = req.body;
    if(req.user.role.name === "superadmin" || req.user.role.name === "admin"){

    const skill = await deleteSkillForAUser({empId, skillId})
    return res.status(200).json({"message": "Skill deleted successfully"})
    }else{
        return res.status(400).json({"message": "You are not authorize create employee skill"});
    }
    }catch(e){

        return res.status(500).json(e.message || {"message": "Deleted not successfully"})
    }

}