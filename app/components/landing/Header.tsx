"use client";

import React, { useEffect, useState } from 'react'

export default function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 relative overflow-hidden" 
    style={{
      backgroundColor: scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
      backdropFilter: scrollY > 50 ? 'blur(20px)' : 'blur(10px)',
      borderBottom: scrollY > 50 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
      boxShadow: scrollY > 50 ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'
    }}>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between items-center h-20">
  {/* Logo Section */}
  <div className="flex items-center space-x-3 group cursor-pointer">
    <div className="relative">
      {/* <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl"> */}
        <img src="/logo.png" alt="logo" width={58} height={58} />
      {/* </div> */}
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
    </div>
    {/* <div className="flex flex-col">
      <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-teal-600 group-hover:to-teal-800 transition-all duration-300">
        ALS Workflow
      </div>
      <div className="text-xs text-gray-500 font-medium tracking-wider">
        LEARNING ASSESSMENT
      </div>
    </div> */}
  </div>

  {/* Navigation */}
  <nav className="hidden lg:flex items-center space-x-1">
    {[
      { href: '#home', label: 'Home', icon: '🏠' },
      { href: '#about', label: 'About', icon: '📋' },
      { href: '#services', label: 'Services', icon: '⚙️' },
      { href: '#contact', label: 'Contact', icon: '📞' }
    ].map((item, index) => (
      <a
        key={item.href}
        href={item.href}
        className="relative px-6 py-3 text-gray-700 hover:text-teal-600 transition-all duration-300 group"
        style={{
          animationDelay: `${index * 0.1}s`
        }}
      >
        <span className="relative z-10 flex items-center space-x-2">
          <span className="text-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
          <span className="font-medium">{item.label}</span>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-700 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
      </a>
    ))}
  </nav>

  {/* CTA Button */}
  <div className="hidden md:flex items-center space-x-4">
    <button className="relative px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group overflow-hidden">
      <span className="relative z-10">Get Started</span>
      <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </button>
  </div>

  {/* Mobile Menu Button */}
  <div className="lg:hidden">
    <button className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300 group">
      <div className="flex flex-col space-y-1">
        <div className="w-5 h-0.5 bg-gray-700 group-hover:bg-teal-600 transition-colors duration-300"></div>
        <div className="w-5 h-0.5 bg-gray-700 group-hover:bg-teal-600 transition-colors duration-300"></div>
        <div className="w-5 h-0.5 bg-gray-700 group-hover:bg-teal-600 transition-colors duration-300"></div>
      </div>
    </button>
  </div>
</div>
</div>

{/* Animated Background Elements */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {/* layered orbs for a distinct header look */}
  <div className="absolute -top-10 left-1/5 w-40 h-40 bg-gradient-to-r from-teal-200 to-teal-300 rounded-full opacity-30 animate-pulse"></div>
  <div className="absolute -top-6 right-1/4 w-28 h-28 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-25 animate-pulse" style={{animationDelay: '0.8s'}}></div>
  <div className="absolute top-4 left-1/2 w-16 h-16 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1.6s'}}></div>
  {/* subtle gradient beam */}
  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-300/60 to-transparent"></div>
</div>
</header>
  )
}
