'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import { Input } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { FaBackspace } from 'react-icons/fa';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import JoditEditor
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const AddCommittee = () => {
  const committeeDetails = [
    { name: 'fullName', label: 'Full Name' },
    { name: 'designation', label: 'Designation' },
    { name: 'personDescription', label: 'Person Description' },
    { name: 'serialNumber', label: 'Serial Number' },
  ];

  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [logs, setLogs] = useState([]);

  const appendLog = useCallback(
    (message) => {
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
      formik.setFieldValue('personDescription', newContent);
    },
    [appendLog]
  );

  const formik = useFormik({
    initialValues: {
      fullName: '',
      designation: '',
      personDescription: '',
      serialNumber: '',
    },
    onSubmit: (values) => {
      submitCommittee(values);
    },
  });

  const submitCommittee = async (values) => {
    let formData = new FormData();
    formData.append('fullName', values.fullName);
    formData.append('designation', values.designation);
    formData.append('personDescription', values.personDescription);
    formData.append('serialNumber', values.serialNumber);
    formData.append('committeeImage', image);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}committee`, requestOptions);
    const data = await response.json();
    if (data.msg) {
      toast(data.msg);
    }
  };

  return (
    <form className="m-4 flex flex-col border shadow-md rounded-lg p-4" onSubmit={formik.handleSubmit}>
      <div className="flex">
        <Link href="/committeelist">
          <FaBackspace className="size-6 mr-1" />
        </Link>
        <p className="flex">Back</p>
      </div>
      <h1 className="text-4xl text-green-300">Add Committee</h1>
      {committeeDetails.map((item) => (
        <div key={item.name}>
          <label htmlFor={item.name}>{item.label}</label>
          {item.name === 'personDescription' ? (
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
              type={item.name === 'serialNumber' ? 'number' : 'text'}
              onChange={formik.handleChange}
              value={formik.values[item.name]}
            />
          )}
        </div>
      ))}
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <div className="flex">
        <Button color="success" className="p-2 my-4 mr-4 w-[10%] flex" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddCommittee;
