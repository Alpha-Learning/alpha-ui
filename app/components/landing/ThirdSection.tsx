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
            We’d love to talk with you to determine if our Alpha Learning System
            (ALS) is right for you and your child. Join our waitlist today to
            speak with one of our expert guides and learn more about how ALS is
            reshaping education.
          </motion.p>

          {/* FORM WRAPPED IN .no-zoom → PREVENTS iOS ZOOM */}
          <div className="no-zoom max-w-xl mx-auto">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className="flex items-center bg-white rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.15)] overflow-hidden w-full"
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
                  className="flex-1 px-6 py-4 text-[#192951] placeholder-[#82B3B4] focus:outline-none rounded-l-full"
                  style={{ fontFamily: "Foco, sans-serif" }}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 font-bold text-white bg-[#004AAD] rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,64,184,0.4)] hover:shadow-[0_6px_16px_rgba(0,64,184,0.6)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: "Foco",
                    fontSize: "18px",
                    fontWeight: 900,
                  }}
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                </button>
              </div>
            </motion.form>

            {/* Optional success message (uncomment if you want inline feedback) */}
            {/* {isSubmitted && (
              <motion.div
                className="mt-6 bg-white/90 rounded-xl p-6 backdrop-blur text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "LeBeauneNew, serif" }}>
                      You're on the list!
                    </h3>
                    <p className="text-gray-700" style={{ fontFamily: "Jost, sans-serif" }}>
                      Redirecting you to the pre-assessment...
                    </p>
                  </div>
                </div>
              </motion.div>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}