import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    // console.log(data)
    handleCoursePublish()
  }

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-8 mt-8">
      <p className="text-2xl font-extrabold text-richblack-900 tracking-tight mb-6 pb-6 border-b border-gray-100">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg cursor-pointer">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="h-5 w-5 rounded-md border-gray-300 text-[#0056D2] focus:ring-2 focus:ring-[#0056D2]"
            />
            <span className="ml-3 font-semibold text-gray-600">
              Make this course public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="flex justify-end gap-x-4 pt-6 mt-8 border-t border-gray-100">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="bg-gray-100 text-gray-600 py-3 px-8 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#0056D2] text-white py-3 px-8 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-[#0043A4] transition-all text-sm disabled:opacity-70"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}