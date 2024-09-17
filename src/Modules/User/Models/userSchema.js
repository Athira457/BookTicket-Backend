const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validateUser } = require('../Requests/userValidation'); 

// User Schema
const userSchema = new mongoose.Schema({
  uname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
  },
  googleId: { type: String },
  otp: { type: Number },
  isEmailVerified: { type: Boolean, default: false },
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Function to validate user data before creating a new user
userSchema.statics.validateUserData = (userData) => {
  const { error } = validateUser(userData); 
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
