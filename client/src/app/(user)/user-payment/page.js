'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const UserPayment = () => {
  const router = useRouter();
  const { userDetails } = useSelector((state) => state.user);
  const { _id } = userDetails;

  const formik = useFormik({
    initialValues: {
      paymentImages: []
    },
    onSubmit: (values) => {
      if (!imageFiles || imageFiles.length === 0) {
        toast.error('Please upload at least one image.');
        return;
      }
      submitPayment(values);
    },
  });

  const submitPayment = async (values) => {
    let formData = new FormData();
    formData.append('userId', _id);
    imageFiles.forEach((file) => formData.append('paymentImages', file));

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}payment`;
      const response = await axios.post(apiUrl, formData);
      const data = response.data;
      if (data.msg) {
        toast(data.msg);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error submitting payment details:', error);
      toast.error('Error submitting payment details');
    }
  };

  const [imageFiles, setImageFiles] = useState([]);

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4 bg-white relative' onSubmit={formik.handleSubmit}>
      <div className="absolute inset-0 z-0">
        <img src="/esdr.jpg" alt="background" className="w-full h-full object-cover opacity-25" />
      </div>
      <div className="relative z-10">
        <h1 id="header_1" className="text-3xl font-bold my-4">Upload Payment Images</h1>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label htmlFor='paymentImages'>Payment Images</label>
            <input type="file" className="w-full border-black bg-white" multiple onChange={handleImageChange} />
          </div>
        </div>
        <button className='bg-green-500 text-white rounded p-2 my-4 w-[20%]' type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UserPayment;
