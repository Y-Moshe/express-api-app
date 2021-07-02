const express = require('express');
const multer = require('multer');
const fs = require('fs');

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

routes.get('/files', (req, res) => {
    fs.readdir('./public/uploads', (err, files) => {
        if (err) {
            res.status(500).json({
                message: 'Could not retrive files list, more information in Error Object.',
                error: err
            });
            return;
        }

        res.status(200).json({files});
    });
});

routes.get('/download/:fileName', (req, res) => {
    const path = './public/uploads/'.concat(req.params.fileName);

    res.download(path);
});

module.exports = routes;
