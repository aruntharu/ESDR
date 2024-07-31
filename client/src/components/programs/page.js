'use client';
import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './CustomPrograms.css';

const customPrograms = [
  {
    id: 1,
    title: 'ESDR Concept Note',
    description: 'Comprehensive Details and Information for the 16th ESDR. Important for Abstract Writing.',
    imgSrc: '/upload/esdr.jpg', // Replace with the actual path to the image
  },
  {
    id: 2,
    title: 'Registration',
    description: 'Link for Applying to the 16th ESDR',
    imgSrc: '/upload/apply.png', // Replace with the actual path to the image
  },
  {
    id: 3,
    title: 'KSL',
    description: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.',
    imgSrc: '/upload/information.png', // Replace with the actual path to the image
  },
];

const CustomPrograms = () => {
  const router = useRouter();
  const isAOSInitialized = useRef(false);

  useEffect(() => {
    if (!isAOSInitialized.current) {
      AOS.init({ duration: 1000 });
      isAOSInitialized.current = true;
    }
  }, []);

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12" data-aos="fade-up">
        <h1 className="text-4xl font-bold">16th ESDR: Decolonizing Law and Justice</h1>
        <h5 className="text-primary text-lg font-semibold">Information Section</h5>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customPrograms.map((program, index) => (
          <div
            key={program.id}
            className="card bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105"
            data-aos="fade-up" data-aos-delay={`${index * 100}`}
          >
            <div className="mb-4">
              <Image
                src={program.imgSrc}
                alt={program.title}
                width={200}
                height={200}
                className="mx-auto rounded-lg"
              />
            </div>
            <h4 className="text-xl font-semibold mb-3">{program.title}</h4>
            <p className="text-gray-600 mb-4 font-bold card-description">
              {program.description}
            </p>
            <button
              onClick={() => router.push(`/customPrograms/${program.id}`)}
              className="bg-[#175459] text-white px-5 py-3 rounded-full transition-colors duration-300 hover:bg-secondary-dark"
            >
              {program.title === 'Registration' ? 'Apply' : 'Read More'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPrograms;
