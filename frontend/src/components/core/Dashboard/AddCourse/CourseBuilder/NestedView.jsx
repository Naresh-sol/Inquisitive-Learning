import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu, RxDragHandleDots2 } from "react-icons/rx"
import { FiPlayCircle } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"

import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"




export default function NestedView({ handleChangeEditSectionName }) {

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  // Delele Section
  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({ sectionId, courseId: course._id, token, })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  // Delete SubSection 
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      // update the structure of course - As we have got only updated section details 
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  const formatDuration = (timeDuration) => {
    if (!timeDuration) return "00:00"
    const totalSeconds = parseInt(timeDuration, 10)
    if (isNaN(totalSeconds)) return "00:00"
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <>
      <div
        className="space-y-6"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section) => (
          // Section Dropdown
          <details key={section._id} open className="group bg-gray-50/50 border border-gray-100 rounded-2xl overflow-hidden transition-all duration-200">
            {/* Section Dropdown Content */}
            <summary className="flex cursor-pointer items-center justify-between p-4 bg-gray-50/80 hover:bg-gray-100 transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
              {/* sectionName */}
              <div className="flex items-center gap-x-4">
                <RxDragHandleDots2 className="text-2xl text-gray-400 hover:text-gray-600 cursor-grab" />
                <AiFillCaretDown className="text-sm text-gray-500 transform group-open:rotate-180 transition-transform duration-200" />
                <p className="font-extrabold text-richblack-900 text-lg">
                  {section.sectionName}
                </p>
              </div>

              <div className="flex items-center gap-x-1">
                {/* Change Edit SectionName button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <MdEdit className="text-xl text-gray-400 hover:text-[#0056D2]" />
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <RiDeleteBin6Line className="text-xl text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </summary>
            
            <div className="px-6 pb-6 pt-4 space-y-3 bg-gray-50/30">
              {/* Render All Sub Sections Within a Section */}
              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#0056D2]/30 transition-all"
                >
                  <div className="flex items-center gap-x-4">
                    <FiPlayCircle className="text-2xl text-[#0056D2]/60" />
                    <p className="font-semibold text-richblack-900">
                      {data.title}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-4"
                  >
                    <div className="bg-blue-50 text-[#0056D2] font-bold text-[10px] px-2 py-1 rounded-md tracking-wider">
                       {formatDuration(data.timeDuration)}
                    </div>
                    <div className="flex items-center gap-x-1 border-l border-gray-100 pl-4">
                      <button
                        onClick={() =>
                          setEditSubSection({ ...data, sectionId: section._id })
                        }
                        className="p-2 hover:bg-gray-50 rounded transition-colors"
                      >
                        <MdEdit className="text-lg text-gray-400 hover:text-[#0056D2]" />
                      </button>
                      <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this Sub-Section?",
                            text2: "This lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () =>
                              handleDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                        className="p-2 hover:bg-gray-50 rounded transition-colors"
                      >
                        <RiDeleteBin6Line className="text-lg text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* Add New Lecture to Section */}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-4 flex items-center gap-x-2 text-[#0056D2] font-bold text-sm hover:text-[#0043A4] transition-colors"
              >
                <FaPlus className="text-sm" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>



      {/* Modal Display */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </>
  )
}