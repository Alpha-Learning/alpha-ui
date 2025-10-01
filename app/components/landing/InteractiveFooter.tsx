"use client";

import React, { useState, useEffect } from "react";

export default function InteractiveFooter() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentYear] = useState(new Date().getFullYear());
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const footerLinks = [
    { label: "About Us", href: "#about", icon: "🏢" },
    { label: "Services", href: "#services", icon: "⚙️" },
    { label: "Contact", href: "#contact", icon: "📞" },
    { label: "Privacy", href: "#privacy", icon: "🔒" },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: "#", icon: "💼", color: "hover:text-blue-400" },
    { label: "Twitter", href: "#", icon: "🐦", color: "hover:text-blue-300" },
    { label: "Facebook", href: "#", icon: "📘", color: "hover:text-blue-500" },
    { label: "Instagram", href: "#", icon: "📷", color: "hover:text-pink-400" },
  ];

  return (
    <footer 
      className="text-white relative overflow-hidden transition-all duration-300" 
      style={{
        backgroundColor: scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'blur(10px)',
        borderTop: scrollY > 50 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
        boxShadow: scrollY > 50 ? '0 -4px 20px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-teal-500/10 to-teal-600/10 rounded-full animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-16 h-16 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-teal-400/30 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-bounce" style={{animationDelay: '2.5s'}}></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative">
                <img src="/logo.png" alt="logo" width={88} height={68} />
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
                </div>
                 <div className="flex flex-col">
                   <div className={`text-2xl font-bold bg-gradient-to-r ${scrollY > 50 ? 'from-gray-900 to-gray-700' : 'from-white to-gray-300'} bg-clip-text text-transparent group-hover:from-teal-400 group-hover:to-teal-600 transition-all duration-300`}>
                     ALS Workflow
                   </div>
                   <div className={`text-sm ${scrollY > 50 ? 'text-gray-600' : 'text-gray-400'} font-medium tracking-wider`}>
                     LEARNING ASSESSMENT
                   </div>
                 </div>
              </div>
              
               <p className={`${scrollY > 50 ? 'text-gray-700' : 'text-gray-300'} leading-relaxed max-w-md`}>
                 Transforming learning through comprehensive assessment. We provide detailed insights 
                 into cognitive development and personalized educational strategies.
               </p>

              {/* Interactive CTA */}
              <div className="relative group">
                <button className="relative px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Start Your Assessment</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

             {/* Quick Links */}
             <div className="space-y-6">
               <h3 className={`text-lg font-semibold ${scrollY > 50 ? 'text-gray-900' : 'text-white'} mb-4`}>Quick Links</h3>
              <ul className="space-y-3">
                {footerLinks.map((link, index) => (
                  <li key={link.label}>
                     <a
                       href={link.href}
                       className={`flex items-center space-x-2 ${scrollY > 50 ? 'text-gray-700' : 'text-gray-300'} hover:text-teal-400 transition-all duration-300 group ${
                         hoveredItem === link.label ? 'text-teal-400' : ''
                       }`}
                      onMouseEnter={() => setHoveredItem(link.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                        {link.icon}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

             {/* Social Links */}
             <div className="space-y-6">
               <h3 className={`text-lg font-semibold ${scrollY > 50 ? 'text-gray-900' : 'text-white'} mb-4`}>Connect With Us</h3>
              <div className="flex flex-col space-y-3">
                {socialLinks.map((social, index) => (
                   <a
                     key={social.label}
                     href={social.href}
                     className={`flex items-center space-x-2 ${scrollY > 50 ? 'text-gray-700' : 'text-gray-300'} ${social.color} transition-all duration-300 group`}
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>

               {/* Newsletter Signup */}
               <div className="mt-8">
                 <h4 className={`text-sm font-semibold ${scrollY > 50 ? 'text-gray-900' : 'text-white'} mb-3`}>Stay Updated</h4>
                 <div className="flex space-x-2">
                   <input
                     type="email"
                     placeholder="Enter your email"
                     className={`flex-1 px-3 py-2 ${scrollY > 50 ? 'bg-white text-gray-900 border-gray-300' : 'bg-gray-700 text-white border-gray-600'} rounded-lg border focus:border-teal-500 focus:outline-none transition-colors duration-300`}
                   />
                   <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-300">
                     Subscribe
                   </button>
                 </div>
              </div>
            </div>
          </div>

           {/* Bottom Bar */}
           <div className={`border-t ${scrollY > 50 ? 'border-gray-300' : 'border-gray-700'} mt-12 pt-8`}>
             <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
               <div className={`${scrollY > 50 ? 'text-gray-600' : 'text-gray-400'} text-sm`}>
                 &copy; {currentYear} ALS Workflow. All rights reserved.
               </div>
               <div className={`flex space-x-6 text-sm ${scrollY > 50 ? 'text-gray-600' : 'text-gray-400'}`}>
                 <a href="#privacy" className="hover:text-teal-400 transition-colors duration-300">
                   Privacy Policy
                 </a>
                 <a href="#terms" className="hover:text-teal-400 transition-colors duration-300">
                   Terms of Service
                 </a>
                 <a href="#cookies" className="hover:text-teal-400 transition-colors duration-300">
                   Cookie Policy
                 </a>
               </div>
             </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
