const multer = require('multer');

const storage = multer.diskStorage({
  destination :function(req,file,cb){
    const pathStorege = `${__dirname}/../../../public`;
    cb(null,pathStorege)
  },
  filename: function (req,file,cb){
    const ext = file.originalname.split(".").pop();
    const filename = `file-${Date.now()}.${ext}`;
    cb(null,filename);
  }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb,res) => {
      if (file.mimetype == "image/png"          || 
          file.mimetype == "image/jpg"          || 
          file.mimetype == "image/jpeg"  
          ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });
 
module.exports = upload;