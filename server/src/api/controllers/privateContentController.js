const PrivateContent = require("../models/PrivateContentModel");

module.exports.uploadFile = async(req, res)=> {

    try{
        if(!req.file) return res.status(400).json("File not found");
        const {title, to} = req.body
        const data = {
            title,
            from: req.user._id,
            to,
            contentPath: req.file.path
        }
        const privatecontent = await new PrivateContent(data).save();
        return res.status(200).json(privatecontent);
    }catch(err){
        return res.status(500).json(err.message || "something went wrong in file upload")
    }
}
    