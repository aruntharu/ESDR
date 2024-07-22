'use client';
import React from 'react';
import CustomNavBar from '@/components/navbar/page';
import CustomCarousel from '@/components/carousel/page';
import CustomAboutUs from '@/components/about/page';
import CustomPrograms from '@/components/programs/page';
import ScrollToTop from '@/components/scrollToTop/page';
import Footer from '@/components/footer/page';
import FactSection from '@/components/fact/page';

const Home = () => {
  return (
    <div>
      <CustomNavBar />
      <CustomCarousel />
      <CustomAboutUs />
      <FactSection/>
      <CustomPrograms />  
      <Footer/>
      <ScrollToTop />
    </div>
  );
};

export default Home;
