import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { RiDeleteBin6Line } from 'react-icons/ri'




export default function RequirementsField({ name, label, register, setValue, errors, }) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 }, requirementsList)
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
  }, [requirementsList])

  // add instruction
  const handleAddRequirement = () => {
    if (requirement && !requirementsList.includes(requirement)) {
      setRequirementsList([...requirementsList, requirement])
      setRequirement("")
    }
  }

  // delete instruction
  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-sm text-richblack-900 font-medium" htmlFor={name}>
          {label} <sup className="text-red-500">*</sup>
        </label>
      )}

      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder="e.g. A laptop with internet connection"
          className="w-full rounded-xl bg-gray-50/50 border border-gray-200 px-4 py-3 text-richblack-900 outline-none focus:bg-white focus:border-[#0056D2] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm placeholder:text-gray-400"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-bold text-[#0056D2] text-sm flex items-center justify-center border-2 border-dashed border-[#0056D2]/30 px-4 py-2.5 rounded-xl hover:bg-blue-50/50 hover:border-[#0056D2] w-full transition-all mt-2"
        >
          <span className="mr-2 text-lg">+</span> Add another objective
        </button>
      </div>

      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-900 font-medium text-sm py-1">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-red-500 opacity-60 hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveRequirement(index)}
              >
                {/* clear  */}
                <RiDeleteBin6Line className="text-sm duration-200" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="ml-1 text-xs font-semibold text-red-500">
          {label || "This field"} is required
        </span>
      )}
    </div>
  )
}