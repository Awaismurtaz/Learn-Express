const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Employ = require('./models/Employ');

// Middleware to parse JSON requests
app.use(express.json());

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Demo', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB is connected successfully');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};
app.get('/', async (req, res) => {
    try {
        const employs = await Employ.find();
        res.status(200).json(employs); // Use .json() to send the response as JSON and set status to 200 (OK)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error'); // Send a 500 (Internal Server Error) status if something goes wrong
    }
});

// Connect to MongoDB and start the server
connectDB().then(() => {
    app.listen(3000, () => {
        console.log(`Server running at http://localhost:3000/`);
    });
});

module.exports = connectDB;
