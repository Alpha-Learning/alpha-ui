"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FirstSection({ scrollY }: { scrollY: number }) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const imageData = {
    "a.jpeg": {
      title: "Cognitive Assessment",
      description: "Comprehensive evaluation of cognitive abilities including memory, attention, problem-solving, and critical thinking skills through structured activities and observations.",
      features: ["Memory testing", "Attention span analysis", "Problem-solving tasks", "Critical thinking assessment"]
    },
    "b.png": {
      title: "Learning Environment",
      description: "Analysis of how children interact with their learning environment, including spatial awareness, sensory preferences, and environmental factors that influence learning.",
      features: ["Spatial awareness", "Sensory preferences", "Environmental factors", "Learning space optimization"]
    },
    "c.png": {
      title: "Social Development",
      description: "Evaluation of social skills, emotional intelligence, peer interactions, and communication abilities that are essential for holistic child development.",
      features: ["Social skills", "Emotional intelligence", "Peer interactions", "Communication abilities"]
    }
  };
  return (
    <section id="about" className="min-h-screen py-12 sm:py-16 lg:py-20 bg-gray-50 flex items-center relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-8 left-1/4 w-40 h-40 bg-gradient-to-r from-teal-200 to-teal-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-10 right-1/5 w-28 h-28 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-25 animate-pulse" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1.6s'}}></div>
        {/* tiny floating particles */}
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-teal-400/40 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-bounce" style={{animationDelay: '0.9s'}}></div>
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce" style={{animationDelay: '1.4s'}}></div>
      </div>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
            {/* Images Left - Simple parallax like SecondSection */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[640px] mb-12 lg:mb-0 order-1 lg:order-1">
              <div className="absolute inset-0">
                {/* big back card */}
                <div
                  className="absolute left-0 top-4 sm:top-6 w-[70%] sm:w-[68%] md:w-[60%] h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom cursor-pointer"
                  data-reveal-delay="0"
                  style={{ transform: `translateY(${scrollY * 0.05}px)` }}
                  onMouseEnter={() => setHoveredImage("a.jpeg")}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img src="/a.jpeg" alt="Assessment Process" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-teal-600/20"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">Cognitive Assessment</h3>
                      <p className="text-white/90 text-sm">Memory, attention & problem-solving</p>
                    </div>
                  </div>
                </div>

                {/* mid card */}
                <div
                  className="absolute right-1 sm:right-2 md:right-6 top-32 sm:top-40 md:top-56 w-[55%] sm:w-[52%] md:w-[46%] h-36 sm:h-48 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom cursor-pointer"
                  data-reveal-delay="120"
                  style={{ transform: `translateY(${scrollY * 0.08}px)` }}
                  onMouseEnter={() => setHoveredImage("b.png")}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img src="/b.png" alt="Learning Environment" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-600/20"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">Learning Environment</h3>
                      <p className="text-white/90 text-sm">Spatial awareness & sensory preferences</p>
                    </div>
                  </div>
                </div>

                {/* small front card */}
                <div
                  className="absolute left-6 sm:left-10 md:left-16 bottom-1 sm:bottom-2 md:bottom-6 w-[50%] sm:w-[46%] md:w-[38%] h-32 sm:h-40 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom cursor-pointer"
                  data-reveal-delay="240"
                  style={{ transform: `translateY(${scrollY * 0.12}px)` }}
                  onMouseEnter={() => setHoveredImage("c.png")}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img src="/c.png" alt="Child Development" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-purple-600/20"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">Social Development</h3>
                      <p className="text-white/90 text-sm">Social skills & emotional intelligence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Right - Dynamic content based on hovered image */}
            <motion.div
              className="space-y-6 order-2 lg:order-2"
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
                  </>
                )}
              </motion.div>
              
              <motion.button 
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors" 
                whileHover={{ scale: 1.04 }} 
                whileTap={{ scale: 0.98 }}
              >
                {hoveredImage ? "Learn More About This" : "Learn More"}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
