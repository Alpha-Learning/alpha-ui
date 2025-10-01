"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FirstSection from "./components/landing/FirstSection";
import SecondSection from "./components/landing/SecondSection";
import ThirdSection from "./components/landing/ThirdSection";
import LocationMap from "./components/landing/LocationMap";
import InteractiveFooter from "./components/landing/InteractiveFooter";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Ensure video plays
    const video = document.querySelector('video');
    if (video) {
      video.play().catch(error => {
        console.log('Autoplay prevented:', error);
        // Try to play again after user interaction
        const playVideo = () => {
          video.play();
          document.removeEventListener('click', playVideo);
          document.removeEventListener('scroll', playVideo);
        };
        document.addEventListener('click', playVideo);
        document.addEventListener('scroll', playVideo);
      });
    }
  }, []);

  useEffect(() => {
    // Observe reveal elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const delayAttr = target.getAttribute('data-reveal-delay');
            const delay = delayAttr ? parseInt(delayAttr, 10) : 0;
            setTimeout(() => target.classList.add('is-visible'), delay);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll('.reveal-from-bottom')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (  
    <div className="min-h-screen bg-white">
      {/* Modern Animated Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
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
                  <img src="/logo.png" alt="logo" width={48} height={48} />
                {/* </div> */}
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
              </div>
              <div className="flex flex-col">
                <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-teal-600 group-hover:to-teal-800 transition-all duration-300">
                  ALS Workflow
                </div>
                <div className="text-xs text-gray-500 font-medium tracking-wider">
                  LEARNING ASSESSMENT
                </div>
              </div>
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
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-teal-200 to-teal-300 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-0 left-1/2 w-16 h-16 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </header>

      {/* Hero Video Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Fallback background image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/image-Photoroom.png')",
          }}
        ></div>
        
        {/* Video overlay */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => console.log('Video loaded successfully')}
          onError={(e) => console.log('Video error:', e)}
        >
          <source src="/videos/animated.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Welcome to ALS Workflow
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            Transforming Learning Through Comprehensive Assessment
          </motion.p>
          <motion.button
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.button>
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* First Content Section - Images Left, Text Right */}
      <FirstSection scrollY={scrollY} />

      {/* Second Content Section - extracted component, full viewport height */}
      <SecondSection scrollY={scrollY} />

      {/* Third Content Section - Text Left, Images Right */}
      {/* <ThirdSection scrollY={scrollY} /> */}

      {/* Location Map Section */}
      <LocationMap />

      {/* Interactive Footer */}
      <InteractiveFooter />
    </div>
  );
}
