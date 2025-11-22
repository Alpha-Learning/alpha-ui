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
            className="relative w-full h-[390px] sm:h-[420px] md:h-[450px] lg:h-[480px] overflow-hidden shadow-md"
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
          {/* HOW A DAY UNFOLDS */}
          <section className="py-16 sm:py-20 md:py-24">
<div className="max-w-max mx-auto px-6 sm:px-30">

  {/* Heading + Icon */}
  <motion.div
    className="flex items-start gap-7 mb-7"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    <img src="/unfoldicon.png" alt="clock icon" className="w-21 h-21 sm:w-25 sm:h-25" />

    <div>
      <h2
        className="text-[#004AAD] text-[32px] sm:text-[47px] font-[400] leading-tight"
        style={{ fontFamily: "Foco" }}
      >
        HOW A DAY UNFOLDS
      </h2>

      <p
        className="text-[#004AAD] text-[19px] sm:text-[24px] font-[400] leading-tight"
        style={{ fontFamily: "Foco" }}
      >
        Following natural rhythms, not rigid schedules
      </p>
    </div>
  </motion.div>

  {/* Single Narrative Text Section */}
  <motion.div
    className="rounded-[30px] "
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ amount: 0.4 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    <p
      className="text-[#004AAD] text-[16px] sm:text-[16px] leading-[150%] whitespace-pre-line"
      style={{ fontFamily: 'Foco' }}
    >
      {`At Alphera Academy, the day begins gently. Children arrive at their own pace, easing in with movement, mindful breathing, and quiet intention-setting. There are no bells or rushed transitions, only a calm and welcoming start.

Learning unfolds naturally through Pod Time, where Math, English, Science, and Arabic are explored in ways that honor each child’s rhythm. Some work on cushions, others at tables. Some prefer music while others need silence. ALS technology observes what supports each learner, while our Academic Guides shape the journey moment by moment.

When energy shifts, children choose how to reset, whether by reading quietly, running outdoors, or staying absorbed in their work. Hands-on discovery follows, with projects rooted in real purpose such as solving school challenges, interviewing community elders, or experimenting from curiosity.

Lunch is shared as a community moment where friendships grow and social skills develop naturally. In the afternoon, learning becomes creative expression through art, building, writing, or performance.

As the day winds down, children connect with mentors, reflect in small groups, or take quiet time to think. Before heading home, they pause for daily reflection, considering what they learned, what challenged them, and what they hope to explore next.

This is how a day at Alphera Academy unfolds: gently, intentionally, and always in harmony with the child’s natural rhythm.`}
    </p>
  </motion.div>
</div>

</section>



         
          <motion.div
            className="relative w-full h-[390px] sm:h-[420px] md:h-[450px] lg:h-[480px] overflow-hidden shadow-md"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {/* <img
              src="/opmain.png"
              alt="Alphera Academy Banner"
              className="w-full h-full object-cover object-left "
            /> */}
            <picture>
  {/* Mobile image */}
  <source
    media="(max-width: 768px)"
    srcSet="/our-small-circle-mob.png"
  />
  
  {/* Desktop image */}
  <img
    src="/girls-desk.png"
    alt="Alphera Academy Banner"
    className="w-full h-full object-fill object-center"
    // className="w-full h-[320px] md:h-[100%] object-cover"
  />
</picture>

            <div className="absolute inset-0 bg-gradient-to-b from-[#00000025] to-transparent h-[431px]"></div>
          </motion.div>
        </div>

       
     {/* SECTION 1 - TECHNOLOGY WITH PURPOSE */}
{/* SECTION 1 - TECHNOLOGY WITH PURPOSE */}
<section className="bg-[#EFEDCD] py-16">
  <div className="mx-auto px-6 md:px-8 lg:px-10">
    <motion.div
      className="flex flex-col md:flex-row items-center md:items-start gap-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Text */}
     <div className="w-full md:w-[60%] ml-0 md:ml-[77px]">

  <h3
    className="text-[#004AAD] font-normal mb-4 text-[28px] sm:text-[36px] md:text-[47px]"
    style={{
      fontFamily: "Foco",
      fontWeight: 400,
      lineHeight: "normal",
    }}
  >
    TECHNOLOGY WITH PURPOSE
  </h3>

  <p
    className="text-[#004AAD] leading-[1.7] mb-4 text-[18px] sm:text-[20px] md:text-[24px]"
    style={{
      fontFamily: "Foco",
      fontWeight: 400,
      lineHeight: "normal",
    }}
  >
    Smart tools serving human relationships
  </p>

 <p
    className="text-[#004AAD] leading-[1.7] mb-4 text-[14px] sm:text-[15px] md:text-[16px]"
    style={{
      fontFamily: "Foco",
      fontWeight: 400,
      lineHeight: "normal",
    }}
  >
   Our ALS quietly observes each child when they’re most focused and how they prefer to learn. This helps Academic Guides understand each child more completely. But here’s what technology never does at Alphera: 
  </p>

  {/* Bullet List */}
  <ul
    className="list-disc pl-5 text-[#004AAD] mb-4 text-[14px] sm:text-[15px] md:text-[16px]"
    style={{ fontFamily: "Foco", fontWeight: 400 }}
  >
    <li>It doesn't deliver lessons </li>
    <li>It doesn't make decisions about what a child needs</li>
    <li>It doesn’t determine learning goals </li>
    <li>It doesn’t provide emotional support</li>
    <li>It never replaces human connection</li>
  </ul>

  <p
    className="text-[#004AAD] leading-[1.7] mb-4 text-[14px] sm:text-[15px] md:text-[16px]"
    style={{
      fontFamily: "Foco",
      fontWeight: 400,
      lineHeight: "normal",
    }}
  >
    Think of our ALS technology as an excellent journal that helps Academic
    Guides engage with each child most effectively. The insights are valuable,
    but human wisdom guides everything that happens next.
  </p>

  <p
    className="text-[#004AAD] leading-[1.7] text-[14px] sm:text-[15px] md:text-[16px]"
    style={{
      fontFamily: "Foco",
      fontWeight: 400,
      lineHeight: "normal",
    }}
  >
    The goal: Children who use technology with purpose without being overly dependent.
  </p>

