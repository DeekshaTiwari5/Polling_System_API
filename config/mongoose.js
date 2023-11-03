// Import the Mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB database running at 'mongodb://0.0.0.0:27017/POLLING-SYSTEM'
mongoose.connect('mongodb+srv://deeksha:deeksha@cluster.ixb0mlz.mongodb.net/?retryWrites=true&w=majority');

// Get the connection instance from Mongoose
const db = mongoose.connection;

// Log an error message if there's an issue connecting to the database
db.on('error', console.error.bind(console, 'error connecting to database'));

// Once the connection is open, log a success message
db.once('open', () => {
    console.log('MongoDB is connected successfully');
});

// Export the Mongoose object for use in other parts of your application
module.exports = mongoose;
