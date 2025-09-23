"use client";

import React from "react";

type SectionHeaderProps = {
  show: boolean;
  onRequestClick: any
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
      <div className="text-white font-semibold text-sm">ALS</div>
      <nav className="hidden md:flex gap-6 text-white text-sm bg-white/10 backdrop-blur-xl px-4 py-4 rounded-lg">
        <span className="bg-white/25 text-white px-3 py-1 rounded-lg">Home</span>
        <span>How to use</span>
        <span>About</span>
        <span>Advantages</span>
      </nav>
      <button
        className="text-sm font-semibold cursor-pointer text-black bg-white rounded-lg px-4 py-4 flex justify-between items-center w-36 shadow-ms"
        onClick={onRequestClick}
      >
        <span>Request</span>
        <span>→</span>
      </button>
    </div>
  );
}
