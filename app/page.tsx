"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FirstSection from "./components/landing/FirstSection";
import SecondSection from "./components/landing/SecondSection";
import ThirdSection from "./components/landing/ThirdSection";
import LocationMap from "./components/landing/LocationMap";
import InteractiveFooter from "./components/landing/InteractiveFooter";
import Header from "./components/landing/Header";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

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
    window.addEventListener("scroll", handleScroll, { passive: true } as any);
    return () => window.removeEventListener("scroll", handleScroll as any);
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
    <Header/>

      {/* Hero Video Section */}
      <section id="home" className="relative pt-16 sm:pt-20 min-h-[70vh] sm:min-h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Fallback background image */}
        {/* <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/image-Photoroom.png')",
          }}
        ></div> */}
        
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
          <source src="/videos/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Welcome to ALS Workflow
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 text-white/90"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            Transforming Learning Through Comprehensive Assessment
          </motion.p>
          <motion.button
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg font-semibold transition-colors shadow-md"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.button>
        </div> */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Bottom fade gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
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
