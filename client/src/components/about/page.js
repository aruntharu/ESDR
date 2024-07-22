'use client';
import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import Image from 'next/image';
import 'aos/dist/aos.css';

const CustomAboutUs = () => {
  const isAOSInitialized = useRef(false);

  useEffect(() => {
    if (!isAOSInitialized.current) {
      AOS.init({ duration: 1000 });
      isAOSInitialized.current = true;
    }
  }, []);

  return (
    <div className="container mx-auto py-16 my-16">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0" data-aos="fade-up" data-aos-delay="300">
          <div className="relative h-full">
            <Image
              src="/1.jpg"
              className="w-3/4 rounded mb-8"
              alt=""
              width={480} // Adjust these values based on your actual image size
              height={360} // Adjust these values based on your actual image size
            />
            <div className="absolute top-1/4 left-1/4 w-3/4">
              <Image
                src="/2.jpg"
                className="w-full rounded"
                alt=""
                width={360} // Adjust these values based on your actual image size
                height={270} // Adjust these values based on your actual image size
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3" data-aos="fade-up" data-aos-delay="500">
          <div className="md:ml-8 lg:ml-12"> {/* Add margin here */}
            <h5 className="text-blue-500">About Us</h5>
            <h1 className="text-3xl font-bold mb-4">About HighTech Agency And Its Innovative IT Solutions</h1>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur quis purus ut interdum. Pellentesque
              aliquam dolor eget urna ultricies tincidunt. Nam volutpat libero sit amet leo cursus, ac viverra eros
              tristique. Morbi quis quam mi. Cras vel gravida eros. Proin scelerisque quam nec elementum viverra.
              Suspendisse viverra hendrerit diam in tempus. Etiam gravida justo nec erat vestibulum, et malesuada augue
              laoreet.
            </p>
            <p className="mb-4">
              Pellentesque aliquam dolor eget urna ultricies tincidunt. Nam volutpat libero sit amet leo cursus, ac viverra
              eros tristique. Morbi quis quam mi. Cras vel gravida eros. Proin scelerisque quam nec elementum viverra.
              Suspendisse viverra hendrerit diam in tempus.
            </p>
            <a href="#" className="bg-blue-500 text-white py-3 px-5 rounded-full">More Details</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAboutUs;
