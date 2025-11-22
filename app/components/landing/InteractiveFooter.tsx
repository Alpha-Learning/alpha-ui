"use client";

import React from "react";
import Link from "next/link";

const IconLinkedIn = ({ className = "" }: { className?: string }) => (
  <div
    className={`flex items-center justify-center ${className}`}
    style={{
      width: "32px",
      height: "32px",
      backgroundColor: "#82B3B4", // ✅ light blue background
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#004aad" // ✅ white LinkedIn logo
      style={{
        width: "22px",
        height: "22px",
      }}
    >
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm8 0h4.8v2.2h.1C13.57 8.7 15.2 7.54 17.64 7.54 22.71 7.54 23.64 10.88 23.64 15.22V24h-5v-7.16c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.84-2.72 3.75V24H8V8z" />
    </svg>
  </div>
);


const IconInstagram = ({ className = "" }: { className?: string }) => (
  <div
    className={`flex items-center justify-center ${className}`}
    style={{
      width: "42.67px",
      height: "42.67px",
      backgroundColor: "#004AAD", 
      borderRadius: "8px",       
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="#004AAD"    
      fill="#82B3B4"      
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        width: "35px",
        height: "35px",
      }}
    >
      {/* Outer rounded square */}
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      {/* Lens circle */}
      <circle cx="12" cy="12" r="4" />
      {/* Small camera dot */}
      <circle cx="17.5" cy="6.5" r="1" fill="#004AAD" />
    </svg>
  </div>
);





const IconYouTube = ({ className = "" }: { className?: string }) => (
  <div
    className={`flex items-center justify-center rounded-lg ${className}`}
    style={{
      width: "35.67px",
      height: "25px", // ✅ Slightly rectangular to match YouTube’s aspect
      backgroundColor: "#82B3B4", // ✅ light blue background
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#004aad" // ✅ white play icon
      style={{
        width: "35px",
        height: "25px",
      }}
    >
      <polygon points="9,7.5 9,16.5 16.5,12" />
    </svg>
  </div>
);



export default function Footer() {
  return (
    <footer className="bg-[#004AAD] text-white py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between px-10 gap-8">

        <div className="flex flex-col items-center lg:items-start space-y-3">
          
          
<Link href="/">
  <img
    src="/Groupalp.png"
    alt="Alphera"
    className="w-34 h-34 object-contain cursor-pointer"
  />
</Link>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-20 bg-white/20" />

        {/*  Menu Links */}
        <nav className="text-sm font-jost text-white/90 space-y-2 text-center lg:text-left">
          <a href="/" className="block hover:text-white">HOME</a>
          <a href="/aboutus" className="block hover:text-white">ABOUT US</a>
          <a href="/ourprogram" className="block hover:text-white">OUR PROGRAM</a>
          <a href="/waitlist" className="block hover:text-white">FAMILY PARTNERSHIP</a>
          <a href="#contact" className="block hover:text-white">CONTACT US</a>
        </nav>

        {/* Divider */}
        <div className="hidden lg:block w-px h-20 bg-white/20" />

        {/*  CONNECT Section */}
        <div className="text-center lg:text-left">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-2">CONNECT</h3>
          <div className="text-sm font-sans text-white/80 leading-relaxed">
  <p>+973 6660 1466</p>
  <p>Info@alpheraacademy.edu.bh</p>
  <p>
    <a href="https://alpheraacademy.edu.bh">https://alpheraacademy.edu.bh</a>
  </p>
   <p>Building 359, Road 4606, Block 946,</p>
    <p>Awali, Bahrain</p>
</div>

        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-20 bg-white/20" />

        {/* Social Icons */}
        <div className="flex items-center justify-center lg:justify-start space-x-6">
          <a href="#" className="text-white hover:text-white/70 transition-colors">
            <IconInstagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-white hover:text-white/70 transition-colors">
            <IconLinkedIn className="w-6 h-6" />
          </a>
          <a href="#" className="text-white hover:text-white/70 transition-colors">
            <IconYouTube className="w-6 h-6" />
          </a>
        </div>

      </div>
    </footer>
  );
}
