const { validationResult } = require("express-validator");
const { validationMessages, isErrorFounds } = require("../helpers/errorHelper");
const Project = require("../models/Project");
const ProjectTask = require("../models/ProjectTask");


module.exports.createProjectTask = async(req, res)=> {

    const {_id: u_id} = req.user;
    const {taskName, ...others} = req.body;
    const {pid} = req.params;
    const errors = validationMessages(validationResult(req).mapped());
    if(isErrorFounds(errors)) return res.status(400).json(errors);
    const project = await Project.findOne({_id: pid, teamLead: u_id});
    if(!project) return res.status(403).json({"message": "Access Forbidden"});
    await new ProjectTask({projectId: project._id, assignBy: u_id ,taskName, ...others}).save();
    return res.status(201).json({"message": "Task Created successfully"});

}
module.exports.updateProjectTaskInfo = async(req, res)=> {
    const {_id:u_id, role} = req.user;
    const {taskName, status,...others} = req.body;
    const {pid} = req.params.pid;
    if(role.name === 'teamlead' ){
        await ProjectTask.findOneAndUpdate({projectId: pid, teamLead: u_id},{$set: {...others, status}})
        return res.status(200).json({"message": "Updated Task"});
    }
    const p = await ProjectTask.findOne({projectId: pid, assignTo: u_id});
    if(p){
        await ProjectTask.findOneAndUpdate({projectId: pid, assignTo: u_id}, {$set: {status}});
        return res.status(200).json({"message": "Status changed"})

    }
    else return res.status(400).json({"message": "You are not authorized for this request"})
}

module.exports.addTaskmember = async(req, res)=> {

}


module.exports.deleteProjectTask = async(req, res)=> {
    const {pid} = req.params;
    const {id: u_id} = req.user;
    const {taskId} = req.body;
    const p = await ProjectTask.findOne({_id: taskId, projectId: pid, assignBy: u_id});
    if(!p) return res.status(400).json({"message": "Task not found"});
    await ProjectTask.findOneAndDelete({_id: taskId, projectId: pid, assignBy: u_id});
    return res.status(200).json({"message": "Task deleted successfully"});
}