import React from "react"
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"
import EditCourse from './../EditCourse/EditCourse';


export default function RenderSteps() {

  const { step } = useSelector((state) => state.course)
  const { editCourse } = useSelector(state => state.course)


  const steps = [
    { id: 1, title: "INFO" },
    { id: 2, title: "CURRICULUM" },
    { id: 3, title: "PUBLISH" },
  ]

  return (
    <>
      <div className="relative mb-16 flex w-full max-w-4xl mx-auto justify-between items-center px-8">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`grid aspect-square w-10 place-items-center rounded-full text-sm font-bold transition-all duration-300
                    ${step === item.id ? "bg-[#0056D2] text-white shadow-[0_0_15px_rgba(0,86,210,0.4)]"
                    : step > item.id ? "bg-green-500 text-white shadow-md" : "bg-gray-100 text-gray-500 border border-gray-200"}
                     `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-white" size={14} />
                ) : (
                  item.id
                )}
              </div>
              <p className={`absolute top-12 text-[10px] font-extrabold tracking-widest uppercase whitespace-nowrap
                ${step >= item.id ? "text-[#0056D2]" : "text-gray-400"}
              `}>
                {item.title}
              </p>
            </div>

            {/* connecting lines  */}
            {item.id !== steps.length && (
              <div
                className={`flex-1 h-[2px] mx-4 transition-all duration-300 rounded-full ${step > item.id ? "bg-green-500" : "bg-gray-200"} `}
              >
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}