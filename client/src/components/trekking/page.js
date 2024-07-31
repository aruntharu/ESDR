'use client';
import React, { useEffect, useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const trekkingImages = Array.from({ length: 9 }, (_, i) => `/upload/trekking${i + 1}.jpg`);

const Trekking = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const isAOSInitialized = useRef(false);
  const galleryRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    if (!isAOSInitialized.current) {
      AOS.init({ duration: 1000, once: true });
      isAOSInitialized.current = true;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trekkingImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePreview = (src) => {
    setPreviewImage(src);
    setVisible(true);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - galleryRef.current.offsetLeft;
    scrollLeft.current = galleryRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Adjust scrolling speed
    galleryRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + trekkingImages.length) % trekkingImages.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trekkingImages.length);
  };

  return (
    <div className="relative w-full bg-[#175459] pb-16" data-aos="fade-up" data-aos-delay="300">
      <h2 className="text-3xl font-bold mb-4 pt-4 text-center text-white">Excursion – Cum – Trekking</h2>
      <div
        className="overflow-hidden flex items-center"
        ref={galleryRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 33.33}%)`, width: `${trekkingImages.length * 33.33}%` }}
        >
          {trekkingImages.map((src, index) => (
            <div
              key={index}
              className="w-1/3 flex-shrink-0 p-2 box-border"
              onClick={() => handlePreview(src)}
              style={{ height: '400px' }}
              data-aos="zoom-in"
              data-aos-delay={`${index * 100}`}
            >
              <img src={src} className="object-cover w-full h-full cursor-pointer" alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
        onClick={handlePrevClick}
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
        onClick={handleNextClick}
      >
        <FaChevronRight size={24} />
      </button>

      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white rounded-lg p-4 max-w-3xl mx-auto">
            <button
              className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900"
              onClick={() => setVisible(false)}
            >
              &times;
            </button>
            <img src={previewImage} alt="Preview" className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Trekking;
