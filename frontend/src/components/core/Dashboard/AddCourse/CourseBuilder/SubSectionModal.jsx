import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { FiLink } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"



export default function SubSectionModal({ modalData, setModalData, add = false, view = false, edit = false, }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  // console.log("view", view)
  // console.log("edit", edit)
  // console.log("add", add)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (view || edit) {
      // console.log("modalData", modalData)
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
      setValue("lectureNotesUrl", modalData.lectureNotesUrl || "")
    }
  }, [])

  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl ||
      currentValues.lectureNotesUrl !== (modalData.lectureNotesUrl || "")
    ) {
      return true
    }
    return false
  }

  // handle the editing of subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    const formData = new FormData()
    // console.log("Values After Editing form values:", currentValues)
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo)
    }
    if (currentValues.lectureNotesUrl !== (modalData.lectureNotesUrl || "")) {
      formData.append("lectureNotesUrl", currentValues.lectureNotesUrl || "")
    }
    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      // console.log("result", result)
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    // console.log(data)
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)
    formData.append("lectureNotesUrl", data.lectureNotesUrl || "")
    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-black bg-opacity-40 backdrop-blur-sm p-4">
      <div className="my-10 w-full max-w-[700px] rounded-3xl border border-gray-200 bg-gray-100 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-white p-6 border-b border-gray-100">
          <p className="text-xl font-extrabold text-richblack-900">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-gray-500 hover:text-gray-900 transition-colors" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 px-8 py-8"
        >
          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-red-500">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-richblack-900 outline-none focus:border-[#0056D2] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm"
            />
            {errors.lectureTitle && (
              <span className="ml-1 text-xs font-semibold text-red-500">
                Lecture title is required
              </span>
            )}
          </div>
          
          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="lectureDesc">
              Lecture Description {!view && <sup className="text-red-500">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-richblack-900 outline-none focus:border-[#0056D2] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm resize-y min-h-[130px]"
            />
            {errors.lectureDesc && (
              <span className="ml-1 text-xs font-semibold text-red-500">
                Lecture Description is required
              </span>
            )}
          </div>
          
          {/* Lecture Notes URL */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="lectureNotesUrl">
              Lecture Notes URL (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <FiLink className="text-gray-400" />
              </div>
              <input
                disabled={view || loading}
                id="lectureNotesUrl"
                placeholder="Enter Lecture Notes URL (e.g. Google Drive link)"
                {...register("lectureNotesUrl")}
                className="w-full rounded-xl bg-white border border-gray-200 pl-10 pr-4 py-3 text-richblack-900 outline-none focus:border-[#0056D2] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm"
              />
            </div>
          </div>
          
          {!view && (
            <div className="flex justify-end items-center gap-x-6 pt-6 mt-8">
              <button
                type="button"
                onClick={() => (!loading ? setModalData(null) : {})}
                className="text-xs font-extrabold text-gray-500 hover:text-gray-900 tracking-widest transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#0056D2] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0043A4] transition-all tracking-wider text-sm shadow-lg shadow-blue-500/20"
              >
                {loading ? "SAVING.." : edit ? "SAVE CHANGES" : "SAVE LECTURE"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}