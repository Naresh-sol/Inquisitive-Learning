import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FiEye } from "react-icons/fi"
import { AiOutlineUser } from "react-icons/ai"
import { toast } from "react-hot-toast"
import { addToCart } from "../../../slices/cartSlice"

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../common/RatingStars"
import { ACCOUNT_TYPE } from "../../../utils/constants"

function Course_Card({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      toast.success("Added to Cart")
      return
    }
    navigate("/login")
  }

  // Determine badge text
  const difficulty = course?.difficulty || "All Levels"

  return (
    <Link to={`/courses/${course._id}`} className="block w-full">
      <div className='bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#0056D2]/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col group h-full'>
        
        {/* Image Section */}
        <div className="relative overflow-hidden bg-gray-50 flex items-center justify-center">
          <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-[#0056D2] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {difficulty}
          </div>
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            loading="lazy"
            className={`${Height || 'h-[200px]'} w-full object-contain group-hover:scale-105 transition-transform duration-500 block`}
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#0056D2] font-bold uppercase tracking-wider">{course?.category?.name || "DEVELOPMENT"}</span>
            <span className="text-gray-500 font-medium">English</span>
          </div>

          <p className="text-lg font-bold text-richblack-900 leading-tight group-hover:text-[#0056D2] transition-colors line-clamp-2">
            {course?.courseName}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1 font-medium">
            <AiOutlineUser className="text-gray-400" />
            <span>By {course?.instructor?.firstName} {course?.instructor?.lastName}</span>
          </div>

          <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-richblack-900 font-bold">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={14} />
              <span className="text-gray-500 text-xs font-medium">({course?.ratingAndReviews?.length || 0})</span>
            </div>
            <span className="text-gray-500 text-xs font-medium">{course?.studentsEnrolled?.length || 0} students</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-richblack-900 font-extrabold text-xl">${course?.price}</span>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0056D2] hover:border-[#0056D2] transition-all bg-gray-50">
                <FiEye size={14} />
              </button>
              <button 
                onClick={handleAddToCart}
                className="bg-[#0056D2] hover:bg-[#0043A4] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}

export default Course_Card
