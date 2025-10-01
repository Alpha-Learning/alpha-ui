"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SecondSection({ scrollY }: { scrollY: number }) {
  return (
    <section id="services" className="min-h-screen py-12 sm:py-16 lg:py-20 bg-white flex items-center">
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
            {/* Text Left */}
            <motion.div
              className="space-y-6 order-1 lg:order-1 mb-12 lg:mb-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Evidence-Based Learning Solutions
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our comprehensive assessment framework integrates cutting-edge research with practical 
                application. We provide detailed insights into cognitive development, learning preferences, 
                and social-emotional growth to support optimal educational outcomes.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-teal-600 mb-2">10+</div>
                  <div className="text-gray-700">Assessment Stages</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-teal-600 mb-2">100%</div>
                  <div className="text-gray-700">Personalized Approach</div>
                </div>
              </div>
              <motion.button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition-colors" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                View Our Process
              </motion.button>
            </motion.div>

            {/* Images Right */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[640px] mb-8 lg:mb-0 order-2 lg:order-2">
              <div className="absolute inset-0">
                <div
                  className="absolute left-6 sm:left-10 md:left-16 top-6 sm:top-10 md:top-16 w-[50%] sm:w-[46%] md:w-[38%] h-32 sm:h-40 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom"
                  data-reveal-delay="0"
                  style={{ transform: `translateY(${-scrollY * 0.08}px)` }}
                >
                  <img src="/c.png" alt="Assessment Tools" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-purple-600/20"></div>
                </div>

                <div
                  className="absolute right-3 sm:right-6 md:right-10 top-32 sm:top-40 md:top-56 w-[55%] sm:w-[52%] md:w-[46%] h-36 sm:h-48 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom"
                  data-reveal-delay="120"
                  style={{ transform: `translateY(${-scrollY * 0.06}px)` }}
                >
                  <img src="/a.jpeg" alt="Learning Environment" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-teal-600/20"></div>
                </div>

                <div
                  className="absolute left-0 bottom-0 w-[70%] sm:w-[68%] md:w-[60%] h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom"
                  data-reveal-delay="240"
                  style={{ transform: `translateY(${-scrollY * 0.04}px)` }}
                >
                  <img src="/b.png" alt="Child Development" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-600/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


