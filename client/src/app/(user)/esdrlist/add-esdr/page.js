'use client';
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Input, Calendar } from '@nextui-org/react';
import { CalendarDate, parseDate, today } from '@internationalized/date';
import toast from 'react-hot-toast';
import { FaBackspace } from 'react-icons/fa';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Dynamically import JoditEditor
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

const Page = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [logs, setLogs] = useState([]);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const calendarRef = useRef(null);
  const dateInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const router = useRouter();

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
  ];

  const formik = useFormik({
    initialValues: {
      esdrHeading: '',
      esdrIntro: '',
      esdrDescription: '',
      esdrDate: parseDate(new Date().toISOString().split('T')[0]), // Initialize with current date
    },
    onSubmit: async (values, { resetForm }) => {
      const success = await submitEsdr(values);
      if (success) {
        resetForm();
        setContent('');
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      }
    },
  });

  const submitEsdr = async (values) => {
    let formData = new FormData();
    formData.append('esdrHeading', values.esdrHeading);
    formData.append('esdrIntro', values.esdrIntro);
    formData.append('esdrDescription', values.esdrDescription);
    formData.append('esdrDate', values.esdrDate.toString());

    if (image) {
      formData.append('esdrImage', image);
    }

    console.log('Form Data:', formData);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}esdr`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Response Data:', data);

      if (data.msg) {
        toast(data.msg);
        return true; // Indicate success
      } else {
        toast('Failed to add ESDR');
        console.error('Error adding ESDR:', data);
        return false; // Indicate failure
      }
    } catch (error) {
      toast('Error adding ESDR');
      console.error('Error:', error);
      return false; // Indicate failure
    }
  };

  const handleDateInputClick = () => {
    setCalendarVisible(true);
  };

  const handleDateChange = (value) => {
    formik.setFieldValue('esdrDate', value);
    setCalendarVisible(false); // Hide the calendar after selecting a date
  };

  const handleClickOutside = (event) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target) &&
      dateInputRef.current &&
      !dateInputRef.current.contains(event.target)
    ) {
      setCalendarVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmitAndReturn = async (e) => {
    e.preventDefault();
    const success = await submitEsdr(formik.values);
    if (success) {
      formik.resetForm();
      setContent('');
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      router.push('/esdrlist');
    }
  };

  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4 relative' onSubmit={formik.handleSubmit}>
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
      <div className="relative">
        <label htmlFor="esdrDate">Post Date</label>
        <Input
          ref={dateInputRef}
          id="esdrDate"
          name="esdrDate"
          type="text"
          value={formik.values.esdrDate.toString()}
          onFocus={handleDateInputClick}
          readOnly
        />
        {isCalendarVisible && (
          <div ref={calendarRef} className="absolute z-10 mt-2 bg-white shadow-lg rounded-md">
            <Calendar
              value={formik.values.esdrDate}
              onChange={handleDateChange}
              maxValue={today()} // Set the maximum date to today's date
            />
          </div>
        )}
      </div>
      <input ref={fileInputRef} type="file" onChange={(e) => setImage(e.target.files[0])} />
      <div className='flex'>
        <Button color="success" className='p-2 my-4 mr-4 w-[10%] flex' type="submit">Submit</Button>
        <Button color="primary" className='p-2 my-4 w-[15%] flex' onClick={handleSubmitAndReturn}>Submit & Return</Button>
      </div>
    </form>
  );
};

export default Page;
