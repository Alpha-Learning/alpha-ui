"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import LeftInputSection from "./LeftInputSection";

export default function NextSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showInitialContent, setShowInitialContent] = useState(false);
  const [showFinalContent, setShowFinalContent] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaderDone, setLoaderDone] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [borderStep, setBorderStep] = useState(0);

  // Ensure video keeps playing
  const ensurePlaying = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    }
  };

  // New sequence: section slides in with initial content → loader appears → loader completes → final content replaces initial content
  useEffect(() => {
    if (!ready) return;

    // Attempt to start playback when ready
    ensurePlaying();

    // Show header and initial content immediately when section loads
    const t1 = window.setTimeout(() => setShowHeader(true), 200);
    const t2 = window.setTimeout(() => setShowInitialContent(true), 400);

    // Show loader after initial content is visible
    const t3 = window.setTimeout(() => setShowLoader(true), 1500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [ready]);

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
    <section className={`relative w-full h-screen  bg-white slide-in-right`}>
      <div
        className={`w-full h-full p-2 push-container ${
          drawerOpen ? "push-right" : ""
        }`}
      >
        <div className="relative w-full h-full rounded-2xl md:rounded-[28px] overflow-hidden bg-white">
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity  duration-700 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            src="/videos/original-e8f92507edede186d6fa91bf0aec6760.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls={false}
            onCanPlay={() => {
              setReady(true);
              ensurePlaying();
            }}
            onEnded={ensurePlaying}
            onPause={ensurePlaying}
            onStalled={ensurePlaying}
            onError={ensurePlaying}
          />
          <div
            className={`absolute left-0 r bottom-0 w-[45vw] rounded-md h-[40vh] bg-white angle-corner ${
              showInitialContent ? "fade-in" : "opacity-0"
            }`}
          />

          <SectionHeader show={showHeader} onRequestClick={setDrawerOpen} />

          {/* Initial content - shown when section loads */}
          {showInitialContent && !showFinalContent && (
            <>
              {/* Bottom left content */}
              <div className="absolute left-8 md:left-16 bottom-24 text-white fade-in">
                <div className="text-lg font-semibold mb-2">
                  Digital Innovation
                </div>
                <div className="text-sm max-w-[300px]">
                  Transforming traditional banking with cutting-edge technology
                  and seamless user experiences.
                </div>
              </div>

              {/* Bottom right content */}
              <div className="absolute right-8 md:right-16 bottom-24 text-white text-right fade-in">
                <div className="text-lg font-semibold mb-2">
                  Secure & Reliable
                </div>
                <div className="text-sm max-w-[300px]">
                  Built with enterprise-grade security protocols ensuring your
                  transactions are always protected.
                </div>
              </div>
            </>
          )}

          {/* Final content - shown after loading completes */}
          {showFinalContent && (
            <>
              {/* Left title block */}
              <div className="absolute left-8 md:left-16 top-[18vh] text-white content-return-up">
                <div className="text-3xl md:text-5xl font-extrabold leading-tight">
                  <div>Alpha</div>
                  <div>Learning</div>
                  <div>System</div>
                </div>
              </div>

              {/* Bottom info panels */}
              <div className="absolute left-0 right-0 bottom-8 md:bottom-10 px-6 md:px-10 content-return-up">
                <div className="grid grid-cols-1 gap-x-20 md:grid-cols-3 gap-14 md:gap-6">
                  {[
                    {
                      title: "About",
                      text: "CBDC is a digital form of fiat currency issued .",
                    },
                    {
                      title: "Storing",
                      text: "CBDC can be stored in digital wallets and accessed using a",
                    },
                    {
                      title: "Functions",
                      text: "CBDC functions like transfers, and remittances.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="relative min-h-[250px]">
                      <div className={`absolute inset-0 bg-transparent border-t-2 border-r-2 rounded-tr-xl transition-colors duration-500 ${i < borderStep ? "border-gray-200" : "border-transparent"}`}></div>
                      <div className="relative text-white  flex flex-col justify-start p-5 pt-3">
                        <div className="font-bold text-2xl mb-4">{item.title}</div>
                        <div className="text-xs md:text-sm leading-relaxed opacity-90 mt-2 md:mt-3">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Center loading card */}
          {showLoader && !loaderDone && (
            <div
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/25 backdrop-blur-xl rounded-[28px] px-10 py-8 text-white text-center shadow-[0_10px_40px_rgba(0,0,0,0.25)] ${
                progress < 100 ? "rise-in" : "rise-out"
              }`}
            >
              <div className="text-3xl font-extrabold mb-4">{progress}%</div>
              <div
                className="progress-circle mx-auto mb-4"
                style={{
                  ["--progress" as any]: `${(progress / 100) * 360}deg`,
                }}
              />
              <div className="text-[11px] max-w-[260px]">
                Reducing the cost of cash handling through the implementation of
                CBDC.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Left request drawer */}
      {drawerOpen && <LeftInputSection setDrawerOpen={setDrawerOpen} />}
    </section>
  );
}
