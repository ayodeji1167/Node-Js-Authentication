const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please Input User Name'],
    minlength: 3,
    maxlength: 125,
  },

  roles: {
    user: {
      type: Number,
      default: 2001,
    },
    editor: Number,
    admin: Number,
  },

  password: {
    type: String,
    required: [true, 'Please Input Valid password'],
    minlength: 4,
  },

  refreshToken:String,
  
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
