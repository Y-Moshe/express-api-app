const routes = require('express').Router();

const controllers = require('../controllers/tests');

routes.get( '/files', controllers.getFiles );

routes.post( '/upload', controllers.uploadFile );

routes.get( '/download/:fileName', controllers.downloadFile );

module.exports = routes;
