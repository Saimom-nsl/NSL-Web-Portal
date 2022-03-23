const { validationResult } = require("express-validator");
const { validationMessages, isErrorFounds } = require("../helpers/errorHelper");
const Role = require("../models/Role");

module.exports.createRoll = async(req, res)=> {
    const errors = validationMessages(validationResult(req).mapped());
    if(isErrorFounds(errors)) return res.status(400).json(errors);
    const {name} = req.body;
    await new Role({name}).save();
    return res.status(200).json({"message": "Role Created Successfully"});
}
//get all role
module.exports.getAllRoles = async(req, res)=> {
    const roles = await Role.find();
    return res.status(200).json(roles);
}

//get single role by id
module.exports.getSingleRole = async(req, res)=> {
    const id = req.params.id;
    const role = await Role.findOne({_id: id});
    if(!role) return res.status(400).json({"message": "Not found"});
    return res.status(200).json(role);
}

//update single role
module.exports.updateSingleRole = async(req, res)=> {
    const id = req.params.id;
    const role = await Role.findOne({_id: id});
    if(!role) return res.status(400).json({"message": "Not found"});
    await Role.findOneAndUpdate({_id: id}, {$set: {...req.body}});
    res.status(200).json({"message":"Updated Successfully"})
}

//delete single role
module.exports.deleteSingleRole = async (req, res) => {
    const id = req.params.id;
    const role = await Role.findOne({_id: id});
    if(!role) return res.status(400).json({"message": "Not found"});
    await Role.findOneAndDelete({_id: id});
    res.status(200).json({"message":"Deleted Successfully"})
}