'use client'
import React,{useState} from 'react';
import { useFormik } from 'formik';
import { Input} from '@nextui-org/react';
import toast from 'react-hot-toast';
import { FaBackspace } from "react-icons/fa";
import {Button} from "@nextui-org/react";
import Link from 'next/link';

const page = () => {
  const messageDetails= [
    {name:'messageHeading', label:'Message Heading'},
     {name:'senderName', label:'Sender Name'}, 
     {name:'messageDate', label:'Message Date'},  
     {name:'messageDescription', label:'Message Description'}, 
  ];


  const formik = useFormik({
    initialValues: {
      messageHeading:'',
      senderName: '',
      messageDescription: '',
      messageDate: '',
    },
    onSubmit: values => {
      submitMessage(values)
    },
  });

  const submitMessage = async(values) => {
    let formData = new FormData(); 
    formData.append('messageHeading', values.messageHeading); 
    formData.append('senderName', values.senderName);
    formData.append('messageDate', values.messageDate);
    formData.append('messageDescription', values.messageDescription);
    formData.append('messageImage', image);

    

    const requestOptions = {
      method: 'POST',
      body: formData
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}message`, requestOptions);
  const data = await response.json()
  if(data.msg){
    toast(data.msg)
  }
  }

  const [image, setImage] = useState(null)
  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
      <div className='flex' ><Link href="/messagelist"><FaBackspace className='size-6 mr-1'/></Link><p className='flex'>Back</p></div>
      <h1 className='text-4xl text-green-300'>Sent Message</h1>
     {messageDetails.map((item)=>{
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