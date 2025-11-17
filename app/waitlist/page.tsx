"use client";

import Header from "../components/landing/Header";
import WaitingList from "../components/landing/WaitingList";
import ThirdSection from "../components/landing/ThirdSection";
import InteractiveFooter from "../components/landing/InteractiveFooter";
import { useEffect } from "react";

export default function Waitinglist() {
  useEffect(() => {
    // Scroll to top when this page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="top" className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

  
      <main className="flex-1">
        <WaitingList />
      </main>

      {/* Footer */}
      <ThirdSection />
      <InteractiveFooter />
    </div>
  );
}
