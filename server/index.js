const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb+srv://amanshaikh8624:77xaAxqCozNZq1H8@cluster0.82wj9wt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes for user registration and authentication
app.post('/signup', userController.signup);
app.post('/signin', userController.signin);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
