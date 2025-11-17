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


<div className="relative w-full min-h-[400px] sm:min-h-[300px] md:min-h-[320px] lg:min-h-[350px] overflow-visible pl-4 sm:pl-8 md:pl-12 lg:pl-[159px]">
  <div className="mb-4 sm:mb-5 md:mb-6">
    <h2
      className="text-[#004AAD] text-[Foco] text-2xl sm:text-3xl md:text-4xl lg:text-[47px] font-normal mb-1 pl-2 sm:pl-4 md:pl-5 lg:pl-6"
      style={{ fontFamily: "Foco, sans-serif", fontStyle: "normal", lineHeight: "normal" }}
    >
      PARTNERSHIP WITH FAMILIES 
    </h2>
  </div>
  <div className="flex flex-col font-[Foco] sm:flex-row gap-4 sm:gap-5 md:gap-6 px-2 sm:px-4 md:px-5 lg:px-6 flex-wrap mb-12 sm:mb-16 md:mb-18 lg:mb-20">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-[#004AAD] text-left relative w-full text-[Foco]"
      style={{
        fontFamily: "Foco, sans-serif",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal",
        color: "#004AAD",
      }}
    >
      <span>
        <span
          style={{
            fontFamily: "Foco, sans-serif",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            color: "#004AAD",
            marginBottom: "1rem",
            display: "block",
          }}
          className="block text-lg sm:text-xl md:text-2xl lg:text-2xl mb-4"
        >
          You know your child best. We support what you already know 
        </span>
        <ul 
          style={{ 
            listStyleType: "disc",
            paddingLeft: "20px",
            margin: 0,
            marginTop: "0.5rem",
            marginBottom: "0.25rem",
          }}
        >
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Daily Insights: Understand your child's natural learning patterns, emotional rhythms, and social growth.
            </span>
          </li>
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Home Extensions: Simple ways to continue discovery based learning in your own family rhythm.
            </span>
          </li>
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Regular Conversations: Deep discussions with your child's mentor about their development and needs.
            </span>
          </li>
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Family Learning: Workshops and events that bring our community together around shared values.
            </span>
          </li>
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Your Choice: Decide what information feels helpful and what feels like too much. This is your family's journey.
            </span>
          </li>
        </ul>
        <span
          style={{
            fontFamily: "Foco, sans-serif",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            color: "#004AAD",
            marginTop: "0.25rem",
          }}
          className="block text-sm sm:text-base lg:text-base mt-2"
        >
          We don't replace parenting; we support it. You remain the expert on your child.
        </span>
      </span>
    </motion.div>
  </div>
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

        {/* Investment in Natural Development Section */}


<div className="relative w-full min-h-[400px] sm:min-h-[350px] md:min-h-[331px] lg:min-h-[331px] overflow-visible pl-4 sm:pl-8 md:pl-12 lg:pl-[159px] bg-[#f2e7c7]">
  <div className="w-full h-full">
    <div className="flex flex-col font-[Foco] gap-4 sm:gap-5 md:gap-6 px-2 sm:px-4 md:px-5 lg:px-6 flex-wrap pt-4 sm:pt-5 md:pt-6 pb-4 sm:pb-5 md:pb-6 lg:pb-12">
      {/* Heading */}
      <div className="mb-2 sm:mb-3 md:mb-2 pt-4 sm:pt-5 md:pt-6">
        <h2
          className="text-[#004AAD] text-2xl sm:text-3xl md:text-4xl lg:text-[47px] font-normal mb-1"
          style={{ 
            fontFamily: "Foco, sans-serif", 
            fontStyle: "normal", 
            lineHeight: "normal",
            color: "#004AAD",
          }}
        >
          INVESTMENT IN NATURAL DEVELOPMENT 
        </h2>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-[#004AAD] text-left relative px-2 sm:px-4 md:px-5 lg:px-6"
        style={{
          fontFamily: "Foco, sans-serif",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal",
          color: "#004AAD",
        }}
      >
        <span>
          <span
            style={{
              fontFamily: "Foco, sans-serif",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              color: "#004AAD",
            }}
            className="block text-sm sm:text-base lg:text-base mb-2"
          >
            What this kind of education requires: 
          </span>
          <ul 
            style={{ 
              listStyleType: "disc",
              paddingLeft: "20px",
              margin: 0,
              marginTop: "0.25rem",
              marginBottom: "0.25rem",
            }}
          >
            <li style={{ marginBottom: "0.125rem" }}>
              <span
                style={{
                  fontFamily: "Foco, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                  color: "#004AAD",
                }}
                className="text-sm sm:text-base lg:text-base"
              >
                Small learning communities where every child is truly known by caring adults.
              </span>
            </li>
            <li style={{ marginBottom: "0.125rem" }}>
              <span
                style={{
                  fontFamily: "Foco, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                  color: "#004AAD",
                }}
                className="text-sm sm:text-base lg:text-base"
              >
                Hands-on learning environments filled with real materials, not just worksheets and screens.
              </span>
            </li>
            <li style={{ marginBottom: "0.125rem" }}>
              <span
                style={{
                  fontFamily: "Foco, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                  color: "#004AAD",
                }}
                className="text-sm sm:text-base lg:text-base"
              >
                Technology that serves human learning goals rather than driving them.
              </span>
            </li>
            <li style={{ marginBottom: "0.125rem" }}>
              <span
                style={{
                  fontFamily: "Foco, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                  color: "#004AAD",
                }}
                className="text-sm sm:text-base lg:text-base"
              >
                Time for reflection, creativity, and character development, not just academic content coverage.
              </span>
            </li>
            <li style={{ marginBottom: "0.125rem" }}>
              <span
                style={{
                  fontFamily: "Foco, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "normal",
                  color: "#004AAD",
                }}
                className="text-sm sm:text-base lg:text-base"
              >
                Adults trained in child development who can adapt to each learner's needs.
              </span>
            </li>
          </ul>
          <span
            style={{
              fontFamily: "Foco, sans-serif",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              color: "#004AAD",
              marginTop: "0.25rem",
            }}
            className="block text-sm sm:text-base lg:text-base mt-2"
          >
            This represents a different category of educational investment, developing humans, not just delivering curriculum.
          </span>
        </span>
      </motion.div>
    </div>
  </div>
</div>

<motion.div
  className="relative w-full h-[390px] sm:h-[420px] md:h-[450px] lg:h-[480px] overflow-hidden rounded-b-2xl shadow-md"
  initial={{ opacity: 0, y: -30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
  <img
    src="/waitlist3.jpg"
    alt="Alphera Academy Banner"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-[#00000025] to-transparent"></div>
</motion.div>

{/* Who Finds Home at Alphera Section */}

<div className="relative w-full min-h-[500px] sm:min-h-[450px] md:min-h-[457px] lg:min-h-[457px] overflow-visible pl-4 sm:pl-8 md:pl-12 lg:pl-[159px] bg-[#d8efcd]">
  <div className="mb-4 sm:mb-5 md:mb-6 pt-4 sm:pt-5 md:pt-6">
    <h2
      className="text-[#004AAD] text-left text-2xl sm:text-3xl md:text-4xl lg:text-[47px] font-normal relative flex items-center justify-start pl-2 sm:pl-4 md:pl-5 lg:pl-6 pt-2 sm:pt-3 md:pt-4"
      style={{ 
        fontFamily: "Foco, sans-serif", 
        fontStyle: "normal", 
        lineHeight: "normal",
      }}
    >
      WHO FINDS HOME AT ALPHERA
    </h2>
  </div>
  <div className="flex flex-col font-[Foco] sm:flex-row gap-4 sm:gap-5 md:gap-6 px-2 sm:px-4 md:px-5 lg:px-6 flex-wrap pt-2 sm:pt-3 md:pt-4 pb-4 sm:pb-5 md:pb-6 lg:pb-12">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-[#004AAD] text-left relative w-full text-[Foco]"
      style={{
        fontFamily: "Foco, sans-serif",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal",
        color: "#004AAD",
      }}
    >
      <span>
        <span
          style={{
            fontFamily: "Foco, sans-serif",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            color: "#004AAD",
          }}
          className="block text-lg sm:text-xl md:text-2xl lg:text-2xl mb-4"
        >
          We serve families who believe: 
        </span>
        <ul 
          style={{ 
            listStyleType: "disc",
            paddingLeft: "20px",
            margin: 0,
            marginTop: "0.25rem",
            marginBottom: "0.25rem",
          }}
        >
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Children learn best through relationships and real experiences, not self-abandonment and conformity 
            </span>
          </li>
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Small learning communities allow children to be fully known and supported, and to see the value in their contributions. 
            </span>
          </li>
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Character development matters as much as academic achievement. 
            </span>
          </li>
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Technology should serve human learning and innovation, never control or determine it. 
            </span>
          </li>
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Education should honor how children were inherently designed to grow and discover. 
            </span>
          </li>
        </ul>
        <span
          style={{
            fontFamily: "Foco, sans-serif",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            color: "#004AAD",
          }}
          className="block text-lg sm:text-xl md:text-2xl lg:text-2xl mb-4 mt-4"
        >
          We might not be right for families seeking: 
        </span>
        <ul 
          style={{ 
            listStyleType: "disc",
            paddingLeft: "20px",
            margin: 0,
            marginTop: "0.25rem",
            marginBottom: "0.25rem",
          }}
        >
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Large schools with traditional classroom structures. 
            </span>
          </li>
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Technology-driven or primarily online education. 
            </span>
          </li>
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              High stakes testing preparation as a primary focus. 
            </span>
          </li>
          <li style={{ marginBottom: "0.125rem" }}>
            <span
              style={{
                fontFamily: "Foco, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                color: "#004AAD",
              }}
              className="text-sm sm:text-base lg:text-base"
            >
              Standardized approaches that treat all children the same way. 
            </span>
          </li>
        </ul>
      </span>
    </motion.div>
  </div>
</div>

<motion.div
  className="relative w-full h-[250px] sm:h-[350px] md:h-[420px] lg:h-[450px] xl:h-[480px] overflow-hidden rounded-b-2xl shadow-md"
  initial={{ opacity: 0, y: -30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
  <img
    src="/waitlist4.jpg"
    alt="Alphera Academy Banner"
    className="w-full h-full object-cover object-center"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-[#00000025] to-transparent"></div>
</motion.div>

{/* Ready to see learning through your child's eyes again? Section */}


<div className="relative w-full min-h-[400px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[457px] overflow-visible pl-4 sm:pl-8 md:pl-12 lg:pl-[159px] bg-[#dadada]">
  <div className="mb-4 sm:mb-5 md:mb-6 pt-4 sm:pt-5 md:pt-6">
    <h2
      className="text-[#004AAD] text-left text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-normal relative flex items-center justify-start pl-2 sm:pl-4 md:pl-5 lg:pl-6 pt-2 sm:pt-3 md:pt-4"
      style={{ 
        fontFamily: "Foco, sans-serif", 
        fontStyle: "normal", 
        lineHeight: "normal",
      }}
    >
      Ready to see learning through your child's eyes again? 
    </h2>
  </div>
  <div className="flex flex-col font-[Foco] sm:flex-row gap-4 sm:gap-5 md:gap-6 px-2 sm:px-4 md:px-5 lg:px-6 flex-wrap pt-2 sm:pt-3 md:pt-4 pb-4 sm:pb-5 md:pb-6 lg:pb-12">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-[#004AAD] text-left relative w-full text-[Foco]"
      style={{
        fontFamily: "Foco, sans-serif",
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal",
        color: "#004AAD",
      }}
    >
      <span className="block text-base sm:text-lg md:text-xl lg:text-2xl">
        Our enrollment process is designed as a conversation; we want to understand
        your child as a unique individual, and you want to see if Alphera feels right
        for your family. 
        <br />
        <br />
        No high-pressure sales tactics. Just an honest exploration of whether we can
        support your child's natural development journey effectively. 
        <br />
        <br />
        Start the conversation → 
        <br />
        Limited enrollment ensures every child receives the individual attention that
        makes authentic learning possible. 
      </span>
    </motion.div>
  </div>
</div>
   


      </div>
    </section>
  );
}