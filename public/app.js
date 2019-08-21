const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      passport = require('passport');

const usersRoutes = require('./routes/users');

const RESPONSE_DELAY = 750; // In milliseconds!
const app = express();

/**
 * Mongoose Connection and configuration.
 */
mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true
  }).then(() => {
    console.log('Connected to Database');
  }).catch(error => {
    console.error('Error: ', error);
});

/**
 * Express Application Configuration.
 */
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use((req, res, next) => { // a Delay for the response, nice to have on development mode.
  setTimeout(() => {
    next();
  }, RESPONSE_DELAY);
});

/**
 * Passport Configuration
 */
require('./passport');
app.use(passport.initialize());

app.use('/api/users', usersRoutes);

module.exports = app;
