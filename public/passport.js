const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const CustomStrategy = require('passport-custom');

const User = require('./models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, (username, password, done) => {
    User.findOne({ email: username }).then(user => {
        if (!user) {
            return done(null, false, { message: 'Incorrect email or password!' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect email or password!' });
        }

        done(null, user);
    }).catch(error => {
        console.log(error);

        done(error);
    });
}));

passport.use(new JwtStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (payload, done) => {
    done(null, payload.user);
}));

// Custom Strategy
/**
 * This Strategy is the opposite of the JwtStrategy, will return UnAuthorized(401) if the token is valid!
 */
passport.use('!jwt', new CustomStrategy((req, done) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET);
        done(null, false, {message: 'You\'r not allowed to visit this route!'});
    } catch {
        done(null, {});
    }
}));
