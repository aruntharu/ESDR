'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Subscribe = () => {
  const [submitted, setSubmitted] = useState(false);
  const isAOSInitialized = useRef(false);

  useEffect(() => {
    if (!isAOSInitialized.current) {
      AOS.init({ duration: 1000 });
      isAOSInitialized.current = true;
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
    },
    onSubmit: async (values, { resetForm }) => {
      await subscribeUser(values);
      setSubmitted(true);
      resetForm(); // Reset the form values after submission
    },
  });

  const subscribeUser = async (values) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  };

  return (
    <div className="bg-[#83b4c1] py-10 px-4 flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center">
        <h2 className="text-3xl font-bold text-white mb-4 md:mb-0 md:mr-4">Subscribe Newsletter</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col md:flex-row items-center w-full md:w-auto">
          <div className="w-full md:w-2/5">
            <Input
              type="text"
              placeholder="Your name"
              name="fullName"
              className="w-full rounded focus:outline-none focus:border-blue-500"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              bordered={false}
              style={{ padding: 0 }}
            />
          </div>
          <div className="w-full md:w-3/5 md:ml-4 mt-4 md:mt-0">
            <Input
              type="email"
              placeholder="Your email address"
              name="email"
              className="w-full rounded focus:outline-none focus:border-blue-500"
              onChange={formik.handleChange}
              value={formik.values.email}
              bordered={false}
              style={{ padding: 0 }}
            />
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-4">
            <Button
              className="w-full md:w-auto bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-700 transition duration-300"
              type="submit"
              disabled={submitted} // Disable the button after submission
            >
              Subscribe
            </Button>
          </div>
        </form>
      </div>
      {submitted && (
        <p className="text-center text-white mt-4">
          Thank you! You will receive the latest information about ESDR in your email.
        </p>
      )}
    </div>
  );
};

export default Subscribe;