</div>


      {/* Image */}
      <div className="w-full md:w-[40%] flex justify-center md:justify-center">
        <motion.img
          src="/op4.png"
          alt="Technology with purpose"
          className="w-[350px] lg:w-[400px] h-auto object-cover rounded-lg shadow-md"
          style={{ borderRadius: "30px" }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        />
      </div>
    </motion.div>
  </div>
</section>


{/* SECTION 2 - GUIDES WHO UNDERSTAND CHILDHOOD */}
<section className="bg-[#E2DFB6] py-16">
  <div className="mx-auto px-6 md:px-8 lg:px-10">
    <motion.div
      className="flex flex-col md:flex-row-reverse items-center md:items-start gap-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Text */}
      <div className="w-full md:w-[60%] ">
        <h3
          className="text-[#004AAD] font-normal mb-4"
          style={{
            fontFamily: "Foco",
            fontSize: "47px",
            fontWeight: 400,
            lineHeight: "normal",
          }}
        >
          GUIDES WHO UNDERSTAND CHILDHOOD
        </h3>

        <p
          className="text-[#004AAD] leading-[1.8] mb-6"
          style={{
            fontFamily: "Foco",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "normal",
          }}
        >
          Adults trained in human development, not just subject matter. Our guides
          help children thrive not by forcing learning, but by understanding how
          children learn best.
        </p>

        <ul
          className="list-disc pl-6 text-[#004AAD] space-y-2"
          style={{ fontFamily: "Foco", fontSize: "16px", fontWeight: 400 }}
        >
          <li>Learning Mentors work with a maximum of 15 children, ensuring genuine relationships and individual attention.</li>
          <li>Development Coaches specialise in emotional intelligence, creativity, and social skills.</li>
          {/* <li>Experienced Designers. Also this parts terminology confuses me a little. Should we stick to what it is, Academic Guides, Meta Coachs, (family partners is actually a very cool idea but also not something specifically mentioned anywhere in our system as of yet)</li> */}
          <li>Experienced Designers create hands-on learning that connects to real life.</li>
          <li>Family Partners help parents understand their child's growth and extend learning at home.</li>
          <li>Adults are chosen for their commitment to honoring every child as a distinct person, rather than producing standardised results.</li>
        </ul>
      </div>

      {/* Image */}
      <div className="w-full md:w-[40%] flex justify-center md:justify-center">
        <motion.img
          src="/op3.jpg"
          alt="Guides who understand childhood"
          className="w-[350px] lg:w-[400px] h-auto object-cover rounded-lg shadow-md"
          style={{ borderRadius: "30px" }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        />
      </div>
    </motion.div>
  </div>
</section>




        {/* Full Width Image Section  */}
        <motion.div 
          // className="mt-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <img
            src="/walkingchild.png"
            alt="Additional classroom scene"
            className="w-full h-[320px] md:h-[100%] object-cover"
          />
        </motion.div>

      <section className="bg-[#D8EFCD] py-16">
  <div className="mx-auto px-6 md:px-8 lg:px-10">

    <motion.div
      className="flex flex-col-reverse md:flex-row-reverse items-center md:items-start gap-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Text */}
      <div className="w-full md:w-[60%]">

        <p
          className="text-[#004AAD] leading-[1.8] mb-6"
          style={{
            fontFamily: "Foco",
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "normal",
          }}
        >
          The skills that will always matter
        </p>

        <p
          className="text-[#004AAD] space-y-2"
          style={{ fontFamily: "Foco", fontSize: "16px", fontWeight: 400 }}
        >
          In the near future, artificial intelligence will handle routine information processing.
          The people who will thrive in that environment will be those who can:
        </p>

        <ul
          className="list-disc pl-6 text-[#004AAD] space-y-2 mt-4"
          style={{ fontFamily: "Foco", fontSize: "16px", fontWeight: 400 }}
        >
          <li>See patterns and possibilities others miss</li>
          <li>Build trust and lead with empathy</li>
          <li>Make critical decisions when there's no clear right answer</li>
          <li>Adapt quickly using intuition and experience</li>
          <li>Create art, beauty, meaning, and connection</li>
          {/* <li>Remain authentically human in a digital world</li> */}
          <li>Cultivating inherent strengths in an artificially intelligent era</li>
        </ul>

        <p
          className="text-[#004AAD] mt-4"
          style={{ fontFamily: "Foco", fontSize: "16px", fontWeight: 400 }}
        >
          These aren't new skills; they're ancient competencies that traditional schooling
          often controls or suppresses. We're helping children rediscover what makes
          them uniquely, powerfully human.
        </p>

      </div>

      {/* Heading Block (Image container position previously) */}
      <div className="w-full md:w-[40%] flex items-center justify-center md:justify-center text-center md:text-left md:mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "Foco",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "47px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#004AAD",
            width: "373px",
          }}
        >
          EMPOWERING LEARNERS FOR A MEANINGFUL FUTURE
        </motion.h2>
      </div>

    </motion.div>
  </div>
</section>



      </div>
    </section>
  );
}