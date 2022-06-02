const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { hashedPassword } = require("../middleware/commonMiddlewares");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee")

module.exports.SignIn = async(loginCredentials)=> {
    const {email, password:bodyPassword} = loginCredentials;
    const user = await User.findOne({email}).lean().populate("role");
    if(!user) throw Error("Wrong Credentials");
    // const token = await jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
    
    if(user.isPasswordChanged === true){
        const verifyPassword = await bcrypt.compare(bodyPassword, user.password);
        if (!verifyPassword) throw new Error("User or password Incorect");
        const {password, token:restoken, lastLogin, __v,createdAt, updatedAt, ...rest} = user;
        const token = await jwt.sign(rest, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
        const userInfo = await User.findOneAndUpdate({email: user.email}, {$set: {
            lastLogin: new Date(), token: token
        }}, {new: true}).populate("role").lean();
        console.log("sign in");
        return {...rest, token};
    }else{
        if(bodyPassword === user.password){
            const {password, token:restoken, lastLogin, __v,createdAt, updatedAt, ...rest} = user;
            const token = await jwt.sign(rest, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
            const userInfo = await User.findOneAndUpdate({email: user.email}, {$set: {
            lastLogin: new Date(), token: token
        }}, {new: true}).populate("role").lean();
        console.log("sign in");
            // const {password, ...rest} = user;
            return {...rest, token};
        }
        throw new Error("User or password Incorect");
    }
}

module.exports.getUserInfo = async(data)=> {
    const user = await User.findOne({email: data.email}).populate('role').lean();
    const {password, __v, createdAt, updatedAt, ...rest} = user;
    return rest;
}

module.exports.changePassword = async(email,password)=> {
    const user = await User.findOne({email});
    if(!user) throw new Error("User not found");
    await User.findOneAndUpdate({email}, {$set: {password: await hashedPassword(password),
        isPasswordChanged: true,
        token: ""
    }});
    return "Password Change successfully";
}

module.exports.getAllUser = async(data)=> {
    let order = data.order? data.order: 1 ;
    let sortby = data.sortby? data.sortby: '_id';
    let limit = data.limit ? parseInt(data.limit): 10;
    const users = await User.find()
    .select({password: 0, token: 0, isPasswordChanged: 0, updatedAt: 0, createdAt: 0, __v:0})
    .limit(limit)
    .sort({[sortby]: order})
    return users;
}