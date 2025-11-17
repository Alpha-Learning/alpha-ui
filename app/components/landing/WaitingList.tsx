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
<div className="relative w-full h-[260px] sm:h-[300px] md:h-[320px] lg:h-[350px] overflow-hidden pl-[159px]">
  <div className="mb-6">
    <h2
      className="text-[#004AAD] text-[Foco] text-[47px] font-normal mb-1 pl-6"
      style={{ fontFamily: "Foco, sans-serif", fontStyle: "normal", lineHeight: "normal" }}
    >
      PARTNERSHIP WITH FAMILIES 
    </h2>
  </div>
  <div className="flex flex-col font-[Foco] sm:flex-row  gap-6 px-6 flex-wrap mb-20">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-[#004AAD] text-left relative h-[167px] text-[Foco]"
      style={{
        transformOrigin: "0 0",
        transform: "rotate(-90deg) scale(1, 1)",
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
        >
          You know your child best. We support what you already know 
          <br />
        </span>
        <span>
          <br />
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

<div className="relative w-full h-[331px] overflow-hidden pl-[159px] bg-[#f2e7c7]">
  <div 
    className="h-full"
    style={{
      width: '1194px',
      height: '331px',
    }}
  >
    <div className="flex flex-col font-[Foco] gap-6 px-6 flex-wrap h-full">
      {/* Heading */}
      <div className="mb-2 pt-6">
        <h2
          className="text-[#004AAD] text-[47px] font-normal mb-1"
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
        className="text-[#004AAD] text-left relative px-6"
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
          >
            What this kind of education requires: 
            <br />
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
<div className="relative w-full h-[457px] overflow-visible pl-[159px] bg-[#d8efcd]">
  <div className="mb-6 pt-4">
    <h2
      className="text-[#004AAD] text-left text-[47px] font-normal relative h-[67px] flex items-center justify-start pl-6 pt-4"
      style={{ 
        fontFamily: "Foco, sans-serif", 
        fontStyle: "normal", 
        lineHeight: "normal",
      }}
    >
      WHO FINDS HOME AT ALPHERA
    </h2>
  </div>
  <div className="flex flex-col font-[Foco] sm:flex-row gap-6 px-6 flex-wrap mb-20">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-[#004AAD] text-left relative h-[267px]"
      style={{
        transformOrigin: "0 0",
        transform: "rotate(-90deg) scale(1, 1)",
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
        >
          We serve families who believe: 
          <br />
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
            >
              Education should honor how children were inherently designed to grow and discover. 
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
        >
          <br />
        </span>
        <span
          style={{
            fontFamily: "Foco, sans-serif",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            color: "#004AAD",
          }}
        >
          We might not be right for families seeking: 
          <br />
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
  className="relative w-full overflow-hidden rounded-b-2xl shadow-md"
  initial={{ opacity: 0, y: -30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
  <img
    src="/waitlist4.jpg"
    alt="Alphera Academy Banner"
    className="w-full h-auto"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-[#00000025] to-transparent"></div>
</motion.div>

{/* Ready to see learning through your child's eyes again? Section */}
<div className="relative w-full h-[457px] overflow-visible pl-[159px] bg-[#dadada]">
  <div className="mb-6 pt-4">
    <h2
      className="text-[#004AAD] text-left text-[36px] font-normal relative h-[67px] flex items-center justify-start pl-6 pt-4"
      style={{ 
        fontFamily: "Foco, sans-serif", 
        fontStyle: "normal", 
        lineHeight: "normal",
      }}
    >
      Ready to see learning through your child's eyes again? 
    </h2>
  </div>
  <div className="flex flex-col font-[Foco] sm:flex-row gap-6 px-6 flex-wrap mb-20">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-[#004AAD] text-left relative h-[267px]"
      style={{
        transformOrigin: "0 0",
        transform: "rotate(-90deg) scale(1, 1)",
        fontFamily: "Foco, sans-serif",
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal",
        color: "#004AAD",
      }}
    >
      <span>
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
        <br />
        <br />
      </span>
    </motion.div>
  </div>
</div>
   


      </div>
    </section>
  );
}