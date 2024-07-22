'use client';
import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import { FaCode, FaFileCode, FaExternalLinkAlt, FaUserSecret, FaEnvelopeOpen, FaLaptop } from 'react-icons/fa';
import './CustomPrograms.css'; // Import the custom CSS file

const customPrograms = [
  { id: 1, icon: FaCode, title: 'ESDR', description: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.' },
  { id: 2, icon: FaFileCode, title: 'ALP', description: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.' },
  { id: 3, icon: FaExternalLinkAlt, title: 'KSL', description: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.' },
  { id: 4, icon: FaUserSecret, title: 'APMA', description: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.' },
  { id: 5, icon: FaEnvelopeOpen, title: 'Research', description: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.' },
  { id: 6, icon: FaLaptop, title: 'Arun', description: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.' },
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
        <h5 className="text-primary text-lg font-semibold">Our Programs</h5>
        <h1 className="text-4xl font-bold">Kathmandu School of Law</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customPrograms.map((service, index) => (
          <div
            key={service.id}
            className="card bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105"
            data-aos="fade-up" data-aos-delay={`${index * 100}`}
          >
            <div className="flex justify-center items-center mb-4 text-primary">
              <service.icon className="text-7xl" />
            </div>
            <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <button
              onClick={() => router.push(`/customPrograms/${service.id}`)}
              className="bg-secondary text-white px-5 py-3 rounded-full transition-colors duration-300 hover:bg-secondary-dark"
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPrograms;
