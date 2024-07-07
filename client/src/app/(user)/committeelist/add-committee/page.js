'use client'
import React,{useState} from 'react';
import { useFormik } from 'formik';
import { Input} from '@nextui-org/react';
import toast from 'react-hot-toast';
import { FaBackspace } from "react-icons/fa";
import {Button} from "@nextui-org/react";
import Link from 'next/link';

const page = () => {
  const committeeDetails= [
    {name:'fullName', label:'Full Name'},
     {name:'designation', label:'Designation'}, 
     {name:'personDescription', label:'Person Description'},  
  ];


  const formik = useFormik({
    initialValues: {
        fullName:'',
        designation: '',
        personDescription: '',
    },
    onSubmit: values => {
      submitCommittee(values)
    },
  });

  const submitCommittee = async(values) => {
    let formData = new FormData(); 
    formData.append('fullName', values.fullName); 
    formData.append('designation', values.designation);
    formData.append('personDescription', values.personDescription);
    formData.append('committeeImage', image);

    

    const requestOptions = {
      method: 'POST',
      body: formData
  };
  const response = await fetch('http://localhost:8000/committee', requestOptions);
  const data = await response.json()
  if(data.msg){
    toast(data.msg)
  }
  }

  const [image, setImage] = useState(null)
  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
      <div className='flex' ><Link href="/committeelist"><FaBackspace className='size-6 mr-1'/></Link><p className='flex'>Back</p></div>
      <h1 className='text-4xl text-green-300'>Add Committee</h1>
     {committeeDetails.map((item)=>{
      return (
        <div>
           <label htmlFor={item.name}>{item.label}</label>
      <Input
        id={item.name}
        name={item.name}
        type="text"
        onChange={formik.handleChange}
        value={formik.values[item.name]}
      />
        </div>
      )
     })}

     <input  type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      
     
      <div className='flex'>
      <Button color="success" className='p-2 my-4 mr-4 w-[10%] flex' type="submit" >Submit</Button>
      </div>
    </form>
  );
};

export default page