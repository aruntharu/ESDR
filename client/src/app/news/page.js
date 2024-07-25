'use client';
import CustomNavBar from '@/components/navbar/page';
import { FaRegCalendarCheck } from "react-icons/fa";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Image } from "@nextui-org/react";
import parse from 'html-react-parser';

const News = () => {
  const router = useRouter();
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchNewsList();
  }, []);

  const fetchNewsList = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}news`);
    setNewsList(data);
  };

  const getWordLimitedText = (text, limit) => {
    const plainText = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
    return plainText.split(' ').slice(0, limit).join(' ') + '.......';
  };

  return (
    <div>
      <CustomNavBar />
      {/* Banner Section */}
      <div className="relative w-full h-64 overflow-hidden banner">
        <Image
          src="/banner.jpeg" // Path to your image in the public folder
          alt="News Banner"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="banner-image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
          <h1 className="text-4xl font-bold">News</h1>
        </div>
      </div>
      <div className="container mx-auto px-6 py-12">
        {newsList.map((item) => {
          const newsPreview = getWordLimitedText(item.newsDescription, 65);
          return (
            <section key={item._id} className="text-gray-600 body-font overflow-hidden">
              <div className="container px-5 py-7 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">
                  <div className="py-8 flex flex-wrap md:flex-nowrap">
                    <div className="md:w-30 mr-6 md:mb-0 mb-2 flex-shrink-0 flex flex-col">
                      <Image src={`${process.env.NEXT_PUBLIC_API_URL}news-image/${item.newsImage}`} width={100} height={100} alt={item.newsHeading} />
                    </div>
                    <div className="md:flex-grow">
                      <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{item.newsHeading}</h2>
                      <div className='flex'>
                        <div className="mt-1 mr-2"><FaRegCalendarCheck /></div>
                        <div><p className="leading-relaxed">{item.newsDate}</p></div>
                      </div>
                      <p className="leading-relaxed text-justify">{parse(newsPreview)}</p>
                      <p onClick={() => router.push('/news/' + item._id)} className="text-indigo-500 inline-flex items-center mt-4">Read More
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </section>
          );
        })}
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
        .bg-opacity-50 {
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default News;
