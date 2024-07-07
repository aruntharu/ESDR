'use client'
import CustomNavBar from '@/components/navbar/page'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const NewsDetails = ({params}) => {
    const [newsDetails, setNewsList] = useState([])
    useEffect(()=>{
        if(params.id){
            fetchnewsDetails()
        }
   
    },[])
    
    const  fetchnewsDetails= async()=>{
      const {data} =await axios.get(`http://localhost:8000/news/${params.id}`)
      setNewsList(data)
    }
  return (
    <div>
      <CustomNavBar/>
    <div>
    <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-10 py-10 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            <div className="py-8 flex flex-wrap md:flex-nowrap">

              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{newsDetails?.newsHeading}</h2>
                <p className="text-xl text-gray-900 title-font mb-2">{newsDetails?.newsIntro}</p>
                <p className="mt-1 text-gray-500 text-sm mb-4 ">{newsDetails?.newsDate}</p>
                <p className="leading-relaxed ">{newsDetails?.newsDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  )
}

export default NewsDetails