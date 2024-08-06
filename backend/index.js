const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet'); // For security
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const authRoutes = require('./controller/user/userRoutes');
const app = express();

// Security middleware
app.use(helmet());

// Increase payload size limit for JSON requests
app.use(express.json({ limit: '100mb' })); // Adjust '100mb' as needed based on your application's requirements

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(cookieParser());

// API routes
app.use('/api/userRoutes', authRoutes); // Corrected to use authRoutes
app.use('/api', router);
const userRoutes = require('./controller/user/userRoutes');
app.use('/api/user', userRoutes); // Mount the router


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
const aboutSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const About = mongoose.model('About', aboutSchema);

// API route to get about information
app.get('/api/about', async (req, res) => {
  try {
    const aboutInfo = await About.findOne();
    res.json(aboutInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API route to update about information
app.post('/api/about', async (req, res) => {
  try {
    const { title, description } = req.body;
    let aboutInfo = await About.findOne();
    if (aboutInfo) {
      aboutInfo.title = title;
      aboutInfo.description = description;
    } else {
      aboutInfo = new About({ title, description });
    }
    await aboutInfo.save();
    res.json(aboutInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// this is for contact us page
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// API routes
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(201).send('Message received');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Start server
const PORT = process.env.PORT || 8080;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Connected to DB");
            console.log("Server is running on port " + PORT);
        });
    })
    .catch(err => {
        console.error("Failed to connect to DB:", err);
        process.exit(1); // Exit process if DB connection fails
    });
