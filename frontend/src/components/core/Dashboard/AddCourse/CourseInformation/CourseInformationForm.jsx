import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { FiInfo, FiTarget, FiList, FiCheckCircle, FiArrowRight, FiSave, FiEye, FiImage } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function CourseInformationForm() {

  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode 
    // It will add value in input field
    if (editCourse) {
      // console.log("editCourse ", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
      setValue("courseDifficulty", course.difficulty || "All Levels")
    }

    getCategories()
  }, [])



  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseDifficulty !== (course.difficulty || "All Levels") ||
      currentValues.courseImage !== course.thumbnail) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log('data -> ',data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
          // formData.append("tag", data.courseTags)
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements))
        }
        if (currentValues.courseDifficulty !== (course.difficulty || "All Levels")) {
          formData.append("difficulty", data.courseDifficulty)
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }

        // send data to backend
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    // user has visted first time to step 1 
    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("difficulty", data.courseDifficulty)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  const currentTitle = watch("courseTitle");
  const currentDesc = watch("courseShortDesc");

  const inputClasses = "w-full rounded-xl bg-gray-50/50 border border-gray-200 px-4 py-3 text-richblack-900 outline-none focus:bg-white focus:border-[#0056D2] focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm placeholder:text-gray-400";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16 mt-8"
    >
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Basic Details */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-8">
            <FiInfo className="text-[#0056D2] text-2xl" />
            <h2 className="text-2xl font-extrabold text-richblack-900 tracking-tight">Basic Details</h2>
          </div>

          <div className="space-y-6">
            {/* Course Title */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="courseTitle">
                Course Title <sup className="text-red-500">*</sup>
              </label>
              <input
                id="courseTitle"
                placeholder="e.g. Masterclass in Advanced Digital Strategy"
                {...register("courseTitle", { required: true })}
                className={inputClasses}
              />
              {errors.courseTitle && (
                <span className="ml-1 text-xs font-semibold text-red-500">Course title is required</span>
              )}
            </div>

            {/* Course Short Description */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="courseShortDesc">
                Short Description <sup className="text-red-500">*</sup>
              </label>
              <textarea
                id="courseShortDesc"
                placeholder="Provide a compelling 160-character summary that captures attention."
                {...register("courseShortDesc", { required: true })}
                className={`${inputClasses} min-h-[120px] resize-none`}
              />
              {errors.courseShortDesc && (
                <span className="ml-1 text-xs font-semibold text-red-500">Course Description is required</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Course Category */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="courseCategory">
                  Category <sup className="text-red-500">*</sup>
                </label>
                <select
                  {...register("courseCategory", { required: true })}
                  defaultValue=""
                  id="courseCategory"
                  className={`${inputClasses} cursor-pointer appearance-none`}
                >
                  <option value="" disabled>Select a category</option>
                  {!loading && courseCategories?.map((category, indx) => (
                    <option key={indx} value={category?._id}>{category?.name}</option>
                  ))}
                </select>
                {errors.courseCategory && (
                  <span className="ml-1 text-xs font-semibold text-red-500">Course Category is required</span>
                )}
              </div>

              {/* Difficulty Level */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="courseDifficulty">
                  Difficulty <sup className="text-red-500">*</sup>
                </label>
                <select
                  {...register("courseDifficulty", { required: true })}
                  defaultValue="All Levels"
                  id="courseDifficulty"
                  className={`${inputClasses} cursor-pointer appearance-none`}
                >
                  <option value="All Levels">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                {errors.courseDifficulty && (
                  <span className="ml-1 text-xs font-semibold text-red-500">Difficulty is required</span>
                )}
              </div>

              {/* Course Price */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="coursePrice">
                  Price (USD) <sup className="text-red-500">*</sup>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input
                    id="coursePrice"
                    placeholder="0.00"
                    {...register("coursePrice", {
                      required: true,
                      valueAsNumber: true,
                      pattern: { value: /^(0|[1-9]\d*)(\.\d+)?$/ },
                    })}
                    className={`${inputClasses} pl-8`}
                  />
                </div>
                {errors.coursePrice && (
                  <span className="ml-1 text-xs font-semibold text-red-500">Course Price is required</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-4">
            <FiTarget className="text-[#0056D2] text-2xl" />
            <h2 className="text-2xl font-extrabold text-richblack-900 tracking-tight">Learning Objectives</h2>
          </div>
          <p className="text-gray-500 font-medium text-sm mb-6">What will your students be able to do after finishing this course?</p>
          
          <div className="flex flex-col space-y-2">
            <textarea
              id="courseBenefits"
              placeholder="e.g. Master the art of user persona creation&#10;e.g. Build interactive prototypes in Figma"
              {...register("courseBenefits", { required: true })}
              className={`${inputClasses} min-h-[140px] resize-none`}
            />
            {errors.courseBenefits && (
              <span className="ml-1 text-xs font-semibold text-red-500">Benefits of the course is required</span>
            )}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-4">
            <FiList className="text-[#0056D2] text-2xl" />
            <h2 className="text-2xl font-extrabold text-richblack-900 tracking-tight">Requirements & Instructions</h2>
          </div>
          <p className="text-gray-500 font-medium text-sm mb-6">Mention necessary software, prior knowledge, or physical tools students need before starting.</p>
          
          <RequirementsField
            name="courseRequirements"
            label=""
            register={register}
            setValue={setValue}
            errors={errors}
          />
        </div>

        {/* Sticky Actions */}
        <div className="flex justify-end gap-4 mt-8">
           {editCourse && (
              <button
                type="button"
                onClick={() => dispatch(setStep(2))}
                disabled={loading}
                className="bg-gray-100 text-gray-600 py-3 px-8 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
              >
                Skip
              </button>
           )}
           <button 
             type="submit" 
             disabled={loading}
             className="bg-[#0056D2] text-white py-3 px-8 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:bg-[#0043A4] transition-all disabled:opacity-70 group"
           >
              <span>{editCourse ? "Save & Continue" : "Next: Curriculum Builder"}</span>
              <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-1 space-y-6">

        {/* Pro-Tip */}
        <div className="bg-[#0056D2]/5 rounded-3xl p-6 border border-[#0056D2]/10">
          <div className="flex items-start gap-4">
            <FiCheckCircle className="text-[#0056D2] text-2xl shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-[#0056D2] text-sm mb-1">Pro-Tip</h4>
              <p className="text-xs font-medium text-[#0056D2]/80 leading-relaxed">A compelling description increases enrollment by 30%. Focus on student outcomes!</p>
            </div>
          </div>
        </div>

        {/* Course Tags & Media wrapper */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-6 space-y-8">
           
           <div>
             <h4 className="font-bold text-richblack-900 text-xs uppercase tracking-widest mb-4">Course Tags</h4>
             <ChipInput
                label=""
                name="courseTags"
                placeholder="Add tag..."
                register={register}
                errors={errors}
                setValue={setValue}
              />
              <p className="text-[10px] text-gray-400 mt-2">Press enter to add. Used for discoverability.</p>
           </div>

           <div>
             <h4 className="font-bold text-richblack-900 text-xs uppercase tracking-widest mb-4">Course Thumbnail</h4>
             <Upload
                name="courseImage"
                label=""
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
              />
           </div>
        </div>

      </div>
    </form>
  )
}


