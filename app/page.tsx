"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FirstSection from "./components/landing/FirstSection";
import SecondSection from "./components/landing/SecondSection";
import ThirdSection from "./components/landing/ThirdSection";
import LocationMap from "./components/landing/LocationMap";
import InteractiveFooter from "./components/landing/InteractiveFooter";
import Header from "./components/landing/Header";
import VideoSection from "./components/landing/videoSection";

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
 <div id="top">
  <Header />
  <VideoSection />
  {/* <FirstSection scrollY={scrollY} /> */}
  {/* <img src="/f.png" alt="" className="w-full h-[320px] md:h-[660px] object-cover" /> */}
  {/* <SecondSection scrollY={scrollY} /> */}
  <ThirdSection  />
  {/* <LocationMap /> */}
  <InteractiveFooter />
 </div>
  );
}
