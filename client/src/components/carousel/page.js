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
      src: '/1.jpg', // replace with the correct path to your image
      alt: 'First slide',
      caption: {
        title: 'Kathmandu School of Law',
        heading: 'ESDR',
        text: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Pellentesque aliquam dolor eget urna ultricies tincidunt.',
      },
    },
    {
      src: '/2.jpg', // replace with the correct path to your image
      alt: 'Second slide',
      caption: {
        title: 'Kathmandu School of Law',
        heading: 'ESDR',
        text: 'Pellentesque aliquam dolor eget urna ultricies tincidunt.',
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
    AOS.init({ duration: 1000 });
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
                <h6 className="text-secondary text-lg" data-aos="fade-up">
                  {slide.caption.title}
                </h6>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold" data-aos="fade-right">
                  {slide.caption.heading}
                </h1>
                <p className="mb-4 text-sm md:text-lg lg:text-xl" data-aos="fade-down">
                  {slide.caption.text}
                </p>
                <div className="space-x-4">
                  <Link href="/readmore">
                    <button
                      type="button"
                      className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                      data-aos="fade-left"
                    >
                      Read More
                    </button>
                  </Link>
                  <Link href="/contactus">
                    <button
                      type="button"
                      className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
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
