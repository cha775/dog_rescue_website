const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON data
app.use(express.json());

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5000', // Replace with your frontend server URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// MongoDB Connection (Add your Mongo URI in .env)
mongoose.connect(process.env='mongodb+srv://admin2122:error3133@cluster0.kdwaj.mongodb.net/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// User Schema for authentication
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema); // Declare the model only once

// Sign Up Route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ message: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalid' });
    req.user = user;
    next();
  });
};

// Set up multer storage engine to store images locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Store images in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with timestamp
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true); // Accept file
  } else {
    cb('Only image files are allowed!', false); // Reject file
  }
};

// Initialize multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size is 5MB
  fileFilter: fileFilter
});

// Dog Rescue Schema Example
const dogRescueSchema = new mongoose.Schema({
  name: String,
  breed: String,
  description: String,
  imagePath: String,  // Store the image path
});

const DogRescue = mongoose.model('DogRescue', dogRescueSchema);

// API Route to rescue a dog (protected by JWT and image upload)
app.post('/rescue', authenticateToken, upload.single('image'), (req, res) => {
  const { name, breed, description } = req.body;
  const imagePath = req.file ? req.file.path : null; // Save the image path

  const newDogRescue = new DogRescue({
    name,
    breed,
    description,
    imagePath,
  });

  newDogRescue.save()
    .then(() => res.status(201).json({ message: 'Dog rescued successfully!', dog: newDogRescue }))
    .catch(err => res.status(500).json({ message: 'Error saving dog', error: err }));
});

// Route to get list of all rescued dogs
app.get('/dogs', (req, res) => {
  DogRescue.find()
    .then(dogs => res.status(200).json({ dogs }))
    .catch(err => res.status(500).json({ message: 'Error retrieving dogs', error: err }));
});

// Serve static files (to access the uploaded images)
app.use('/uploads', express.static('uploads'));

// API Home Route
// app.get('/', (req, res) => {
//   const path = require('path');

// // Serve static files from the 'public' directory (adjust the directory name if it's different)
// app.use(express.static(path.join(__dirname, 'public')));
// // app.use(express.static(path.join(__dirname, 'index,html')));
// app.use(express.static(path.join(__dirname, 'index.html')));
//   res.send(__dirname, 'index,html');
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// const path = require('path');

app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
