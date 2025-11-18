"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ThirdSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isSubmitting) {
      setIsSubmitting(true);
      try {
        // Send email notification
        const response = await fetch('/api/waiting-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();
        
        if (result.success) {
          // Redirect to pre-assessment form with email as query parameter
          router.push(`/form/pre-assessment?email=${encodeURIComponent(email)}`);
        } else {
          // Even if email fails, still redirect (email is optional)
          console.error('Failed to send notification email:', result.message);
          router.push(`/form/pre-assessment?email=${encodeURIComponent(email)}`);
        }
      } catch (error) {
        console.error('Error submitting waiting list:', error);
        // Still redirect even if there's an error
        router.push(`/form/pre-assessment?email=${encodeURIComponent(email)}`);
      } finally {
        setIsSubmitting(false);
      }
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
      <div className="absolute inset-0 bg-[#004AAD]/70 " />

      {/* CONTENT */}
      <div className="relative z-10 pb-28 pt-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide  mb-10"
            style={{
              fontFamily: "Foco",
              fontSize: "47px",
              fontWeight: "900",
              color: "#FFF",
              textAlign: "center",
              fontStyle: "normal",
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
            style={{ fontFamily: "Foco",
              fontSize: "24px",
              fontWeight: "400",
              color: "#82B3B4",
              textAlign: "center",
              fontStyle: "normal",
              lineHeight: "normal",
            }}
            className="text-[24px] leading-[1.9] text-center text-[#004AAD] max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
         Join our waitlist today to speak with one of our expert guides and learn more about how ALS is reshaping education.
           {/* We’d love to talk with you to determine if our Alpha Learning System (ALS) is right for you and your child. Join our waitlist today to speak with one of our expert guides and learn more about how ALS is reshaping education. */}
</motion.p>

          {/* FORM */}
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="mx-auto max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
  className="flex items-center bg-white rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.15)] overflow-hidden w-full max-w-md mx-auto"
  style={{
    color: "#82B3B4",
    fontFamily: "Foco",
    fontSize: "16px", // reduced from 20px on mobile
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  }}
>
  <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="E-Mail Here"
  className="flex-1 px-4 py-2 text-[#192951] placeholder-[#82B3B4] 
             focus:outline-none rounded-l-full text-sm sm:text-base 
             font-sans placeholder:font-[Foco]"
  required
/>

  <button
    type="submit"
    disabled={isSubmitting}
    className="px-5 py-2 sm:px-8 sm:py-3 font-semibold text-white text-xs sm:text-base rounded-full transition-all duration-300 bg-[#004AAD] shadow-[0_4px_12px_rgba(0,64,184,0.4)] hover:shadow-[0_6px_16px_rgba(0,64,184,0.6)] hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed"
    style={{
      fontFamily: "Foco",
      color: "#82B3B4",
      textAlign: "center",
      fontSize: "18px", // reduced on mobile, stays 24px on desktop
      fontStyle: "normal",
      fontWeight: "900",
      lineHeight: "normal",
    }}
  >
    {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
  </button>
</div>

            </motion.form>
          ) : (
            <motion.div
              className="mx-auto mt-8 max-w-xl bg-white/90 rounded-xl p-6 backdrop-blur text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <h3
                    className="text-lg font-semibold text-gray-900"
                    style={{ fontFamily: "LeBeauneNew, serif" }}
                  >
                    You're subscribed!
                  </h3>
                  <p
                    className="text-gray-700"
                    style={{ fontFamily: "Jost, sans-serif" }}
                  >
                    We'll send updates to your inbox.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
