const express = require('express');
const bodyParser = require('body-parser');

const exampleRoute = require('./routes/example');

const app = express();
const apiURI = '/api/';

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(apiURI.concat('example'), exampleRoute);

module.exports = app;
