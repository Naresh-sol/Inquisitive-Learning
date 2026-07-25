
import { useDispatch, useSelector } from "react-redux"

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import { deleteCourse, fetchInstructorCourses, } from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"
import Img from './../../../common/Img';
import toast from 'react-hot-toast'





export default function CoursesTable({ courses, setCourses, loading, setLoading }) {

  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 25

  // delete course
  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    const toastId = toast.loading('Deleting...');
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
    toast.dismiss(toastId)
    // console.log("All Course ", courses)
  }


  // Loading Skeleton
  const skItem = () => {
    return (
      <div className="flex border-b border-richblack-800 px-6 py-8 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className='h-[148px] min-w-[300px] rounded-xl skeleton '></div>

          <div className="flex flex-col w-[40%]">
            <p className="h-5 w-[50%] rounded-xl skeleton"></p>
            <p className="h-20 w-[60%] rounded-xl mt-3 skeleton"></p>

            <p className="h-2 w-[20%] rounded-xl skeleton mt-3"></p>
            <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Table className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* heading */}
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-3xl border-b border-b-gray-200 bg-gray-50 px-6 py-4">
            <Th className="flex-1 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
              Courses
            </Th>
            <Th className="text-left text-xs font-bold uppercase tracking-wider text-gray-500">
              Price
            </Th>
            <Th className="text-left text-xs font-bold uppercase tracking-wider text-gray-500">
              Actions
            </Th>
          </Tr>
        </Thead>


        {/* loading Skeleton */}
        {loading && <div >
          {skItem()}
          {skItem()}
          {skItem()}
        </div>
        }

        <Tbody>
          {!loading && courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-gray-500">
                No courses found
              </Td>
            </Tr>
          )
            : (
              courses?.map((course) => (
                <Tr
                  key={course._id}
                  className="flex gap-x-10 border-b border-gray-200 px-6 py-8 hover:bg-gray-50 transition-colors"
                >
                  <Td className="flex flex-1 gap-x-4 relative">
                    {/* course Thumbnail */}
                    <Img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-[148px] min-w-[270px] max-w-[270px] rounded-lg object-contain bg-white shadow-sm border border-gray-100"
                    />

                    <div className="flex flex-col">
                      <p className="text-lg font-bold text-gray-900 capitalize">{course.courseName}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                          ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                          : course.courseDescription}
                      </p>

                      {/* created At */}
                      <p className="text-[12px] text-gray-400 mt-4 font-medium">
                        Created: {formatDate(course?.createdAt)}
                      </p>

                      {/* updated At */}
                      <p className="text-[12px] text-gray-400 font-medium">
                        updated: {formatDate(course?.updatedAt)}
                      </p>

                      {/* course status */}
                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-gray-100 px-3 py-[2px] text-[12px] font-bold text-gray-500">
                          <HiClock size={14} />
                          Drafted
                        </p>)
                        :
                        (<div className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-blue-50 px-3 py-[2px] text-[12px] font-bold text-[#0056D2]">
                          <p className="flex h-3 w-3 items-center justify-center rounded-full bg-[#0056D2] text-white">
                            <FaCheck size={8} />
                          </p>
                          Published
                        </div>
                        )}
                    </div>
                  </Td>

                  <Td className="text-sm font-bold text-gray-900">₹{course.price}</Td>

                  <Td className="text-sm font-medium text-gray-400">
                    {/* Edit button */}
                    <button
                      disabled={loading}
                      onClick={() => { navigate(`/dashboard/edit-course/${course._id}`) }}
                      title="Edit"
                      className="px-2 transition-all duration-200 hover:scale-110 hover:text-[#0056D2]"
                    >
                      <FiEdit2 size={20} />
                    </button>

                    {/* Delete button */}
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...  ",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => { },
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => { },

                        })
                      }}
                      title="Delete"
                      className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </Td>
                </Tr>
              ))
            )}
        </Tbody>
      </Table>

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
