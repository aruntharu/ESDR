'use client'
import CustomNavBar from '@/components/navbar/page'
import { FaRegCalendarCheck } from "react-icons/fa";
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button, Image } from "@nextui-org/react";
import ReactHtmlParser from 'react-html-parser';

const News = () => {
  const router = useRouter()
  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    fetchNewsList()
  }, [])

  const fetchNewsList = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}news`)
    setNewsList(data)
  }

  const getWordLimitedText = (text, limit) => {
    const plainText = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
    return plainText.split(' ').slice(0, limit).join(' ') + '.......';
  }

  return (
    <div>
      <CustomNavBar />
      {newsList.map((item) => {
        const newsPreview = getWordLimitedText(item.newsDescription, 65)
        return (
          <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-7 mx-auto">
    <div className="-my-8 divide-y-2 divide-gray-100">
      <div className="py-8 flex flex-wrap md:flex-nowrap">
        <div className="md:w-30 mr-6 md:mb-0 mb-2 flex-shrink-0 flex flex-col">
          <Image src={`${process.env.NEXT_PUBLIC_API_URL}news-image/${item.newsImage}`} width={100} height={100} />
        </div>
        <div className="md:flex-grow">
          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{item.newsHeading}</h2>
          <div className='flex'>
            <div className="mt-1 mr-2"><FaRegCalendarCheck /></div>
            <div>	<p className="leading-relaxed">{item.newsDate}</p></div>
          </div>
          <p className="leading-relaxed text-justify">{ReactHtmlParser(newsPreview)}</p>
          <p  onClick={() => router.push('/news/' + item._id)} className="text-indigo-500 inline-flex items-center mt-4">Read More
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </p>
        </div>
      </div>
      </div>
      </div>
      <hr/>
</section>
        )
      })}
    </div>
  )
}

export default News
