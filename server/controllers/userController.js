const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Controller method for user registration (signup)
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.userExists(username, email);
    if (userExists) {
      return res.status(400).json({ message: 'User with the given username or email already exists' });
    }

    // Create a new user instance
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    // Generate a JSON Web Token (JWT) for the new user
    const token = generateToken(newUser);

    // Set the token in a cookie
    res.cookie('token', token, { httpOnly: true });

    // Respond with the user information (without exposing the token in the response body)
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller method for user authentication (signin)
const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists and the password is correct
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JSON Web Token (JWT) for the authenticated user
    const token = generateToken(user);

    // Set the token in a cookie
    res.cookie('token', token, { httpOnly: true });

    // Respond with the user information (without exposing the token in the response body)
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Helper function to generate a JSON Web Token (JWT)
const generateToken = (user) => {
  const secretKey = 'yourSecretKey'; // Replace with your secret key
  const expiresIn = '24h'; // Token expiration time (e.g., 1 hour)

  // Generate the token
  return jwt.sign({ userId: user._id }, secretKey, { expiresIn });
};

// Export the controller methods
module.exports = { signup, signin };
