const multer = require('multer');

const storage = multer.diskStorage({
  destination: ( req, file, cb ) => {
    cb(null, __dirname.concat( '/public/uploads' ));
  },
  filename: ( req, file, cb ) => {
    const fileName  = file.originalname.slice(0, file.originalname.lastIndexOf('.'));
    const extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
    
    const fullFileName = fileName + '-' + Date.now() + extension;
    cb( null, fullFileName );
  }
});

module.exports = multer({ storage });
