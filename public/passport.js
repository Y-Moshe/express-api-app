const passport                 = require('passport'),
      LocalStrategy            = require('passport-local').Strategy,
      JwtStrategy              = require('passport-jwt').Strategy,
      ExtractJwt               = require('passport-jwt').ExtractJwt,
      bcrypt                   = require('bcryptjs');

const { User } = require('./models');
const { JWT_SECRET } = require( './config' );

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async ( email, password, done ) => {
  const user = await User.findOne({ email }).lean();

  // email was not found
  if ( !user ) {
    return done( null, false, { message: `email ${ email } does not exists!` });
  }

  // incorrect password
  const isMatchs = await bcrypt.compare( password, user.password );
  if ( !isMatchs ) {
    return done( null, false, { message: 'incorrect password!' });
  }

  // onSuccess login
  done( null, user );
}));

passport.use(new JwtStrategy({
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, ( payload, done ) => {
  done( null, payload );
}));
