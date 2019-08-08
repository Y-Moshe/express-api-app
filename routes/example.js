const express = require('express');
const controllers = require('../controllers/example');

const routes = express.Router();

routes.get('', controllers.getExamples);

module.exports = routes;
