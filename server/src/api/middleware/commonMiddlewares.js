const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Permission = require("../models/ResourcePermission");
const {validationResult} = require("express-validator");
const {validationMessages} = require("../helpers/errorHelper");
const {isErrorFounds} = require("../helpers/errorHelper");
const bcrypt = require("bcrypt");

module.exports.Authorize = async(req, res, next)=>{
    try {
        let token = req.header("Authorization");
        token = token.split(" ")[1].trim();
        // const user = await User.findOne({email: req.body.email}).lean();
        // console.log(user.token);
        // if(user.token !== token) return res.status(401).json({"message": "Authorization denied"})
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        const user = await User.findOne({email: req.user.email}).lean();
        if(user.token !== token) return res.status(401).json({"message": "Authorization denied"})
        next();
    }
    catch(e){
        // console.log(e);
        res.status(401).json({"message": "Authorization failed"});
    }
}


module.exports.isActive = async(req, res, next)=> {
    if(req.user.isActive){

    }else{
        return res.status(400).json({'message': 'Please contact with admin for activate your id'})
    }
}

module.exports.errorsFoundMiddleware = async(req, res, next)=> {
    const errors = validationMessages(validationResult(req).mapped());
    if(isErrorFounds(errors)) return res.status(400).json(errors);
    else next();
}

module.exports.hashedPassword = async(pass)=> {
    return await bcrypt.hash(pass, 10);
}
module.exports.isMasterUser = async(req, res, next)=> {
    let user = await User.findOne({_id: req.user.id}).populate("role", "name");
    if(!user) return res.status(400).json({"message": "Authorization Denied"});
    if(user.role.name === "superadmin" || user.role.name==="admin"){
       next();
    }
    else{
      return res.status(403).json({"message": "Access Forbidden"})
   }
}

module.exports.isEmailAlreadyUsed = async(req, res, next)=> {
        const errors = validationMessages(validationResult(req).mapped());
        if (isErrorFounds(errors)) res.status(400).json(errors);
        const {email} = req.body
        const user = await User.findOne({email});
        if (user) return res.status(400).json({"message" : "Email already used"});
        else {
            next()
        }
            
    }

module.exports.passwordVerification = async(req, res, next)=> {
        const {email} = req.user;
        const {password} = req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare( password, user.password);
        if(!isPasswordCorrect) return res.status(401).json({"message": "Invalid Password"});
        next();
    }


//not used , -> future implementation
module.exports.crudModulePermission = (moduleName)=> {
    return async(req, res, next)=> {
        let user = await User.findOne({_id: req.user.id}).populate("role","name");
        req.user = user;
        const resourcePermission = await Permission.findOne({resourceName: moduleName});
        if(!resourcePermission) return res.status(400).json({"message": "Resource not found"})
        if(!user) return res.status(400).json({"message": "Authorization Denied"});
        console.log(resourcePermission.rolePermission.includes(user.role._id));
        if(resourcePermission.rolePermission.includes(user.role._id) || 
        resourcePermission.individualPermission.includes(user.id)){
           next();
        }
        else{
          return res.status(403).json({"message": "Access Forbidden"})
       }
    }
} 