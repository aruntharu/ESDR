'use client';
import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';

const CustomRegistration = () => {
  const isAOSInitialized = useRef(false);

  useEffect(() => {
    if (!isAOSInitialized.current) {
      AOS.init({ duration: 1000 });
      isAOSInitialized.current = true;
    }
  }, []);

  return (
    <div className="relative w-11/12 sm:w-11/12 md:w-11/12 lg:w-10/12 xl:w-10/12 2xl:w-9/12 mx-auto p-6 border border-gray-300 rounded-lg shadow-lg py-16 my-16" data-aos="fade-up" data-aos-delay="300">
      {/* Header Section */}
      <div className="flex justify-center items-center pb-4"></div>

      {/* Overlapping Logo */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full border border-gray-300 shadow-lg">
        <img
          src="logo.png"
          alt="EIMUN Logo"
          className="h-16 w-16"
        />
      </div>
      
      {/* Description and Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div data-aos="fade-up" data-aos-delay="500">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">EIMUN</h1>
          <p className="text-sm text-justify">
          Lorem ipsum dolor sit amet consectetur adipiscing elit, nibh sem non cras fames gravida malesuada viverra, ridiculus habitant at primis nullam sapien. Cubilia feugiat varius molestie netus inceptos sodales tortor et in, mi sem aptent est tristique a commodo nam, nulla hac neque magna cras orci justo aenean. Dignissim ligula maecenas nascetur sociosqu quisque tempus vestibulum magna, montes senectus iaculis mollis sociis nec quis, interdum posuere aliquam aliquet tincidunt viverra sapien. Nullam morbi quis arcu accumsan neque consequat ultrices nunc commodo, senectus turpis molestie felis tempus nisl ridiculus penatibus ad, torquent tortor duis erat faucibus primis tincidunt sodales. Habitasse porta eu penatibus sociis libero parturient integer nibh, cum curae facilisis ligula aenean suscipit aliquam, posuere bibendum laoreet proin volutpat ut ad. Inceptos conubia     
          </p>
        </div>
        <div className="flex items-center justify-center" data-aos="fade-up" data-aos-delay="700">
          <div className="relative w-full h-64"> {/* Set fixed height and relative positioning */}
            <img
              src="esdr.jpg"
              alt="Delegates"
              className="absolute inset-0 w-full h-full object-cover rounded-lg" /* Ensure the image fits within the container */
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex" data-aos="fade-up" data-aos-delay="900" style={{ marginBottom: '-24px' }}> {/* Added negative margin */}
        <Link href="https://ksl.edu.np" target="_blank" className="flex-1 text-white py-2 px-4 flex items-center justify-center rounded-l-lg" style={{ backgroundColor: '#86b5c3' }}>
          <div className="flex items-center justify-center w-full h-full">
            <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13401 2 5 5.13401 5 9C5 13.8579 11.2266 21.1167 11.5664 21.4967C11.8563 21.8266 12.1437 21.8266 12.4336 21.4967C12.7734 21.1167 19 13.8579 19 9C19 5.13401 15.866 2 12 2ZM12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11Z"/>
            </svg>
            <span>Kathmandu School of Law, Nepal</span> {/* Custom color */}
          </div>
        </Link>
        <Link href="/connectwithus" className="flex-1 text-white py-2 px-4 flex items-center justify-center rounded-r-lg" style={{ backgroundColor: '#2d5d66' }}>
          <button className="font-semibold w-full h-full">Apply Now</button> {/* Custom color */}
        </Link>
      </div>
    </div>
  );
};

export default CustomRegistration;
