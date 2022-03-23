const LeaveRequest = require("../models/LeaveRequest");
const Project = require("../models/Project");
const User = require("../models/User");

module.exports.createRequest = async(req, res) => {
    const {id} = req.user;
    const {leaveType, details, startDate, endDate} = req.body;
}

module.exports.createLeaveRequest = async(req, res)=>{

    const {id: applyer} = req.user;
    const {leaveType, details, startDate, endDate} = req.body;
    const user = await User.findOne({_id: applyer}).populate("role", "name");
    if(user.role != "tl" || user.role != "admin"){
        const projects = await Project.find({members:applyer});
        console.log(projects);
        return res.status(200).json({"message":"tl member"});

    }else{
        const projects = await Project.find({members:applyer});
        console.log(projects);
        return res.status(200).json({"message": "Others members"});
    }

}

module.exports.approvedRequestByAdmin = async(req, res)=> {

}