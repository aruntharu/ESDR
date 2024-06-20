'use client'
import React from 'react'
import SideBar from '@/components/sidebar/page'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const page = () => {
  const {userDetails} = useSelector(state=>state.user)
  return (
    <div  >
    <div className='flex text-2xl m-6 p-2'>
      Hi 
       <div className='font-mono font-extrabold mx-4 text-green-400'>{userDetails.fullName}</div>
       {!userDetails.isKycVerified && <p className='p-2 bg-orange-100 ml-2 rounded-lg text-sm'> ⚠️ User KYC is not verified. <Link href="/user-kyc">Verify Now</Link> </p> }
   
    </div> 
    </div>
  )
}

export default page