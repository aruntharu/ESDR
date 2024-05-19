'use client'
import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
  return (
    <div className="container mx-auto">
    <div className="carousel-container w-full h-90 md:h-110 overflow-hidden">
      <Slider {...settings}>
        <div className="slide">
          <Image src={require('../../components/Images/Image1.jpg')} alt="Slide 1" className="w-full h-full object-cover"/>
        </div>
        <div className="slide">
          <Image src={require('../../components/Images/Image2.jpg')} alt="Slide 2" className="w-full h-full object-cover"/>
        </div>
        <div className="slide">
          <Image src={require('../../components/Images/Image3.jpg')} alt="Slide 3" className="w-full h-full object-cover"/>
        </div>
      </Slider>
    </div>
    </div>
  )
}

export default Carousel