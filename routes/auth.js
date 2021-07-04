const routes = require('express').Router();

const controllers = require('../controllers/auth');

routes.post( '/signup', controllers.createUser );

routes.post( '/login', controllers.loginUser );

module.exports = routes;
