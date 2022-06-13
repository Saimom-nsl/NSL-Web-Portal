require("dotenv").config();
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const Role = require("../models/Role");
const { validationMessages, isErrorFounds } = require("../helpers/errorHelper");//validation msg formatter
const { signinToken, tokenDecoder } = require("../helpers/TokenCreation");
const {passwordHashing} = require("../helpers/commonHelper");
const {loginHandler, changePassword, getUserInfo, getAllUser} = require("../services/userService");
const Employee = require("../models/Employee");



module.exports.u_sign = async(req, res)=> {
    const errors = validationMessages(validationResult(req).mapped());
    if (isErrorFounds(errors)) return res.status(400).json(errors);
    try{
        const {email, password} = req.body
        const user = await loginHandler({email, password});
        return res.cookie("token",user.token).status(200).json({"data":user});
    }catch(err){
        return res.status(500).json({"message":err.message});
    }
}

module.exports.getUserInfo = async(req, res)=> {
    try{
        const {employeeId} = req.query;
        console.log(employeeId);
        if(employeeId){
            const user = await User.findOne({employeeId: employeeId}).lean()
            .select({password: 0, __v:0, createdAt: 0, updatedAt:0, token: 0});
            if(!user) return res.status(400).json("Data not found");
            return res.status(200).json(user);
        } else{

            const user = await getUserInfo(req.user);
            return res.status(200).json({'data': user});
        }
    }catch(e){
        return res.status(500).json({"message": "User data not found"})
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
            await changePassword(email, password);
            return res.status(200).json({"message": "Password change successfully"})

            
        }else{
            //normal user password change
            await changePassword(req.user.email, password);
            return res.status(200).json({"message": "Password change successfully"})
        }
    }catch(e){
        return res.status(500).json(e.message || {"message": "Something wrong in change password"})
    }
}

module.exports.getAllUser = async(req, res)=> {
    try{
        const result = await getAllUser(req.query);
        return res.status(200).json(result);
    }catch(e){
        return res.status(500).json(e.message|| {"message": "Data not dound"});

    }

}
//user info/role update for role
module.exports.userUpdate = async(req, res)=>{
    const {userId} = req.query;
    const user = User.findOne({_id: userId});
    if(!user) return res.status(400).json("User Not Found");
    const result = await User.findOneAndUpdate({_id: userId}, {$set: {...req.body, token: ""}}, {new: true});
    return res.status(200).json({"message": "Updated succcessfully", "data": result})
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