const {SignIn, changePassword} = require("../database/Users");
const jwt = require("jsonwebtoken");
module.exports.loginHandler = async(data)=> {
    try{
        const user = await SignIn(data);
        const token = await jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: "7d"})
        return {user, token};
    }catch(e){
        throw e
    }
    
}

module.exports.changePassword = async(email, password)=> {
    const response = await changePassword(email, password);
    return response;
}