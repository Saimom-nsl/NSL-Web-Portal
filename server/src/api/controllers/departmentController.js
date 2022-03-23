const { validationResult } = require("express-validator");
const { validationMessages, isErrorFounds } = require("../helpers/errorHelper");
const Department = require("../models/Department");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//department creation by mu ***required fields {name}
module.exports.departmentAdd = async(req, res)=> {
    const errors = validationMessages(validationResult(req).mapped());
    if(isErrorFounds(errors)) return res.status(400).json(errors);

    const {name, details} = req.body;
    await new Department({name, details}).save();
    return res.status(200).json({"message" : "Department Successfully Created"})
}

//get all Department by mu
module.exports.getAllDepts = async(req, res)=> {
    const depts = await Department.find();
    if(!depts) return res.status(400).json({"message": "Not found depts"});
    return res.status(200).json(depts);
}

//getSingle department by mu ***required params {id}
module.exports.getSingleDepartment = async(req, res)=> {
    const id = req.params.id;
    const dept = await Department.find({_id: id});
    if(!dept) return res.status(200).json({"message": "Not found"});
    return res.status(200).json(dept);
}

//department update by mu ***required params {id}
module.exports.departmentUpdate = async(req, res)=> {
    const id = req.params.id;
    const dept = await Department.find({_id: id});
    if(!dept) return res.status(400).json({"message": 'Not Found'})
    await Department.updateOne({_id:id}, {$set: {...req.body}})
    return res.status(200).json({"message": "Updated Successfully"});
    
}

//department delete by mu ***required params {id}
module.exports.departmentDelete = async(req, res)=> {
    const id = req.params.id;
    const dept = await Department.find({_id: id});
    if(!dept) return res.status(400).json({"message": 'Not Found'})
    await Department.deleteOne({_id:id})
    return res.status(200).json({"message": "Deleted Successfully"});
}

