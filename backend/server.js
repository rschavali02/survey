const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const surveyRoutes = require('../routes/surveyRoutes'); 
const surveyTemplateRoutes = require('./routes/templates'); 
const app = express();


app.use(cors()); 
app.use(express.json()); 
app.use('/api/surveys', require('../routes/surveyRoutes'));

// mongo uri
const MONGO_URI = process.env.MONGO_URI;
//connect w mongoose
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('MongoDB connection failed:', err));

// apis
app.use('/api/surveys', surveyRoutes); // routing for surveys
app.use('/api/templates', surveyTemplateRoutes);  // routing for templates

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});