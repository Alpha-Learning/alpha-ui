"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ThirdSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      console.log("Email submitted:", email);
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
            Our AI-powered Alphera Learning System (ASLS) integrates academic data, emotional feedback, and progress tracking to shape each learner’s pathway in real time.
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
              <div className="flex items-center bg-white rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.15)] overflow-hidden w-full max-w-md mx-auto"
              style={{color: "#82B3B4",
                      fontFamily: "Foco",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "normal"}}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-Mail Here"
                  className="flex-1 px-5 py-3 text-[#192951] placeholder-[#82B3B4] focus:outline-none rounded-l-full"
                  style={{ fontFamily: "Foco, sans-serif" }}
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3 font-semibold text-white text-sm sm:text-base rounded-full transition-all duration-300 bg-[#004AAD] shadow-[0_4px_12px_rgba(0,64,184,0.4)] hover:shadow-[0_6px_16px_rgba(0,64,184,0.6)] hover:translate-y-[-2px]"
                  style={{ fontFamily: "Foco", 
                    color: "#82B3B4",
                    textAlign: "center",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: "900",
                    lineHeight: "normal"
                        }}
                >
                  SUBMIT
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
