const express = require('express');
const bodyParser = require('body-parser');

const testsRoutes = require('./routes/tests');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api/tests', testsRoutes);

module.exports = app;
