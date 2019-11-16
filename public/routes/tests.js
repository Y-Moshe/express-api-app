const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.slice(0, file.originalname.lastIndexOf('.'));
        const exten = file.originalname.substr(file.originalname.lastIndexOf('.'));
        
        const fullFileName = fileName + '-' + Date.now() + exten;
        cb(null, fullFileName);
    }
});
const upload = multer({storage: storage});
const routes = express.Router();

routes.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({
        message: 'Your file has been uploaded!'
    });
});

module.exports = routes;
