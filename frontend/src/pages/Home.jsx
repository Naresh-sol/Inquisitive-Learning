import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';

import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import InstructorSection from '../components/core/HomePage/InstructorSection'
import FAQSection from '../components/core/HomePage/FAQSection'
import Footer from '../components/common/Footer'
import FeaturedCourses from '../components/core/HomePage/FeaturedCourses'
import ReviewSlider from '../components/common/ReviewSlider'
import Course_Slider from '../components/core/Catalog/Course_Slider'

import { getCatalogPageData } from '../services/operations/pageAndComponentData'

import { MdOutlineRateReview } from 'react-icons/md'
import { FaArrowRight } from "react-icons/fa"

import { motion } from 'framer-motion'
import { fadeIn, } from './../components/common/motionFrameVarients';

import homeHeroBg from '../assets/Images/home-bg.png'

// background random images
import backgroundImg1 from '../assets/Images/random bg img/coding bg1.jpg'
import backgroundImg2 from '../assets/Images/random bg img/coding bg2.jpg'
import backgroundImg3 from '../assets/Images/random bg img/coding bg3.jpg'
import backgroundImg4 from '../assets/Images/random bg img/coding bg4.jpg'
import backgroundImg5 from '../assets/Images/random bg img/coding bg5.jpg'
import backgroundImg6 from '../assets/Images/random bg img/coding bg6.jpeg'
import backgroundImg7 from '../assets/Images/random bg img/coding bg7.jpg'
import backgroundImg8 from '../assets/Images/random bg img/coding bg8.jpeg'
import backgroundImg9 from '../assets/Images/random bg img/coding bg9.jpg'
import backgroundImg10 from '../assets/Images/random bg img/coding bg10.jpg'
import backgroundImg111 from '../assets/Images/random bg img/coding bg11.jpg'


const randomImges = [
    backgroundImg1,
    backgroundImg2,
    backgroundImg3,
    backgroundImg4,
    backgroundImg5,
    backgroundImg6,
    backgroundImg7,
    backgroundImg8,
    backgroundImg9,
    backgroundImg10,
    backgroundImg111,
];

// hardcoded



const Home = () => {

    // get background random images
    const [backgroundImg, setBackgroundImg] = useState(null);

    useEffect(() => {
        const bg = randomImges[Math.floor(Math.random() * randomImges.length)]
        setBackgroundImg(bg);
    }, [])

    // console.log('bg ==== ', backgroundImg)

    // get courses data
    const [CatalogPageData, setCatalogPageData] = useState(null);
    const categoryID = "6506c9dff191d7ffdb4a3fe2" // hard coded
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCatalogPageData = async () => {

            const result = await getCatalogPageData(categoryID, dispatch);
            setCatalogPageData(result);
            // console.log("page data ==== ",CatalogPageData);
        }
        if (categoryID) {
            fetchCatalogPageData();
        }
    }, [categoryID])


    // console.log('================ CatalogPageData?.selectedCourses ================ ', CatalogPageData)


    return (
        <div style={{ backgroundColor: '#edfafa', backgroundImage: 'linear-gradient(135deg, rgba(237, 250, 250, 1) 20%, rgba(255, 247, 237, 1) 100%)' }} className="w-full min-h-screen text-richblack-900">
            <div className=' '>
                {/*Section1  */}
                <div
                    className="w-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${homeHeroBg})` }}
                >
                    <div className='relative min-h-[580px] md:min-h-[680px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center py-16 text-richblack-900'>

                    <Link to={"/signup"}>
                        <div className='group mx-auto rounded-full bg-white shadow-[0_3px_15px_rgba(0,0,0,0.08)] text-richblack-900 font-bold
                                        transition-all duration-200 hover:scale-95 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] w-fit mb-2'>
                            <div className='flex flex-row items-center gap-2 px-8 py-[10px] text-[15px]'>
                                <p>Become an Instructor</p>
                                <FaArrowRight />
                            </div>
                        </div>
                    </Link>

                    <motion.div
                        variants={fadeIn('left', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='text-center text-4xl sm:text-5xl lg:text-6xl font-bold mt-6 leading-tight'
                    >
                        Empower Your Future with
                        <HighlightText text={" Coding Skills"} />
                    </motion.div>

                    <motion.div
                        variants={fadeIn('right', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='mt-6 w-[80%] text-center text-lg lg:text-xl font-medium text-richblack-300 leading-relaxed'
                    >
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                    </motion.div>

                    <div className='flex flex-row gap-6 mt-10'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <span className='text-base px-2'>Learn More</span>
                        </CTAButton>
                    </div>
                </div>
                </div>

                {/* animated code */}
                <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-richblack-900 justify-between'>
                    {/* Code block 1 */}
                    <div className='w-full'>
                        <CodeBlocks
                            position={"lg:flex-row"}
                            heading={
                                <div className='text-3xl lg:text-4xl font-semibold'>
                                    Unlock Your
                                    <HighlightText text={"coding potential "} />
                                    with our online courses
                                </div>
                            }
                            subheading={
                                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                            }
                            ctabtn1={
                                {
                                    btnText: "try it yourself",
                                    linkto: "/signup",
                                    active: true,
                                }
                            }
                            ctabtn2={
                                {
                                    btnText: "learn more",
                                    linkto: "/login",
                                    active: false,
                                }
                            }

                            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                            codeColor={"text-[#0056D2]"}
                            backgroundGradient={"code-block1-grad"}
                        />
                    </div>


                    {/* Code block 2 */}
                    <div>
                        <CodeBlocks
                            position={"lg:flex-row-reverse"}
                            heading={
                                <div className="w-[100%] text-3xl lg:text-4xl font-semibold lg:w-[50%]">
                                    Start
                                    <HighlightText text={"coding in seconds"} />
                                </div>
                            }
                            subheading={
                                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                            }
                            ctabtn1={{
                                btnText: "Continue Lesson",
                                link: "/signup",
                                active: true,
                            }}
                            ctabtn2={{
                                btnText: "Learn More",
                                link: "/signup",
                                active: false,
                            }}
                            codeColor={"text-richblack-900"}
                            codeblock={`#include <stdio.h>\n\nint main() {\nprintf("Hello, World!\\n");\nreturn 0;\n}`}
                            backgroundGradient={"code-block2-grad"}
                        />
                    </div>




                    <FeaturedCourses />
                </div>

                {/*Section 3 */}
                <div className='mt-14 w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 text-richblack-900'>
                    <InstructorSection />
                </div>

                {/* FAQ Section */}
                <FAQSection />

                {/*Footer */}
                <Footer />
            </div >
        </div>
    )
}

export default Home
