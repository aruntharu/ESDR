'use client'
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";


const Heroimage = () => {
  return (
    <section className="text-gray-400 bg-[#005963] body-font">
  <div className="container mx-auto flex px-5 py-[200px] md:flex-row flex-col items-center ">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center ">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Development Affairs Council Nepal
      
      </h1>
      <p className="mb-8 leading-relaxed">Himalayan –BRI and Development Affairs Council, briefly called Himalayan BRI Council is a forum of academics and development researchers focusing on protection, preservation and promotion of the Himalayan region through BRI model.</p>
      <div className="flex justify-center">
        
        <Button className="inline-flex text-white bg-indigo-500 border-0 py-6 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Read More..</Button>
        <Button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-6 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">About Us</Button>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/4 w-5/6">
    <img class="object-cover object-center rounded" alt="hero" src="/image1.jpg"/>
    </div>
  </div>
</section>
  );
};

export default Heroimage;
