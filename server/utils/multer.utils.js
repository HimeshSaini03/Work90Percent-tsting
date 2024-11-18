const multer = require('multer');
const path = require('path');

const uploadDIr = path.join(__dirname, '../uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDIr);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
}); 

const upload = multer({ storage: storage });

module.exports = upload;
