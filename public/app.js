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
mongoose.connect(process.env.MONGO_URI, {
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

/**
 * Delay response from the server.
 */
app.use((req, res, next) => {
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

app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
  
    return res.status(500).json({
      message: 'An unknown error has occurred, try again later on.'
    });
  } else {
    next();
  }
});

module.exports = app;
