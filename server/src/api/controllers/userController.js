require("dotenv").config();
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const Role = require("../models/Role");
const { validationMessages, isErrorFounds } = require("../helpers/errorHelper");//validation msg formatter
const { signinToken, tokenDecoder } = require("../helpers/TokenCreation");
const {passwordHashing} = require("../helpers/commonHelper");
const {loginHandler, changePassword} = require("../services/userService")

// //one time invite
// module.exports.masterUserInvitation = async(req, res)=> {
//     console.log(process.env.permissionrole);
//     const role = await Role.findOne({name: process.env.permissionrole});
//     //if role then search master user 
//     if(!role){
//         return res.status(400).json({message:"There Is no Super Admin"})
//     }
//     const mu = await User.findOne({role: role._id});
//     if(mu) return res.status(403).json({"message": "Request Forbidden"});
//     const errors = validationMessages(validationResult(req).mapped());
//     if (isErrorFounds(errors)) return res.status(400).json(errors);
//     const {email} = req.body;
//     const user = await User.find({email});
//     if(user.length) return res.status(400).json({"message": "Email Already used"});   
//     const newUser = await new User({email, password: await passwordHashing(req.body.password), role: role._id });
//     const token = await signinToken({email}, 300);
//     const responseUrl = `${process.env.CLIENT_URL}/api/user/muactivation/${token}?email=${email}`;
//     //send with email service


//     //sending token to cookies
//     res.cookie("jwtoken", token, {
//         expires: new Date(Date.now() + 25892000000),
//         httpOnly: true
//     });
//     console.log(res.cookie);
//     await newUser.save();
//     return res.status(200).json({"message": "Activation link sent", "url": responseUrl});

// }

// //for muuser creation
// module.exports.masterUserCreation = async(req, res)=> {
//     const token = req.params.token;
//     const {email} = req.query;
//     const user = await User.findOne({email});
//     if(user.isEmailVerified) return res.status(401).json({"message": "Email already verified"});
//     try{
//         const decode = await tokenDecoder(token);
//         await User.findOneAndUpdate({email}, {$set: {
//             isEmailVerified: true}});
//         return res.status(200).json({"message": "Successfully verified"});
//     }catch{
        
//             await User.findOneAndDelete({email});
//             return res.status(401).json({"message": "Activation link expired. Invite again"});
//     }
    
// }


//sign in module 
module.exports.userSignin = async(req, res) => {
    const errors = validationMessages(validationResult(req).mapped());
    if (isErrorFounds(errors)) return res.status(400).json(errors);

    const { email, password } = req.body;
    const loginCredential = {
        email: req.body.email,
        password: req.body.password
    }

    const user = await User.findOne({ email });
    //if user not found
    if (!user) return res.status(400).json({ "message": "User or password not correct" });
    if (!user.isEmailVerified) return res.status(402).json({"message": "Please verify your email"})
    //will be using bcrypt in later
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) return res.status(400).json({ "message": "User or password Incorect" });
    await User.updateOne({_id: user._id}, {$set: {lastLogin: new Date()}})
    //after successfully -> token creation
    const token = await signinToken({
        id: user._id,
        email: user.email,
        lastLoginTime: user.lastLogin
    }, "1d");
    return res.cookie("jwtoken",token).status(200).json({message:"Successfully Login",email:user.email,id:user._id,token:token})
    // return res.status(200).json({ "message": "Successfully login", "nsl_tn": token });
}
module.exports.u_sign = async(req, res)=> {
    const errors = validationMessages(validationResult(req).mapped());
    if (isErrorFounds(errors)) return res.status(400).json(errors);
    try{
        const {email, password} = req.body
        const {user, token} = await loginHandler({email, password});
        return res.status(200).json({"data":user , "token": token});
    }catch(err){
        return res.status(500).json({"message":err.message});
    }
}

module.exports.u_passwordChange = async(req, res)=> {

    // const errors = validationMessages(validationResult(req).mapped());
    // if(isErrorFounds(errors)) return res.status(400).json(errors);
    try{

        const {password} = req.body;
        if(req.user.role.name === "superadmin"){
            if(req.body.email){
                await changePassword(req.body.email, password)
                return res.status(200).message({})
            }
            //change for own password
            const email = req.user.email;
            await changePassword(email, password)
            
        }else{
            //normal user password change
            await changePassword(req.user.email, password);
            return res.status(200).json({"message": "Password change successfully"})
        }
    }catch(e){
        return res.status(500).json(e.message || {"message": "Something wrong in change password"})
    }
}

//user info/role update for role
module.exports.userUpdate = async(req, res)=>{
    const {userid} = req.params;
    const {role} = req.body;
    console.log(typeof roleid);
    await User.findOneAndUpdate({_id:userid}, {$set: {role}});
    return res.status(200).json({"message": "Updated succcessfully"})
}

//password changes invite link for emp
module.exports.forgotPasswordInviteLink = async(req, res)=>{
    const errors = validationMessages(validationResult(req.body))
    if (isErrorFounds(errors)) return res.status(400).json(errors)
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(401).json({"message": "Invalid email"});
    const token = await signinToken({email}, 300); //5 minutes 
    const tokenUrl = `${process.env.CLIENT_URL}/resetpassword/${token}`;
    //send email to notify
    
    //token url going to send in email not in response
    res.status(200).json({"message": "Your request has been registered", "token": tokenUrl})

}

//password confirmation
module.exports.changePassword = async(req, res)=> {  
    try{
        const token = req.params.token;
        const errors = validationMessages(validationResult(req).mapped());
        if(isErrorFounds(errors)) return res.status(400).json(errors);  
        const {password} = req.body;
        const {email} = await tokenDecoder(token);
        await User.findOneAndUpdate({email}, {$set: {password: await passwordHashing(password)}});
        //send email to notify
        res.status(200).json({"message": "Password Updated Successfully"});
        
    }catch(e){
        // console.log(e);
        return res.status(500).json({"message": "Something Went Wrong, Try again", 'errors': e.message});
    }
}

//mu delete -. mu delete


//user delete ->emp delete
module.exports.userDelete = async(req, res)=> {
    const {email: userEmail} = req.body;
    const user = await User.findOne({email: userEmail});
    if(!user) return res.status(400).json({"message": "User not found"});

}