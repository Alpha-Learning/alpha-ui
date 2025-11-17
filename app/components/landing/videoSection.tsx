"use client";

import React from 'react';
import  { useEffect, useState } from "react";

export default function VideoSection() {
   const [showBar, setShowBar] = useState(false);
   const [showText,setShowText] =useState(false);
   const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if(showImage){
    const timer = setTimeout(() => setShowBar(true), 1000); 
    const text=setTimeout(()=> setShowText(true),1500)
    return () => {
      clearTimeout(timer);
      clearTimeout(text);
    }
    }
  }, [showImage]);

  return (
     <>
    <section className="relative w-full h-screen overflow-hidden">
      
      <div className="absolute w-full h-full top-0 left-0">
       <video
    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
      showImage ? "opacity-0" : "opacity-100"
    }`}
    autoPlay
    muted
    playsInline
    onEnded={() => setShowImage(true)}
  >
    <source src="/videos/final.mp4" type="video/mp4" />
    <source src="/videos/background-video.webm" type="video/webm" />
    Your browser does not support the video tag.
  </video>

  
  <img
    src="/homecrop2.jpg"
    alt="Background"
    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
      showImage ? "opacity-100" : "opacity-0"
    }`}
  />
      </div>
      <div
       className={`absolute bottom-0 left-0 w-full 
bg-[linear-gradient(0deg,rgba(173,63,0,0.80)_18.27%,rgba(144,144,144,0)_100%)] 
backdrop-blur-[0px] text-white flex items-center justify-center text-2xl font-semibold 
transition-all duration-700 ${showBar ? "h-[50%]" : "h-0"}`}


      >
       <p
  className={`transition-opacity duration-700 text-center px-6 max-w-3xl mx-auto ${
    showText ? "opacity-100" : "opacity-0"
  }`}
>
  <span
  className="block mb-6 text-center align-middle font-normal text-[36px] leading-[100%] tracking-[0%]"
  style={{ fontFamily: "Foco",
          color: "#FFF",
          fontWeight: "400",
          lineHeight: "normal"
            }}
>
  Welcome to Alphera Academy
</span>

<span
  className="block mb-6 text-center align-middle font-normal text-[20px] leading-[100%] tracking-[0%] font-[normal] "
style={{  fontFamily: "Foco",
          color: "#FFF",
          fontWeight: "400",
          lineHeight: "normal"
 }}
>
  A new kind of school where innovation meets purpose. We combine the <br/>
  best of the British and Arabic curricula with AI-driven personalisation <br/>
  preparing students not just for exams, but for life.
</span>
<span
 className="font-[Foco] font-black text-[25px] leading-[100%] tracking-[0%] text-center align-middle "
>
  Join the Waiting List
</span>
</p>

 </div>
       {/* Content Overlay */}
      {/* <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to Our Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Experience the future of education and innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300">
              Get Started
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div> */}

      {/* Controls overlay removed per requirement (video remains muted) */}
      
      {/* Bottom Blur Overlay */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80  backdrop-blur-sm"></div> */}
    </section>
<section className="relative w-full font-[Foco] bg-white overflow-hidden flex items-center justify-center">
  <div 
    style={{
      width: '1194px',
      height: '540px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      className="text-[#004AAD] text-left font-[Foco]"
      style={{
        width: '1978px',
        height: '328px',
        fontFamily: "Foco",
        color: "#004AAD",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '108px',
        paddingRight: '108px',
        paddingTop: '69px',
        paddingBottom: '67px',
      }}
    >
      <span>
        <span
          style={{
            fontFamily: "Foco",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            color: "#004AAD",
          }}
        >
          Your child is naturally curious. We aim to nurture that curiosity, not tame it.
          <br />
        </span>
        <span
          style={{
            fontFamily: "Foco",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            color: "#004AAD",
          }}
        >
          <br />
          Somewhere between finger paints and final exams, we are taught that learning happens at desks. That children need to sit still, memorize facts, and compete for standardized grades.
          <br />
          <br />
          But that style of learning goes against our very nature. Humans learn through wonder, inquisition, and experience. Consider the way a young child plays make-believe or explores a garden; A cardboard box becomes a mighty fortress or a rocket ship or a laboratory. A garden is really an infinite universe, with curious creatures and an unfathomably harmonious ecosystem to be discovered.
          <br />
          <br />
          At Alphera, we've built a school around the truth that learning comes naturally. Technology helps us understand each child and their individual needs better, but the environment, the culture, and the experience are designed to be beautifully, powerfully human.
          <br />
          <br />
          We're not preparing your child for an AI-dominated world. We are preparing them to understand AI as a tool, and to imagine and innovate with healthy, happy bodies and minds.
        </span>
      </span>
    </div>
  </div>
</section>
 </>
  )
}
