'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import { Input } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { FaBackspace } from 'react-icons/fa';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import JoditEditor from 'jodit-react';

const Page = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [logs, setLogs] = useState([]);

  const appendLog = useCallback(
    (message) => {
      console.log('logs = ', logs);
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
    console.log('onChange = ', onChange);
  }, [onChange]);

  const onBlur = useCallback(
    (newContent) => {
      appendLog(`onBlur triggered with ${newContent}`);
      setContent(newContent);
      formik.setFieldValue('esdrDescription', newContent);
    },
    [appendLog]
  );

  const esdrDetails = [
    { name: 'esdrHeading', label: 'Esdr Heading' },
    { name: 'esdrIntro', label: 'Esdr Intro' },
    { name: 'esdrDescription', label: 'Esdr Description' },
    { name: 'esdrDate', label: 'Esdr Date' },
  ];

  const formik = useFormik({
    initialValues: {
      esdrHeading: '',
      esdrIntro: '',
      esdrDescription: '',
      esdrDate: '',
    },
    onSubmit: (values) => {
      submitEsdr(values);
    },
  });

  const submitEsdr = async (values) => {
    let formData = new FormData();
    formData.append('esdrHeading', values.esdrHeading);
    formData.append('esdrIntro', values.esdrIntro);
    formData.append('esdrDescription', values.esdrDescription);
    formData.append('esdrDate', values.esdrDate);
    formData.append('esdrImage', image);

    const requestOptions = {
      method: 'POST',
      body: formData
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}esdr`, requestOptions);
    const data = await response.json();
    if (data.msg) {
      toast(data.msg);
    }
  };

  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
      <div className='flex'>
        <Link href="/esdrlist"><FaBackspace className='size-6 mr-1' /></Link>
        <p className='flex'>Back</p>
      </div>
      <h1 className='text-4xl text-green-300'>Add Esdr</h1>
      {esdrDetails.map((item) => (
        <div key={item.name}>
          <label htmlFor={item.name}>{item.label}</label>
          {item.name === 'esdrDescription' ? (
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
