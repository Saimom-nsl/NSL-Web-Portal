const User = require("../models/userModel");
const Permission = require("../models/ResourcePermission");

module.exports.employeeModulePermission = async(req, res, next)=> {
    let user = await User.findOne({_id: req.user.id}).populate("role","name");
    const resourcePermission = await Permission.findOne({resourceName: "employee"});
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