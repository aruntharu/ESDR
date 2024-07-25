'use client';
import CustomNavBar from '@/components/navbar/page';
import React from 'react';
import Image from 'next/image';

const ContactUS = () => {
  return (
    <div>
      <CustomNavBar />
      {/* Banner Section */}
      <div className="relative w-full h-64 overflow-hidden banner">
        <Image
          src="/banner.jpeg" // Path to your image in the public folder
          alt="About Us Banner"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="banner-image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">About Us</h1>
        </div>
      </div>
      <style jsx>{`
        .banner {
          clip-path: polygon(50% 0%, 100% 0, 100% 66%, 80% 100%, 45% 98%, 0 75%, 0 0);
        }
        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default ContactUS;
