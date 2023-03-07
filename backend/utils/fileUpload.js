const multer = require('multer');

// define file storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null,new Date().toISOString().replace(/:/g, "-" ) + "-"+ file.originalname);
    },

});

// specify file format that can be saved 
function fileFilter(req , file , cb){
    if(
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' 
        ){
            cb(null, true);
        }else{
            cb(null, false);
        }
}
const fileSizeFormatter = (bytes, decimal) =>{
    if(bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) +' ' + sizes[i];
}
const upload = multer({
    storage , fileFilter
});

module.exports = {upload , fileSizeFormatter};

