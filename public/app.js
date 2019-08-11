const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const examplesRoutes = require('./routes/examples');

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true
}).then(() => {
  console.log('Connected to Database!');
}).catch(error => {
  console.error('Could not connect to Database! Error:');
  console.log(error);
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api/examples', examplesRoutes);

module.exports = app;
