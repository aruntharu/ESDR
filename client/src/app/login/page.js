'use client'
import React from 'react'
import {Button,Input} from "@nextui-org/react";
import NavBar from '@/components/navbar/page';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'), 
  email: Yup.string().email('Invalid email').required('Required'),
});
const login = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema:SignupSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className='h-screen bg-gradient-to-r from-indigo-500  '>
      <NavBar/>
      <div className='flex justify-end mr-40'>
        <div className='bg-white border border-inherit m-7 w-72 p-4 h-96	rounded ring-2 ring-gray-200'>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email"></label>
          <Input
          isClearable
          type="email"
          label="Email"
          variant="bordered"
          onChange={formik.handleChange}
          name="email"
          value={formik.values.email}
          placeholder="Enter your email"
          defaultValue="junior@nextui.org"
          onClear={() => console.log("input cleared")}
          className="max-w-xs"
        /><br/>

    {formik.errors.email}
        <Input
          isClearable
          type="password"
          label="Password"
          variant="bordered"
          onChange={formik.handleChange}
          name="password"
          value={formik.values.password}
          placeholder="Enter your password"
          onClear={() => console.log("input cleared")}
          className="max-w-xs"
        /><br/>
          {formik.errors.password}
          <Button type="submit" radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Login</Button><br/><br/>
          <Link href ='/register'><Button radius="md" className=''>Sign Up</Button>  </Link>
          <p>Don't have account yet? </p>
        </form>
        </div>
      </div>
    </div>
  );
};


export default login