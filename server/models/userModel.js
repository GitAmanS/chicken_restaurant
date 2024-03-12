const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  role:{
    type: String
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;

  // Hash the password only if it's modified or a new user
  if (!user.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Add a method to compare passwords during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Static method to check if a user with the given username or email already exists
userSchema.statics.userExists = async function (username, email) {
  const existingUser = await this.findOne({
    $or: [{ username }, { email }],
  });

  return !!existingUser;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
