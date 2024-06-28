'use client'
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
        <p className='text-3xl m-2 text-black'>{newsDetails?.newsHeading}</p>
        <p className='text-3xl m-2 text-black'>{newsDetails?.newsIntro}</p>
        <p className='text-3xl m-2 text-black'>{newsDetails?.newsDate}</p>
        <p className='text-3xl m-2 text-black'>{newsDetails?.newsDescription}</p>
    </div>
  )
}

export default NewsDetails