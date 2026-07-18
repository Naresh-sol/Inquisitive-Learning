import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/motionFrameVarients";

const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundGradient,
    codeColor,
}) => {
    return (
        <motion.div
            variants={fadeIn(position === "lg:flex-row" ? "right" : "left", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className={`flex ${position} my-16 justify-between flex-col lg:gap-16 gap-10`}
        >

            {/* Section 1 — Text */}
            <div className="w-full lg:w-[48%] flex flex-col gap-8 justify-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    {heading}
                </div>

                {/* Sub Heading */}
                <p className="text-richblack-300 text-base lg:text-lg font-medium leading-relaxed">
                    {subheading}
                </p>

                {/* Button Group */}
                <div className="flex gap-6 mt-2">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
                        <div className="flex items-center gap-2 text-base">
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
                        <span className="text-base">{ctabtn2.btnText}</span>
                    </CTAButton>
                </div>
            </div>

            {/* Section 2 — Code Window */}
            <div className="w-full lg:w-[48%] h-fit code-border border border-richblack-700 rounded-2xl flex flex-row py-5 text-sm leading-7 relative overflow-hidden">

                {/* Gradient overlay */}
                <div className={`${backgroundGradient} absolute inset-0 pointer-events-none`}></div>

                {/* Line Numbers */}
                <div className="text-center flex flex-col w-[8%] select-none text-richblack-400 font-inter font-bold px-2">
                    {Array.from({ length: 14 }, (_, i) => (
                        <p key={i}>{i + 1}</p>
                    ))}
                </div>

                {/* Code */}
                <div className={`w-[92%] flex flex-col font-bold font-mono ${codeColor} pr-4`}>
                    <TypeAnimation
                        sequence={[codeblock, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                            overflowX: "hidden",
                            fontSize: "15px",
                            lineHeight: "1.8",
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default CodeBlocks;
