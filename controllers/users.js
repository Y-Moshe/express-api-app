const { User } = require('../models');

const getUsers = async ( req, res, next ) => {
  try {
    const users  = await User.find().select( '-password' ).lean();
    const status = users.length > 0 ? 200 : 204;

    res.status( status ).json( users );
  } catch( error ) {
    next( error );
  }
};

const getUser = async ( req, res, next ) => {
  try {
    const { id: _id } = req.params;
    const user = await User.findById( _id ).select( '-password' ).lean();

    if ( !user ) {
      throw new Error( 'Could not found the user' );
    }

    res.status( 200 ).json( user );
  } catch( error ) {
    next( error );
  }
};

module.exports = {
  getUsers,
  getUser
};
