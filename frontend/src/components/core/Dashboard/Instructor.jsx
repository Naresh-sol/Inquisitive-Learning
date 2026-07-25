import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"
import Img from './../../common/Img';



export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])


  // get Instructor Data
  useEffect(() => {
    ; (async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      // console.log('INSTRUCTOR_API_RESPONSE.....', instructorApiData)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)

  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)


  // skeleton loading
  const skItem = () => {
    return (
      <div className="mt-5 w-full flex flex-col justify-between  rounded-xl ">
        <div className="flex border p-4 border-richblack-600 ">
          <div className="w-full">
            <p className="w-[100px] h-4 rounded-xl skeleton"></p>
            <div className="mt-3 flex gap-x-5">
              <p className="w-[200px] h-4 rounded-xl skeleton"></p>
              <p className="w-[100px] h-4 rounded-xl skeleton"></p>
            </div>

            <div className="flex justify-center items-center flex-col">
              <div className="w-[80%] h-24 rounded-xl mt-5 skeleton"></div>
              {/* circle */}
              <div className="w-60 h-60 rounded-full  mt-4 grid place-items-center skeleton"></div>
            </div>
          </div>
          {/* right column */}
          <div className="sm:flex hidden min-w-[250px] flex-col rounded-xl p-6 skeleton"></div>
        </div>

        {/* bottom row */}
        <div className="flex flex-col gap-y-6  mt-5">
          <div className="flex justify-between">
            <p className="text-lg font-bold text-richblack-5 pl-5">Your Courses</p>
            <Link to="/dashboard/my-courses">
              <p className="text-xs font-semibold text-yellow-50 hover:underline pr-5">View All</p>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row  gap-6 ">
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10 flex-col sm:flex-row gap-4">
        <div className="flex gap-4 items-center">
          <Link to="/dashboard/my-profile" className="text-[#0056D2] bg-[#0056D2]/10 p-2.5 rounded-full hover:bg-[#0056D2]/20 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-richblack-900 text-center sm:text-left tracking-tight">
              Detailed Reports
            </h1>
            <p className="font-semibold text-gray-400 text-center sm:text-left text-sm mt-1">
              Analytics for Q3 Performance Phase
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 border border-gray-300 px-5 py-2.5 rounded-xl text-sm font-bold text-[#0056D2] bg-white hover:bg-gray-50 transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            Last 30 Days
          </button>
          <button className="bg-[#0056D2] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-500/30 hover:bg-[#0043A4] transition-all">
            Export PDF
          </button>
        </div>
      </div>


      {loading ? (
        <div>
          {skItem()}
        </div>
      )
        :
        courses.length > 0 ? (
          <div>
            {/* Top Stats Cards */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8 flex-1 flex flex-col justify-between border border-gray-100">
                <p className="text-gray-500 font-semibold text-sm tracking-wide">Total Students Enrolled</p>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <h2 className="text-5xl font-extrabold text-[#0056D2] leading-none tracking-tight">{totalStudents?.toLocaleString() || 0}</h2>
                    <p className="text-green-500 font-bold text-sm mt-3 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                      +14.2% from last month
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-gray-200">
                      <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 5.69 3.117.734.734 0 0 1-.21.956 8.5 8.5 0 0 1-10.96 0 .734.734 0 0 1-.21-.956Z" clipRule="evenodd" />
                      <path d="M18.75 12.352c-.524.32-1.07.61-1.638.87.525.967.854 2.062.91 3.238.006.126.01.254.01.382v2.408a.75.75 0 0 1-.75.75H21a.75.75 0 0 0 .75-.75v-2.408c0-2.42-1.393-4.52-3-5.492Z" />
                      <path d="M5.25 12.352c.524.32 1.07.61 1.638.87-.525.967-.854 2.062-.91 3.238-.006.126-.01.254-.01.382v2.408a.75.75 0 0 0 .75.75H3a.75.75 0 0 1-.75-.75v-2.408c0-2.42 1.393-4.52 3-5.492Z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8 flex-1 flex flex-col justify-between border border-gray-100">
                <p className="text-gray-500 font-semibold text-sm tracking-wide">Total Revenue (USD)</p>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <h2 className="text-5xl font-extrabold text-[#0056D2] leading-none tracking-tight">${totalAmount?.toLocaleString() || 0}</h2>
                    <p className="text-green-500 font-bold text-sm mt-3 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                      +8.5% from last month
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-gray-200">
                      <path d="M2.25 4.5c0-.828.672-1.5 1.5-1.5h16.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-15ZM18.75 9a.75.75 0 0 0-.75-.75H6a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 .75-.75ZM18.75 13.5a.75.75 0 0 0-.75-.75H6a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 .75-.75Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="mb-8 w-full">
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorChart courses={instructorData} totalAmount={totalAmount} totalStudents={totalStudents} />
              ) : (
                <div className="w-full h-[400px] rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-8 flex flex-col justify-center items-center">
                  <p className="text-xl font-bold text-richblack-900">Visualize</p>
                  <p className="mt-2 text-lg font-medium text-gray-400">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}
            </div>

            {/* Render 3 courses */}
            <div className="rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <p className="text-xl font-extrabold text-richblack-900 tracking-tight">Course Performance Breakdown</p>
                <Link to="/dashboard/my-courses">
                  <p className="text-sm font-bold text-[#0056D2] hover:underline hover:text-[#0043A4] transition-colors">View All Courses</p>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-6 sm:space-y-0 ">
                {courses.slice(0, 3).map((course) => (
                  <div key={course._id} className="sm:w-1/3 flex flex-col group cursor-pointer">
                    <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200">
                      <Img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="h-[180px] w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="mt-4 w-full">
                      <p className="text-lg font-bold text-richblack-900 line-clamp-2 group-hover:text-[#0056D2] transition-colors">
                        {course.courseName}
                      </p>
                      <div className="mt-3 flex items-center space-x-3">
                        <p className="text-sm font-semibold text-gray-500">
                          {course.studentsEnrolled.length} students
                        </p>
                        <p className="text-xs font-medium text-gray-300">
                          |
                        </p>
                        <p className="text-sm font-bold text-[#0056D2]">
                          Rs. {course.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-12 py-24 flex flex-col items-center">
            <p className="text-center text-3xl font-extrabold text-richblack-900 mb-4">
              You haven't created any courses yet
            </p>
            <p className="text-gray-500 font-medium mb-8">Get started by creating your first course and share your knowledge.</p>
            <Link to="/dashboard/add-course">
              <button className="bg-[#0056D2] hover:bg-[#0043A4] text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all">
                Create a Course
              </button>
            </Link>
          </div>
        )}
    </div>
  )
}
