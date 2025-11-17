"use client";
import { useState } from "react";
import HeroIntro from "./components/HeroIntro";
import NextSection from "./components/NextSection";

export default function Home() {
  const [showNext, setShowNext] = useState(false);
  return (  
    <NextSection />
  )
  // ) : (
  //   <HeroIntro onCompleteOnce={() => setShowNext(true)} />
  // );
}
