const express = require('express');
const router = express.Router();
const Template = require('../models/templates'); // Import the survey template model

// Fetch all survey templates
router.get('/', async (req, res) => {
    try {
        const templates = await Template.find(); // Fetch templates from MongoDB
        res.status(200).json(templates);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch survey templates' });
    }
});

module.exports = router;
