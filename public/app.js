const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcryptjs');

const usersRoutes = require('./routes/users');
const User = require('./models/user');

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
 * Passport Configuration.
 */
// Local Strategy
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (username, password, done) => {
  User.findOne({ email: username }).then(user => {
    if (!user) {
      return done(null, false);
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false);
    }

    done(null, user);
  }).catch(error => {
    console.log(error);

    done(error);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }).then(user => {
    if (!user) {
      return done(new Error('Could not found the user!!'));
    }

    done(null, user);
  }).catch(error => {
    done(error, false);
  });
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

app.use(passport.initialize());
app.use((req, res, next) => { // a Delay for the response, nice to have on development mode.
  setTimeout(() => {
    next();
  }, RESPONSE_DELAY);
});

app.use('/api/users', usersRoutes);

module.exports = app;
