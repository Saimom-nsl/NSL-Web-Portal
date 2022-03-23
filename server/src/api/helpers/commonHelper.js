const bcrypt = require("bcrypt");

module.exports.passwordHashing = async(password) =>{
    return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
}

module.exports.capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
}
