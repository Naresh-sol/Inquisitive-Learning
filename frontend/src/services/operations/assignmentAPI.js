import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { assignmentEndpoints } from "../apis"

const {
    CREATE_ASSIGNMENT_API,
    DELETE_ASSIGNMENT_API,
    ADD_QUESTION_API,
    DELETE_QUESTION_API,
    SUBMIT_ASSIGNMENT_API,
    GET_STUDENT_SUBMISSIONS_API,
    GET_COURSE_ASSIGNMENTS_API,
    GET_ASSIGNMENT_DETAILS_API
} = assignmentEndpoints

export const createAssignment = async (data, token) => {
    let result = null
    const toastId = toast.loading("Creating Assignment...")
    try {
        const response = await apiConnector("POST", CREATE_ASSIGNMENT_API, data, {
            Authorization: `Bearer ${token}`,
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Create Assignment")
        }
        toast.success("Assignment Created Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE_ASSIGNMENT_API ERROR............", error)
        toast.error(error.response?.data?.message || error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getCourseAssignments = async (courseId, token) => {
    let result = []
    try {
        const response = await apiConnector("GET", `${GET_COURSE_ASSIGNMENTS_API}/${courseId}`, null, {
            Authorization: `Bearer ${token}`,
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Assignments")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GET_COURSE_ASSIGNMENTS_API ERROR............", error)
    }
    return result
}

export const addQuestionToAssignment = async (data, token) => {
    let result = null
    const toastId = toast.loading("Adding Question...")
    try {
        const response = await apiConnector("POST", ADD_QUESTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Add Question")
        }
        toast.success("Question Added Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("ADD_QUESTION_API ERROR............", error)
        toast.error(error.response?.data?.message || error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteQuestion = async (assignmentId, questionId, token) => {
    let result = null
    const toastId = toast.loading("Deleting Question...")
    try {
        const response = await apiConnector("DELETE", `${DELETE_QUESTION_API}/${assignmentId}/${questionId}`, null, {
            Authorization: `Bearer ${token}`,
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Question")
        }
        toast.success("Question Deleted Successfully")
        result = true
    } catch (error) {
        console.log("DELETE_QUESTION_API ERROR............", error)
        toast.error(error.response?.data?.message || error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const submitAssignment = async (data, token) => {
    let result = null
    const toastId = toast.loading("Submitting Assignment...")
    try {
        const response = await apiConnector("POST", SUBMIT_ASSIGNMENT_API, data, {
            Authorization: `Bearer ${token}`,
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Submit Assignment")
        }
        toast.success("Assignment Submitted Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("SUBMIT_ASSIGNMENT_API ERROR............", error)
        toast.error(error.response?.data?.message || error.message)
    }
    toast.dismiss(toastId)
    return result
}
