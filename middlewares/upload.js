const multer = require('multer');
const path = require('path');

const UPLOADS_FOLDER = path.join( __dirname, '../uploads' );

const storage = multer.diskStorage({
  destination: ( req, file, cb ) => cb( null, UPLOADS_FOLDER ),
  filename: ( req, file, cb ) => {
    const fileName  = file.originalname.slice(0, file.originalname.lastIndexOf('.'));
    const extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
    
    const fullFileName = fileName + '-' + Date.now() + extension;
    cb( null, fullFileName );
  }
});

module.exports = {
  UPLOADS_FOLDER,
  upload: multer({ storage })
};
