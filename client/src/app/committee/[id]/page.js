'use client'
import CustomNavBar from '@/components/navbar/page'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PersonDetails = ({params}) => {
  

  const [personDetails, setPersonDetails] = useState([])

  useEffect(()=>{
    if(params.id){
      fetchPersonDetails()
    }

  },[])

  const fetchPersonDetails =async()=> {
    const {data} =await axios.get(`http://localhost:8000/committee/${params.id}`)
    setPersonDetails(data)
  }
  return (
    <div>
      <CustomNavBar/>
    <div>
        <p className='text-3xl m-2 text-black'>{personDetails?.committeeImage}</p>
        <p className='text-3xl m-2 text-black'>{personDetails?.fullName}</p>
        <p className='text-3xl m-2 text-black'>{personDetails?.designation}</p>
        <p className='text-3xl m-2 text-black'>{personDetails?.personDescripton}</p>

    </div>
    </div>
  )
}

export default PersonDetails