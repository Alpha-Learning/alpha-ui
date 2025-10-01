"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function SecondSection({ scrollY }: { scrollY: number }) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const imageData = {
    "c.png": {
      title: "Assessment Tools",
      description: "Advanced diagnostic instruments and methodologies designed to evaluate cognitive abilities, learning patterns, and developmental milestones through evidence-based assessment protocols.",
      features: ["Diagnostic instruments", "Cognitive evaluation", "Learning pattern analysis", "Developmental milestones"]
    },
    "a.jpeg": {
      title: "Learning Environment",
      description: "Comprehensive analysis of educational settings, spatial configurations, and environmental factors that optimize learning outcomes and support diverse learning styles.",
      features: ["Educational settings", "Spatial configurations", "Environmental optimization", "Learning style support"]
    },
    "b.png": {
      title: "Child Development",
      description: "Holistic evaluation of developmental progress across cognitive, social, emotional, and physical domains to create comprehensive growth profiles and intervention strategies.",
      features: ["Developmental progress", "Cognitive domains", "Social-emotional growth", "Intervention strategies"]
    }
  };
  return (
    <section id="services" className="min-h-screen py-12 sm:py-16 lg:py-20 bg-white flex items-center relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 right-1/4 w-40 h-40 bg-gradient-to-r from-teal-200 to-teal-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-20 left-1/5 w-28 h-28 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-25 animate-pulse" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-12 right-1/3 w-20 h-20 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1.6s'}}></div>
        {/* tiny floating particles */}
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-teal-400/40 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-bounce" style={{animationDelay: '0.9s'}}></div>
        <div className="absolute bottom-1/3 right-1/5 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce" style={{animationDelay: '1.4s'}}></div>
      </div>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
            {/* Text Left - Dynamic content based on hovered image */}
            <motion.div
              className="space-y-6 order-1 lg:order-1 mb-12 lg:mb-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                key={hoveredImage || "default"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {hoveredImage ? (
                  <>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      {imageData[hoveredImage as keyof typeof imageData].title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {imageData[hoveredImage as keyof typeof imageData].description}
                    </p>
                    <div className="space-y-3">
                      {imageData[hoveredImage as keyof typeof imageData].features.map((feature, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <motion.div 
                            className="w-2 h-2 bg-teal-600 rounded-full"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                            }}
                          />
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </motion.div>
              
              <motion.button 
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition-colors" 
                whileHover={{ scale: 1.04 }} 
                whileTap={{ scale: 0.98 }}
              >
                {hoveredImage ? "Learn More About This" : "View Our Process"}
              </motion.button>
            </motion.div>

            {/* Images Right */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[640px] mb-8 lg:mb-0 order-2 lg:order-2">
              <div className="absolute inset-0">
                <div
                  className="absolute left-6 sm:left-10 md:left-16 top-6 sm:top-10 md:top-16 w-[50%] sm:w-[46%] md:w-[38%] h-32 sm:h-40 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom cursor-pointer"
                  data-reveal-delay="0"
                  style={{ transform: `translateY(${-scrollY * 0.08}px)` }}
                  onMouseEnter={() => setHoveredImage("c.png")}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img src="/c.png" alt="Assessment Tools" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-purple-600/20"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">Assessment Tools</h3>
                      <p className="text-white/90 text-sm">Diagnostic instruments & evaluation</p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute right-3 sm:right-6 md:right-10 top-32 sm:top-40 md:top-56 w-[55%] sm:w-[52%] md:w-[46%] h-36 sm:h-48 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom cursor-pointer"
                  data-reveal-delay="120"
                  style={{ transform: `translateY(${-scrollY * 0.06}px)` }}
                  onMouseEnter={() => setHoveredImage("a.jpeg")}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img src="/a.jpeg" alt="Learning Environment" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-teal-600/20"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">Learning Environment</h3>
                      <p className="text-white/90 text-sm">Educational settings & optimization</p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute left-0 bottom-0 w-[70%] sm:w-[68%] md:w-[60%] h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom cursor-pointer"
                  data-reveal-delay="240"
                  style={{ transform: `translateY(${-scrollY * 0.04}px)` }}
                  onMouseEnter={() => setHoveredImage("b.png")}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img src="/b.png" alt="Child Development" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-600/20"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">Child Development</h3>
                      <p className="text-white/90 text-sm">Developmental progress & growth profiles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


