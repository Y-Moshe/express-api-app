const bcrypt   = require('bcryptjs'),
      jwt      = require('jsonwebtoken'),
      passport = require('passport'),
      ms       = require('ms');

const { User } = require('../models');
const { JWT_SECRET } = require('../config');

const HASH_PASSWORD_SALT = 10;
const LOGIN_TOKEN_EXPIRES_IN = ms( '3h' );

const signToken = ( data, expiresIn = LOGIN_TOKEN_EXPIRES_IN ) =>
  jwt.sign({ data }, JWT_SECRET, { expiresIn });

const createUser = async ( req, res, next ) => {
  try {
    const { email, password, userName } = req.body;

    const hashedPassword = await bcrypt.hash( password, HASH_PASSWORD_SALT );
    const user = new User({
      email,
      password: hashedPassword,
      userName
    });

    await user.save();
    delete user.password;

    const token = signToken( user );
    res.status( 201 ).json({
      message: `Your account (${ email }) has been created!`,
      user,
      token
    });
  } catch( error ) {
    next( error );
  }
};

const loginUser = ( req, res ) => {
  passport.authenticate( 'local', { session: false },
    ( error, user, info ) => {
    // any error case that can occurs.
    if ( error ) {
      return res.status( 500 ).json( error );
    }

    // password or email are incorrect!
    if ( !user ) {
      return res.status( 401 ).json( info );
    }

    const token = signToken( user );
    return res.json({
      message: 'You are successfully connected!',
      user,
      token
    });
  })(req, res);
};

module.exports = {
  createUser,
  loginUser
};
