const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    questionType: {
        type: String,
        enum: ['Subjective', 'MCQ', 'MSQ', 'TrueFalse'],
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String], // Used for MCQ, MSQ
        default: []
    },
    correctAnswers: {
        type: [String], // Used for MCQ (1 item), MSQ (multiple), TrueFalse (1 item: 'True' or 'False')
        default: []
    },
    marks: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Question', questionSchema);
