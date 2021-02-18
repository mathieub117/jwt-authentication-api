const util = require("util");
const multer = require('multer');
const imageModel = require('../model/image');
const maxSize = 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({
    storage: storage,
    limits: maxSize
}).single("file");

let uploadFileMiddleware = util.promisify(upload);

// Find a image by filter (e.g. {_id: 1234})
function Find(filter) {
    return new Promise((resolve) => {
        imageModel.findOne(filter)
            .then(function (result) {
                resolve({success: true, image: result});
            }).catch(function (error) {
            resolve({success: false, error: error});
        });
    });
}

module.exports = { uploadFileMiddleware, Find};