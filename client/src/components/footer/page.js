"use client";
import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#175459] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
        <div>
          <div className="flex items-center">
            <Image src="/logo1.png" width={120} height={90} alt="logo" />
            <Image src="/ksl1.png" width={100} height={100} alt="ksl logo" className="ml-8" />
          </div>
          <p className="mt-4 text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            facere delectus qui placeat inventore consectetur repellendus optio
            debitis.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="https://twitter.com">
              <FaTwitter className="text-2xl text-gray-300 hover:text-white" />
            </Link>
            <Link href="https://www.facebook.com/esdrksl/" legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-2xl text-gray-300 hover:text-white" />
              </a>
            </Link>
            <Link href="https://www.instagram.com/ksl_nepal/">
              <FaInstagram className="text-2xl text-gray-300 hover:text-white" />
            </Link>
            <Link href="https://www.linkedin.com/school/kathmanduschooloflaw/">
              <FaLinkedinIn className="text-2xl text-gray-300 hover:text-white" />
            </Link>
          </div>
        </div>
        <div className="mx-auto">
          <h2 className="text-xl font-bold text-white">Short Link</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/home" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/aboutus" className="hover:text-gray-300">
                About us
              </Link>
            </li>
            <li>
              <Link href="/committee" className="hover:text-gray-300">
                Committee
              </Link>
            </li>
            <li>
              <Link href="/esdr" className="hover:text-gray-300">
                ESDR 2024
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-gray-300">
                Past Events
              </Link>
            </li>
            <li>
              <Link href="/contactus" className="hover:text-gray-300">
                Contact us
              </Link>
            </li>
            <li>
              <Link href="/connectwithus" className="hover:text-gray-300">
                Apply Now
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Contact Us</h2>
          <ul className="mt-4 space-y-2">
            <li className="text-gray-300">
              Suryabinayak- 04, Bhaktapur, Bagmati, Nepal
            </li>
            <li className="text-gray-300">01-6634455, 01-6634663</li>
            <li className="text-gray-300">esdr@ksl.edu.np</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-gray-300">
        <p>Copyright © Kathmandu School of Law 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
