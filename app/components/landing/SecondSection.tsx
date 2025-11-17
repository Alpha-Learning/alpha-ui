"use client";

import React from "react";
import { motion,Variants  } from "framer-motion";

export default function SecondSection() {
  // Card Animation Variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

  // Data for the Smart Learning System Cards
  const cards = [
    {
      title: "Integrated with the British and Arabic Curriculum",
      text: "A balanced and bilingual model built on global standards and cultural relevance.",
       img: "/opbac.png"
    },
    {
      title: "Learning to Learn",
      text: "The ASLS framework continuously adapts to each learner’s pace, progress, and potential, creating a living, personalised pathway.",
      img: "/oplearn.png"
    },
    {
      title: "Real–Life Skills & Work Experience",
      text: "Students take part in hands-on projects, internships, and entrepreneurship experiences, connecting learning to the real world.",
      img: "/opwork.png"
    },
    {
      title: "Advanced Academic Learning",
      text: "Enriched, project-based learning for high achievers and ambitious minds.",
      img: "/opacademic.png"
    },
    {
      title: "Jobs & Future Readiness",
      text: "Our learners graduate with the digital fluency, innovation mindset, and leadership skills needed for tomorrow’s world.",
      img: "/opjobs.png"
    },
  ];

  return (
    <section id="services">
      <div className="w-full">
       
        {/* <div className="max-w-3xl min-h-[400px] mx-auto px-4 sm:px-6 lg:px-8"> */}
        <div>
          <div
            className="relative w-full h-[390px] sm:h-[420px] md:h-[450px] lg:h-[480px] overflow-hidden mb-16 rounded-b-2xl shadow-md"
            // initial={{ opacity: 0, y: -30 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true, amount: 0.2 }}
            // transition={{ duration: 0.6 }}
          >
            <img
              src="/op1.jpg"
              alt="Alphera Academy Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#00000025] to-transparent h-[431px]"></div>
          </div>

          {/*  The Journey Section  */}
          <div className="flex justify-center items-start">
            <div
              className="space-y-8 flex flex-col justify-center text-center lg:text-left"
              // initial={{ opacity: 0, y: 24 }}
              // whileInView={{ opacity: 1, y: 0 }}
              // viewport={{ once: true, amount: 0.2 }}
              // transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "Foco",
                    fontSize: "47px",
                    fontWeight: 400,
                    color: "#004AAD",
                    fontStyle: "normal",
                    lineHeight: "normal"
                  }}
                  
                  className="text-4xl lg:mb-5 text-center font-medium text-[#222222]"
                >
                  The Journey
                </h2>

                <p
                  style={{ fontFamily: "Foco",
                    fontSize: "24px",
                    fontWeight: 400,
                    color: "#004AAD",
                    fontStyle: "normal",
                    lineHeight: "normal"
                   }}
                  
                  className="text-[24px] text-center text-[#004AAD] leading-[1.9] max-w-3xl mx-auto mb-8"
                >
                  Every learner follows a personalised journey. Through <br/> continuous
                  reflection, feedback, and growth, Alphera <br/>tailors learning to
                  each child’s strengths, goals, and<br/> potential.
                </p>
              </div>
            </div>
          </div>
          <motion.div
            className="relative w-full h-[390px] sm:h-[420px] md:h-[450px] lg:h-[480px] overflow-hidden shadow-md"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/opmain.png"
              alt="Alphera Academy Banner"
              className="w-full h-full object-cover object-left "
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#00000025] to-transparent h-[431px]"></div>
          </motion.div>
        </div>

        {/*Experience & Technology Section */}
        <div className="bg-[#EFEDCD] py-16">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-10 space-y-24">
            {/* Experience */}
            <motion.div
              className="flex flex-col md:flex-row items-center md:items-start gap-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-1">
                <h3
                  className="text-[#004AAD] font-normal mb-4 text-[47px]"
                  style={{ fontFamily: "Foco",
                    fontSize: "47px",
                    fontWeight: 400,
                    color: "#004AAD",
                    fontStyle: "normal",
                    lineHeight: "normal"
                   }}
                >
                  The Experience
                </h3>
                <p
                  className="text-[#004AAD] text-[17px] leading-[1.8] text-[24px]"
                  style={{ fontFamily: "Foco",
                    fontSize: "24px",
                    fontWeight: 400,
                    color: "#004AAD",
                    fontStyle: "normal",
                    lineHeight: "normal" }}
                >
                  Learning at Alphera is active, creative, and meaningful.
                  Students explore real-world challenges, engage in collaborative
                  projects, and apply their learning in authentic ways.
                </p>
              </div>

              <div className="flex-1 flex justify-center md:justify-end">
                <motion.img
                  src="/op3.jpg"
                  alt="Students collaborating"
                  className="w-[280px] h-[180px] sm:w-[350px] sm:h-[220px] lg:w-[400px] lg:h-[240px] object-cover rounded-lg shadow-md"
                  style={{borderRadius:"30px"}}   
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                />
              </div>
            </motion.div>

            {/* Technology */}
            <motion.div
              className="flex flex-col md:flex-row-reverse items-center md:items-start gap-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex-1">
                <h3
                  className="text-[#004AAD]  font-normal mb-4 text-[47px]"
                  style={{ fontFamily: "Foco",
                    fontSize: "47px",
                    fontWeight: 400,
                    color: "#004AAD",
                    fontStyle: "normal",
                    lineHeight: "normal" }}
                >
                  Technology
                </h3>
                <p
                  className="text-[#004AAD] text-[17px] leading-[1.8] text-[24px]"
                 style={{ fontFamily: "Foco",
                    fontSize: "24px",
                    fontWeight: 400,
                    color: "#004AAD",
                    fontStyle: "normal",
                    lineHeight: "normal"}}
                >
                  Our AI-powered Alphera Learning System (ASLS) integrates academic
                  data, emotional feedback, and progress tracking to shape each
                  learner’s pathway in real time.
                </p>
              </div>

              <div className="flex-1 flex justify-center md:justify-start">
                <motion.img
                  src="/op4.png"
                  alt="AI-powered Alphera Learning System"
                  className="w-[373px] h-[254px] sm:w-[350px] sm:h-[220px] lg:w-[400px] lg:h-[240px] object-cover rounded-lg shadow-md"
                  style={{borderRadius:"30px"}}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full Width Image Section  */}
        <motion.div 
          // className="mt-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <img
            src="/opweb.png"
            alt="Additional classroom scene"
            className="w-full h-[320px] md:h-[100%] object-cover"
          />
        </motion.div>

        {/*  Alphera Smart Learning System Cards  */}
      <div className="bg-[#DEDEDE] py-20 px-6 lg:px-12">
  <h2
    className="text-center text-3xl md:text-4xl font-semibold text-[#004AAD] mb-20"
    style={{ fontFamily: "Foco,regular",
      color: "#004AAD",
textAlign: "center",
fontSize: "47px",
fontStyle: "normal",
fontWeight: "400",
lineHeight: "normal"
     }}
  >
    Alphera Smart Learning System
  </h2>

  <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
    {cards.map((card, i) => (
      <motion.div
        key={i}
        custom={i}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        className="relative bg-[#004AAD] text-white rounded-xl w-[198px] h-[348px] flex flex-col items-center text-center shadow-lg pt-[60px] pb-6"
      >
        {/* Icon Container */}
        <div className="absolute -top-[15px]">
          <img
            src={card.img}
            alt={card.title}
            className="w-[85px] h-[85px] object-contain"
            style={{margin:"35px"}}
          />
        </div>

        {/* Card Text */}
        <div className="px-3 mt-15">
          <h4
            className="text-[20px] mb-2"
            style={{
              fontFamily: "Foco",
              color: "#FFFFFF",
              textAlign: "center",
              fontWeight: "400",
              lineHeight: "1.4",
            }}
          >
            {card.title}
          </h4>
           <div
            className="mx-auto my-3"
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#82B3B4",
              opacity: 0.7,
            }}
          />
          <p
            className="text-[16px]"
            style={{
              fontFamily: "Foco",
              color: "#82B3B4",
              textAlign: "center",
              fontWeight: "400",
              lineHeight: "1.4",
            }}
          >
            {card.text}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</div>


      </div>
    </section>
  );
}
