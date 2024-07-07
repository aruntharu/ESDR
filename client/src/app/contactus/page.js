'use client'
import CustomNavBar from '@/components/navbar/page'
import React,{useState} from 'react';
import { useFormik } from 'formik';
import { Input} from '@nextui-org/react';
import toast from 'react-hot-toast';
import { FaBackspace } from "react-icons/fa";
import {Button} from "@nextui-org/react";
import Link from 'next/link';

const page = () => {
  const messageDetails= [
    {name:'contactFullName', label:'Contact Full Name'},
     {name:'contactPhoneNumber', label:'Contact Phone Number'}, 
     {name:'contactMail', label:'Contact Mail'},  
     {name:'contactMessage', label:'Contact Message'}, 
  ];

  const formik = useFormik({
    initialValues: {
      contactFullName:'',
      contactFullName: '',
      contactMail: '',
      contactMessage: '',
    },
    onSubmit: values => {
      submitMessage(values)
    },
  });

  const submitMessage = async(values) => {
    let formData = new FormData(); 
    formData.append('contactFullName', values.contactFullName); 
    formData.append('contactFullName', values.contactFullName);
    formData.append('contactMail', values.contactMail);
    formData.append('contactMessage', values.contactMessage);

    const requestOptions = {
      method: 'POST',
      body: formData
  };
  const response = await fetch('http://localhost:8000/contact', requestOptions);
  const data = await response.json()
  if(data.msg){
    toast(data.msg)
  }
  }

  return (
    <div>
      <CustomNavBar/>
        <section class="text-gray-600 body-font relative">
  <div class="absolute inset-0 bg-gray-300">
    <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="map" scrolling="no" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed" ></iframe>
  </div>
  <div class="container px-5 py-24 mx-auto flex">
    
  <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
          <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
          <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
        </div>
    <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
      <p class="leading-relaxed mb-5 text-gray-600">Himalayan Development Council</p>
      <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>

      <div class="relative mb-4">
        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div class="relative mb-4">
        <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
        <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
      <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
      <p class="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
    </div>
    
  </div>
</section>
    </div>
  )
}

export default page