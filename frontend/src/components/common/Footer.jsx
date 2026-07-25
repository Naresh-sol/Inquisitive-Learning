import React from "react";
import { FooterLink2 } from "../../../data/footer-links";
import { Link } from "react-router-dom";


// Images
import StudyNotionLogo from "../../assets/Logo/Logo-Full-Light.png";

// footer data
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];



const Footer = () => {
  return (
    <div className="bg-[#1c1d1f] w-full">
      
      {/* Upper Footer Columns */}
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between w-11/12 max-w-maxContent text-[#b0b2c3] leading-6 mx-auto py-14">
        
        {/* Left Column: Branding / Identity */}
        <div className="w-full lg:w-[25%] flex flex-col gap-3">
          <div className="flex items-center gap-x-2">
            <img src={StudyNotionLogo} alt="Inquisitive learning" className="w-9 h-9 object-contain" />
            <span className="text-xl font-bold tracking-wide font-inter text-white">
              Inquisitive learning
            </span>
          </div>
        </div>

        {/* Right Columns: Navigation / Support */}
        <div className="w-full lg:w-[70%] flex flex-wrap flex-row justify-between gap-6">
          
          {/* Column 1: Support */}
          <div className="w-[45%] sm:w-[25%] mb-7 flex flex-col gap-3">
            <h1 className="text-white font-semibold text-[16px]">Support</h1>
            <div className="text-[14px] cursor-pointer hover:text-white transition-all duration-200 mt-1">
              <Link to={"/help-center"}>Help Center</Link>
            </div>
          </div>

          {/* Columns 2 & 3: Subjects & Languages */}
          {FooterLink2.map((ele, i) => {
            return (
              <div key={i} className="w-[45%] sm:w-[30%] mb-7">
                <h1 className="text-white font-semibold text-[16px]">
                  {ele.title}
                </h1>
                <div className="flex flex-col gap-2 mt-3">
                  {ele.links.map((link, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-white transition-all duration-200"
                      >
                        <Link to={link.link}>{link.title}</Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Horizontal Divider Line */}
      <div className="border-b border-richblack-700 w-11/12 mx-auto mb-6"></div>

      {/* Bottom Footer */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-[#b0b2c3] mx-auto pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex">
            {BottomFooter.map((ele, ind) => {
              return (
                <div
                  key={ind}
                  className={` ${BottomFooter.length - 1 === ind ? "" : "border-r border-richblack-700 "}
                   px-3 cursor-pointer hover:text-white transition-all duration-200`}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center flex flex-col sm:flex-row">
            <span>Made by- Naresh Solanki <br></br>© 2026 Inquisitive Learning</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Footer;