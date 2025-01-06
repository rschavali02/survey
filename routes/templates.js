const express = require('express');
const router = express.Router();
const Template = require('../schema/templates'); // Import the survey template model

// Fetch all survey templates
router.get('/', async (req, res) => {
    try {
        const templates = await Template.find(); // Fetch templates from MongoDB
        res.status(200).json(templates);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch survey templates' });
    }
});


// post new template, should be admin only
router.post('/', async (req, res) => {
    try {
        const { title, image } = req.body;

        // Ensure required fields are provided
        if (!title || !image) {
            return res.status(400).json({ error: 'Title and image are required' });
        }

        const newTemplate = new Template({ title, image });
        const savedTemplate = await newTemplate.save();

        res.status(201).json(savedTemplate);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create template' });
    }
});
module.exports = router;
