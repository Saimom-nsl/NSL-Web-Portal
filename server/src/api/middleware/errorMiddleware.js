module.exports = (error, req, res, next) =>{
    if (req.headersSent){
        return res.status(500).json({"message": "Server Error"});
    }
    
    console.log(error);
    return res.status(500).json({"message": "Something went wrong"})
    
}