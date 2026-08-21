const express = require("express")
const router = express.Router()

const {
    createAssignment,
    getCourseAssignments,
    getAssignmentDetails,
    deleteAssignment,
    addQuestionToAssignment,
    deleteQuestion,
    submitAssignment,
    getStudentSubmissions
} = require("../controllers/Assignment")

const { auth, isInstructor, isStudent } = require("../middleware/auth")

// Instructor Routes
router.post("/createAssignment", auth, isInstructor, createAssignment)
router.delete("/deleteAssignment/:assignmentId", auth, isInstructor, deleteAssignment)
router.post("/addQuestion", auth, isInstructor, addQuestionToAssignment)
router.delete("/deleteQuestion/:assignmentId/:questionId", auth, isInstructor, deleteQuestion)

// Student Routes
router.post("/submitAssignment", auth, isStudent, submitAssignment)
router.get("/getStudentSubmissions/:courseId", auth, isStudent, getStudentSubmissions)

// Shared/General Routes
router.get("/getCourseAssignments/:courseId", auth, getCourseAssignments)
router.get("/getAssignmentDetails/:assignmentId", auth, getAssignmentDetails)

module.exports = router
