const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { hashedPassword } = require("../middleware/commonMiddlewares");

module.exports.SignIn = async(loginCredentials)=> {
    const {email, password:bodyPassword} = loginCredentials;
    const user = await User.findOne({email}).lean().populate("role");
    if(!user) throw Error("Wrong Credentials");
    if(user.isPasswordChanged === 'true'){
        const verifyPassword = await bcrypt.compare(bodyPassword, user.password);
        if (!verifyPassword) throw new Error("User or password Incorect");
        const userInfo = await User.updateOne({email: user.email}, {$set: {lastLogin: new Date()}}, {new: true});
        const {password, ...rest} = userInfo;
        return rest;
    }else{
        if(bodyPassword === user.password){
            const {password, ...rest} = user;
            return rest;
        }
        throw new Error("User or password Incorect");
    }
}

module.exports.changePassword = async(email,password)=> {
    const user = await User.findOne({email});
    if(!user) throw new Error("User not found");
    await User.findOneAndUpdate({email}, {$set: {password: await hashedPassword(password), isPasswordChanged: true}});
    return "Password Change successfully";
}