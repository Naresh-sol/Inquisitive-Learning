import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import { getAllCourses } from "../../../services/operations/courseDetailsAPI";
import GetAvgRating from "../../../utils/avgRating";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        if (res) {
          // Take top 3 courses (e.g. latest or highest enrolled)
          setCourses(res.slice(0, 3));
        }
      } catch (error) {
        console.error("Could not fetch featured courses", error);
      }
    };
    fetchCourses();
  }, []);

  const getBadge = (index) => {
    if (index === 0) return { text: "BEST SELLER", style: "bg-green-100 text-green-700 border-green-200" };
    if (index === 1) return { text: "POPULAR", style: "bg-blue-100 text-blue-700 border-blue-200" };
    if (index === 2) return { text: "TRENDING", style: "bg-purple-100 text-purple-700 border-purple-200" };
    return null;
  };

  return (
    <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-10 my-20 text-richblack-900">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-richblack-900">
            Featured Courses
          </h2>
          <p className="text-richblack-300 mt-3 text-lg font-medium">
            Handpicked selections to kickstart your learning journey.
          </p>
        </div>
        
        <Link 
          to="/catalog/web-development"
          className="text-[#0056D2] hover:text-[#004bb5] flex items-center gap-1 font-semibold text-base hover:underline transition-all duration-200 whitespace-nowrap"
        >
          Browse All Courses &rarr;
        </Link>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {courses.map((course, index) => {
          const badge = getBadge(index);
          const avgReviewCount = GetAvgRating(course.ratingAndReviews);
          
          return (
          <div 
            key={course._id}
            className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-[0_10px_20px_rgba(0,86,210,0.1)] hover:-translate-y-2 transition-all duration-300 relative group"
          >
            {/* Absolute Badge */}
            {badge && (
              <span className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border backdrop-blur-sm ${badge.style}`}>
                {badge.text}
              </span>
            )}

            {/* Thumbnail Image */}
            <div className="relative overflow-hidden h-[240px] w-full bg-gray-100 flex items-center justify-center">
              <img 
                src={course.thumbnail} 
                alt={course.courseName}
                className="w-full h-full object-contain bg-white transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop";
                }}
              />
            </div>

            {/* Course Information */}
            <div className="flex flex-col gap-3 p-6 flex-grow">
              <p className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">
                {course?.category?.name || "DEVELOPMENT"}
              </p>
              
              <h3 className="text-xl font-bold text-richblack-900 leading-snug group-hover:text-[#0056D2] transition-all duration-200 line-clamp-2">
                {course.courseName}
              </h3>
              
              <p className="text-sm text-richblack-300">
                By {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>

              {/* Rating Section */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-500 font-bold text-base">
                  {avgReviewCount || 0}
                </span>
                <RatingStars Review_Count={avgReviewCount || 0} Star_Size={18} />
                <span className="text-richblack-500 text-sm">
                  ({course?.ratingAndReviews?.length || 0} reviews)
                </span>
              </div>

              {/* Price & Details Row */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                <span className="text-2xl font-bold text-[#0056D2]">
                  ${course.price}
                </span>
                
                <Link to={`/courses/${course._id}`}>
                  <button className="bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 text-richblack-900 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer">
                    Browse Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCourses;
