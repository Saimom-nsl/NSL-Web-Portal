const Employee = require("../models/Employee");
const User = require("../models/userModel");
const Skills = require("../models/Skills");
module.exports.createdSingleEmployee = async(data)=> {
    const {nslId} = data;
    const employee = await Employee.findOne({nslId});
    if(employee) throw new Error("Already nsl id used");

    const {role,email, ...rest} = data;
    const user = await User.findOne({email});
    if(user) throw new Error("Email already used");
    // console.log(employee);
    const savedEmployee = await new Employee({...rest}).save();
    //using default password
    const savedUser = await new User({email: email, password:"12345", role: role}).save();
    return {savedEmployee, savedUser};
}

module.exports.getSingleEmployee = async(nslId)=> {
    const employee = await Employee.findOne({nslId: nslId}).lean();
    if(!employee) throw new Error("Employee data not found");
    const {__v,createdAt, updatedAt, ...rest} = employee;
    return rest;
}
module.exports.updateSingleEmployee = async(nslId, data) => {
    const employee = await Employee.findOne({nslId}).lean();
    if(!employee) throw new Error("Employee data not found");
    const result = await Employee.findOneAndUpdate({nslId}, {$set: {...data}}, {new: true}).lean();
    const {__v,createdAt, updatedAt, ...rest} = result;
    return rest;

}


module.exports.updateEmployeeSkill = async(skill)=> {
    const updateValue = await new Skills(skill).save();
    return updateValue;
}

module.exports.createSkillsforSingleUser = async(skills)=> {
    const skill = await new Skills(skills).save();

}
module.exports.getAllEmployee = async(query)=> {
    let order = query.order === "desc"? -1:1;
    let sortBy = query.sortBy ? query.sortBy:'_id';
    let limit = query.limit ? parseInt(query.limit):10;
    let skip = parseInt(skip);
    let filters = req.body.filters;
    let args={};
    const employees = await Employee.find()
    .select({updatedAt: 0, createdAt: 0, __v:0})
    .limit(limit)
    .sort({[sortby]: order})
    .skip(skip)
    return employees;
}