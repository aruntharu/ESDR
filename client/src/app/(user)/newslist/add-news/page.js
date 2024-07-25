'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import { Input } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { FaBackspace } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import JoditEditor
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

const Page = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [logs, setLogs] = useState([]);

  const appendLog = useCallback(
    (message) => {
      console.log("logs = ", logs);
      const newLogs = [...logs, message];
      setLogs(newLogs);
    },
    [logs]
  );

  const config = useMemo(
    () => ({
      readonly: false,
      height: 500,
      uploader: {
        insertImageAsBase64URI: true,
      },
      style: {
        overflowY: 'auto',
      }
    }),
    []
  );

  const onChange = useCallback(
    (newContent) => {
      appendLog(`onChange triggered with ${newContent}`);
    },
    [appendLog]
  );

  useEffect(() => {
    console.log("onChange = ", onChange);
  }, [onChange]);

  const onBlur = useCallback(
    (newContent) => {
      appendLog(`onBlur triggered with ${newContent}`);
      setContent(newContent);
      formik.setFieldValue('newsDescription', newContent);
    },
    [appendLog]
  );

  const newsDetails = [
    { name: 'newsHeading', label: 'News Heading' },
    { name: 'newsIntro', label: 'News Intro' },
    { name: 'newsDescription', label: 'News Description' },
    { name: 'newsDate', label: 'News Date' },
  ];

  const formik = useFormik({
    initialValues: {
      newsHeading: '',
      newsIntro: '',
      newsDescription: '',
      newsDate: '',
    },
    onSubmit: values => {
      submitNews(values);
    },
  });

  const submitNews = async (values) => {
    let formData = new FormData();
    formData.append('newsHeading', values.newsHeading);
    formData.append('newsIntro', values.newsIntro);
    formData.append('newsDescription', values.newsDescription);
    formData.append('newsDate', values.newsDate);
    formData.append('newsImage', image);

    const requestOptions = {
      method: 'POST',
      body: formData
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}news`, requestOptions);
    const data = await response.json();
    if (data.msg) {
      toast(data.msg);
    }
  }

  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
      <div className='flex'>
        <Link href="/newslist"><FaBackspace className='size-6 mr-1' /></Link>
        <p className='flex'>Back</p>
      </div>
      <h1 className='text-4xl text-green-300'>Add News</h1>
      {newsDetails.map((item) => (
        <div key={item.name}>
          <label htmlFor={item.name}>{item.label}</label>
          {item.name === 'newsDescription' ? (
            <JoditEditor
              value={content}
              config={config}
              tabIndex={1}
              onBlur={onBlur}
              onChange={onChange}
            />
          ) : (
            <Input
              id={item.name}
              name={item.name}
              type="text"
              onChange={formik.handleChange}
              value={formik.values[item.name]}
            />
          )}
        </div>
      ))}
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <div className='flex'>
        <Button color="success" className='p-2 my-4 mr-4 w-[10%] flex' type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default Page;
