"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FirstSection() {

  return (
    <section id="about" className="sm:py-16 md:py-20 lg:py-0 bg-white">
      <div className="w-full">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
        <div>
          {/*  TOP IMAGE */}
          <div
            className="relative w-full sm:h-[420px] md:h-[450px] lg:h-[480px] overflow-hidden mb-16  shadow-md"
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
             WHY WE EXIST
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
           <span style={{ fontSize: "24px", lineHeight: "normal", display: "block", marginBottom: "16px" }}>
We started with an uncomfortable question: if children are natural learners, why do so many struggle at school? 
</span>
<span style={{ fontSize: "16px", lineHeight: "normal", display: "block" }}>
We watched kids light up as they built forts, then shut down during math worksheets. We saw brilliant eight year olds convinced they were "bad at learning" because they couldn't sit still for lectures.<br/><br/>

So, we went back to basics. How did humans learn for thousands of years before classrooms existed? Through relationships. Through doing. Through making mistakes and trying again. We studied child development, cognitive science, and schools around the world. Then we designed something radical yet straightforward: an education that works with human nature rather than against it.<br/><br/>

The result? Children who love learning again. Not because we made it entertaining, but because we made it authentic. 
</span>
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
    className="w-full h-full object-cover"
    // style={{ transform: "scaleX(-1)" }}
  />
{/* </div> */}

            <div className="absolute inset-0 bg-gradient-to-t from-[#00000020] to-transparent"
            ></div>
          </motion.div>


{/* Intuitive Learning Framework Section */}
<section className="bg-[#FBF5E5] py-16 sm:py-20 md:py-24">
  <div className="max-w-6xl mx-auto px-6 sm:px-10">

    {/* Heading */}
    <motion.h2
      className="text-[#004AAD] text-[28px] sm:text-[40px] md:text-[47px] font-[400] text-left"
      style={{ fontFamily: "Foco" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      The Intuitive Learning Framework
    </motion.h2>

    {/* Sub-heading */}
    <motion.h2
      className="text-[#004AAD] text-[17px] sm:text-[20px] md:text-[24px] font-[400] text-left mb-10 sm:mb-12"
      style={{ fontFamily: "Foco" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      Six ways children naturally develop when we let them take the lead:
    </motion.h2>

    <div className="flex flex-col">

      {[
        { num: "1", img: "/learningab.png", title: "Learning About Yourself", desc: "With time, every child uncovers the rhythm of their own mind. Some learn through touch, some through movement, some in quiet focus, and others in lively collaboration. But instead of nurturing these various learning styles, traditional schooling often stifles them. It’s like trying to fit every square, star, and triangle-shaped peg into the same round hole." },
        { num: "2", img: "/thinkingheart.png", title: "Thinking with Heart and Mind", desc: "True learning doesn’t just come from finding the singular correct answer. In fact, real-world challenges rarely have one right answer. Instead of simply “hitting save” on question + answer, children learn through exploring possibilities, making connections between different ideas, and trusting their creative instincts. These are the thinking skills no computer can replicate." },
        { num: "3", img: "/reflection.png", title: "Growing Through Reflection", desc: "After every experience, children pause to ask: What worked? What would I try differently? How did this feel? This reflection turns experience into wisdom, something uniquely human." },
        { num: "4", img: "/emotions.png", title: "Understanding Emotions", desc: "Children discover the language of their emotions, learn to steady themselves when things feel hard, and develop the resilience to move past disappointment. Along the way, they grow kinder and more empathetic by engaging with others who see and experience the world differently." },
        { num: "5", img: "/relationship.png", title: "Building Real Relationships", desc: "As children collaborate, disagree, and find their way to common ground, they learn to listen, compromise, and lead with empathy. These are the social skills that will shape their futures not test scores." },
        { num: "6", img: "/character.png", title: "Developing Character", desc: "Children practice kindness, honesty, and integrity in real situations. They learn to care about others and contribute to their community, not because they are instructed to, but because they experience the inherent value of connection. These aren't subjects to be taught. They're human aptitudes to be nurtured." },
      ].map((item, index) => (
        
        <motion.div
          key={index}
          className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-6 sm:p-8 md:p-10 rounded-[30px]`}
          style={{ backgroundColor: index % 2 === 0 ? "#E5D6C0" : "#EEE2D0" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
<div className=" items-center flex-start grid grid-cols-3 w-full md:w-auto md:flex">
{/* <div className="items-center grid grid-cols-1 w-full md:w-auto md:flex md:items-start"> */}

          {/* Number */}
<div
  className="text-[#FFFFFF] flex items-start justify-left w-full sm:w-[70px] md:w-[90px] opacity-[0.27] sm:text-right"
  style={{
    fontFamily: "Foco",
    fontWeight: 300,
    fontSize: "70px",
  }}
>
  <span className="text-[70px] sm:text-[100px] md:text-[128px] leading-none">
    {item.num}
  </span>
</div>

{/* Icon */}
<div className="w-full flex-shrink-0 flex items-start justify-center h-[70px] sm:w-[69px] sm:h-[83px] -mt-2 sm:-mt-4 md:-mt-6">
<img
    src={item.img}
    alt="icon"
    className="w-full h-full object-contain"
  />
</div>
<div className="block md:hidden">

</div>
</div>

{/* Text */}
<div className="flex-1 text-center sm:text-left -mt-2 sm:-mt-4 md:-mt-6">
  <h3
    className="text-[#004AAD] mb-2"
    style={{
      fontFamily: "Foco",
      fontWeight: 400,
      fontSize: "22px",
    }}
  >
    {item.title}
  </h3>

  <p
    className="text-[#004AAD] leading-relaxed text-[15px] sm:text-[16px]"
    style={{
      fontFamily: "Foco",
      fontWeight: 400,
    }}
  >
    {item.desc}
  </p>
</div>


        </motion.div>

      ))}

    </div>
  </div>
</section>

        </div>
      </div>
    </section>
  );
}
