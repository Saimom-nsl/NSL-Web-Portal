const User = require("../models/User");
const Permission = require("../models/ResourcePermission");

module.exports.projectModulePermission = async(req, res, next)=> {
    let user = await User.findOne({_id: req.user.id}).populate("role","name");
    req.user = user;
   //  console.log(user);
    const resourcePermission = await Permission.findOne({resourceName: "project"});
   //  req.permission = resourcePermission;
    if(!resourcePermission) return res.status(400).json({"message": "Resource not found"})
    if(!user) return res.status(400).json({"message": "Authorization Denied"});
    if(resourcePermission.rolePermission.includes(user.role._id) || 
    resourcePermission.individualPermission.includes(user.id)){
       next();
    }
    else{
      return res.status(403).json({"message": "Access Forbidden"})
   }
}
