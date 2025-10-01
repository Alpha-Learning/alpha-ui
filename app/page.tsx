"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Ensure video plays
    const video = document.querySelector('video');
    if (video) {
      video.play().catch(error => {
        console.log('Autoplay prevented:', error);
        // Try to play again after user interaction
        const playVideo = () => {
          video.play();
          document.removeEventListener('click', playVideo);
          document.removeEventListener('scroll', playVideo);
        };
        document.addEventListener('click', playVideo);
        document.addEventListener('scroll', playVideo);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Animated Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
              style={{
                backgroundColor: scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
                backdropFilter: scrollY > 50 ? 'blur(20px)' : 'blur(10px)',
                borderBottom: scrollY > 50 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
                boxShadow: scrollY > 50 ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'
              }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                {/* <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl"> */}
                  <img src="/logo.png" alt="logo" width={48} height={48} />
                {/* </div> */}
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
              </div>
              <div className="flex flex-col">
                <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-teal-600 group-hover:to-teal-800 transition-all duration-300">
                  ALS Workflow
                </div>
                <div className="text-xs text-gray-500 font-medium tracking-wider">
                  LEARNING ASSESSMENT
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { href: '#home', label: 'Home', icon: '🏠' },
                { href: '#about', label: 'About', icon: '📋' },
                { href: '#services', label: 'Services', icon: '⚙️' },
                { href: '#contact', label: 'Contact', icon: '📞' }
              ].map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-6 py-3 text-gray-700 hover:text-teal-600 transition-all duration-300 group"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-700 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="relative px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group overflow-hidden">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300 group">
                <div className="flex flex-col space-y-1">
                  <div className="w-5 h-0.5 bg-gray-700 group-hover:bg-teal-600 transition-colors duration-300"></div>
                  <div className="w-5 h-0.5 bg-gray-700 group-hover:bg-teal-600 transition-colors duration-300"></div>
                  <div className="w-5 h-0.5 bg-gray-700 group-hover:bg-teal-600 transition-colors duration-300"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-teal-200 to-teal-300 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-0 left-1/2 w-16 h-16 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </header>

      {/* Hero Video Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Fallback background image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/image-Photoroom.png')",
          }}
        ></div>
        
        {/* Video overlay */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => console.log('Video loaded successfully')}
          onError={(e) => console.log('Video error:', e)}
        >
          <source src="/videos/animated.mp4" type="video/mp4" />
          Your browser does not support the video tag.
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
