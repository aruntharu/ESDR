'use client';
import CustomNavBar from '@/components/navbar/page';
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
          src="/upload/31.jpg" // Path to your image in the public folder
          alt="News Banner"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="banner-image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
        </div>
      </div>
      <div className="container mx-auto px-6 py-12">
        <div className="timeline body white">
          {newsList.map((item, index) => {
            const newsPreview = getWordLimitedText(item.newsDescription, 65);
            return (
              <div key={item._id} className="point">
                <div className="year">{new Date(item.newsDate).getFullYear()}</div>
                <div className={`bocata body text-left row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <div className="col-md-12 title small bold pb-2">{new Date(item.newsDate).toLocaleString('default', { month: 'long' })}</div>
                  <div className="col-md-6 body small">
                    <Image src={`${process.env.NEXT_PUBLIC_API_URL}news-image/${item.newsImage}`} width={100} height={100} alt={item.newsHeading} />
                  </div>
                  <div className="col-md-6 body small">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{item.newsHeading}</h2>
                    <p className="leading-relaxed text-justify">{parse(newsPreview)}</p>
                    <p onClick={() => router.push('/news/' + item._id)} className="text-indigo-500 inline-flex items-center mt-4">Read More
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </p>
                  </div>
                </div>
                <i className="arrow"></i>
              </div>
            );
          })}
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
        .bg-opacity-50 {
          background-color: rgba(0, 0, 0, 0.5);
        }
        .timeline {
          position: relative;
          background-image: linear-gradient(to bottom, #930054, #983279, #97519b, #926db8, #8b87d0, #7096df, #4ca4e9, #00b1ec, #00b6db, #00b7b2, #00b376, #2aab29);
          width: 50px;
          text-align: center;
          margin: 0 auto;
        }
        .timeline .point {
          position: relative;
          padding: 20px 0;
        }
        .timeline .year {
          padding-top: 10px;
          color: #ffffff;
        }
        .timeline .bocata {
          position: relative;
          background-color: #ffffff;
          padding: 20px;
          width: 400px;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
          transition: all .3s;
        }
        .timeline .bocata.odd {
          left: 100px;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        }
        .timeline .bocata.even {
          right: 425px;
        }
        .timeline .arrow {
          border: solid #f7f7f7;
          border-width: 0 3px 3px 0;
          display: inline-block;
          padding: 20px;
          transform: rotate(45deg);
        }
      `}</style>
    </div>
  );
};

export default News;
