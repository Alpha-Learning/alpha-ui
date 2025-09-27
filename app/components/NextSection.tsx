"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import LeftInputSection from "./LeftInputSection";
import Content from "./Content";

export default function NextSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(true); // Start as ready to show video immediately
  const [showHeader, setShowHeader] = useState(false);
  const [showInitialContent, setShowInitialContent] = useState(false);
  const [showFinalContent, setShowFinalContent] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaderDone, setLoaderDone] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [borderStep, setBorderStep] = useState(0);
  const initialExiting = showLoader && progress >= 90;

  // Ensure video keeps playing infinitely
  const ensurePlaying = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    }
    // Force loop to ensure infinite playback
    v.loop = true;
  };

  // Slide in and reveal content with proper timing
  useEffect(() => {
    ensurePlaying();
    // Show video first, then content
    const t1 = window.setTimeout(() => setShowHeader(true), 100);
    const t2 = window.setTimeout(() => setShowInitialContent(true), 800);
    const t3 = window.setTimeout(() => setShowLoader(true), 1400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  // Fallback: if video readiness is slow, force reveal after 6s
  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setShowHeader(true);
      setShowInitialContent(true);
      setShowLoader(true);
      ensurePlaying();
    }, 6000);
    return () => window.clearTimeout(fallback);
  }, []);

  // Periodic check to ensure video keeps playing infinitely
  useEffect(() => {
    const interval = setInterval(() => {
      const v = videoRef.current;
      if (v && (v.paused || v.ended)) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  // Start loading progress when loader becomes visible
  useEffect(() => {
    if (!showLoader) return;

    let raf = 0;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(100, Math.round(elapsed / 20));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(step);
      } else {
        // When loading completes, exit loader to top and show final content
        setTimeout(() => {
          setLoaderDone(true);
          setShowFinalContent(true);
        }, 500);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [showLoader]);

  // Lock scrolling when drawer is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original || "";
    }
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [drawerOpen]);

  // When final content becomes visible, animate borders in sequence
  useEffect(() => {
    if (!showFinalContent) return;
    setBorderStep(0);
    const t1 = window.setTimeout(() => setBorderStep(1), 150);
    const t2 = window.setTimeout(() => setBorderStep(2), 350);
    const t3 = window.setTimeout(() => setBorderStep(3), 550);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [showFinalContent]);

  return (
    <section className={`relative w-full h-screen bg-white slide-in-right p-0 ${drawerOpen && 'p-3'} sm:p-2`}>
      <div className={`w-full h-full p-1 sm:p-2 md:p-3 lg:p-2 push-container   ${drawerOpen ? "push-right" : ""}`}>
        {/* <div style={{backgroundImage: "url('/image.png')",  backgroundPosition: "center"}} className="bg-cover relative w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[28px] overflow-hidden bg-white"> */}
          <video
            ref={videoRef}
            className={`flex  rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[28px]  absolute inset-0 w-full h-full object-cover sm:object-cover transition-opacity duration-500 ${
              ready ? "opacity-100" : "opacity-30"
            }`}
            src="/videos/original-e8f92507edede186d6fa91bf0aec6760.mp4"
            // src="/videos/animated.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls={false}
            onLoadStart={() => {
              // Show video immediately when loading starts
              setReady(true);
            }}
            onCanPlay={() => {
              setReady(true);
              ensurePlaying();
            }}
            onLoadedData={() => {
              // Video data is loaded, ensure it's visible
              setReady(true);
            }}
            onEnded={() => {
              // Force restart when video ends
              const v = videoRef.current;
              if (v) {
                v.currentTime = 0;
                v.play().catch(() => {});
              }
            }}
            onPause={() => {
              // Immediately resume if paused
              const v = videoRef.current;
              if (v && v.paused) {
                v.play().catch(() => {});
              }
            }}
            onStalled={() => {
              // Restart if stalled
              const v = videoRef.current;
              if (v) {
                v.load();
                v.play().catch(() => {});
              }
            }}
            onError={() => {
              // Retry on error
              const v = videoRef.current;
              if (v) {
                v.load();
                v.play().catch(() => {});
              }
            }}
            onTimeUpdate={() => {
              // Ensure it's still playing
              ensurePlaying();
            }}
          />
          <div
            className={`hidden md:flex absolute left-0 bottom-0 w-[65vw] sm:w-[55vw] md:w-[50vw] lg:w-[45vw] xl:w-[40vw] rounded-md h-[30vh] sm:h-[35vh] md:h-[38vh] lg:h-[40vh] xl:h-[42vh] bg-white angle-corner ${
              showInitialContent ? "fade-in" : "opacity-0"
            }`}
          />

          <SectionHeader show={showHeader} onRequestClick={setDrawerOpen} />

          {/* Initial content - shown when section loads */}
          {/* {showInitialContent && !showFinalContent && (
            <>
              <div className={`block sm:hidden absolute left-0 right-0 bottom-2 px-4 ${initialExiting ? "content-exit-down" : "content-return-up"}`}>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      title: "Digital Innovation",
                      text: "Transforming traditional banking with cutting-edge technology and seamless user experiences.",
                    },
                    {
                      title: "Secure & Reliable", 
                      text: "Built with enterprise-grade security protocols ensuring your transactions are always protected.",
                    },
                  ].map((item, i) => (
                    <div key={i} className={`relative min-h-[120px] w-full max-w-sm mx-auto ${initialExiting ? "content-exit-down" : "fade-in"}`} style={{ animationDelay: !initialExiting ? `${i * 120}ms` : undefined }}>
                      <div className="absolute inset-0 transition-colors duration-500 border-gray-200">
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-current"></div>
                        <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-current"></div>
                      </div>
                      <div className="relative text-[#142954] flex flex-col gap-y-2 justify-between p-3 pt-2">
                        <div className="font-bold text-[#142954] text-lg mb-1">{item.title}</div>
                        <div className="text-xs text-[#142954] leading-relaxed opacity-90 mt-1">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden sm:block">
                <div className={`absolute left-2 md:left-4 lg:left-8 xl:left-22 bottom-16 md:bottom-20 lg:bottom-24 text-white ${initialExiting ? "content-exit-down" : "fade-in"}`}>
                  <div className="text-sm md:text-base text-[#142954] lg:text-lg font-semibold ml-4 md:ml-6 lg:ml-10 mb-1 md:mb-2">
                    Digital Innovation
                  </div>
                  <div className="text-xs text-[#142954] md:text-sm max-w-[180px] md:max-w-[220px] lg:max-w-[250px] xl:max-w-[300px] leading-relaxed">
                    Transforming traditional banking with cutting-edge technology
                    and seamless user experiences.
                  </div>
                </div>

                <div className={`absolute right-2 md:right-4 lg:right-8 xl:right-16 bottom-16 md:bottom-20 lg:bottom-24 text-white text-right ${initialExiting ? "content-exit-down" : "fade-in"}`}>
                  <div className="text-xl text-[#142954] md:text-2xl lg:text-3xl font-semibold mb-1 md:mb-2">
                    Secure & Reliable
                  </div>
                  <div className="text-sm text-[#142954] md:text-base lg:text-lg max-w-[180px] md:max-w-[220px] lg:max-w-[250px] xl:max-w-[300px] leading-relaxed">
                    Built with enterprise-grade security protocols ensuring your
                    transactions are always protected.
                  </div>
                </div>
              </div>
            </>
          )} */}

          {/* Final content - shown after loading completes */}
          {showFinalContent && (
           <Content borderStep={borderStep} />
          )}

          {/* Center loading card */}
          {showLoader && !loaderDone && (
            <div
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/25 backdrop-blur-xl rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-[28px] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 sm:py-4 md:py-6 lg:py-8 text-white text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)] sm:shadow-[0_10px_40px_rgba(0,0,0,0.25)] ${
                progress < 100 ? "rise-in" : "rise-out"
              }`}
            >
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold mb-1 sm:mb-2 md:mb-3 lg:mb-4">{progress}%</div>
              <div
                className="progress-circle mx-auto mb-1 sm:mb-2 md:mb-3 lg:mb-4 scale-60 sm:scale-75 md:scale-90 lg:scale-100"
                style={{
                  ["--progress" as any]: `${(progress / 100) * 360}deg`,
                }}
              />
              <div className="text-[9px] text-[#142954] sm:text-[10px] md:text-[11px] max-w-[160px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[240px] xl:max-w-[260px] leading-relaxed">
                Reducing the cost of cash handling through the implementation of
                CBDC.
              </div>
            </div>
          )}
        {/* </div> */}
      </div>

      {/* Left request drawer */}
      {drawerOpen && <LeftInputSection setDrawerOpen={setDrawerOpen} />}
    </section>
  );
}