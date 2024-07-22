'use client';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import 'aos/dist/aos.css';

const Footer = () => {
  const [isAOSInitialized, setIsAOSInitialized] = useState(false);

  useEffect(() => {
    if (!isAOSInitialized) {
      AOS.init({ duration: 1000, once: true }); // 'once: true' ensures animation happens only once
      setIsAOSInitialized(true);
    }
  }, [isAOSInitialized]);

  return (
    <footer className="bg-[#4299e1] text-white py-10" data-aos="fade-up">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
        <div data-aos="fade-up" data-aos-delay="200">
          <Image src="/logo1.png" width={120} height={90} alt="logo" />
          <p className="mt-4 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta facere delectus qui placeat inventore consectetur repellendus optio debitis.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="https://twitter.com">
              <FaTwitter className="text-2xl text-white hover:text-[#2c6abf]" />
            </Link>
            <Link href="https://facebook.com">
              <FaFacebookF className="text-2xl text-white hover:text-[#2c6abf]" />
            </Link>
            <Link href="https://instagram.com">
              <FaInstagram className="text-2xl text-white hover:text-[#2c6abf]" />
            </Link>
            <Link href="https://linkedin.com">
              <FaLinkedinIn className="text-2xl text-white hover:text-[#2c6abf]" />
            </Link>
          </div>
        </div>
        <div className="mx-auto" data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-xl font-bold text-white">Short Link</h2>
          <ul className="mt-4 space-y-2">
            <li><Link href="/about" className="hover:text-[#2c6abf]">About us</Link></li>
            <li><Link href="/contact" className="hover:text-[#2c6abf]">Contact us</Link></li>
            <li><Link href="/services" className="hover:text-[#2c6abf]">Our Services</Link></li>
            <li><Link href="/projects" className="hover:text-[#2c6abf]">Our Projects</Link></li>
            <li><Link href="/blog" className="hover:text-[#2c6abf]">Latest Blog</Link></li>
            <li><Link href="/terms" className="hover:text-[#2c6abf]">Terms Of use</Link></li>
            <li><Link href="/privacy" className="hover:text-[#2c6abf]">Privacy Policy</Link></li>
            <li><Link href="/faqs" className="hover:text-[#2c6abf]">FAQs</Link></li>
          </ul>
        </div>
        <div data-aos="fade-up" data-aos-delay="600">
          <h2 className="text-xl font-bold text-white">Contact Us</h2>
          <ul className="mt-4 space-y-2">
            <li>Suryabinayak- 04, Bhaktapur, Bagmati, Nepal</li>
            <li>01-6634455, 01-6634663</li>
            <li>esdr@ksl.edu.np</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white mt-10 pt-6 text-center text-white" data-aos="fade-up" data-aos-delay="800">
        <p>Copyright © Kathmandu School of Law 2024. All rights reserved.</p>
        <p>Designed By Arun Kumar Chaudhary</p>
      </div>
    </footer>
  );
};

export default Footer;
