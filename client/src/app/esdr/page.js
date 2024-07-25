'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomNavBar from '@/components/navbar/page';
import { FiCalendar } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import parse from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';

const Esdr = () => {
  const router = useRouter();
  const [esdrList, setEsdrList] = useState([]);

  useEffect(() => {
    fetchEsdrList();
  }, []);

  const fetchEsdrList = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}esdr`);
      // Ensure esdrDate is in proper Date format before sorting
      data.forEach(item => {
        item.esdrDate = new Date(item.esdrDate);
      });
      // Sort the list by date from latest to oldest
      const sortedData = data.sort((a, b) => b.esdrDate - a.esdrDate);
      setEsdrList(sortedData);
    } catch (error) {
      console.error('Error fetching ESDR list:', error);
    }
  };

  const getWordLimitedText = (text, limit) => {
    const plainText = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
    return plainText.split(' ').slice(0, limit).join(' ') + '.......';
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <CustomNavBar />
      {/* Banner Section */}
      <div className="relative w-full h-64 overflow-hidden banner">
        <Image
          src="/banner.jpeg" // Path to your image in the public folder
          alt="Esdr Banner"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="banner-image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">ESDR</h1>
        </div>
      </div>
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 pb-24">
        {esdrList.map((item) => {
          const esdrPreview = getWordLimitedText(item.esdrDescription, 65);
          const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}uploads/esdrImage/${item.esdrImage}`;
          return (
            <div key={item._id}>
              <Link href={`/esdr/${item._id}`}>
                <img
                  src={imageUrl}
                  alt={item.esdrHeading}
                  className="w-full h-52 md:h-64 lg:h-96 xl:h-64 object-cover"
                  onError={(e) => e.target.src = '/placeholder-image.png'}
                />
              </Link>
              <div className="bg-gray-50 p-8">
                <div className="flex items-center text-xs text-gray-600 uppercase font-semibold">
                  <FiCalendar className="mr-1" /> {/* Adding the calendar icon */}
                  {formatDate(item.esdrDate)}
                </div>
                <h2 className="mt-3 text-3xl mb-6 font-display text-black leading-tight max-w-sm">{item.esdrHeading}</h2>
                <p className="mt-4 max-w-md leading-relaxed">{parse(esdrPreview)}</p>
                <Link href={`/esdr/${item._id}`} className="flex items-center mt-6 uppercase text-sm text-black font-semibold">
                  Read article 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .banner {
          clip-path: polygon(50% 0%, 100% 0, 100% 66%, 80% 100%, 45% 98%, 0 75%, 0 0);
        }
      `}</style>
    </div>
  );
};

export default Esdr;
