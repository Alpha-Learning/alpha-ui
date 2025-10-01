"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LocationMap() {
  const locationData = {
    name: "Global Vision Solutions",
    address: "OFFICE 22, BLDG 661, RD 1208, BLOCK 712 - SALMABAD, KINGDOM OF BAHRAIN",
    fullAddress: "#22, Building 661, Road no 1208, Block 712 Salmabad 973, Bahrain",
    rating: 4.9,
    reviews: 7,
    coordinates: {
      lat: 26.0667,
      lng: 50.5577
    }
  };

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hidden sm:block absolute -top-6 left-1/4 w-36 h-36 bg-gradient-to-r from-teal-200 to-teal-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="hidden sm:block absolute top-24 right-1/5 w-28 h-28 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-25 animate-pulse" style={{animationDelay: '0.8s'}}></div>
        <div className="hidden sm:block absolute bottom-16 left-1/3 w-20 h-20 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1.6s'}}></div>
        {/* tiny floating particles */}
        <div className="hidden sm:block absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-teal-400/40 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
        <div className="hidden sm:block absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-bounce" style={{animationDelay: '0.9s'}}></div>
        <div className="hidden sm:block absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce" style={{animationDelay: '1.4s'}}></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Location</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Visit us at our conveniently located office in Salmabad, Kingdom of Bahrain</p>
        </motion.div>

        {/* Full Width Map Container */}
        <motion.div className="relative" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
          <div className="relative h-96 sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
              {/* Google Maps Embed */}
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.3010235052784!2d50.521145675198106!3d26.186884277087234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49afd0213a19d3%3A0x2f892ffe9e6f0385!2sGlobal%20Vision%20Solutions!5e0!3m2!1sen!2sin!4v1759310917178!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.3010235052784!2d50.521145675198106!3d26.186884277087234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49afd0213a19d3%3A0x2f892ffe9e6f0385!2sGlobal%20Vision%20Solutions!5e0!3m2!1sen!2sin!4v1759310917178!5m2!1sen!2sin`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                title="Global Vision Solutions location map"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
              
              {/* Bottom Details Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-gray-900/20 backdrop-blur-lg rounded-b-2xl p-6 shadow-xl border-t border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Our Location</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 font-medium mb-1">Office Address</p>
                    <p className="text-gray-600">{locationData.address}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-700 font-medium mb-1">Business Hours</p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-700 font-medium mb-1">Contact</p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Phone: +973 1234 5678</p>
                        <p>Email: info@alsworkflow.com</p>
                        <p>WhatsApp: +973 1234 5678</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationData.fullAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2 rounded-lg font-semibold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                    >
                      Get Directions
                    </a>
                    <a
                      href="tel:+97312345678"
                      className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-gray-800 transition-colors duration-300 text-sm"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
      </div>
    </section>
  );
}
