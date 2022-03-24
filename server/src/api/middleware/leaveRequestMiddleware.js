const User = require("../models/User");
module.exports.LeaveReqMiddleware = async(req, res, next)=> {
    let user = await User.findOne({_id: req.user.id}).populate("role","name");
    req.user = user;
    next();
}