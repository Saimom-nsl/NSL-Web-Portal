const {SignIn, changePassword, getUserInfo} = require("../database/Users");
module.exports.loginHandler = async(data)=> {
    try{
        const user = await SignIn(data);
        return user;
    }catch(e){
        throw e
    }
    
}

module.exports.getUserInfo = async(data)=> {
    return await getUserInfo(data)
}

module.exports.changePassword = async(email, password)=> {
    const response = await changePassword(email, password);
    return response;
}