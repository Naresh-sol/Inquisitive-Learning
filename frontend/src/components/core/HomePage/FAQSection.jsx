import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import HighlightText from './HighlightText';

const faqs = [
  {
    question: "What is Inquisitive Learning?",
    answer: "Inquisitive Learning is a comprehensive e-learning platform where you can explore diverse courses ranging from Web Development and Data Science to Competitive Exam Prep like GATE."
  },
  {
    question: "Are the courses free or paid?",
    answer: "We offer both free and premium courses. You can browse our catalog to find free starter courses, while advanced masterclasses might require a one-time purchase or subscription."
  },
  {
    question: "Can I teach on this platform?",
    answer: "Absolutely! We empower experts to become instructors. You can sign up as an instructor, create your own courses, and earn revenue for every student enrolled."
  },
  {
    question: "Do I get a certificate upon completion?",
    answer: "Yes, upon successfully completing all modules and assessments in a premium course, you will receive a verified digital certificate that you can share on your resume or LinkedIn."
  },
  {
    question: "Is there any prerequisite for the courses?",
    answer: "Prerequisites depend on the specific course. While our beginner courses start from absolute scratch, advanced courses will list any required prior knowledge in their description."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-11/12 max-w-maxContent mx-auto pb-20 pt-10 flex flex-col items-center">
      <div className="text-4xl lg:text-5xl font-bold text-center mb-12 text-richblack-900">
        Frequently Asked <HighlightText text="Questions" />
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden"
            initial={false}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-semibold text-richblack-900">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-500"
              >
                <IoIosArrowDown size={24} />
              </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="p-6 pt-0 text-gray-600 text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
