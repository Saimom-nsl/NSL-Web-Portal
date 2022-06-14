const router = require("express").Router();
const { uploadFile } = require("../../controllers/privateContentController");
const path = require("path")
const multer = require("multer");
const { Authorize } = require("../../middleware/commonMiddlewares");
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, __baseDir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
      },
    
});

 const upload = multer({storage: storage, fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
},
limits:{
    fileSize: 1024 * 1024 * 5
}});

router.route("/upload")
    .post(Authorize,upload.single('file'),uploadFile)

module.exports = router;