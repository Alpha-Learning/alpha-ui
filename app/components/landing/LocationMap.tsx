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
    <section className="py-10 sm:py-16 lg:py-20 mt-28 bg-white relative overflow-hidden">
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
              <div className="absolute h-66 bottom-0 left-0 right-0 bg-gray-900/20 backdrop-blur-lg p-6 shadow-xl border-t border-white/20">
                
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Address Section */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="text-white/90 font-semibold mb-2">Address</h4>
                    <p className="text-white/80 text-sm">{locationData.address}</p>
                  </div>
                  
                  {/* Phone Section */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h4 className="text-white/90 font-semibold mb-2">Phone</h4>
                    <p className="text-white/80 text-sm">+973 1234 5678</p>
                  </div>
                  
                  {/* Email Section */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-white/90 font-semibold mb-2">Email</h4>
                    <p className="text-white/80 text-sm">info@alsworkflow.com</p>
                  </div>
                </div>
              </div>
            </div>
        </motion.div>
    </section>
  );
}
