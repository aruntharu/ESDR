'use client'
import CommitteeCard from '@/components/card/page'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomNavBar from '@/components/navbar/page'
import { useRouter } from 'next/navigation'


const page = () => {


  const [committeeList, setCommitteeList] = useState([])

  useEffect(()=>{
    fetchCommitteeList()
  },[])

  const fetchCommitteeList =async()=> {
    const {data} =await axios.get(`http://localhost:8000/committee`)
    setCommitteeList(data)
  }
  return (
    <div>
       <CustomNavBar/>
        <div className='flex justify-center'>
        {committeeList.map((item)=>{
          return <CommitteeCard item={item}/>
        })}
      </div>
    </div>
 
  )
}

export default page