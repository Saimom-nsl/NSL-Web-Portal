const { createSkillForAUser, deleteSkillForAUser, getSkillDetails } = require("../services/skillServices");

module.exports.createSkillForAUser = async(req, res)=> {
    const {skillName, skillLevel, employeeId} = req.body;
    try{
        if(req.user.role.name === "superadmin" || req.user.employeeId === req.body.employeeId){
            const response = await createSkillForAUser({skillLevel, skillName, employeeId});
            return res.status(200).json({"message": "Created skill successfully"})
        }else{
            return res.status(400).json({"message": "You are not authorize create employee skill"});
        }
    }catch(e){
        return res.status(500).json(e.message || {"message": "Something went wrong in create skill"});
    }

}

module.exports.deleteSkillForAUser = async(req, res)=> {
    try{
    const {employeeId, skillId} = req.body;

    if(req.user.role.name === "superadmin" || req.user.employeeId === employeeId){
    const skill = await deleteSkillForAUser({employeeId, skillId})
    return res.status(200).json({"message": "Skill deleted successfully"})
    }else{
        return res.status(400).json({"message": "You are not authorize delete employee skill"});
    }
    }catch(e){

        return res.status(500).json(e.message || {"message": "Deleted not successfully"})
    }

}

module.exports.getSkillForAEmployee = async(req, res)=> {
    try{

        const {employeeId} = req.query;
        const response = await getSkillDetails(employeeId);
        if(!response.length) return res.status(400).json("skill not found")
         return res.status(200).json({"data": response});
        

     }catch(e){
        return res.status(500).json(e.message || {"message": "Data Not found"})
    }
}