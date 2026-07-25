import React, { useState } from 'react';
import RatingStars from '../../common/RatingStars';
import { IoClose } from 'react-icons/io5';

const ReviewCard = ({ review }) => {
  const { user, rating, review: reviewText } = review;
  const firstName = user?.firstName || "Anonymous";
  const lastName = user?.lastName || "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0) || ""}`.toUpperCase();

  // Determine a dummy date since backend model doesn't explicitly store timestamps per review (assuming 2 weeks ago)
  const timeAgo = "2 weeks ago";

  return (
    <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {user?.image ? (
            <img src={user.image} alt={firstName} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#E6F0FF] text-[#0056D2] font-bold flex items-center justify-center">
              {initials}
            </div>
          )}
          <div>
            <h4 className="text-richblack-900 font-bold text-sm">{`${firstName} ${lastName}`}</h4>
            <RatingStars Review_Count={Number(rating)} Star_Size={12} />
          </div>
        </div>
        <span className="text-gray-400 text-xs">{timeAgo}</span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        {reviewText}
      </p>
    </div>
  );
};

const StudentReviews = ({ reviews, avgReviewCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!reviews || reviews.length === 0) {
    return null; // Don't show the section if there are no reviews
  }

  // Display only the first review on the main page
  const visibleReview = reviews[0];

  return (
    <div className="my-8">
      {/* Header section */}
      <div className="mb-6">
        <h2 className="text-[28px] font-semibold text-richblack-900 mb-2">Student Reviews</h2>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#0056D2] font-bold text-lg">{avgReviewCount || "0.0"}</span>
          <RatingStars Review_Count={avgReviewCount} Star_Size={16} />
          <span className="text-gray-500">Course Rating · {reviews.length} Review{reviews.length > 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Main Page Review Card */}
      <ReviewCard review={visibleReview} />

      {/* See more button */}
      <div className="flex justify-center mt-2">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="text-[#0056D2] font-bold hover:underline flex items-center gap-1 text-sm"
        >
          See more reviews &rarr;
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="w-11/12 max-w-[600px] bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-100 max-h-[85vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-richblack-900">All Student Reviews</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-richblack-900 transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Modal Body - Scrollable Reviews List */}
            <div className="overflow-y-auto pr-2 custom-scrollbar">
              {reviews.map((rev, index) => (
                <ReviewCard key={index} review={rev} />
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default StudentReviews;
