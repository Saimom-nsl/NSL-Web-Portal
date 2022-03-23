const jwt = require("jsonwebtoken");
//user token creation

module.exports.signinToken = async(info, expires=process.env.jwt_expires) => {
    const token =  jwt.sign(info, process.env.JWT_SECRET_KEY,
        {
            expiresIn: expires
        })
    return token;
}
module.exports.tokenDecoder = (token) => {
    
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
    return decode;
}

