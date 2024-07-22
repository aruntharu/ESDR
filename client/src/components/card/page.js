'use client';
import React, { useEffect } from 'react';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CommitteeCard = ({ item, index, loaded, setLoaded }) => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // Ensure animation happens only once
    });
  }, []);

  useEffect(() => {
    if (loaded === index) {
      AOS.refresh();
    }
  }, [loaded, index]);

  const handleAnimationEnd = () => {
    if (loaded === index) {
      setLoaded(loaded + 1);
    }
  };

  return (
    <Card
      data-aos="fade-up"
      data-aos-delay={index * 200}
      className={`shadow-xl pb-8 ${loaded === index ? 'opacity-100' : 'opacity-0'}`}
      onAnimationEnd={handleAnimationEnd}
      style={{ overflow: 'hidden' }}
    >
      <CardBody 
        onClick={() => router.push(`/committee/${item._id}`)} 
        className="overflow-visible p-0 cursor-pointer"
      >
        <div className="p-2">
          <Image
            alt="Committee Member"
            className="object-cover rounded-t-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
            src={`${process.env.NEXT_PUBLIC_API_URL}uploads/committeeImage/${item.personPhoto}`}
            width="100%"
            height={270}
            style={{ objectFit: 'cover', aspectRatio: '4/4', padding: '10px' }}
          />
        </div>
      </CardBody>
      <CardHeader className="pb-0 pt-4 px-4 flex-col items-center">
        <h4 className="font-bold text-large text-center">{item.fullName}</h4>
        <small className="text-default-500 text-center">{item.designation}</small>
      </CardHeader>
    </Card>
  );
};

export default CommitteeCard;
