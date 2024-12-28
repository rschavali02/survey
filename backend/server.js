const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const surveyRoutes = require('../routes/surveyRoutes'); 

const app = express();


app.use(cors()); 
app.use(express.json()); 

// mongo uri
const MONGO_URI = process.env.MONGO_URI;
//connect w mongoose
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('MongoDB connection failed:', err));

// apis
app.use('/api/surveys', surveyRoutes); // base url for routing

app.get('/', (req, res) => {
    res.send('Survey App Backend is running!');
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});