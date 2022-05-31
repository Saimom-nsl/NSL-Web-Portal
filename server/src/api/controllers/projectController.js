const { validationResult } = require("express-validator");
const { validationMessages, isErrorFounds } = require("../helpers/errorHelper");
const Project = require("../models/Project");
const User = require("../models/userModel");


module.exports.getAllProjectsForAdmin = async(req, res)=> {

        const projects = await Project.find();
        return res.status(200).json(projects); 

    // else{
    //     const teams = await Project.find({$or: [{teamLead: req.user.id}, {members: req.user.id}]});
    //     return res.status(200).json(teams);
    // }
}

module.exports.getAllProject = async(req, res)=> {
    const projects = await Project.find({$or: [{teamLead: req.user.id}, {members: req.user.id}]});
    if(!projects.length) return res.status(400).json({"message": "Projects not found"});
    return res.status(200).json(projects);
}

module.exports.createProject = async(req, res)=> {
    
    const errors = validationMessages(validationResult(req).mapped());
    if(isErrorFounds(errors)) return res.status(400).json(errors);
    const { teamName, members, details, teamLead } = req.body;
    if(req.user.role.name === "admin"){
        await new Project({name: teamName, teamLead,members, details }).save();
        return res.status(201).json({"message": "Team created successfully"})
    }

    else{
        const {_id: teamLead} = req.user;
        await new Project({name: teamName, teamLead: req.user.id, members, details}).save();
        return res.status(201).json({"message": "Team created successfully from team lead"})
    }
}

module.exports.singleProjectInfoUpdate = async(req, res)=> {
    const id = req.params.id; //projectid
    const {members, ...others} = req.body;
    const project = await Project.findOne({_id: id});
    // console.log(project.teamLead._id == req.user._id);
    // console.log(project.teamLead);
    // console.log(req.user._id);
    if(!project) return res.status(400).json({"message": "Request denied"});
    
    if(members.length) {
        if(project.teamLead === req.user._id || req.user.role.name === "admin"){
            
            await Project.findOneAndUpdate({_id: id}, {$set: {members, ...others}})
            return res.status(201).json({"message": "Updated successfully"});
        }
        const p = await Project.findOne({_id: id, teamLead: req.user._id});
        if(p){
            await Project.findOneAndUpdate({_id: id, teamLead: req.user._id}, {$set: {members, ...others}});
            return res.status(200).json({"message": 'Updated successfully'})
        }
        else{
            return res.status(201).json({"message": "Your are not authorize to update the information"});

        }
    }
    return res.status(400).json({"message": "Not Updated"});

}

module.exports.singleProjectDelete = async(req, res)=> {
    const id = req.params.id;
    const project = await Project.findOne({_id: id});
    if(!project) return res.status(400).json({"message": "Project not found"});
    if(req.user.role.name === "admin"){
            
        await Project.findOneAndDelete({_id: id});
        return res.status(201).json({"message": "Deleted successfully"});
    }
    const p = await Project.findOne({_id: id, teamLead: req.user._id});
    if(p){
        await Project.findOneAndDelete({_id: id, teamLead: req.user._id});
        return res.status(200).json({"message": 'Deleted successfully'})
    }
    return res.status(201).json({"message": "Your are not authorize to delete the information"});

    
}