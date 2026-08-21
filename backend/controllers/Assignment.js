const Assignment = require('../models/assignment');
const Question = require('../models/question');
const Course = require('../models/course');
const AssignmentSubmission = require('../models/assignmentSubmission');

exports.createAssignment = async (req, res) => {
    try {
        const { courseId, title, description, timeLimit } = req.body;

        if (!courseId || !title) {
            return res.status(400).json({ success: false, message: 'Course ID and Title are required' });
        }

        const assignment = await Assignment.create({
            courseId,
            title,
            description,
            timeLimit
        });

        // Add assignment to course
        await Course.findByIdAndUpdate(courseId, {
            $push: { assignments: assignment._id }
        });

        res.status(201).json({
            success: true,
            message: 'Assignment created successfully',
            data: assignment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.getCourseAssignments = async (req, res) => {
    try {
        const { courseId } = req.params;
        const assignments = await Assignment.find({ courseId }).populate('questions');
        
        res.status(200).json({
            success: true,
            data: assignments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.getAssignmentDetails = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const assignment = await Assignment.findById(assignmentId).populate('questions');
        
        if (!assignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }

        res.status(200).json({
            success: true,
            data: assignment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.deleteAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }

        // Remove questions
        await Question.deleteMany({ assignmentId });
        
        // Remove from course
        await Course.findByIdAndUpdate(assignment.courseId, {
            $pull: { assignments: assignmentId }
        });

        await Assignment.findByIdAndDelete(assignmentId);

        res.status(200).json({
            success: true,
            message: 'Assignment deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.addQuestionToAssignment = async (req, res) => {
    try {
        const { assignmentId, questionType, questionText, options, correctAnswers, marks } = req.body;

        if (!assignmentId || !questionType || !questionText) {
            return res.status(400).json({ success: false, message: 'Required fields missing' });
        }

        const question = await Question.create({
            assignmentId,
            questionType,
            questionText,
            options: options || [],
            correctAnswers: correctAnswers || [],
            marks: marks || 1
        });

        await Assignment.findByIdAndUpdate(assignmentId, {
            $push: { questions: question._id }
        });

        res.status(201).json({
            success: true,
            message: 'Question added successfully',
            data: question
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const { questionId, assignmentId } = req.params;
        
        await Question.findByIdAndDelete(questionId);
        
        await Assignment.findByIdAndUpdate(assignmentId, {
            $pull: { questions: questionId }
        });

        res.status(200).json({
            success: true,
            message: 'Question deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.submitAssignment = async (req, res) => {
    try {
        const { assignmentId, courseId, answers } = req.body; // answers: [{ questionId, answer: [string] }]
        const userId = req.user.id;

        const assignment = await Assignment.findById(assignmentId).populate('questions');
        if (!assignment) {
            return res.status(404).json({ success: false, message: 'Assignment not found' });
        }

        let totalScore = 0;
        let totalMaxScore = 0;
        const responses = [];

        for (const q of assignment.questions) {
            totalMaxScore += q.marks;
            const studentAnswerObj = answers.find(a => a.questionId.toString() === q._id.toString());
            const studentAnswer = studentAnswerObj ? studentAnswerObj.answer : [];

            let isCorrect = false;
            let marksScored = 0;

            if (q.questionType === 'MCQ' || q.questionType === 'TrueFalse') {
                if (studentAnswer.length > 0 && q.correctAnswers.length > 0 && studentAnswer[0] === q.correctAnswers[0]) {
                    isCorrect = true;
                    marksScored = q.marks;
                }
            } else if (q.questionType === 'MSQ') {
                // Check if arrays contain exact same elements
                const isMatch = studentAnswer.length === q.correctAnswers.length && 
                                studentAnswer.every(val => q.correctAnswers.includes(val));
                if (isMatch) {
                    isCorrect = true;
                    marksScored = q.marks;
                }
            } else if (q.questionType === 'Subjective') {
                // Subjective questions cannot be auto-graded easily. For now, 0 marks, pending review.
                isCorrect = false;
                marksScored = 0;
            }

            totalScore += marksScored;

            responses.push({
                questionId: q._id,
                answer: studentAnswer,
                isCorrect,
                marksScored
            });
        }

        const submission = await AssignmentSubmission.create({
            userId,
            assignmentId,
            courseId,
            responses,
            totalScore,
            totalMaxScore
        });

        res.status(201).json({
            success: true,
            message: 'Assignment submitted successfully',
            data: submission
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.getStudentSubmissions = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const submissions = await AssignmentSubmission.find({ courseId, userId }).populate('assignmentId');
        
        res.status(200).json({
            success: true,
            data: submissions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
