import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";

const FEATURED_COURSES_DATA = [
  {
    id: "react-masterclass",
    title: "Advanced React & Redux Masterclass",
    category: "DEVELOPMENT",
    instructor: "By Dr. John Smith",
    rating: 4.9,
    reviews: 1420,
    price: "$99.99",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
    badge: "BEST SELLER",
    badgeStyle: "bg-[#0c2e2b] text-[#05d9a4] border-[#0f3d35]",
  },
  {
    id: "tensorflow-python",
    title: "Deep Learning with TensorFlow & Python",
    category: "DATA SCIENCE",
    instructor: "By Dr. John Smith",
    rating: 4.8,
    reviews: 830,
    price: "$119.99",
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=600&auto=format&fit=crop",
    badge: "POPULAR",
    badgeStyle: "bg-[#0b2830] text-[#028090] border-[#0b3c4c]",
  },
  {
    id: "figma-design-system",
    title: "Figma Design System Masterclass",
    category: "DESIGN",
    instructor: "By Dr. John Smith",
    rating: 4.7,
    reviews: 512,
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=600&auto=format&fit=crop",
    badge: "TRENDING",
    badgeStyle: "bg-[#1f1a30] text-[#9b5de5] border-[#2c224d]",
  },
];

const FeaturedCourses = () => {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-10 my-20 text-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Featured Courses
          </h2>
          <p className="text-richblack-300 mt-3 text-lg font-medium">
            Handpicked selections to kickstart your learning journey.
          </p>
        </div>
        
        <Link 
          to="/catalog/web-development"
          className="text-caribbeangreen-100 hover:text-caribbeangreen-50 flex items-center gap-1 font-semibold text-base hover:underline transition-all duration-200 whitespace-nowrap"
        >
          Browse All Courses &rarr;
        </Link>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {FEATURED_COURSES_DATA.map((course) => (
          <div 
            key={course.id}
            className="flex flex-col bg-richblack-800 border border-richblack-700/50 rounded-2xl overflow-hidden hover:shadow-[0_10px_20px_rgba(31,162,255,0.1)] hover:-translate-y-2 transition-all duration-300 relative group"
          >
            {/* Absolute Badge */}
            {course.badge && (
              <span className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border backdrop-blur-sm ${course.badgeStyle}`}>
                {course.badge}
              </span>
            )}

            {/* Thumbnail Image */}
            <div className="relative overflow-hidden h-[240px] w-full bg-richblack-900">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop";
                }}
              />
            </div>

            {/* Course Information */}
            <div className="flex flex-col gap-3 p-6 flex-grow">
              <p className="text-xs font-bold text-caribbeangreen-300 uppercase tracking-wider">
                {course.category}
              </p>
              
              <h3 className="text-xl font-bold text-richblack-5 leading-snug group-hover:text-yellow-25 transition-all duration-200 line-clamp-2">
                {course.title}
              </h3>
              
              <p className="text-sm text-richblack-300">
                {course.instructor}
              </p>

              {/* Rating Section */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-100 font-bold text-base">
                  {course.rating.toFixed(1)}
                </span>
                <RatingStars Review_Count={course.rating} Star_Size={18} />
                <span className="text-richblack-400 text-sm">
                  ({course.reviews} reviews)
                </span>
              </div>

              {/* Price & Details Row */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-richblack-700/50">
                <span className="text-2xl font-bold text-caribbeangreen-300">
                  {course.price}
                </span>
                
                <Link to={`/courses/${course.id}`}>
                  <button className="bg-[#161d29] hover:bg-richblack-700 border border-richblack-700 hover:border-richblack-600 text-richblack-5 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer">
                    Browse Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourses;
