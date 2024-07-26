'use client'
import CustomNavBar from '@/components/navbar/page'
import { Image } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import Link from 'next/link'

const EsdrDetails = ({ params }) => {
  const [esdrDetails, setEsdrDetails] = useState({})

  useEffect(() => {
    if (params.id) {
      fetchesdrDetails()
    }
  }, [params.id])

  const fetchesdrDetails = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}esdr/${params.id}`)
    setEsdrDetails(data)
  }

  return (
    <div>
      <CustomNavBar />
      {/* Banner Section */}
      <div className="relative w-full h-80 overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}uploads/esdrImage/${esdrDetails.esdrImage}`}
          alt="Esdr Banner"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="banner-image"
          style={{ filter: 'brightness(60%)', objectPosition: 'center' }} // Adjusting brightness to dim the image and centering the image
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">ESDR Details</h1>
        </div>
      </div>
      <div className="bg-white p-8 mx-auto max-w-3xl -mt-28 shadow-lg relative z-10"> {/* Adjusted -mt-20 */}
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-100">
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:flex-grow">
                  <h2 className="text-3xl font-medium text-gray-900 title-font mb-2">{esdrDetails?.esdrHeading}</h2>
                  <p className="text-lg text-gray-900 title-font mb-4">{esdrDetails?.esdrIntro}</p>
                  <p className="text-sm text-gray-500 mb-2">{new Date(esdrDetails?.esdrDate).toLocaleDateString()}</p>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}uploads/esdrImage/${esdrDetails.esdrImage}`}
                    width="auto"
                    height="auto"
                    objectFit="cover"
                    className="w-full h-auto mb-4"
                    alt={esdrDetails?.esdrHeading}
                  />
                  <div className="leading-relaxed text-justify text-gray-800">
                    {esdrDetails?.esdrDescription && typeof esdrDetails.esdrDescription === 'string'
                      ? parse(esdrDetails.esdrDescription)
                      : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default EsdrDetails
