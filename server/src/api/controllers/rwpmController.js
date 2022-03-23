const { validationResult } = require("express-validator");
const { validationMessages, isErrorFounds } = require("../helpers/errorHelper");
const RWPM = require("../models/ResourcePermission");


module.exports.createResourcePermission = async (req, res)=> {
    const {resourceName, individualPermission, rolePermission } = req.body;
    const errors = validationMessages(validationResult(req).mapped());
    if(isErrorFounds(errors)) return res.status(400).json(errors);
    await new RWPM({resourceName, rolePermission, individualPermission}).save(); 
    return res.status(200).json({"message": "Created Successfully"})
}

module.exports.updateSingleResourcePermission = async(req, res)=> {
    const {rolePermission, individualPermission, resourceName} = req.body;
    const id = req.params.id
    const rwpm = await RWPM.findOne({_id: id});
    if(!rwpm) return res.status(400).json({"message": "Not found"});
    await RWPM.findOneAndUpdate({_id: id}, {$set : {resourceName,rolePermission, individualPermission}});
    return res.status(200).json({"message": "Updated successfully"})
}

module.exports.getSinglePermission = async(req, res)=> {
    const {id} = req.params;
    const rwpm = await RWPM.findOne({_id: id});
    if(rwpm) return res.status(200).json(rwpm);
    return res.status(400).json({"message": "Not found"})
}
module.exports.getAllPermission = async(req, res)=> {
    const rwpm = await RWPM.find();
    if(rwpm.length) return res.status(200).json(rwpm);
    return res.status(400).json({"message": "Not found"});
}

module.exports.deleteSinglePermission = async(req, res)=> {
    const {id} = req.params;
    const rwpm = await RWPM.findOne({_id: id});
    if(!rwpm) return res.status(400).json({"message": "Not found"});
    await RWPM.findOneAndDelete({_id: id});
    return res.status(200).json({"message": "Deleted Successfully"});
}