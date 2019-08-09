const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

const usersRoutes = require('./routes/users');

const User = require('./models/user');

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true
}).then(() => {
  console.log('Connected to Database');
}).catch(error => {
  console.error('Error: ', error);
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (username, password, done) => {
  User.findOne({ email: username, passport: passport }).then(user => {
    if (!user) {
      return done(null, false, { message: 'Incorrect email or password' });
    }
    
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect email or password' });
    }

  }).catch(error => {
    console.log(error);
    done(error);
  })
}));

app.use(passport.initialize());

app.use('/api/users', usersRoutes);

module.exports = app;
