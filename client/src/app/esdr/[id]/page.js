'use client'
import CustomNavBar from '@/components/navbar/page'
import { Image } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'

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
      <div>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-10 py-10 mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-100">
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:flex-grow">
                  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{esdrDetails?.esdrHeading}</h2>
                  <p className="text-xl text-gray-900 title-font mb-2">{esdrDetails?.esdrIntro}</p>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}uploads/esdrImage/${esdrDetails.esdrImage}`}
                    width="60%"
                    height="auto"
                    objectFit="cover"
                    className="w-full h-auto"
                    alt={esdrDetails?.esdrHeading}
                  />
                  <p className="mt-1 text-gray-500 text-sm mb-4 ">{esdrDetails?.esdrDate}</p>
                  <p className="leading-relaxed text-justify ">
                    {esdrDetails?.esdrDescription && typeof esdrDetails.esdrDescription === 'string'
                      ? parse(esdrDetails.esdrDescription)
                      : ''}
                  </p>
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
