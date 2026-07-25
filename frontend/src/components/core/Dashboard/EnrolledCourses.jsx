import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import Img from './../../common/Img';
import CourseReviewModal from "../ViewCourse/CourseReviewModal";



export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const [reviewModal, setReviewModal] = useState(null)

  // fetch all users enrolled courses
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [])

  // Loading Skeleton
  const sklItem = () => {
    return (
      <div className="flex border border-richblack-200 bg-white shadow-sm px-5 py-3 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className='h-14 w-14 rounded-lg skeleton '></div>

          <div className="flex flex-col w-[40%] ">
            <p className="h-2 w-[50%] rounded-xl  skeleton"></p>
            <p className="h-2 w-[70%] rounded-xl mt-3 skeleton"></p>
          </div>
        </div>

        <div className="flex flex-[0.4] flex-col ">
          <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          <p className="h-2 w-[40%] rounded-xl skeleton mt-3"></p>
        </div>
      </div>
    )
  }

  // return if data is null
  if (enrolledCourses?.length == 0) {
    return (
      <p className="grid h-[50vh] w-full place-content-center text-center text-richblack-900 text-3xl font-semibold">
        You have not enrolled in any course yet.
      </p>)
  }



  return (
    <>
      <div className="text-4xl font-bold text-richblack-900 text-center sm:text-left">Enrolled Courses</div>
      {
        <div className="my-8 text-richblack-900">
          {/* Headings */}
          <div className="flex rounded-t-2xl bg-[#0056D2] text-white">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>


          {/* loading Skeleton */}
          {!enrolledCourses && <div >
            {sklItem()}
            {sklItem()}
            {sklItem()}
            {sklItem()}
            {sklItem()}
          </div>}

          {/* Course Names */}
          {
            enrolledCourses?.map((course, i, arr) => (
              <div
                className={`flex flex-col sm:flex-row sm:items-center border border-richblack-200 bg-white shadow-sm hover:shadow-md transition-shadow ${i === arr.length - 1 ? "rounded-b-2xl" : "rounded-none"}`}
                key={i}
              >
                <div
                  className="flex sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <Img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-bold text-richblack-900">{course.courseName}</p>
                    <p className="text-xs text-richblack-600">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>

                {/* only for smaller devices */}
                {/* duration -  progress */}
                <div className='sm:hidden'>
                  <div className=" px-2 py-3">{course?.totalDuration}</div>

                  <div className="flex sm:w-2/5 flex-col gap-2 px-2 py-3">
                    {/* {console.log('Course ============== ', course.progressPercentage)} */}

                    <p>Progress: {course.progressPercentage || 0}%</p>
                    <ProgressBar
                      completed={course.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setReviewModal({ courseId: course?._id });
                      }}
                      className="bg-[#0056D2] text-white px-4 py-2 mt-2 rounded-md font-semibold text-sm hover:bg-[#004bb5] w-fit"
                    >
                      Add Review
                    </button>
                  </div>
                </div>

                {/* only for larger devices */}
                {/* duration -  progress */}
                <div className="hidden w-1/5 sm:flex px-2 py-3">{course?.totalDuration}</div>
                <div className="hidden sm:flex flex-1 flex-col gap-2 px-2 py-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex-1 mr-4">
                      <p className="mb-2">Progress: {course.progressPercentage || 0}%</p>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height="8px"
                        isLabelVisible={false}
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setReviewModal({ courseId: course?._id });
                      }}
                      className="bg-[#0056D2] text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-[#004bb5] whitespace-nowrap"
                    >
                      Add Review
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      }
      {reviewModal && <CourseReviewModal reviewModal={reviewModal} setReviewModal={setReviewModal} />}
    </>
  )
}