"use client";

import React, { useEffect, useState } from 'react'

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const y = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(y);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true } as any);
    return () => window.removeEventListener('scroll', handleScroll as any);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="fixed  top-4 left-0 right-0 z-50 transition-all duration-300" 
    style={{
      backgroundColor: 'transparent',
      backdropFilter: 'none',
      borderBottom: 'none',
      boxShadow: 'none'
    }}>
{/* Dynamic color switching based on scroll position */}
{(() => {
  return null;
})()}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  style={{
    transform: `translateY(${-Math.min(scrollY, 200) * 0.02}px)`,
    opacity: 1 - Math.min(scrollY, 200) * 0.0005
  }}
>
<div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
  {/* Logo Section */}
  <div className="flex items-center space-x-3 group cursor-pointer">
    <div className="relative">
      {/* <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl"> */}
        <img 
          src="/logo.png" 
          alt="logo" 
          width={58} 
          height={58} 
          style={{ transform: `scale(${1 - Math.min(scrollY, 200) * 0.00025})` }}
        />
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
        className={`relative px-6 py-3 transition-all duration-300 group ${scrollY > 160 ? 'text-gray-800 hover:text-teal-600' : 'text-white hover:text-teal-200'}`}
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
    <button 
      className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-300 group"
      aria-label="Toggle menu"
      aria-controls="mobile-menu"
      aria-expanded={mobileOpen ? 'true' : 'false'}
      onClick={() => setMobileOpen(v => !v)}
    >
      <div className="relative w-5 h-5">
        <span className={`absolute left-0 top-1 block w-5 h-0.5 transition-transform duration-300 ${scrollY > 160 ? 'bg-gray-800' : 'bg-white'} ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`absolute left-0 top-2.5 block w-5 h-0.5 transition-opacity duration-200 ${scrollY > 160 ? 'bg-gray-800' : 'bg-white'} ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`absolute left-0 bottom-1 block w-5 h-0.5 transition-transform duration-300 ${scrollY > 160 ? 'bg-gray-800' : 'bg-white'} ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </div>
    </button>
  </div>
</div>
</div>

{/* Mobile Menu Panel */}
<div id="mobile-menu" className="lg:hidden absolute top-full left-0 right-0 z-50">
  {/* backdrop */}
  <button 
    aria-hidden="true"
    onClick={() => setMobileOpen(false)}
    className={`fixed inset-0 top-16 sm:top-18 md:top-20 bg-black/20 transition-opacity ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
  />
  <div className={`mx-4 mt-2 rounded-xl border border-gray-200 shadow-xl overflow-hidden bg-white/90 backdrop-blur-md transform transition-all duration-300 ${mobileOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-[0.99] pointer-events-none'}`}>
    <nav className="flex flex-col">
      {[{ href: '#home', label: 'Home' }, { href: '#about', label: 'About' }, { href: '#services', label: 'Services' }, { href: '#contact', label: 'Contact' }].map((item) => (
        <a key={item.href} href={item.href} className="px-5 py-3 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors" onClick={() => setMobileOpen(false)}>
          {item.label}
        </a>
      ))}
    </nav>
    <div className="p-4 border-t border-gray-200">
      <button className="w-full px-5 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform active:scale-[0.99] transition-all">
        Get Started
      </button>
    </div>
  </div>
</div>

{/* Decorative orbs removed for cleaner header */}
</header>
  )
}
