const auth   = require('./auth');
const { UPLOADS_FOLDER, upload } = require('./upload');
const errorHandler = require('./error-handler');

module.exports = {
  auth,
  UPLOADS_FOLDER,
  upload,
  errorHandler
};
