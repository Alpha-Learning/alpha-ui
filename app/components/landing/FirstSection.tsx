"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FirstSection({ scrollY }: { scrollY: number }) {
  return (
    <section id="about" className="min-h-screen py-12 sm:py-16 lg:py-20 bg-gray-50 flex items-center">
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
            {/* Images Left - Staggered collage with reveal on scroll */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[640px] mb-12 lg:mb-0 order-1 lg:order-1">
              <div className="absolute inset-0">
                {/* big back card */}
                <div
                  className={`absolute left-0 top-4 sm:top-6 w-[70%] sm:w-[68%] md:w-[60%] h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom`}
                  data-reveal-delay="0"
                  style={{ transform: `translateY(${scrollY * 0.06}px)` }}
                >
                  <img src="/a.jpeg" alt="Assessment Process" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-teal-600/20"></div>
                </div>

                {/* mid card */}
                <div
                  className={`absolute right-1 sm:right-2 md:right-6 top-32 sm:top-40 md:top-56 w-[55%] sm:w-[52%] md:w-[46%] h-36 sm:h-48 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom`}
                  data-reveal-delay="120"
                  style={{ transform: `translateY(${scrollY * 0.08}px)` }}
                >
                  <img src="/b.png" alt="Learning Environment" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-600/20"></div>
                </div>

                {/* small front card */}
                <div
                  className={`absolute left-6 sm:left-10 md:left-16 bottom-1 sm:bottom-2 md:bottom-6 w-[50%] sm:w-[46%] md:w-[38%] h-32 sm:h-40 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom`}
                  data-reveal-delay="240"
                  style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                >
                  <img src="/c.png" alt="Child Development" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-purple-600/20"></div>
                </div>
              </div>
            </div>

            {/* Text Right */}
            <motion.div
              className="space-y-6 order-2 lg:order-2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Comprehensive Learning Assessment
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our innovative approach combines multiple assessment methodologies to create a complete 
                picture of each child's learning profile. Through careful observation, structured 
                interviews, and dynamic interactions, we uncover the unique strengths and areas for growth.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span className="text-gray-700">Multi-dimensional cognitive assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span className="text-gray-700">Parent-child dynamic observation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span className="text-gray-700">Peer interaction analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span className="text-gray-700">Personalized learning recommendations</span>
                </div>
              </div>
              <motion.button
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
