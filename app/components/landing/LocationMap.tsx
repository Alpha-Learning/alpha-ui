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
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Location</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Visit us at our conveniently located office in Salmabad, Kingdom of Bahrain</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Map Container */}
          <motion.div className="relative order-1 lg:order-1 mb-8 lg:mb-0" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
            <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
              {/* Google Maps Embed */}
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.3010235052784!2d50.521145675198106!3d26.186884277087234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49afd0213a19d3%3A0x2f892ffe9e6f0385!2sGlobal%20Vision%20Solutions!5e0!3m2!1sen!2sin!4v1759310917178!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.3010235052784!2d50.521145675198106!3d26.186884277087234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49afd0213a19d3%3A0x2f892ffe9e6f0385!2sGlobal%20Vision%20Solutions!5e0!3m2!1sen!2sin!4v1759310917178!5m2!1sen!2sin`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
              
              {/* Map Overlay Info */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-semibold text-gray-900">{locationData.name}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{locationData.fullAddress}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(locationData.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{locationData.rating} ({locationData.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location Information */}
          <motion.div className="space-y-8 order-2 lg:order-2" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 }}>
            {/* Office Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Office Address</h3>
                  <p className="text-gray-600 leading-relaxed">{locationData.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Hours</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Information</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Phone: +973 1234 5678</p>
                    <p>Email: info@alsworkflow.com</p>
                    <p>WhatsApp: +973 1234 5678</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationData.fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Get Directions
              </a>
              <a
                href="tel:+97312345678"
                className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-800 transition-colors duration-300"
              >
                Call Now
              </a>
            </div>

            {/* Nearby Landmarks */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Nearby Landmarks</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <span>Tabreez Restaurant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>eXtra Shopping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Danube Home</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Adhari Park</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
