'use client'
import CustomNavBar from '@/components/navbar/page'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const News = () => {
  const [newsList, setNewsList] = useState([])
  useEffect(()=>{
    fetchnewsList()
  },[])
  
  const fetchnewsList= async()=>{
    const {data} =await axios.get(`http://localhost:8000/news`)
    setNewsList(data)
  }
  return (
 <div>
  <CustomNavBar/>
  {newsList.map((item)=>{
      return (
        <section>
  <div class="relative">
    <div class="relative flex justify-start">
    </div>
  </div>
  <div class="space-y-8 lg:divide-y lg:divide-gray-100">
    <div class="pt-8 sm:flex lg:items-end group">
      <div class="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
      


      </div>
      <div>
        
        <p class="mt-3 text-lg font-medium leading-6">
          <a href="./blog-post.html" class="text-xl text-gray-800 group-hover:text-gray-500 lg:text-2xl">{item.newsHeading}</a>
        </p>
        <span class="pr-3 text-md font-medium text-neutral-600 bg-white">{item.newsIntro} </span>
        <p class="text-sm text-gray-500">{item.newsDate}</p>
        <p class="mt-2 text-lg text-gray-500">{item.newsDescription}</p>
      </div>
    </div>
    <div class="pt-8 sm:flex lg:items-end group">
      <div class="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">   
      </div>
    </div>
  </div>
</section>
      )
  })}
 </div>
  )
} 
 
export default News