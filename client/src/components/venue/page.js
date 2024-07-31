'use client';
import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Generate image paths dynamically
const images = Array.from({ length: 12 }, (_, i) => `/upload/outreach${i + 1}.JPG`);

const Venue = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAOSInitialized = useRef(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isAOSInitialized.current) {
      AOS.init({ duration: 1000 });
      isAOSInitialized.current = true;
    }

    if (videoRef.current) {
      videoRef.current.playbackRate = 4; // Increase the speed of the video
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col mb-0">
      <div className="w-full p-4 text-center text-4xl font-bold text-[#175459]" data-aos="fade-up" data-aos-delay="300">
        Program Venue
      </div>
      <div className="flex-grow" data-aos="fade-up" data-aos-delay="400">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/upload/drone1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* New Section for h1, p, and carousel */}
      <div className="w-full flex h-[400px]" data-aos="fade-up" data-aos-delay="500">
        <div className="w-1/4 p-4 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Location for ESDR</h1>
          <p className="text-lg mt-4">International Outreach Research Center is packed with lush green trees and the Himalayas landscape, with fully equipped Internet Services and Accommodation.</p>
        </div>
        <div className="w-3/4 flex items-center justify-center relative">
          <div className="w-full h-full overflow-hidden relative flex items-center justify-center">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${images.length * 100}%` }}
            >
              {images.map((src, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                  <img
                    src={src}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover mx-auto"
                    onError={(e) => {
                      console.error(`Image not found: ${src}`);
                      e.target.style.display = 'none'; // Hide the broken image
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full" style={{ height: '400px' }} data-aos="fade-up" data-aos-delay="600">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5840525233643!2d85.6208871!3d27.5871559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eba74e376b23ef%3A0x716a10b2170ef53e!2sKathmandu%20School%20of%20Law%20-%20Outreach%20Campus!5e0!3m2!1sen!2snp!4v1690879089698!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Venue;
