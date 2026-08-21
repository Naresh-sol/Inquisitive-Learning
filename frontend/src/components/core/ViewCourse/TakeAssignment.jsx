import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { assignmentEndpoints } from '../../../services/apis';
import { submitAssignment } from '../../../services/operations/assignmentAPI';
import toast from 'react-hot-toast';

export default function TakeAssignment() {
    const { courseId, assignmentId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);
    const navigate = useNavigate();

    const [assignment, setAssignment] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await apiConnector("GET", `${assignmentEndpoints.GET_ASSIGNMENT_DETAILS_API}/${assignmentId}`, null, {
                    Authorization: `Bearer ${token}`
                });
                if (response?.data?.success) {
                    setAssignment(response.data.data);
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to load assignment");
            }
            setLoading(false);
        };
        fetchAssignment();
    }, [assignmentId, token]);

    const handleAnswerChange = (questionId, value, type) => {
        setAnswers((prev) => {
            if (type === 'MCQ' || type === 'TrueFalse') {
                return { ...prev, [questionId]: [value] };
            } else if (type === 'MSQ') {
                const currentAnswers = prev[questionId] || [];
                if (currentAnswers.includes(value)) {
                    return { ...prev, [questionId]: currentAnswers.filter(a => a !== value) };
                } else {
                    return { ...prev, [questionId]: [...currentAnswers, value] };
                }
            }
            return prev;
        });
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        // Format answers for API
        const formattedAnswers = Object.keys(answers).map(qId => ({
            questionId: qId,
            answer: answers[qId]
        }));

        const res = await submitAssignment({
            assignmentId,
            courseId,
            answers: formattedAnswers
        }, token);

        if (res) {
            setResult(res);
        }
        setSubmitting(false);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    if (!assignment) {
        return <div className="flex justify-center items-center h-full">Assignment not found</div>;
    }

    if (result) {
        return (
            <div className="flex flex-col items-center justify-center p-8 mt-10">
                <h2 className="text-2xl font-semibold text-richblack-900 mb-6">Assignment Submitted!</h2>
                <div className="text-center">
                    <p className="text-sm text-richblack-600 mb-1">Your Score</p>
                    <p className="text-4xl font-bold text-richblack-900">
                        {result.totalScore} <span className="text-lg text-richblack-400 font-normal">/ {result.totalMaxScore}</span>
                    </p>
                </div>
                <button
                    onClick={() => navigate(`/view-course/${courseId}`)}
                    className="mt-8 border border-richblack-300 text-richblack-900 px-6 py-2 rounded-md hover:bg-richblack-50 transition-colors"
                >
                    Back to Course
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl p-8 max-w-4xl mx-auto shadow-sm mt-8 border border-gray-100">
            <h1 className="text-3xl font-extrabold text-richblack-900 mb-2">{assignment.title}</h1>
            {assignment.description && <p className="text-gray-600 mb-8 pb-8 border-b border-gray-100">{assignment.description}</p>}

            <div className="space-y-8">
                {assignment.questions.map((q, index) => (
                    <div key={q._id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-lg text-richblack-900">
                                <span className="text-[#0056D2] mr-2">Q{index + 1}.</span> 
                                {q.questionText}
                            </h3>
                            <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-500">
                                {q.marks} Marks
                            </span>
                        </div>
                        
                        <div className="mt-4 space-y-3 pl-6">
                            {q.questionType === 'MCQ' && q.options.map((opt, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-xl border border-gray-200 hover:border-[#0056D2] transition-colors">
                                    <input 
                                        type="radio" 
                                        name={`q_${q._id}`} 
                                        value={opt} 
                                        onChange={() => handleAnswerChange(q._id, opt, 'MCQ')}
                                        className="w-4 h-4 text-[#0056D2]"
                                    />
                                    <span className="font-medium text-sm text-richblack-900">{opt}</span>
                                </label>
                            ))}
                            
                            {q.questionType === 'MSQ' && q.options.map((opt, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-xl border border-gray-200 hover:border-[#0056D2] transition-colors">
                                    <input 
                                        type="checkbox" 
                                        value={opt} 
                                        onChange={() => handleAnswerChange(q._id, opt, 'MSQ')}
                                        className="w-4 h-4 text-[#0056D2] rounded"
                                    />
                                    <span className="font-medium text-sm text-richblack-900">{opt}</span>
                                </label>
                            ))}

                            {q.questionType === 'TrueFalse' && ['True', 'False'].map((opt, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-xl border border-gray-200 hover:border-[#0056D2] transition-colors w-1/3">
                                    <input 
                                        type="radio" 
                                        name={`q_${q._id}`} 
                                        value={opt} 
                                        onChange={() => handleAnswerChange(q._id, opt, 'TrueFalse')}
                                        className="w-4 h-4 text-[#0056D2]"
                                    />
                                    <span className="font-medium text-sm text-richblack-900">{opt}</span>
                                </label>
                            ))}

                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="bg-[#0056D2] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#0043A4] transition-all disabled:opacity-70 shadow-lg shadow-blue-500/20"
                >
                    {submitting ? 'Submitting...' : 'Submit Assignment'}
                </button>
            </div>
        </div>
    );
}
