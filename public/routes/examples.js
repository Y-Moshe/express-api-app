const express = require('express');
const controllers = require('../controllers/examples');

const routes = express.Router();

routes.get('', controllers.getExamples);

module.exports = routes;
