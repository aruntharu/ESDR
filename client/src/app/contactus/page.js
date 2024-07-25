'use client';
import CustomNavBar from '@/components/navbar/page';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Input, Textarea } from '@nextui-org/react';
import { Button } from "@nextui-org/react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Page = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const formik = useFormik({
    initialValues: {
      contactFullName: '',
      contactPhoneNumber: '',
      contactMail: '',
      contactMessage: '',
    },
    onSubmit: async (values) => {
      await submitMessage(values);
      setSubmitted(true);
    },
  });

  const submitMessage = async (values) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
  };

  return (
    <div>
      <CustomNavBar />
      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="map"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Kathmandu%20School%20of%20Law,%20Nepal&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md" data-aos="fade-left">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Contact Us</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="relative mb-4">
                <label htmlFor="fullName" className="leading-7 text-sm text-gray-600">Full Name</label>
                <Input
                  type="text"
                  id="fullName"
                  name="contactFullName"
                  className="w-full bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-0 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={formik.handleChange}
                  value={formik.values.contactFullName}
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="phoneNumber" className="leading-7 text-sm text-gray-600">Phone Number</label>
                <Input
                  type="text"
                  id="phoneNumber"
                  name="contactPhoneNumber"
                  className="w-full bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-0 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={formik.handleChange}
                  value={formik.values.contactPhoneNumber}
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="mail" className="leading-7 text-sm text-gray-600">Mail</label>
                <Input
                  type="text"
                  id="mail"
                  name="contactMail"
                  className="w-full bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-0 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={formik.handleChange}
                  value={formik.values.contactMail}
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                <Textarea
                  id="message"
                  name="contactMessage"
                  className="w-full bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-0 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={formik.handleChange}
                  value={formik.values.contactMessage}
                  rows={6} // Increase the number of rows to make the textarea larger
                />
              </div>
              <Button
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none rounded text-lg"
                type="submit"
                disabled={submitted}
              >
                {submitted ? "Thank you for the feedback" : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
