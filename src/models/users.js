const mongoose = require('mongoose');

const Roles = {
  Casual: 1,
  Admin: 5,
}

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: { // email optional
    type: String,
  },
  role: {
    default: Roles.Casual, // casual user
    type: Number,
  },
  dob: { // date of birth
    type: Date,
  },
}, { timestamps: true });

const User = mongoose.model('User', schema);

module.exports = User;