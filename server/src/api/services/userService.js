const {SignIn, changePassword, getUserInfo, getAllUser} = require("../database/Users");
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

module.exports.getAllUser = async(data)=> {
    const result = await getAllUser(data);
    return result;
}

module.exports.changePassword = async(email, password)=> {
    const response = await changePassword(email, password);
    return response;
}