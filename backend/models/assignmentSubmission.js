const mongoose = require('mongoose');

const assignmentSubmissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    responses: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
                required: true
            },
            answer: {
                type: [String], // Array to support MSQ as well as subjective
                default: []
            },
            isCorrect: {
                type: Boolean,
                default: false
            },
            marksScored: {
                type: Number,
                default: 0
            }
        }
    ],
    totalScore: {
        type: Number,
        default: 0
    },
    totalMaxScore: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);
