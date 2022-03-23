const { validationResult } = require("express-validator");
const { validationMessages, isErrorFounds } = require("../helpers/errorHelper");
const LeaveType = require("../models/LeaveType");

//create leave by mu ***required {name, amount}
module.exports.createLeaveType = async(req, res)=> {
    const errors = validationMessages(validationResult(req).mapped());
    if(isErrorFounds(errors)) return res.status(400).json(errors);
    await new LeaveType({...req.body}).save();
    return res.status(200).json({"message": "Leave Type Created Successfully"});
}
//get all leaveType by mu ***required {name, amount}
module.exports.getAllLeaveType = async(req, res)=> {
    const leaveTypes = await LeaveType.find();
    return res.status(200).json(leaveTypes);
}

//get single leaveType by mu ***required {id}params
module.exports.getSingleLeave = async(req, res)=> {
    const id = req.params.id;
    const leaveType = await LeaveType.findOne({_id: id});
    if(!leaveType) return res.status(400).json({"message": "Not found"});
    return res.status(200).json(leaveType);
}

//update single leaveType by mu ***required {id} params
module.exports.updateSingleLeave = async(req, res)=> {
    const id = req.params.id;
    const leaveType = await LeaveType.findOne({_id: id});
    if(!leaveType) return res.status(400).json({"message": "Not found"});
    await LeaveType.findOneAndUpdate({_id: id}, {$set: {...req.body}});
    res.status(200).json({"message":"Updated Successfully"})
}

//update single leaveType by mu ***required {id}params
module.exports.deleteSingleLeave = async (req, res) => {
    const id = req.params.id;
    const leaveType = await LeaveType.findOne({_id: id});
    if(!leaveType) return res.status(400).json({"message": "Not found"});
    await LeaveType.findOneAndDelete({_id: id});
    res.status(200).json({"message":"Deleted Successfully"})
}