import React from 'react'
import Instructor from '../../../assets/Images/teacher3.png'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
import Img from './../../common/Img';

import { motion } from 'framer-motion'
import { scaleUp, fadeIn } from './../../common/motionFrameVarients';


const InstructorSection = () => {
  return (
    <div className='py-16'>
      <div className='flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-center'>

        <motion.div
          variants={scaleUp}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.1 }}
          className='lg:w-[50%]'>
          <Img
            src={Instructor}
            alt="Instructor"
            className='shadow-white rounded-3xl w-full'
          />
        </motion.div>

        <motion.div
          variants={fadeIn('left', 0.1)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.1 }}
          className='lg:w-[50%] flex flex-col gap-6'
        >
          <div className='text-4xl lg:text-5xl font-bold text-white leading-tight'>
            Become an
            <HighlightText text={" Instructor"} />
          </div>

          <p className='font-medium text-lg text-richblack-300 leading-relaxed'>
            Instructors from around the world teach millions of students on Inquisitive Learning. We provide the tools and skills to teach what you love.
          </p>

          <ul className='flex flex-col gap-3 text-richblack-200 text-base'>
            <li className='flex items-center gap-3'>
              <span className='text-xl'>🎓</span> Share your expertise with eager learners
            </li>
            <li className='flex items-center gap-3'>
              <span className='text-xl'>💰</span> Earn revenue from every enrolled student
            </li>
            <li className='flex items-center gap-3'>
              <span className='text-xl'>🌍</span> Reach students across the globe
            </li>
          </ul>

          <div className='w-fit mt-2'>
            <CTAButton active={true} linkto={"/signup"}>
              <div className='flex flex-row gap-2 items-center text-base'>
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default InstructorSection
