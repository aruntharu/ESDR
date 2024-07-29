"use client";
import React, { useEffect, useRef } from "react";
import AOS from "aos";
import Image from "next/image";
import "aos/dist/aos.css";
import Link from "next/link";

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
        <div
          className="w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="relative h-full">
            <Image
              src="/upload/aboutus2.jpg"
              className="w-3/4 rounded mb-8"
              alt=""
              width={480} // Adjust these values based on your actual image size
              height={360} // Adjust these values based on your actual image size
            />
            <div className="absolute top-1/4 left-1/4 w-3/4">
              <Image
                src="/upload/aboutus1.jpg"
                className="w-full rounded"
                alt=""
                width={360} // Adjust these values based on your actual image size
                height={270} // Adjust these values based on your actual image size
              />
            </div>
          </div>
        </div>
        <div
          className="w-full md:w-1/2 lg:w-2/3"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <div className="md:ml-8 lg:ml-12">
            {" "}
            {/* Add margin here */}
            <h5 className="text-blue-500">About Us</h5>
            <h1 className="text-3xl font-bold mb-4">
             ESDR
            </h1>
            <p className="mb-8">
              Economic Social Development Rights (ESDR) is a residential school
              program organized by Kathmandu School of Law and is a demanding
              and immersive diploma course where participants get opportunities
              of refining the concept of Social and Economic Justice with
              Development Rights, Legalities with profound lectures, seminars,
              idea sharing panel discussions from the experts and senior
              professors from around the world. ESDR is also an opportunity for
              networking diverse students and likeminded individuals who aspire
              to dwell on Social Justice and Human Rights in its true sense.
              ESDR takes place in the heart of Nepal in International Research
              Center of Kathmandu School of Law....
            </p>
            <Link
              href="/aboutus"
              className="bg-blue-500 text-white py-3 px-5 rounded-full"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAboutUs;
