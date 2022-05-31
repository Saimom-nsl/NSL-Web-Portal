const ProjectTask = require("../models/ProjectTask");
const Permission = require("../models/ResourcePermission");
const User = require("../models/userModel");

module.exports.projectTaskPermission = async(req, res, next)=>{
    let user = await User.findOne({_id: req.user.id}).populate("role","name");
    req.user = user;
    const resourcePermission = await Permission.findOne({resourceName: "projecttask"});
    if(!resourcePermission) return res.status(400).json({"message": "Resource not found"})
    if(!user) return res.status(400).json({"message": "Authorization Denied"});
    if(resourcePermission.rolePermission.includes(user.role._id) || 
    resourcePermission.individualPermission.includes(user.id) || this.taskPermissionForTeamMember){
       next();
    }
    else{
      return res.status(403).json({"message": "Access Forbidden"})
   }
}

module.exports.taskPermissionForTeamMember = async(req, res, next)=> {
    const id = req.params.id;
    const project = await Project.findOne({ _id: id, members: req.user._id});
    if(!project) return res.status(400).json({"message": "Not found"});
    return next();
}