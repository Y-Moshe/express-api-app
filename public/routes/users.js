const routes = require('express').Router();

const controllers = require('../controllers/users');
const { auth } = require( '../middlewares' );

routes.get( '', auth, controllers.getUsers );

routes.get( '/:id', controllers.getUser );

module.exports = routes;