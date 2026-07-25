import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FiEye } from "react-icons/fi";
import RenderSteps from "./RenderSteps"



export default function AddCourse() {
  const { step } = useSelector((state) => state.course);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto text-richblack-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Create New Course</h1>
          <p className="text-gray-500 font-medium mt-2">
            {step === 1 && "Step 1: Define the core identity and value of your course."}
            {step === 2 && "Step 2: Build the curriculum and structure of your course."}
            {step === 3 && "Step 3: Review and publish your course to the world."}
          </p>
        </div>
        <button className="bg-[#0056D2]/10 text-[#0056D2] font-bold px-6 py-2.5 rounded-full hover:bg-[#0056D2]/20 transition-all flex items-center gap-2">
           <FiEye className="text-lg" /> Preview Draft
        </button>
      </div>

      <div className="w-full">
        <RenderSteps />
      </div>
    </div>
  )
}