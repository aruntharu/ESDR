'use client';
import React, { useEffect, useState, useRef } from 'react';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FactSection = () => {
  const facts = [
    { value: 400, description: 'ESDR Alumni', duration: 5 },
    { value: 15, description: 'ESDR Edition.', duration: 5 },
    { value: 250, description: 'International Resource Person', duration: 5 },
    { value: 30, description: 'Country Participation', duration: 5 },
  ];

  const [hasAnimated, setHasAnimated] = useState(false);
  const factSectionRef = useRef(null);
  const isAOSInitialized = useRef(false);

  useEffect(() => {
    if (!isAOSInitialized.current) {
      AOS.init({ duration: 1000 });
      isAOSInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (factSectionRef.current) {
      observer.observe(factSectionRef.current);
    }

    return () => {
      if (factSectionRef.current) {
        observer.unobserve(factSectionRef.current);
      }
    };
  }, [factSectionRef, hasAnimated]);

  return (
    <div
      ref={factSectionRef}
      className="container-fluid py-5 flex justify-center w-full"
      style={{ backgroundColor: '#175459' }}
      data-aos="fade-up"
    >
      <div className="container flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {facts.map((fact, index) => (
            <div key={index} className="flex flex-col items-center counter">
              <h1 className="text-4xl font-bold" style={{ color: '#83b4c1' }}>
                {hasAnimated ? (
                  <CountUp
                    start={0}
                    end={fact.value}
                    duration={fact.duration} // Set duration based on the fact
                    redraw={true}
                  />
                ) : (
                  '0'
                )}
                +
              </h1>
              <h5 className="mt-1 text-white font-bold" style={{ textAlign: 'center' }}>
                {fact.description}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FactSection;
