//Imports
const multer = require('multer');

//Setup
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'text/plain': 'txt',
    'video/mp4': 'mp4',
};

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'images');
    },
    filename: (request, file, callback) => {
        const name = file.originalname.toLocaleLowerCase().split(' ').join('_').split('.')[0];
        //console.log(file.mimetype);
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    },
});

//Exports
module.exports = multer({ storage }).single('postFormImg');
