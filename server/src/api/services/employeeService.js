const { createdSingleEmployee, getSingleEmployee, updateSingleEmployee, getAllEmployee } = require("../database/Employee");
const Employee = require("../models/Employee");
module.exports.createSingleEmployee = async(data)=> {

    const result = await createdSingleEmployee(data);
    if(!result) throw new Error("Single employee creation not possible");
    return result;
}
module.exports.getSingleEmployee = async(id)=> {
    const nslId = id;
    const result = await getSingleEmployee(nslId);
    return result;
}
module.exports.updateSingleEmployee = async(id, data)=> {
    const result = await updateSingleEmployee(id, data);
    return result;
}

module.exports.getAllEmployee = async()=> {
    const employees = await getAllEmployee();
    if(!employees.length) throw new Error("No data found")
    // if(!employees.length)
    return employees;
}