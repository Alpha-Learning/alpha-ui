"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type HeroIntroProps = {
  words?: string[];
  sequence?: string;
  onCompleteOnce?: () => void;
};

export default function HeroIntro({
  words = ["Innovation,", "Friendly, Stable,", "Accessible"],
  sequence = "ALS",
  onCompleteOnce,
}: HeroIntroProps) {
  const [overlayDone, setOverlayDone] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
  const [headerExit, setHeaderExit] = useState(false);
  const holdTimer = useRef<number | null>(null);
  const completedRef = useRef(false);
  const prevIndexRef = useRef(0);

  const letters = useMemo(() => sequence.split(""), [sequence]);

  useEffect(() => {
    const overlayTimeout = window.setTimeout(() => setOverlayDone(true), 1800);
    return () => window.clearTimeout(overlayTimeout);
  }, []);

  useEffect(() => {
    if (!overlayDone) return;
    if (phase === "enter") {
      holdTimer.current = window.setTimeout(() => setPhase("hold"), 600);
    } else if (phase === "hold") {
      holdTimer.current = window.setTimeout(() => setPhase("exit"), 600);
    } else if (phase === "exit") {
      holdTimer.current = window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % letters.length);
        setPhase("enter");
      }, 450);
    }
    return () => {
      if (holdTimer.current) window.clearTimeout(holdTimer.current);
    };
  }, [overlayDone, phase, letters.length]);

  // When the last character starts exiting upward, flow the header text downward
  useEffect(() => {
    if (!overlayDone) return;
    if (index === letters.length - 1 && phase === "exit") {
      setHeaderExit(true);
    }
  }, [overlayDone, index, phase, letters.length]);

  // Notify parent once after the first full cycle completes
  useEffect(() => {
    if (!overlayDone) return;
    const prev = prevIndexRef.current;
    // Detect wrap from last -> 0
    if (
      prev === letters.length - 1 &&
      index === 0 &&
      !completedRef.current &&
      phase === "enter"
    ) {
      completedRef.current = true;
      onCompleteOnce?.();
    }
    prevIndexRef.current = index;
  }, [index, phase, overlayDone, onCompleteOnce, letters.length]);

  const currentLetter = letters[index];
  const labelWords = useMemo(() => ["ALPHA", "LEARNING", "SYSTEM"], []);
  const currentLabel = labelWords[index % labelWords.length];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {!overlayDone && <div className="intro-overlay" />}

      <div className="absolute top-6 left-6 space-y-1 text-black font-extrabold tracking-tight leading-tight text-xl md:text-xl">
        {words.map((w, i) => (
          <div
            key={i}
            className={headerExit ? "line-exit-down" : "opacity-0 line-enter"}
            style={headerExit ? undefined : { animationDelay: `${1.9 + i * 0.25}s` }}
          >
            {w}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center h-screen">
        <div className="relative w-[72vw] max-w-[300px] h-[42vh] overflow-hidden">
          {overlayDone && (
            <>
              <span
                key={`${index}-${phase}`}
                className={`char absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[32vh] md:text-[34vh] leading-none font-black text-black ${
                  phase === "enter" ? "char-enter" : phase === "exit" ? "char-exit" : ""
                }`}
              >
                {currentLetter}
              </span>
              <span
                className={`absolute top-2 right-3 text-black text-xs md:text-sm font-semibold select-none ${
                  phase === "enter" ? "char-enter" : phase === "exit" ? "char-exit" : ""
                }`}
              >
                {currentLabel}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


