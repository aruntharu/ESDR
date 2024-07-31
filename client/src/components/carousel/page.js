'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CustomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      src: '/upload/carousel1.JPG',
      alt: 'First slide',
      caption: {
        title: 'Kathmandu School of Law',
        heading: '16th ESDR: Decolonizing Law and Justice',
        text: 'Embracing Diverse Perspectives of International Law',
      },
    },
    {
      src: '/upload/carousel2.JPG',
      alt: 'Second slide',
      caption: {
        title: 'Kathmandu School of Law',
        heading: '16th ESDR: Decolonizing Law and Justice',
        text: 'Social Economic and Development Rights',
      },
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    AOS.init({ duration: 5000 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="relative w-full h-[545px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <h6 className="text-[#83b4c1] text-2xl md:text-3xl lg:text-4xl" data-aos="fade-up">
                  {slide.caption.title}
                </h6>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold" data-aos="fade-right">
                  {slide.caption.heading}
                </h1>
                <p className="mb-4 text-sm md:text-lg lg:text-xl italic" data-aos="fade-down">
                  {slide.caption.text}
                </p>
                <div className="space-x-4">
                  <Link href="/connectwithus">
                    <button
                      type="button"
                      className="px-4 py-3 bg-[#175459] hover:bg-[#0d2e31] text-white font-semibold rounded-lg"
                      data-aos="fade-left"
                    >
                      Apply Now
                    </button>
                  </Link>
                  <Link href="/contactus">
                    <button
                      type="button"
                      className="px-4 py-3 bg-[#83b4c1] hover:bg-[#618b96] text-white font-semibold rounded-lg"
                      data-aos="fade-right"
                    >
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
        onClick={handlePrev}
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
        onClick={handleNext}
      >
        <FaChevronRight size={24} />
      </button>
      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
