import { useEffect, useState } from "react"

import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

// Defining a functional component ChipInput
export default function ChipInput({ label, name, placeholder, register, errors, setValue, }) {
  const { editCourse, course } = useSelector((state) => state.course)

  // Setting up state for managing chips array
  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editCourse) {
      // setChips(JSON.parse(course?.tag))

      setChips(course?.tag)
    }

    register(name, { required: true, validate: (value) => value.length > 0 }, chips);
  }, [])

  // "Updates value whenever 'chips' is modified
  useEffect(() => {
    setValue(name, chips)
  }, [chips])

  // Function to handle user input when chips are added
  const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim()
      // Check if the input value exists and is not already in the chips array
      if (chipValue && !chips.includes(chipValue)) {
        // Add the chip to the array and clear the input
        const newChips = [...chips, chipValue]

        setChips(newChips)
        event.target.value = ""
      }
    }
  }

  // Function to handle deletion of a chip
  const handleDeleteChip = (chipIndex) => {
    // Filter the chips array to remove the chip with the given index
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }

  // Render the component
  return (
    <div className="flex flex-col space-y-2">

      {label && (
        <label className="text-sm text-richblack-900 font-medium" htmlFor={name}>
          {label} <sup className="text-red-500">*</sup>
        </label>
      )}

      <div className="flex w-full flex-wrap gap-y-2">
        {chips?.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-[#0056D2]/10 px-3 py-1 text-xs font-bold text-[#0056D2]"
          >
            {chip}

            {/* delete chip */}
            <button
              type="button"
              className="ml-2 focus:outline-none hover:text-red-500 transition-colors"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}


        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="w-full rounded-xl bg-gray-50/50 border border-gray-200 px-4 py-3 text-richblack-900 outline-none focus:bg-white focus:border-[#0056D2] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm placeholder:text-gray-400"
        />
      </div>
      {errors[name] && (
        <span className="ml-1 text-xs font-semibold text-red-500">
          {label || "This field"} is required
        </span>
      )}
    </div>
  )
}