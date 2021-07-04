const fs   = require('fs/promises');

const { UPLOADS_FOLDER, upload } = require('../middlewares');

const getFiles = async ( req, res, next ) => {
  try {
    const files = await fs.readdir( UPLOADS_FOLDER );

    res.status( 200 ).json( files );
  } catch( error ) {
    next( error );
  }
};

const uploadFile = ( req, res, next ) => {
  upload.single('file')( req, res, next );

  res.status( 200 ).json({
    message: 'Your file has been uploaded!'
  });
};

const downloadFile = ( req, res ) => {
  const { fileName } = req.params;

  res.download( UPLOADS_FOLDER.concat( '/', fileName ));
};

module.exports = {
  getFiles,
  uploadFile,
  downloadFile
};
