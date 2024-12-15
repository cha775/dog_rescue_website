// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');

const app = express();

// Load environment variables from .env file
dotenv.config(); 

console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debugging line

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin2122:error3133@cluster0.kdwaj.mongodb.net/mydatabase', {})

  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
// Define User Schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
});

// User Model
const User = mongoose.model('User', userSchema);

// API Routes

// Register a User
app.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Save user to DB
    const newUser = new User({ fullName, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists.' });
    } else {
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
});

// Login a User
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in DB
    const user = await User.findOne({ email, password });

    if (user) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});
const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  availability: { type: String, required: true },
  message: { type: String },
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

// API Endpoint to Handle Form Submission
app.post('/submit_form', async (req, res) => {
  try {
    const { name, email, phone, availability, message } = req.body;
    const newVolunteer = new Volunteer({ name, email, phone, availability, message });
    await newVolunteer.save();
    res.status(201).json({ message: 'Volunteer data saved successfully!' });
  } catch (err) {
    console.error('Error saving volunteer data:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/volunteer', require('./routes/volunteerRoutes'));
app.use('/api/shop', require('./routes/shopRoutes'));
app.use('/api/dog', require('./routes/dogRoutes'));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const path = require('path');

// Serve static files from the 'public' directory (adjust the directory name if it's different)
app.use(express.static(path.join(__dirname, 'public')));  // Change 'public' to your directory name

