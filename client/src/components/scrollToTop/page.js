'use client';
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
