"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">ALS Workflow</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-gray-900 transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors">About</a>
              <a href="#services" className="text-gray-700 hover:text-gray-900 transition-colors">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
            </nav>
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Video Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/animated.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to ALS Workflow
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
            Transforming Learning Through Comprehensive Assessment
          </p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors animate-fade-in-delay-2">
            Get Started
          </button>
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* First Content Section - Images Left, Text Right */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images Left */}
            <div className="relative">
              <div 
                className="space-y-8"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                }}
              >
                <div className="relative">
                  <img
                    src="/a.jpeg"
                    alt="Assessment Process"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-teal-600/20 rounded-lg"></div>
                </div>
                <div className="relative ml-8">
                  <img
                    src="/b.png"
                    alt="Learning Environment"
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-blue-600/20 rounded-lg"></div>
                </div>
                <div className="relative ml-4">
                  <img
                    src="/c.png"
                    alt="Child Development"
                    className="w-full h-56 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-purple-600/20 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Text Right */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
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
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Second Content Section - Text Left, Images Right */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Left */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
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
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition-colors">
                View Our Process
              </button>
            </div>

            {/* Images Right */}
            <div className="relative">
              <div 
                className="space-y-8"
                style={{
                  transform: `translateY(${-scrollY * 0.1}px)`,
                }}
              >
                <div className="relative ml-8">
                  <img
                    src="/c.png"
                    alt="Assessment Tools"
                    className="w-full h-56 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-purple-600/20 rounded-lg"></div>
                </div>
                <div className="relative ml-4">
                  <img
                    src="/a.jpeg"
                    alt="Learning Environment"
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-teal-600/20 rounded-lg"></div>
                </div>
                <div className="relative">
                  <img
                    src="/b.png"
                    alt="Child Development"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-blue-600/20 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your child's comprehensive learning assessment journey today. 
            Our expert team is ready to provide personalized insights and recommendations.
          </p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Start Assessment
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">&copy; 2024 ALS Workflow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
