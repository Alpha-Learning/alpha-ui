"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ThirdSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waiting-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success || !result.success) {
        // Always redirect — email notification is optional
        router.push(`/form/pre-assessment?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.error("Error submitting waitlist:", error);
      // Still redirect even on error
      router.push(`/form/pre-assessment?email=${encodeURIComponent(email)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="waiting-list"
      className="relative overflow-visible shadow-[0_10px_15px_-5px_rgba(0,0,0,0.5)]"
    >
      {/* BACKGROUND IMAGE */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: "url('/waitlistbg.jpg')",
          backgroundPosition: "center top",
          backgroundSize: "cover",
        }}
      />

      {/* BLUE GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-[#004AAD]/70" />

      {/* CONTENT */}
      <div className="relative z-10 pb-28 pt-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="mb-10 tracking-wide"
            style={{
              fontFamily: "Foco",
              fontSize: "47px",
              fontWeight: 900,
              color: "#FFF",
              textAlign: "center",
              lineHeight: "normal",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            Join the Waiting List
          </motion.h2>

          <motion.p
            style={{
              fontFamily: "Foco",
              fontSize: "24px",
              fontWeight: 400,
              color: "#82B3B4",
              textAlign: "center",
              lineHeight: "normal",
            }}
            className="max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
          Join our waitlist today to speak with one of our expert guides and learn more about how ALS is reshaping education.
          </motion.p>

          {/* FORM WRAPPED IN .no-zoom → PREVENTS iOS ZOOM */}
          <div className="no-zoom w-full max-w-2xl mx-auto px-4 sm:px-6">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className="flex items-stretch bg-white rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.15)] overflow-hidden w-full min-w-0 gap-0"
                style={{
                  fontFamily: "Foco",
                  fontSize: "16px",
                  fontWeight: 400,
                }}  
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-Mail Here"
                  required
                  className="flex-1 min-w-0 px-5 py-2 sm:px-8 sm:py-4 text-[#192951] placeholder-[#82B3B4] focus:outline-none rounded-l-full text-base sm:text-2xl font-sans placeholder:font-[Foco]"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-shrink-0 whitespace-nowrap px-4 sm:px-8 py-0 text-[12px] sm:text-[18px] font-bold text-white bg-[#004AAD] rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,64,184,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  style={{
                    fontFamily: "Foco",
                    fontSize: "18px",
                    fontWeight: 900,
                    textAlign: "center",
                  }}
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                </button>
              </div>
            </motion.form>

          
          </div>
        </div>
      </div>
    </section>
  );
}


