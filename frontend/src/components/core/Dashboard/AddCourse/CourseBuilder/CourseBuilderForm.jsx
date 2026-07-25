import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse, setStep, } from "../../../../../slices/courseSlice"

import IconBtn from "../../../../common/IconBtn"
import NestedView from "./NestedView"




export default function CourseBuilderForm() {
  const { register, handleSubmit, setValue, formState: { errors }, } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null) // stored section ID
  const [isAddingSection, setIsAddingSection] = useState(false)

  // handle form submission
  const onSubmit = async (data) => {
    // console.log("sent data ", data)
    setLoading(true)

    let result

    if (editSectionName) {
      result = await updateSection({ sectionName: data.sectionName, sectionId: editSectionName, courseId: course._id, }, token)
      // console.log("edit = ", result)
    } else {
      result = await createSection(
        { sectionName: data.sectionName, courseId: course._id, }, token)
    }
    // console.log("section result = ", result)
    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
      setIsAddingSection(false)
    }
    setLoading(false)
  }

  // cancel edit
  const cancelEdit = () => {
    setEditSectionName(null)
    setIsAddingSection(false)
    setValue("sectionName", "")
  }

  // Change Edit SectionName
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  // go To Next
  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return;
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section")
      return;
    }

    // all set go ahead
    dispatch(setStep(3))
  }

  // go Back
  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-8 space-y-8 mt-8">
      
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
          <h2 className="text-2xl font-extrabold text-richblack-900 tracking-tight">Course Builder</h2>
          <button 
             type="button" 
             onClick={() => setIsAddingSection(!isAddingSection)} 
             className="bg-[#0056D2] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-[#0043A4] transition-all"
          >
              <IoAddCircleOutline className="text-xl" /> Add Section
          </button>
      </div>

      {/* Conditionally render form if adding or editing section */}
      {(isAddingSection || editSectionName) && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
           <div className="flex flex-col space-y-2">
             <input
               id="sectionName"
               disabled={loading}
               placeholder="Enter Section Name (e.g., Introduction)"
               {...register("sectionName", { required: true })}
               className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-richblack-900 outline-none focus:border-[#0056D2] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm"
             />
             {errors.sectionName && (
               <span className="ml-1 text-xs font-semibold text-red-500">
                 Section name is required
               </span>
             )}
           </div>

           <div className="flex justify-end gap-x-4 mt-4">
              <button
                 type="button"
                 onClick={cancelEdit}
                 className="text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors py-2 px-4"
              >
                 Cancel
              </button>
              <button
                 type="submit"
                 disabled={loading}
                 className="bg-richblack-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-richblack-800 transition-all"
              >
                 {editSectionName ? "Save Changes" : "Create"}
              </button>
           </div>
        </form>
      )}

      {/* nested view of section - subSection */}
      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-4 pt-6 border-t border-gray-100">
        <button
          onClick={goBack}
          className="bg-gray-100 text-gray-600 py-3 px-8 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
        >
          Back
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
  )
}