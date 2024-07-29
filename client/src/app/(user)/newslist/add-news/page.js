'use client';
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Input, Calendar } from '@nextui-org/react';
import { parseDate, today, getLocalTimeZone, isSameDay } from '@internationalized/date';
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
  const [pdf, setPdf] = useState(null);
  const [content, setContent] = useState("");
  const [logs, setLogs] = useState([]);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.month);
  const [selectedYear, setSelectedYear] = useState(selectedDate.year);

  const calendarRef = useRef(null);
  const dateInputRef = useRef(null);

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
      newsDate: parseDate(new Date().toISOString().split('T')[0]), // Initialize with current date
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
    formData.append('newsDate', values.newsDate.toString());
    if (image) formData.append('newsImage', image);
    if (pdf) formData.append('newsPDF', pdf);

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

  const handleDateInputClick = () => {
    setCalendarVisible(true);
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
    formik.setFieldValue('newsDate', value);
    setCalendarVisible(false); // Hide the calendar after selecting a date
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    setSelectedMonth(newMonth);
    setSelectedDate(selectedDate.set({ month: newMonth }));
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    setSelectedYear(newYear);
    setSelectedDate(selectedDate.set({ year: newYear }));
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
          ) : item.name === 'newsDate' ? (
            <div className="relative">
              <Input
                ref={dateInputRef}
                id="newsDate"
                name="newsDate"
                type="text"
                value={formik.values.newsDate.toString()}
                onFocus={handleDateInputClick}
                readOnly
                className="w-[20%]" // Set width to 20% of the parent div
              />
              {isCalendarVisible && (
                <div ref={calendarRef} className="absolute z-10 mt-2 bg-white shadow-lg rounded-md p-4">
                  <div className="flex justify-between mb-2">
                    <select value={selectedMonth} onChange={handleMonthChange}>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={selectedYear}
                      onChange={handleYearChange}
                      className="border p-1 rounded"
                      style={{ width: '80px' }}
                    />
                  </div>
                  <Calendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    maxValue={today()} // Set the maximum date to today's date
                  />
                </div>
              )}
            </div>
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
      <div className='mb-4'>
      <label className='block mb-2'>Upload Image:</label>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <div className='mb-4'>
      <label className='block mb-2'>Upload PDF:</label>
      <input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} />
      </div>
      <div className='flex'>
        <Button color="success" className='p-2 my-4 mr-4 w-[10%] flex' type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default Page;
