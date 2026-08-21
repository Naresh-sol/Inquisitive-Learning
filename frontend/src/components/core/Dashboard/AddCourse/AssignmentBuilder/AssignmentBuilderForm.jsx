import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { setStep } from '../../../../../slices/courseSlice';
import { createAssignment, getCourseAssignments } from '../../../../../services/operations/assignmentAPI';
import QuestionForm from './QuestionForm';

export default function AssignmentBuilderForm() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [isAddingAssignment, setIsAddingAssignment] = useState(false);

    useEffect(() => {
        const fetchAssignments = async () => {
            if (course?._id) {
                const res = await getCourseAssignments(course._id, token);
                if (res) {
                    setAssignments(res);
                }
            }
        };
        fetchAssignments();
    }, [course?._id, token]);

    const onSubmit = async (data) => {
        setLoading(true);
        const result = await createAssignment({
            courseId: course._id,
            title: data.title,
            description: data.description,
            timeLimit: data.timeLimit || 0
        }, token);

        if (result) {
            setAssignments([...assignments, result]);
            setValue("title", "");
            setValue("description", "");
            setValue("timeLimit", "");
            setIsAddingAssignment(false);
        }
        setLoading(false);
    };

    const goBack = () => {
        dispatch(setStep(2));
    };

    const goToNext = () => {
        dispatch(setStep(4));
    };

    const handleQuestionAdded = (assignmentId, newQuestion) => {
        setAssignments(assignments.map(assig => 
            assig._id === assignmentId 
                ? { ...assig, questions: [...assig.questions, newQuestion] } 
                : assig
        ));
    };

    return (
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-8 space-y-8 mt-8">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-extrabold text-richblack-900 tracking-tight">Assignment Builder</h2>
                <button
                    type="button"
                    onClick={() => setIsAddingAssignment(!isAddingAssignment)}
                    className="bg-[#0056D2] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-[#0043A4] transition-all"
                >
                    <IoAddCircleOutline className="text-xl" /> Add Assignment
                </button>
            </div>

            {isAddingAssignment && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-richblack-900">Title</label>
                        <input
                            disabled={loading}
                            placeholder="Enter Assignment Title"
                            {...register("title", { required: true })}
                            className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-richblack-900 outline-none focus:border-[#0056D2] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm"
                        />
                        {errors.title && (
                            <span className="ml-1 text-xs font-semibold text-red-500">Title is required</span>
                        )}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-richblack-900">Description</label>
                        <textarea
                            disabled={loading}
                            placeholder="Enter Assignment Description"
                            {...register("description")}
                            className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-richblack-900 outline-none focus:border-[#0056D2] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm min-h-[100px]"
                        />
                    </div>

                    <div className="flex justify-end gap-x-4 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsAddingAssignment(false)}
                            className="text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors py-2 px-4"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-richblack-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-richblack-800 transition-all"
                        >
                            Create Assignment
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-6">
                {assignments.map((assignment) => (
                    <div key={assignment._id} className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-richblack-900">{assignment.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{assignment.description}</p>
                            </div>
                        </div>
                        
                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <h4 className="text-lg font-semibold mb-4">Questions ({assignment.questions?.length || 0})</h4>
                            
                            <div className="space-y-4 mb-4">
                                {assignment.questions?.map((q, index) => (
                                    <div key={q._id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="font-medium text-richblack-900">Q{index + 1}. {q.questionText}</p>
                                        <p className="text-xs text-gray-500 mt-1">Type: {q.questionType} | Marks: {q.marks}</p>
                                    </div>
                                ))}
                            </div>

                            <QuestionForm assignmentId={assignment._id} onQuestionAdded={handleQuestionAdded} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-x-4 pt-6 border-t border-gray-100">
                <button
                    onClick={goBack}
                    className="bg-gray-100 text-gray-600 py-3 px-8 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                    <MdNavigateBefore className="text-2xl" /> Back
                </button>

                <button
                    disabled={loading}
                    onClick={goToNext}
                    className="bg-[#0056D2] text-white py-3 px-8 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:bg-[#0043A4] transition-all disabled:opacity-70 group"
                >
                    <span>Next: Publish Course</span>
                    <MdNavigateNext className="text-2xl group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
