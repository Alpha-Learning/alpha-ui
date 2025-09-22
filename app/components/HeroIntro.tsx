"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type HeroIntroProps = {
  words?: string[];
  sequence?: string;
};

export default function HeroIntro({
  words = ["Innovation,", "Friendly,", "Stable,", "Accessible"],
  sequence = "central",
}: HeroIntroProps) {
  const [overlayDone, setOverlayDone] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
  const holdTimer = useRef<number | null>(null);

  const letters = useMemo(() => sequence.split(""), [sequence]);

  useEffect(() => {
    const overlayTimeout = window.setTimeout(() => setOverlayDone(true), 1800);
    return () => window.clearTimeout(overlayTimeout);
  }, []);

  useEffect(() => {
    if (!overlayDone) return;
    if (phase === "enter") {
      holdTimer.current = window.setTimeout(() => setPhase("hold"), 300);
    } else if (phase === "hold") {
      holdTimer.current = window.setTimeout(() => setPhase("exit"), 1000);
    } else if (phase === "exit") {
      holdTimer.current = window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % letters.length);
        setPhase("enter");
      }, 300);
    }
    return () => {
      if (holdTimer.current) window.clearTimeout(holdTimer.current);
    };
  }, [overlayDone, phase, letters.length]);

  const currentLetter = letters[index];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {!overlayDone && <div className="intro-overlay" />}

      <div className="absolute top-6 left-6 space-y-1 text-black text-sm font-semibold leading-tight">
        {words.map((w, i) => (
          <div
            key={i}
            className="opacity-0 tl-line"
            style={{ animationDelay: `${0.6 + i * 0.15}s` }}
          >
            {w}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center h-screen">
        <span
          key={`${index}-${phase}`}
          className={`char text-[25vw] md:text-[18vw] leading-none font-black text-black ${
            phase === "enter" ? "char-enter" : phase === "exit" ? "char-exit" : ""
          }`}
        >
          {currentLetter}
        </span>
      </div>
    </div>
  );
}


