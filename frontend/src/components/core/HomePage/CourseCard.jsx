import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";


const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div
      className={`w-[360px] lg:w-[30%] ${currentCard === cardData?.heading
        ? "bg-white shadow-[12px_12px_0_0] shadow-[#0056D2] border border-gray-200"
        : "bg-gray-100"
        }  text-richblack-900 h-[300px] box-border cursor-pointer transition-all duration-200`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-[2px] border-richblack-200 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div className={` ${currentCard === cardData?.heading ? "text-[#0056D2]" : "text-richblack-900"} font-semibold text-[20px]`}
        >
          {cardData?.heading}
        </div>

        <div className="text-richblack-600">{cardData?.description}</div>
      </div>

      <div
        className={`flex justify-between ${currentCard === cardData?.heading ? "text-[#0056D2]" : "text-richblack-600"
          } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;