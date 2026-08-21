import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { addQuestionToAssignment } from '../../../../../services/operations/assignmentAPI';
import { IoAddOutline } from 'react-icons/io5';

export default function QuestionForm({ assignmentId, onQuestionAdded }) {
    const { register, handleSubmit, watch, reset, setValue } = useForm({
        defaultValues: {
            questionType: 'MCQ',
            marks: 1
        }
    });
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    
    // For MCQ and MSQ
    const [options, setOptions] = useState(['', '']); 
    // For storing correct answers indices
    const [correctIndices, setCorrectIndices] = useState([]);
    
    const questionType = watch('questionType');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
        setCorrectIndices(correctIndices.filter(i => i !== index).map(i => i > index ? i - 1 : i));
    };

    const handleCheckboxChange = (index, checked) => {
        if (questionType === 'MCQ') {
            setCorrectIndices(checked ? [index] : []);
        } else if (questionType === 'MSQ') {
            if (checked) {
                setCorrectIndices([...correctIndices, index]);
            } else {
                setCorrectIndices(correctIndices.filter(i => i !== index));
            }
        }
    };

    const onSubmit = async (data) => {
        let finalOptions = [];
        let finalCorrectAnswers = [];

        if (questionType === 'MCQ' || questionType === 'MSQ') {
            finalOptions = options.filter(opt => opt.trim() !== '');
            if (finalOptions.length < 2) {
                alert('Please provide at least 2 options.');
                return;
            }
            if (correctIndices.length === 0) {
                alert('Please select at least one correct answer.');
                return;
            }
            // Map indices to actual option text
            finalCorrectAnswers = correctIndices.map(index => finalOptions[index]);
        } else if (questionType === 'TrueFalse') {
            finalOptions = ['True', 'False'];
            finalCorrectAnswers = [data.tfCorrectAnswer];
        }

        setLoading(true);
        const questionData = {
            assignmentId,
            questionType,
            questionText: data.questionText,
            options: finalOptions,
            correctAnswers: finalCorrectAnswers,
            marks: data.marks
        };

        const result = await addQuestionToAssignment(questionData, token);
        if (result) {
            onQuestionAdded(assignmentId, result);
            setIsAdding(false);
            reset();
            setOptions(['', '']);
            setCorrectIndices([]);
        }
        setLoading(false);
    };

    if (!isAdding) {
        return (
            <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="text-[#0056D2] font-bold flex items-center gap-2 hover:underline text-sm"
            >
                <IoAddOutline className="text-lg" /> Add Question
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-richblack-900">Question Type</label>
                    <select
                        {...register("questionType")}
                        className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0056D2]"
                    >
                        <option value="MCQ">Multiple Choice (Single Correct)</option>
                        <option value="MSQ">Multiple Select (Multiple Correct)</option>
                        <option value="TrueFalse">True / False</option>
                    </select>
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-richblack-900">Marks</label>
                    <input
                        type="number"
                        min="1"
                        {...register("marks", { required: true, valueAsNumber: true })}
                        className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0056D2]"
                    />
                </div>
            </div>

            <div className="flex flex-col space-y-1">
                <label className="text-xs font-semibold text-richblack-900">Question Text</label>
                <textarea
                    {...register("questionText", { required: true })}
                    placeholder="Enter question here..."
                    className="w-full rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0056D2] min-h-[80px]"
                />
            </div>

            {(questionType === 'MCQ' || questionType === 'MSQ') && (
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-richblack-900">Options & Correct Answer</label>
                    {options.map((opt, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <input
                                type={questionType === 'MCQ' ? "radio" : "checkbox"}
                                name="correctOption"
                                checked={correctIndices.includes(index)}
                                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                className="w-4 h-4 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={opt}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                className="flex-1 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0056D2]"
                                required
                            />
                            {options.length > 2 && (
                                <button type="button" onClick={() => removeOption(index)} className="text-red-500 text-xs font-bold">Remove</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addOption} className="text-[#0056D2] text-xs font-bold hover:underline">
                        + Add Option
                    </button>
                </div>
            )}

            {questionType === 'TrueFalse' && (
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-richblack-900">Correct Answer</label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                            <input type="radio" value="True" {...register("tfCorrectAnswer", { required: true })} className="w-4 h-4" />
                            True
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                            <input type="radio" value="False" {...register("tfCorrectAnswer", { required: true })} className="w-4 h-4" />
                            False
                        </label>
                    </div>
                </div>
            )}

            <div className="flex justify-end gap-x-3 mt-4 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="text-xs font-bold text-gray-500 hover:text-gray-700 py-2 px-3"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0056D2] text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#0043A4] transition-all"
                >
                    Save Question
                </button>
            </div>
        </form>
    );
}
