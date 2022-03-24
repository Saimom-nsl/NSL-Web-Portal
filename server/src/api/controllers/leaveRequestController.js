const Project = require("../models/Project");
const User = require("../models/User");
const { isErrorFounds, validationMessages } = require("../helpers/errorHelper");
const { validationResult } = require("express-validator");
const LeaveRequest = require("../models/LeaveRequest");

module.exports.createRequest = async(req, res) => {
    // const {id} = req.user;
    const {leaveType, details, startDate, endDate, applyer} = req.body;
    console.log(req.body);
    const errors = validationMessages(validationResult(req).mapped());
    if(isErrorFounds(errors)) return res.status(400).json(errors);

    const l = await new LeaveRequest({applyer: applyer, leaveType, details, startDate, endDate}).save();
    return res.status(200).json({"message": "Leave Created Successfully"});

}

module.exports.getLeaveRequestForadmin = async(req, res)=> {
    
    if(req.user.role.name === "admin" || req.user.role.name === 'superadmin'){
    
        const leaveRequest = await LeaveRequest.find({});
        if(!leaveRequest.length) return res.status(204).json({"message": "No Data found"})
        return res.status(200).json(leaveRequest);
    }
        const leaveRequest = await LeaveRequest.find({applyer: req.user._id});
        if(!leaveRequest.length) return res.status(204).json({"message": "No Data found"})
        return res.status(200).json(leaveRequest);
}

module.exports.getsingleLeaveReq = async(req, res)=> {
    const {id} = req.params;
    const leave = await LeaveRequest.find({_id: id});
    if(!leave) return res.status(400).json({"message": "No leave request found"});
    return res.status(200).json({leave});
}

module.exports.updateSingleReq = async(req, res)=> {
    const {id} = req.params;
    const {leaveType, details, startDate, endDate, status} = req.body;

    if(req.user.role.name === "admin" || req.user.role.name === 'superadmin'){
        const leave = await LeaveRequest.find({_id: id});
        if(!leave) return res.status(400).json({"message": "No leave request found"});
        await LeaveRequest.findOneAndUpdate({_id:id}, {$set: {leaveType, details, startDate,endDate, status}})
        return res.status(200).json({"message": "Updated Successfully"})
    }
    const leave = await LeaveRequest.findOne({_id: id, applyer: req.user._id});
    if(!leave) return res.status(400).json({"message": "No leave request found"});
    await LeaveRequest.findOneAndUpdate({_id: id, applyer: req.user._id}, {$set: {leaveType, details, startDate, endDate}});
    return res.status(200).json({"message": "Updated Successfully"})
}

module.exports.deleteSingleReq = async(req, res)=> {
    const {id} = req.params;
    if(req.user.role.name === "admin" || req.user.role.name === 'superadmin'){
        const leave = await LeaveRequest.find({_id: id});
        if(!leave) return res.status(400).json({"message": "No leave request found"});
        await LeaveRequest.findOneAndDelete({_id:id})
        return res.status(200).json({"message": "Deleted Success Fully"})
    }
    const leave = await LeaveRequest.findOne({_id: id, applyer: req.user._id});
    if(!leave) return res.status(400).json({"message": "No leave request found"});
    await LeaveRequest.findOneAndDelete({_id: id, applyer: req.user._id});
    return res.status(200).json({"message": "Deleted Success Fully"})

}

