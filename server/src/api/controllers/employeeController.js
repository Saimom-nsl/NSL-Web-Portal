const User = require("../models/userModel");
const Employee = require("../models/Employee");
const { isErrorFounds, validationMessages } = require("../helpers/errorHelper");
const { signinToken, tokenDecoder } = require("../helpers/TokenCreation");
const { validationResult } = require("express-validator");

const { passwordHashing } = require("../helpers/commonHelper");
const { createSingleEmployee, getSingleEmployee, updateSingleEmployee, getAllEmployee } = require("../services/employeeService");

//employee invitaion
module.exports.employeeInvitation = async(req, res)=> {
    const {email, firstName, lastName, role ,employmentDate} = req.body;
    console.log(email,firstName,lastName,role,employmentDate);
    const errors = validationMessages(validationResult(req).mapped());
    if (isErrorFounds(errors)) return res.status(400).json(errors);
    const newEmployee = await new Employee({firstName, lastName, employmentDate, email});
    await new User({email, employeeId: newEmployee, role}).save();
    await newEmployee.save();
    const token = await signinToken({email, id: newEmployee._id}, "1h");
    const inviteUrl = `${process.env.CLIENT_URL}/api/employee/activation/${token}?email=${email}&id=${newEmployee._id}`;
    const reactUrl = `localhost:3000/activation/${token}?email=${email}&id=${newEmployee._id}`;
    //send email to employee for activation

    res.status(200).json({"message": "Your request has been registered",  "token":reactUrl,})
}

//new api
module.exports.createSingleEmployee = async(req, res)=> {
    try{
        const employee = await createSingleEmployee(req.body);
        return res.status(201).json(employee);
        

    }catch(e){
        // console.log(e);
        return res.status(500).json(e.message || {"message": "something went wrong in employee creation"})
    }
}
//employee activation
module.exports.employeeActivation = async (req, res)=> {
    
    const token = req.params.token;
    const {id, email} = req.query;
    const errors = validationMessages(validationResult(req).mapped());
    if(isErrorFounds(errors)) return res.status(400).json(errors);
    const {password} = req.body;
    const user = await User.findOne({email});
    if(user.isEmailVerified) return res.status(401).json({"message": "Email already verified"});

    try{
        const {email} = await tokenDecoder(token);
        await User.updateOne({email}, {$set: {isEmailVerified: true, password: await passwordHashing(password) }});
        //send email
        res.status(200).json({"message": "Successfully created"})
        
    }catch(e){

            await User.findOneAndDelete({email});
            await Employee.findOneAndDelete({_id:id});
            return res.status(401).json({"message": "Something went wrong. Invites again"});
    }
}

//get employ by id
module.exports.getSingleEmployee = async(req, res)=> {
    try{
        const result = await getSingleEmployee(req.params.id);
        return res.status(200).json(result)

    }catch(e){
        return res.status(500).json(e.message || {"message": "problem in fetching single employee module"})
    }

}
//update employee information
module.exports.updateSingleEmployee = async(req, res)=> {
    
    try{
        const data = {...req.body};
        const updatedEmployee = await updateSingleEmployee(req.params.id, data);
        return res.status(200).json({"message": 'Updated successfully', updatedEmployee})
    }catch(e){
        return res.status(500).json(e.message || {"message": "problem in update single employee module"})
    }
    // const {bloodGroup, sex, address, ...others} = req.body;
    // const id = req.params.id;
    // await Employee.findOneAndUpdate({_id:id}, {$set: {bloodGroup, sex, address, ...others}});
    // return res.status(200).json({"message": "Updated Successfully"});
}

module.exports.deleteSingleEmployee = async(req, res)=> {
    const id = req.params.id;
    const emp = await Employee.findOne({_id: id});
    if(!emp) return res.status(400).json({"message": "Employee not found"});
    await Employee.findOneAndDelete({_id: id})
    return res.status(200).json({"message": "Employee successfully deleted"});
}

//get all employee
module.exports.getAllEmployee = async(req, res)=>{
    try{
        const employees = await getAllEmployee();
        // const {firstName, lastName, middleName} = employees;
        if(req.user.role.name === 'superadmin'){
            return res.status(200).json(employees);
        }
    }catch(e){
        return res.status(500).json(e.message || {"message": "Something went wrong in fetching all employee"})
    }
    const users = await getAllEmployee()
    return res.status(200).json({"users": users});
}