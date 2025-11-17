"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FirstSection() {
  const pillars = [
    {
      title: "Self Regulated Learning",
      desc: "Learning how to learn",
      img: "/a.jpeg",
    },
    {
      title: "Emotional Intelligence",
      desc: "AI-powered personalisationand smart learning systems",
      img: "/b.png",
    },
    {
      title: "Social Skills",
      desc: "Leadership, empathy, and cultural awareness",
      img: "/c.png",
    },
    {
      title: "General Cognitive",
      desc: "Connecting education to everyday life",
      img: "/d.jpeg",
    },
    {
      title: "Creativity",
      desc: "Building balance, curiosity, and confidence",
      img: "/e.jpeg",
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-0 bg-white">
      <div className="w-full">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
        <div>
          {/*  TOP IMAGE */}
          <div
            className="relative w-full h-[390px] sm:h-[420px] md:h-[450px] lg:h-[480px] overflow-hidden mb-16  shadow-md"
            // initial={{ opacity: 0, y: -30 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true, amount: 0.2 }}
            // transition={{ duration: 0.6 }}
          >
            <img
              src="/au1.jpg"
              alt="Alphera Academy Banner"
      className=" object-contain"

            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#00000025] to-transparent h-[497px]"></div>
          </div>

          {/*  OUR STORY */}
          <motion.div
            className="space-y-6 sm:space-y-8 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2
              className="mb-8 flex flex-col leading-tight items-center"
              style={{
                fontFamily: "Foco",
                fontSize: "47px",
                fontWeight: 400,
                color: "#004AAD",
                textAlign: "center",
                fontStyle: "normal",
                lineHeight: "normal"
              }}
            >
              Our Story
            </h2>

            <motion.p
              className="text-[18px] sm:text-[24px] font-normal text-[#004AAD] leading-relaxed tracking-[0.015em] text-center max-w-3xl mx-auto px-4 mb-20"
              style={{ fontFamily: "Foco",
                fontSize: "24px",
                fontWeight: 400,
                color: "#004AAD",
                textAlign: "center",
                fontStyle: "normal",
                lineHeight: "normal"
               }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Alphera Academy was founded with a bold vision to redefine how
              education feels, functions, and flourishes. We’re building a
              school ecosystem that blends academic excellence with technology,
              wellbeing, and creativity.
            </motion.p>
          </motion.div>

          {/* IMAGE BELOW STORY  */}
          <motion.div
            className="relative w-full h-[287px] sm:h-[320px] md:h-[350px] lg:h-[380px] mt-12 overflow-hidden  shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
{/* <div className="w-full h-[480px] overflow-hidden"> */}
  <img
    src="/aboutus2.png"
    alt="Alphera Academy Banner"
    className="w-full h-full object-fill"
    // style={{ transform: "scaleX(-1)" }}
  />
{/* </div> */}

            <div className="absolute inset-0 bg-gradient-to-t from-[#00000020] to-transparent"
            ></div>
          </motion.div>


          {/*  Mission & Vision Section  */}
<section className=" bg-[#EFEDCD] py-16 sm:py-20 md:py-24 flex flex-col items-center justify-center overflow-hidden">
  <div className="max-w-6xl mx-auto px-6 sm:px-10 text-center">

    {/* Heading */}
    <h2
      className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 
                 text-[#004AAD] font-normal leading-normal"
      style={{ fontFamily: "Foco" }}
    >
      <span className="text-[32px] sm:text-[47px]">Mission</span>

      <span
        className="text-[50px] sm:text-[96px] font-light"
        style={{ fontFamily: "Foco" }}
      >
        &
      </span>

      <span className="text-[32px] sm:text-[47px]">Vision</span>
    </h2>

    {/* Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-[#004AAD]">

      {/* Mission */}
      <div
        className="text-[16px] sm:text-[22px] leading-relaxed text-center md:text-right px-2 sm:px-6"
        style={{ fontFamily: "Foco", fontWeight: 400 }}
      >
        Empower every learner with the skills, confidence, and mindset to
        thrive in a changing world.
      </div>

      {/* Vision */}
      <div
        className="text-[16px] sm:text-[22px] leading-relaxed text-center md:text-left px-2 sm:px-6 
                   md:border-l md:pl-10"
        style={{ fontFamily: "Foco", fontWeight: 400 }}
      >
        Create Bahrain’s first fully personalised, AI-enhanced learning
        environment where education adapts to each learner.
      </div>

    </div>
  </div>
</section>




          {/*  WHY US */}
          <section className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] overflow-hidden">
            <img
    src="/aboutus3.png"
    alt="Why Alphera"
    className="absolute inset-0 w-full h-full object-cover object-center"
    style={{ transform: "scaleX(-1)" }}
  />

  {/* White left shade */}
  <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent"></div>

            <div className="absolute inset-0 bg-[#00000033]"></div>

            <motion.div
              className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 md:px-20 lg:px-32 text-left max-w-3xl"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="mb-6"
                style={{
                  fontFamily: "Foco",
                  fontWeight: 400,
                  fontSize: "47px",
                  lineHeight: "normal",
                  color: "#004AAD",
                }}
              >
                Why Us
              </h2>

              <p
                style={{
                  fontFamily: "Foco",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "24px",
                  lineHeight: "normal",
                  // letterSpacing: "0px",
                  color: "#004AAD",
                }}
              >
                At Alphera, we don’t just teach, we understand how every learner learns best. We combine deep academic rigours with real-world learning, personal development, and emotional intelligence. Our learners grow into thinkers, leaders, and creators.
              </p>
            </motion.div>
          </section>

          
 {/*5 PILLARS OF ALPHERA */}
<section className=" w-full py-12 sm:py-16 md:py-20 bg-[#DEDEDE] flex flex-col items-center text-center overflow-hidden">
  {/* Heading */}
  <h2
    className="text-[#004AAD] text-[30px] sm:text-[36px] md:text-[47px] font-[400] mb-10"
    style={{ fontFamily: "Foco",
                  lineHeight: "100%",
                  letterSpacing: "0px",
                 }}
  >
    The 5 Pillars of Alphera
  </h2>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 md:px-12 lg:px-16 justify-items-center">
    {[
      {
        title: "Self Regulated Learning",
        desc: "Learning how to learn",
        img: "/aboutusiconself.png",
      },
      {
        title: "Emotional Intelligence",
        desc: "AI-powered personalisation and smart learning systems",
        img: "/aboutusintelligance.png",
      },
      {
        title: "Social Skills",
        desc: "Leadership, empathy, and cultural awareness",
        img: "/aboutussocialskill.png",
      },
      {
        title: "General Cognitive",
        desc: "Connecting education to everyday life",
        img: "/aboutusgs.png",
      },
      {
        title: "Creativity",
        desc: "Building balance, curiosity, and confidence",
        img: "/aboutuscreativity.png",
      },
    ].map((pillar, index) => (
      <motion.div
  key={index}
  className="bg-gradient-to-r from-[#2673DB] to-[#004AAD] rounded-[30px] shadow-md flex flex-col items-center justify-start p-5 sm:p-6"
  style={{
    width: "198px",
    height: "284px",
  }}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.2 }}
  transition={{ duration: 0.6, delay: index * 0.2 }}
>

  <div className="flex flex-col items-center justify-start m-[24]" style={{ height: "180px" }}>
    {/* Image */}
    <div
      className="rounded-[12px] overflow-hidden flex items-center justify-center"
      style={{
        // width: "100px",
        // height: "99px",
        borderRadius:"0px",
        flexShrink: 0,
      }}
    >
      <img
        src={pillar.img}
        alt={pillar.title}
        style={{
          // width: "100px",
          // height: "99px",
          borderRadius: "0px",
          objectFit: "cover",
        }}
      />
    </div>


    <h3
      className="text-white mt-3 text-center leading-[1.1]"
      style={{
        fontFamily: "Foco",
        fontWeight: 400,
        fontSize: "26px",
        lineHeight: "1.normal",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "42px", 
        padding: "0 4px",
        color:"white"
      }}
    >
      {pillar.title}
    </h3>

    
    {/* <div
      className="w-[40px] bg-[#82B3B4] rounded-full"
      style={{
        height: "1px",
        opacity: 0.9,
        marginTop: "6px",
        width:"164px",
        
      }}
    ></div> */}
  </div>

  {/* DESCRIPTION AREA */}
  {/* <div className="flex-1 flex items-start justify-center">
    <p
      className="text-white opacity-90 text-center"
      style={{
        fontFamily: "Foco, sans-serif",
        fontWeight: 400,
        fontSize: "clamp(14px, 1.5vw, 16px)",
        lineHeight: "1.3",
        textAlign: "center",
        padding: "0 6px",
        color: "#82B3B4"
      }}
    >
      {pillar.desc}
    </p>
  </div> */}
</motion.div>


    ))}
  </div>
</section>

        </div>
      </div>
    </section>
  );
}
