const express = require('express');
const SurveyModel = require('../schema/survey'); // Import the Survey model

const router = express.Router();

//TODO: create GET given specific u_id

// Create new survey
router.post('/', async (req, res) => {
    try {
        const survey = new SurveyModel(req.body); // Create a new Survey document using SurveyModel
        await survey.save(); // Save to the database
        res.status(201).json(survey); // Respond with the created survey
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all surveys
router.get('/', async (req, res) => {
    try {
        const surveys = await SurveyModel.find(); // Fetch all surveys using SurveyModel
        res.json(surveys);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a survey by ID
router.get('/:id', async (req, res) => {
    try {
        const survey = await SurveyModel.findById(req.params.id); // Find survey by ID using SurveyModel
        if (!survey) return res.status(404).json({ error: 'Survey not found' });
        res.json(survey);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a survey by ID
router.put('/:id', async (req, res) => {
    try {
        const survey = await SurveyModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Validate the updates
        });
        if (!survey) return res.status(404).json({ error: 'Survey not found' });
        res.json(survey);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a survey by ID
router.delete('/:id', async (req, res) => {
    try {
        const survey = await SurveyModel.findByIdAndDelete(req.params.id); // Delete survey by ID using SurveyModel
        if (!survey) return res.status(404).json({ error: 'Survey not found' });
        res.json({ message: 'Survey deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;