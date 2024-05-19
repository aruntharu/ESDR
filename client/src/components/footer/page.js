import Image from 'next/image'
import React from 'react'
const Footer = () => {
  return (
    <footer className="bg-red-100 text-black py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className='flex justify-center'> 
          
          <Image src={require('../Images/logo.png')} width={70} height={80}/>
          <h1 className="text-2xl font-bold my-4">Social Justice</h1>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">About</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer