"use client";

import React, { useState, useEffect } from "react";

// Minimal SVG icons to avoid extra deps
const IconLinkedIn = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5c0 1.38-1.12 2.5-2.5 2.5S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.1c.67-1.2 2.3-2.46 4.74-2.46 5.07 0 6 3.34 6 7.68V24h-5v-7.16c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.84-2.72 3.75V24H8z" />
  </svg>
);

const IconTwitterX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2H21.5l-7.5 8.566L23.5 22h-6.594l-5.156-6.31L5.78 22H2.5l8.023-9.167L1.5 2h6.75l4.676 5.89L18.244 2zm-1.156 18h1.77L7.06 4h-1.83l11.858 16z" />
  </svg>
);

const IconFacebook = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.691V11.02h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.311h3.59l-.467 3.686h-3.123V24h6.127C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
  </svg>
);

const IconInstagram = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.262 2.242 1.324 3.608.059 1.266.071 1.646.071 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.262-3.608 1.324-1.266.059-1.646.071-4.85.071s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.262-2.242-1.324-3.608C2.175 15.585 2.163 15.205 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608C4.533 1.567 5.8 1.28 7.166 1.218 8.432 1.16 8.812 1.148 12 1.148m0-1.148C8.741 0 8.332.013 7.052.072 5.773.131 4.66.42 3.678 1.402 2.695 2.385 2.407 3.498 2.348 4.777 2.289 6.057 2.276 6.466 2.276 9.724v4.552c0 3.258.013 3.667.072 4.947.059 1.279.347 2.392 1.33 3.375.982.982 2.095 1.27 3.375 1.329 1.28.059 1.689.072 4.947.072s3.667-.013 4.947-.072c1.279-.059 2.392-.347 3.375-1.33.982-.982 1.27-2.095 1.329-3.375.059-1.28.072-1.689.072-4.947V9.724c0-3.258-.013-3.667-.072-4.947-.059-1.279-.347-2.392-1.33-3.375C20.332.42 19.219.132 17.94.073 16.66.014 16.251 0 12 0z" />
    <path d="M12 5.838A6.162 6.162 0 1 0 18.162 12 6.169 6.169 0 0 0 12 5.838zm0 10.186A4.024 4.024 0 1 1 16.024 12 4.03 4.03 0 0 1 12 16.024z" />
    <circle cx="18.406" cy="5.594" r="1.44" />
  </svg>
);

export default function InteractiveFooter() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentYear] = useState(new Date().getFullYear());
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const y = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(y);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll as any, { passive: true } as any);
    return () => window.removeEventListener("scroll", handleScroll as any);
  }, []);

  const footerLinks = [
    { label: "About Us", href: "#about", icon: "🏢" },
    { label: "Services", href: "#services", icon: "⚙️" },
    { label: "Contact", href: "#contact", icon: "📞" },
    { label: "Privacy", href: "#privacy", icon: "🔒" },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: <IconLinkedIn />, color: "hover:text-blue-600" },
    { label: "Twitter/X", href: "https://twitter.com/", icon: <IconTwitterX />, color: "hover:text-blue-500" },
    { label: "Facebook", href: "https://www.facebook.com/", icon: <IconFacebook />, color: "hover:text-blue-600" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: <IconInstagram />, color: "hover:text-pink-500" },
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
                <button className="relative cursor-pointer px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
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
