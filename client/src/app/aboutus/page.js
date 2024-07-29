'use client';
import CustomNavBar from "@/components/navbar/page";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomGallery from "@/components/gallery/page";
import Subscribe from "@/components/subscribe/page";
import Footer from "@/components/footer/page";
import AOS from 'aos';
import Venue from "@/components/venue/page";

const AboutUs = () => {
  const isAOSInitialized = useRef(false);

  useEffect(() => {
    if (!isAOSInitialized.current) {
      AOS.init({ duration: 1000 });
      isAOSInitialized.current = true;
    }
  }, []);

  return (
    <div>
      <CustomNavBar />
      {/* Banner Section */}
      <div className="relative w-full h-64 overflow-hidden banner" data-aos="fade-up">
      <Image
  src="/upload/43.jpg" // Path to your image in the upload folder
  alt="News Banner"
  layout="fill"
  objectFit="cover"
  quality={100}
  className="banner-image"
/>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">About Us</h1>
        </div>
      </div>
      <div className="container mx-auto py-12">
        <div className="flex flex-col md:flex-row items-center" data-aos="fade-up" data-aos-delay="300">
          <div className="w-full md:w-1/2">
            <video
              src="/upload/esdr.mp4" // Path to your video in the public folder
              controls
              autoPlay
              className="banner-video"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0" data-aos="fade-up" data-aos-delay="500">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="mb-4 text-justify">
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
              Center of Kathmandu School of Law in Fulbari Bhakundebesi, Kavre
              where participants can have openmindfullness accompanied by lush
              green gardens, serene of Himalayas and local experience of Nepal
              that enlightens new perceptions and practical experiences.
              Consisting of 21 days ESDR brings experiences that are clinical,
              critical and researching. Each new edition has its own THEME that
              aids in understanding and answering Economic Social and
              Development Rights.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/connectwithus"
                className="bg-[#175459] text-white py-3 px-5 rounded-full"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .banner {
          clip-path: polygon(
            50% 0%,
            100% 0,
            100% 66%,
            80% 100%,
            45% 98%,
            0 75%,
            0 0
          );
        }
        .banner-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
      <Venue/>
      <CustomGallery/>
      <Subscribe />
      <Footer />
    </div>
  );
};

export default AboutUs;
