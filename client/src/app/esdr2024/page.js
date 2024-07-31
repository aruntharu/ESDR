"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import CustomNavBar from "@/components/navbar/page";
import FlipBook from "@/components/flipbook/page";
import Trekking from "@/components/trekking/page";
import Footer from "@/components/footer/page";
import Commitment from "@/components/commitment/page";
import JoinUs from "@/components/joinus/page";

const ESDR = () => {
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
      <div
        className="relative w-full h-64 overflow-hidden banner"
        data-aos="fade-up"
      >
        <Image
          src="/upload/esdr.jpg" // Path to your image in the upload folder
          alt="ESDR Banner"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="banner-image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">ESDR 2024</h1>
        </div>
      </div>
      {/* Content Section */}
      <div className="container mx-auto py-12 px-4 md:px-0">
        <div
          className="flex flex-col md:flex-row items-start" // Changed alignment to items-start
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="relative" style={{ width: "100%", height: "auto" }}>
              <Image
                src="/upload/esdr1.jpg" // Path to the image you want to use
                alt="ESDR Image"
                layout="responsive" // Use responsive layout
                width={700} // Set the desired width
                height={500} // Set the desired height
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </div>
          <div
            className="w-full md:w-1/2 md:pl-8"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <h2 className="text-3xl font-bold mb-4">ESDR</h2>
            <p className="mb-4 text-justify">
              Welcome to the official page of the 16th Economic, Social, and
              Development Rights (ESDR) Program, an annual gathering of thought
              leaders, scholars, activists, and practitioners dedicated to
              addressing pressing global issues through the decolonized lens.
              This year, our focus is on a topic of paramount importance,
              Decolonizing Law and Justice: Embracing Diverse Perspectives of
              International Law. This page serves as an introduction to the
              ethos and objectives of the 16th ESDR Program. We hope it inspires
              you to engage with the content, contribute your perspectives, and
              join us for a broader understanding of International Law and
              Justice.
            </p>
            <h2 className="text-3xl font-bold mb-4">Understanding the Theme</h2>
            <p className="mb-4 text-justify">
              This theme aims to critically examine the remnants of colonial
              legal systems and their impact on current justice framework. This
              year ESDR puts effort in breaking up the past colonial legacy and
              attempts in examining new form of International Law by emphasizing
              the significance of International Relations. It seeks to explore
              alternative approaches to law and justice that are inclusive,
              equitable, and reflective of perspectives from the Global South.
              This edition of ESDR consists of many emerging contexts such as
              Neo-Liberalism review, Democratic Decolonization in its true
              essence, Climate Change and Artificial Intelligence among others.
              This edition will also focus on how International Law should have
              a bigger picture for universal application of Human Rights with
              due consideration of local domestic realities. This theme
              contributes in conscience building of participants from law and
              other disciplines related to the study of Human Rights and
              Economic Development.
            </p>
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
      `}</style>
      <FlipBook/>
      <Trekking/>
      <Commitment/>
      <JoinUs/>
      <Footer/>
    </div>
  );
};

export default ESDR;
