'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomNavBar from '@/components/navbar/page';
import { Pagination } from '@nextui-org/react';
import { animateScroll as scroll } from 'react-scroll';
import Image from 'next/image';
import CommitteeCard from '@/components/card/page';

const Page = () => {
  const [committeeList, setCommitteeList] = useState([]);
  const [loaded, setLoaded] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page

  useEffect(() => {
    fetchCommitteeList();
  }, []);

  const fetchCommitteeList = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}committee`);
    setCommitteeList(data.sort((a, b) => a.serialNumber - b.serialNumber)); // Sort by serialNumber
  };

  // Calculate the items to be displayed on the current page
  const currentItems = committeeList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(committeeList.length / itemsPerPage);

  const handlePageChange = (page) => {
    setLoaded(0); // Reset loaded state to start animation from the first item of the new page
    setCurrentPage(page);

    // Scroll to the top of the page smoothly
    scroll.scrollToTop({ smooth: true, duration: 500 });
  };

  return (
    <div>
      <div>
        <CustomNavBar />
      </div>
      {/* Banner Section */}
      <div className="relative w-full h-64 overflow-hidden ">
        <div className="w-full h-full relative">
          <Image
            src="/banner.jpeg" // Path to your image in the public folder
            alt="Committee Banner"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold">Committee</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {currentItems.map((item, index) => (
            <CommitteeCard key={item._id} item={item} index={index} loaded={loaded} setLoaded={setLoaded} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            total={totalPages}
            initialPage={1}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
