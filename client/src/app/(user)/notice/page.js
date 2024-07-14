'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Notice = () => {
    const [noticeList, setNoticeList] = useState([])
    const fetchNotice = async()=>{
        const {data} = await  axios.get('http://localhost:8000/notice')
        setNoticeList(data)
        }
    useEffect(()=>{
        fetchNotice()
    },[])
  return (
    <div>
       {noticeList.length>0 && noticeList.map((item)=>{
         return <div className="max-w-full bg-gray-100 p-4" dangerouslySetInnerHTML={{ __html: item.content }}/> 
        })}
    </div>
  )
}

export default Notice