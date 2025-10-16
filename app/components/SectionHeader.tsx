"use client";

import React from "react";

type SectionHeaderProps = {
  show: boolean;
  onRequestClick: any;
};

export default function SectionHeader({ show, onRequestClick }: SectionHeaderProps) {
  return (
    <div
      className={`absolute top-1 sm:top-3 md:top-4 left-0 right-0 flex items-center justify-between px-2 sm:px-4 md:px-6 lg:px-10 ${
        show ? "fade-down-in" : "opacity-0"
    } [animation-delay:800ms]`}
      onAnimationEnd={() => {}}
    >
      <img 
        src="/logo.png" 
        alt="logo" 
        className="w-14 mt-2 h-10 sm:w-14 sm:h-12 md:w-20 md:h-14 lg:w-20 lg:h-14"
      />
      {/* <nav className="hidden sm:flex gap-1 md:gap-2 lg:gap-4 py-2 md:py-3 [clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)] bg-gray-300 px-1 md:px-2 text-white/80 text-xs md:text-sm backdrop-blur-xl rounded-lg md:rounded-xl ring-1 ring-white/25">
        <span className="px-2 md:px-3 hover:bg-gray-200 py-2 md:py-3 hover:[clip-path:polygon(0%_0%,85%_0%,100%_38%,100%_100%,16%_100%,0%_56%)] rounded-md bg-gray-300/50 active:bg-gray-300/70 cursor-pointer transition-colors">Home</span>
        <span className="px-2 md:px-3 hover:bg-gray-200 py-2 md:py-3 hover:[clip-path:polygon(0%_0%,85%_0%,100%_38%,100%_100%,16%_100%,0%_56%)] rounded-md active:bg-gray-300/50 cursor-pointer transition-colors">How to use</span>
        <span className="px-2 md:px-3 hover:bg-gray-200 py-2 md:py-3 hover:[clip-path:polygon(0%_0%,85%_0%,100%_38%,100%_100%,16%_100%,0%_56%)] rounded-md active:bg-gray-300/50 cursor-pointer transition-colors">About</span>
        <span className="px-2 md:px-3 hover:bg-gray-200 py-2 md:py-3 hover:[clip-path:polygon(0%_0%,85%_0%,100%_38%,100%_100%,16%_100%,0%_56%)] rounded-md active:bg-gray-300/50 cursor-pointer transition-colors">Advantages</span>
      </nav> */}
      <div className="flex-1 flex justify-center px-1 sm:px-2">
        <h1
          className="text-[#142954] hidden sm:flex font-bold tracking-tight text-center leading-tight 
                     text-xs sm:text-base md:text-3xl lg:text-4xl"
        >
          A New Era Of Education Begins Here.
        </h1>
      </div>
      <button
        className="text-xs sm:text-sm bg-[#142954] font-semibold [clip-path:polygon(0%_0%,85%_0%,100%_38%,100%_100%,16%_100%,0%_56%)] cursor-pointer rounded-lg md:rounded-xl px-1 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 flex justify-between items-center w-20 sm:w-28 md:w-38 lg:w-40 shadow-ms ring-1 ring-black/10 transition-colors"
        onClick={onRequestClick}
      >
        <span className=" px-2 text-[11px] pl-3 sm:pl-0 text-white sm:text-lg sm:inline">Waitlist</span>
        {/* <span className="sm:hidden">List</span> */}
        <span className="hidden text-white sm:flex">→</span>
      </button>
    </div>
  );
}
