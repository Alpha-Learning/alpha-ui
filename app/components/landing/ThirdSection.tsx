"use client";

import React from "react";

export default function ThirdSection({ scrollY }: { scrollY: number }) {
  return (
    <section id="process" className="min-h-screen py-20 bg-gray-50 flex items-center">
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Left */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Comprehensive Assessment Process
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our multi-stage assessment approach ensures we capture every aspect of your child's 
                learning profile. From initial screening to detailed behavioral observations, 
                we create a complete picture that guides personalized educational strategies.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span className="text-gray-700">Initial screening and parent consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span className="text-gray-700">Structured observation sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span className="text-gray-700">Cognitive and behavioral assessments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span className="text-gray-700">Personalized learning recommendations</span>
                </div>
              </div>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors">
                Learn More About Our Process
              </button>
            </div>

            {/* Images Right */}
            <div className="relative h-[400px] sm:h-[500px] md:h-[640px] mb-8 lg:mb-0">
              <div className="absolute inset-0">
                {/* big back card */}
                <div
                  className={`absolute right-0 top-4 sm:top-6 w-[70%] sm:w-[68%] md:w-[60%] h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom`}
                  data-reveal-delay="0"
                  style={{ transform: `translateY(${scrollY * 0.06}px)` }}
                >
                  <img src="/a.jpeg" alt="Assessment Process" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-teal-600/20"></div>
                </div>

                {/* mid card */}
                <div
                  className={`absolute left-1 sm:left-2 md:left-6 top-32 sm:top-40 md:top-56 w-[55%] sm:w-[52%] md:w-[46%] h-36 sm:h-48 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom`}
                  data-reveal-delay="120"
                  style={{ transform: `translateY(${scrollY * 0.08}px)` }}
                >
                  <img src="/b.png" alt="Learning Environment" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-600/20"></div>
                </div>

                {/* small front card */}
                <div
                  className={`absolute right-6 sm:right-10 md:right-16 bottom-1 sm:bottom-2 md:bottom-6 w-[50%] sm:w-[46%] md:w-[38%] h-32 sm:h-40 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl bg-gray-200 reveal-from-bottom`}
                  data-reveal-delay="240"
                  style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                >
                  <img src="/c.png" alt="Child Development" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-purple-600/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
