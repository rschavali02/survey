const mongoose = require('mongoose');


//TODO: need to edit to contain all the data we might want in a template

const SurveyTemplateSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Subtitle of the template
    image: { type: String, required: true }, // Path/URL to the image
});

module.exports = mongoose.model('SurveyTemplate', SurveyTemplateSchema);