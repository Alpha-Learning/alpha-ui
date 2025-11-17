"use client";

import React from "react";
import { color, motion, Variants } from "framer-motion";

export default function WaitingList() {
  // Card animation variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  // Arrow animation variants
  const arrowVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.3 + 0.25,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  // Process data
  const processSteps = [
    { id: 1, text: "Submit your interest form" },
    { id: 2, text: "Attend an orientation session." },
    { id: 3, text: "Complete the UTL process." },
    { id: 4, text: "Receive your personalised admission pathway." },
  ];

  // Define colors for each card (matching the gradient)
  const cardColors = ["#6EA1E4", "#5187CF", "#266DCD", "#004AAD"];

  return (
    <section id="services">
      <div className="w-full">
         <div
          className="relative w-full h-[390px] sm:h-[420px] md:h-[450px] lg:h-[480px] overflow-hidden mb-16 rounded-b-2xl shadow-md"
        //   initial={{ opacity: 0, y: -30 }}
        //   whileInView={{ opacity: 1, y: 0 }}
        //   viewport={{ once: false, amount: 0.3 }}
        //   transition={{ duration: 0.6 }}
        >
          <img
            src="/waitlist1.jpg"
            alt="Alphera Academy Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#00000025] to-transparent"></div>
        </div>

        {/* The Process Section  */}
        <div className="text-center mb-10">
          <h2
            className="text-[#004AAD] text-[47px] font-normal text-center mb-4"
  style={{ fontFamily: "Foco, sans-serif", fontStyle: "normal", lineHeight: "normal" }}
>
            The Process
          </h2>
        </div>

       <div className="flex flex-col sm:flex-row justify-center items-center gap-6 px-6 flex-wrap mb-20">
  {processSteps.map((step, index) => (
    <React.Fragment key={step.id}>

      <div
        className="relative flex items-center justify-center"
        style={{
          color: "#FFF",
          textAlign: "center",
          fontFamily: "Foco",
          fontSize: "28px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
        }}
      >
        {/* Each Card */}
        <motion.div
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className={`relative w-full h-[253px] sm:w-[220px] md:w-[240px] lg:w-[215px]
            rounded-2xl text-white text-center px-6 font-medium shadow-md flex flex-col justify-center items-center`}
          style={{
            backgroundColor: cardColors[index],
            fontFamily: "foco, sans-serif",
            borderRadius: "30px",
          }}
        >
          {/* Background Number */}
          <span
            className="absolute select-none text-center"
            style={{
              color: step.id === 4 ? "#014298" : "rgba(0, 74, 173, 0.17)",
              fontFamily: "Foco",
              fontSize: "250px",
              fontWeight: 300,
              lineHeight: "normal",
            }}
          >
            {step.id}
          </span>

          {/* Step Text */}
          <p className="relative z-10 leading-snug pt-6"
            style={{ fontFamily: "foco, sans-serif", fontSize: "28px" }}
          >
            {step.text}
          </p>
        </motion.div>
      </div>

      {/* Arrow Between Cards ✔ FIXED POSITION */}
      {index < processSteps.length - 1 && (
        <motion.div
          custom={index}
          variants={arrowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="hidden sm:flex items-center justify-center mx-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="48"
            viewBox="0 0 37 48"
            fill="none"
            style={{ filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.25))" }}
          >
            <path
              d="M34.1035 19.7751C36.8785 21.7702 36.8784 25.8993 34.1035 27.8944L7.91875 46.7203C4.61099 49.0984 1.37124e-06 46.7345 1.54932e-06 42.6606L3.19513e-06 5.00884C3.3732e-06 0.934904 4.611 -1.42898 7.91876 0.949181L34.1035 19.7751Z"
              fill="#6EA1E4"
            />
          </svg>
        </motion.div>
      )}

    </React.Fragment>
  ))}
</div>

 <motion.div
          className="relative w-full h-[390px] sm:h-[420px] md:h-[450px] lg:h-[480px] overflow-hidden rounded-b-2xl shadow-md"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/waitlist2.jpg"
            alt="Alphera Academy Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#00000025] to-transparent"></div>
        </motion.div>
        {/*  UTL Section  */}
      <motion.section
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="bg-[#EFEDCD] py-16 sm:py-20 md:py-24 text-[#004AAD] shadow-[0_8px_16px_rgba(0,74,173,0.3)] relative z-10"
>
  <div className="w-full px-6 sm:px-10">

    {/* Top Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">

      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center md:text-left"
      >
        <h2
          className="text-3xl font-semibold mb-4"
          style={{
            fontFamily: "foco, sans-serif",
            fontSize: "47px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            color: "#004AAD",
          }}
        >
          UTL – Understanding the Learner Process
        </h2>

        <p
          className="text-[#192951] text-lg leading-relaxed"
          style={{
            fontFamily: "foco, sans-serif",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            color: "#004AAD",
          }}
        >
          Before joining, each learner completes a UTL session that helps us
          understand their learning style, strengths, and aspirations — forming
          the foundation of their personalised journey.
        </p>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex justify-center md:justify-end"
      >
        <div
          className="rounded-xl overflow-hidden w-[280px] sm:w-[320px] md:w-[406px] h-[200px] sm:h-[220px] md:h-[271px]"
          style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)" }}
        >
          <img
            src="/waitlist3.jpg"
            alt="UTL process"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>

    {/* Bottom Cards */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >

      {/* Acceptance Card */}
      <div
        className="bg-gradient-to-r from-[#2673DB] to-[#004AAD] text-white rounded-2xl shadow-md px-8 py-10 w-full"
        style={{ fontFamily: "foco, sans-serif" }}
      >
        <h3
          style={{
            color: "#FFFF",
            fontFamily: "Foco",
            fontSize: "47px",
            fontWeight: "400",
          }}
          className="mb-3"
        >
          Acceptance
        </h3>

        <p
          style={{
            color: "#82B3B4",
            fontFamily: "Foco",
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          Successful applicants receive an official offer and a tailored
          learning profile to begin their Alphera journey.
        </p>
      </div>

      {/* Fees Card */}
      <div
        className="bg-gradient-to-r from-[#2673DB] to-[#004AAD] text-white rounded-2xl shadow-md px-8 py-10 w-full"
        style={{ fontFamily: "foco, sans-serif" }}
      >
        <h3
          style={{
            color: "#FFFF",
            fontFamily: "Foco",
            fontSize: "47px",
            fontWeight: "400",
          }}
          className="mb-3"
        >
          Fees
        </h3>

        <p
          style={{
            color: "#82B3B4",
            fontFamily: "Foco",
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          Our tuition structure will be announced prior to launch, reflecting
          Alphera’s commitment to quality, innovation, and accessibility.
        </p>
      </div>

    </motion.div>
  </div>
</motion.section>


      </div>
    </section>
  );
}