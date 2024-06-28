'use client'
import CustomNavBar from '@/components/navbar/page'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const router = useRouter()
  const [messageList, setmessageList] = useState([])
  useEffect(()=>{
    fetchmessageList()
  },[])
  
  const fetchmessageList= async()=>{
    const {data} =await axios.get(`http://localhost:8000/message`)
    setmessageList(data)
  }
  return (
 <div>
  {messageList.map((item)=>{
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
      <div onClick={()=>router.push('/message/'+item._id)}>
        
        <p class="mt-3 text-lg font-medium leading-6">
          <p class="text-xl text-gray-800 group-hover:text-gray-500 lg:text-2xl">{item.messageHeading}</p>
        </p>
        <span class="pr-3 text-md font-medium text-neutral-600 bg-white">{item.senderName} </span>
        <p class="text-sm text-gray-500">{item.messageDate}</p>
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
 
export default page