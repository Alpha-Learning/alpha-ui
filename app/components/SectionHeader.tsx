"use client";

import React from "react";

type SectionHeaderProps = {
  show: boolean;
  onRequestClick: any;
};

export default function SectionHeader({ show, onRequestClick }: SectionHeaderProps) {
  return (
    <div
      className={`absolute top-4 left-0 right-0 flex items-center justify-between px-6 md:px-10 ${
        show ? "fade-down-in" : "opacity-0"
      }`}
      style={{ animationDelay: "800ms" }}
      onAnimationEnd={() => {}}
    >
      <div className="text-white font-semibold text-sm ">ALS</div>
      <nav className="hidden md:flex gap-4 py-3 [clip-path:polygon(0%_0%,95%_0%,100%_28%,100%_100%,6%_100%,0%_65%)] bg-gray-300 px-2 text-white/80 text-sm backdrop-blur-xl rounded-xl ring-1 ring-white/25">
        <span className="px-3 hover:bg-gray-200 py-3 hover:[clip-path:polygon(0%_0%,85%_0%,100%_38%,100%_100%,16%_100%,0%_56%)] rounded-md bg-gray-300/50  active:bg-gray-300/70 cursor-pointer transition-colors">Home</span>
        <span className="px-3 hover:bg-gray-200 py-3 hover:[clip-path:polygon(0%_0%,85%_0%,100%_38%,100%_100%,16%_100%,0%_56%)] rounded-md  active:bg-gray-300/50 cursor-pointer transition-colors">How to use</span>
        <span className="px-3 hover:bg-gray-200 py-3 hover:[clip-path:polygon(0%_0%,85%_0%,100%_38%,100%_100%,16%_100%,0%_56%)] rounded-md  active:bg-gray-300/50 cursor-pointer transition-colors">About</span>
        <span className="px-3 hover:bg-gray-200 py-3 hover:[clip-path:polygon(0%_0%,85%_0%,100%_38%,100%_100%,16%_100%,0%_56%)] rounded-md  active:bg-gray-300/50 cursor-pointer transition-colors">Advantages</span>
      </nav>
      <button
        className="text-sm font-semibold [clip-path:polygon(0%_0%,85%_0%,100%_38%,100%_100%,16%_100%,0%_56%)] cursor-pointer text-black bg-white rounded-xl px-4 py-4 flex justify-between items-center w-36 shadow-ms ring-1 ring-black/10 transition-colors hover:bg-gray-100 active:bg-gray-200"
        onClick={onRequestClick}
      >
        <span>Request</span>
        <span>→</span>
      </button>
    </div>
  );
}
