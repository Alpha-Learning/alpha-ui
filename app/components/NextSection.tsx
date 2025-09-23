"use client";

import { useEffect, useRef, useState } from "react";

export default function NextSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaderDone, setLoaderDone] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // New sequence: section slides in → text fades in → loader rises from bottom → loader exits to top
  useEffect(() => {
    if (!ready) return;
    
    // After video is ready, show text content
    const t1 = window.setTimeout(() => setShowHeader(true), 500);
    const t2 = window.setTimeout(() => setShowContent(true), 1000);
    
    // After text is visible, show loader from bottom
    const t3 = window.setTimeout(() => setShowLoader(true), 2000);
    
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
      setShowContent(true);
      setShowLoader(true);
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
        // When loading completes, exit loader to top
        setTimeout(() => setLoaderDone(true), 500);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [showLoader]);

  return (
    <section className={`relative w-full h-screen p-4 bg-white slide-in-right`}>
      <div className={`w-full h-full p-4 md:p-6 push-container ${drawerOpen ? "push-right" : ""}`}>
        <div className="relative w-full h-full rounded-2xl md:rounded-[28px] overflow-hidden bg-white">
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            src="/videos/original-e8f92507edede186d6fa91bf0aec6760.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setReady(true)}
          />
          <div className={`absolute left-0 bottom-0 w-[45vw] rounded-md h-[40vh] bg-white/85 angle-corner ${showContent ? "fade-in" : "opacity-0"}`} />
          <div
            className={`absolute top-4 left-0 right-0 flex items-center justify-between px-6 md:px-10 ${
              showHeader ? "fade-down-in" : "opacity-0"
            }`}
            style={{ animationDelay: "800ms" }}
            onAnimationEnd={() => {}}
          >
            <div className="text-white font-semibold text-sm">CBDC</div>
            <nav className="hidden md:flex gap-6 text-white/80 text-sm bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full">
              <span className="bg-white/25 text-white px-3 py-1 rounded-full">Home</span>
              <span>How to use</span>
              <span>About</span>
              <span>Advantages</span>
            </nav>
            <button className="text-sm font-semibold cursor-pointer text-black bg-white rounded-full px-4 py-2 shadow-md" onClick={() => setDrawerOpen(true)}>
              Request →
            </button>
          </div>

          {/* Left title block */}
          <div className={`absolute left-8 md:left-16 top-[18vh] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] ${showContent ? "fade-in" : "opacity-0"}`}>
            <div className="text-3xl md:text-5xl font-extrabold leading-tight">
              <div>The Basics of</div>
              <div>Central Bank Digital</div>
              <div>Currency</div>
            </div>
            <div className="mt-8 h-px w-[56vw] max-w-[720px] bg-white/60" />
          </div>

          {/* Center loading card */}
          {showLoader && !loaderDone && (
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/25 backdrop-blur-xl rounded-[28px] px-10 py-8 text-white text-center shadow-[0_10px_40px_rgba(0,0,0,0.25)] ${progress < 100 ? "rise-in" : "rise-out"}`}>
              <div className="text-3xl font-extrabold mb-4">{progress}%</div>
              <div
                className="progress-circle mx-auto mb-4"
                style={{ ['--progress' as any]: `${(progress / 100) * 360}deg` }}
              />
              <div className="text-[11px] max-w-[260px]">
                Reducing the cost of cash handling through the implementation of CBDC.
              </div>
            </div>
          )}

          {/* Bottom info panels */}
          <div className={`absolute left-0 right-0 bottom-8 md:bottom-10 px-6 md:px-10 ${showContent ? "fade-in" : "opacity-0"}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  title: "About",
                  text:
                    "CBDC is a digital form of fiat currency issued and regulated by central banks.",
                },
                {
                  title: "Storing",
                  text:
                    "CBDC can be stored in digital wallets and accessed using a mobile phone or other electronic device.",
                },
                {
                  title: "Functions",
                  text:
                    "CBDC functions like physical cash in digital form, enabling everyday transactions such as payments, transfers, and remittances.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative border-r border-white/40 bg-white/10 backdrop-blur-xl text-white p-5 md:p-6"
                >
                  <div className="absolute -top-4 left-6 bg-white/20 rounded-2xl px-4 py-2 text-base md:text-lg font-semibold">
                    {item.title}
                  </div>
                  <div className="text-xs md:text-sm leading-relaxed opacity-90 mt-6">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Left request drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[86vw] max-w-[420px] p-3">
            <div className="h-full bg-white rounded-2xl shadow-xl slide-in-left">
              <div className="p-4 flex items-center gap-3 border-b">
                <button className="px-2 py-1 text-sm" onClick={() => setDrawerOpen(false)}>✕</button>
                <div className="font-semibold">Request</div>
              </div>
              <div className="p-6 flex justify-center items-center flex-col h-3/4">
                <label className="block text-xs font-semibold mb-2">Enter your phone number</label>
                <input className="w-full border rounded-lg px-3 py-2 mb-4" placeholder="+38" />
                <button className="w-full bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-lg px-4 py-2">Send Request →</button>
                <p className="text-[11px] text-gray-500 mt-6">By continuing, you accept the Regulations and the Privacy Policy.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


