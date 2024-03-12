const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateUser = async (req, res, next) => {

  try {
    // Get the token from the request cookies
    const token = req.cookies.token;
    if (!token) {
      throw new Error();
    }

    // Verify the token
    const decoded = jwt.verify(token, 'SecretKey'); // Replace 'your-secret-key' with your actual secret key
    console.log(decoded)
    // Find the user based on the decoded information
    const user = await User.findOne({ _id: decoded.userId });
    console.log(user)
    if (!user) {
      throw new Error();
    }

    // Attach the user and token to the request for future use
    req.user = user;
    req.token = token;

    next(); // Continue with the next middleware
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authenticateUser;
