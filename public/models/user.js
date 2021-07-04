const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'email address is required!',
    unique: 'account already exists!'
  },
  password: {
    type: String,
    required: 'password is required!'
  },
  userName: {
    type: String,
    unique: 'user name must be unique!',
    sparse: true,
    default: null
  }
});

userSchema.plugin( mongooseUniqueValidator );
module.exports = mongoose.model( 'User' , userSchema );
