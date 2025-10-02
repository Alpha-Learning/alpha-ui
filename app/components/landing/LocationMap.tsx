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
      {/* Section Header */}
      <div className="w-full mb-16">
        <motion.div className="text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Location</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Visit us at our conveniently located office in Salmabad, Kingdom of Bahrain</p>
        </motion.div>
      </div>

      {/* Full Width Map Container */}
      <motion.div className="relative " initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
        <div className="relative h-96 sm:h-[500px] lg:h-[600px] overflow-hidden shadow-xl bg-gray-100">
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
              <div className="absolute bottom-0 left-0 right-0 bg-gray-900/20 backdrop-blur-lg p-6 shadow-xl border-t border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Our Location</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-white/90 font-medium mb-1">Office Address</p>
                    <p className="text-white/80">{locationData.address}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/90 font-medium mb-1">Business Hours</p>
                      <div className="text-sm text-white/80 space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-white/90 font-medium mb-1">Contact</p>
                      <div className="text-sm text-white/80 space-y-1">
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
    </section>
  );
}
