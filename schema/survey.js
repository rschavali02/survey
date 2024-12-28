const mongoose = require('mongoose');

//basic question schema
const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true }, // Question text
    type: { type: String, required: true }, // e.g., 'multiple-choice', 'text'
    options: [String], // For multiple-choice questions
});

//basic survey schema
const SurveySchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String }, 
    questions: [QuestionSchema], 
    createdAt: { type: Date, default: Date.now }, 
});

const Survey = mongoose.model('Survey', SurveySchema); 
module.exports = Survey; 