const express  = require('express'),
      passport = require('passport'),
      mongoose = require('mongoose'),
      cors     = require('cors');
require('dotenv').config();

const {
  MONGO_CONNECTION_STRING,
  PORT
} = require('./config');
const { appVersion } = require('./utils');
const {
  AuthRoutes,
  UsersRoutes,
  TestsRoutes
} = require('./routes');
const { errorHandler } = require('./middlewares');

const BASE_URI   = `/api/v${ appVersion }`;
const app = express();

mongoose.connect( MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log( 'Connected to Database!' );
}).catch(error => {
  console.error( 'Could not connect to Database' );
  console.error( 'Error: ', error );
});

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( cors() );

require( './passport' );
app.use( passport.initialize() );

app.get( '/', ( req, res ) => res.status(200).send('Hello from Node.js server :)') );

app.use( BASE_URI.concat( '/auth' ), AuthRoutes );
app.use( BASE_URI.concat( '/users' ), UsersRoutes );
app.use( BASE_URI.concat( '/tests' ), TestsRoutes );

/**
 * Using a global error handler to catch all types of errors.
 * And trying to find out which error message to send back to the Response!
 */
app.use( errorHandler );

app.get( '/*', ( req, res ) => res.redirect('/') );

app.listen( PORT, () => console.log( `Server(v${ appVersion }) is running at port: ${ PORT }` ));
