// Import the Express framework
const express = require('express');

// Import the body-parser middleware for handling JSON and URL-encoded data
const bodyParser = require('body-parser');

// Import the Mongoose connection from './config/mongoose'
const db = require('./config/mongoose');

// Create an Express application
const app = express();

// Define the port on which the server will listen
const Port = 8000;

// Middleware for parsing incoming JSON data
app.use(bodyParser.json());

// Middleware for parsing incoming URL-encoded data with extended option set to true
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes for handling questions and options (assuming these routes are defined in separate files)
app.use('/questions', require('./routes/questions'));
app.use('/options', require('./routes/options'));

// Start the server and listen on the specified port
app.listen(Port, () => {
    console.log(`Server is running on port: ${Port}`);
});
