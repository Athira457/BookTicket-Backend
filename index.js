// /index.js
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database/dbConnection');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Routes = require('./src/route/routes'); 

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use the CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE',
  credentials: true 
}));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Connect to MongoDB
connectDB();

// Routes
app.use(Routes);
app.use('/uploads',express.static('./uploads'))

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



