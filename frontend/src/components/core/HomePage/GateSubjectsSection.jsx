import React from "react";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/motionFrameVarients";
import CTAButton from "./Button";
import HighlightText from "./HighlightText";

const gateSubjects = [
    { name: "DBMS",                  icon: "🗄️",  color: "text-blue-300",   bg: "bg-blue-900/30",   border: "border-blue-700/50"   },
    { name: "Computer Networks",     icon: "🌐",  color: "text-green-300",  bg: "bg-green-900/30",  border: "border-green-700/50"  },
    { name: "Theory of Computation", icon: "🔣",  color: "text-purple-300", bg: "bg-purple-900/30", border: "border-purple-700/50" },
    { name: "Operating Systems",     icon: "💻",  color: "text-yellow-300", bg: "bg-yellow-900/30", border: "border-yellow-700/50" },
    { name: "Algorithms & DS",       icon: "📊",  color: "text-pink-300",   bg: "bg-pink-900/30",   border: "border-pink-700/50"   },
    { name: "Digital Logic",         icon: "⚡",  color: "text-orange-300", bg: "bg-orange-900/30", border: "border-orange-700/50" },
    { name: "Computer Organization", icon: "🖥️", color: "text-cyan-300",   bg: "bg-cyan-900/30",   border: "border-cyan-700/50"   },
    { name: "Discrete Mathematics",  icon: "∑",   color: "text-red-300",    bg: "bg-red-900/30",    border: "border-red-700/50"    },
];

const highlights = [
    { icon: "📘", text: "8+ Core GATE CS Subjects Covered" },
    { icon: "📝", text: "Previous Year Questions & Explanations" },
    { icon: "🗺️", text: "Concept Maps & Quick Revision Notes" },
    { icon: "🧪", text: "Topic-wise Practice Tests" },
];

const GateSubjectsSection = () => {
    return (
        <div className="w-full bg-richblack-900 py-20">

            {/* ── Section Header ── */}
            <motion.div
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.1 }}
                className="text-center mb-14 px-4"
            >
                <p className="text-sm font-bold uppercase tracking-[4px] text-yellow-25 mb-3">
                    🎯 Competitive Exam Preparation
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Crack <HighlightText text={"GATE, UGC-NET"} /> &amp; ISRO
                </h2>
                <p className="mt-4 text-richblack-300 text-lg max-w-2xl mx-auto">
                    Structured courses on every core CS subject — built specifically for aspirants who want to score big.
                </p>
            </motion.div>

            {/* ── Subject Cards Grid ── */}
            <motion.div
                variants={fadeIn("up", 0.15)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.05 }}
                className="w-11/12 max-w-maxContent mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-16"
            >
                {gateSubjects.map((subject, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.04, y: -4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`flex flex-col items-center justify-center gap-3 
                            ${subject.bg} border ${subject.border}
                            rounded-2xl p-6 cursor-default text-center
                            hover:shadow-lg hover:shadow-black/30 transition-all duration-300`}
                    >
                        <span className="text-4xl">{subject.icon}</span>
                        <span className={`text-base font-bold ${subject.color} leading-tight`}>
                            {subject.name}
                        </span>
                    </motion.div>
                ))}
            </motion.div>

            {/* ── Bottom: Animated Text + CTA ── */}
            <div className="w-11/12 max-w-maxContent mx-auto flex flex-col lg:flex-row items-center gap-12">

                {/* LEFT — Animated typing box */}
                <motion.div
                    variants={fadeIn("right", 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.1 }}
                    className="w-full lg:w-[55%]"
                >
                    <div className="relative rounded-2xl border border-richblack-600 bg-richblack-800 p-8 overflow-hidden min-h-[240px] flex flex-col justify-between">
                        {/* Glow blobs */}
                        <div className="absolute -top-12 -left-12 w-56 h-56 bg-yellow-400 rounded-full opacity-10 blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-blue-500 rounded-full opacity-10 blur-3xl pointer-events-none" />

                        <div>
                            <p className="text-sm font-bold text-richblack-400 uppercase tracking-widest mb-5">
                                📚 Currently Studying
                            </p>
                            <div className="text-2xl lg:text-3xl font-bold text-yellow-25 font-mono min-h-[3.5rem]">
                                <TypeAnimation
                                    sequence={[
                                        "DBMS — Transactions & Normalization",
                                        1800,
                                        "Computer Networks — TCP/IP & OSI Model",
                                        1800,
                                        "Theory of Computation — NFA, DFA, CFG",
                                        1800,
                                        "Operating Systems — Scheduling & Memory",
                                        1800,
                                        "Algorithms — Sorting, Graph, DP",
                                        1800,
                                        "Digital Logic — Boolean Algebra & K-Map",
                                        1800,
                                        "Discrete Maths — Sets, Relations & Logic",
                                        1800,
                                    ]}
                                    repeat={Infinity}
                                    cursor={true}
                                    style={{ display: "block", whiteSpace: "pre-line" }}
                                />
                            </div>
                        </div>

                        {/* Progress bar decoration */}
                        <div className="mt-8">
                            <div className="flex justify-between text-xs text-richblack-400 mb-2">
                                <span>Your GATE Prep Journey</span>
                                <span>Keep Going! 🚀</span>
                            </div>
                            <div className="w-full h-2 bg-richblack-700 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full"
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: "65%" }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </div>
                            <p className="text-xs text-richblack-400 mt-1">65% of syllabus recommended completed</p>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT — Highlights + CTA */}
                <motion.div
                    variants={fadeIn("left", 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.1 }}
                    className="w-full lg:w-[45%] flex flex-col gap-7 text-white"
                >
                    <h3 className="text-3xl lg:text-4xl font-bold leading-snug">
                        Everything you need to
                        <HighlightText text={" prepare & succeed"} />
                    </h3>

                    <ul className="flex flex-col gap-4">
                        {highlights.map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <span className="text-2xl mt-0.5">{item.icon}</span>
                                <span className="text-richblack-100 text-base font-medium leading-snug">
                                    {item.text}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-row gap-5 mt-2">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex items-center gap-2 text-base">
                                Start Preparing
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/about"}>
                            <span className="text-base">Learn More</span>
                        </CTAButton>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default GateSubjectsSection;
