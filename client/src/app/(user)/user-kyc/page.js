'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Input, Radio, RadioGroup } from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUserKycVerifiedStatus } from '@/redux/reducerSlices/userSlice';
import { useRouter } from 'next/navigation';

const UserKyc = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userDetailsKyc = [
    { name: 'email', label: 'Email' },
    { name: 'fullName', label: 'Full Name' },
    { name: 'phoneNumber', label: 'Phone Number' },
    { name: 'gender', label: 'Gender', radioOption: ['male', 'female', 'other'], type: 'radio' },
    { name: 'dob', label: 'Date Of Birth' },
    { name: 'fathersName', label: 'Fathers Name' },
    { name: 'permanentAddress', label: 'Permanent Address' },
    { name: 'temporaryAddress', label: 'Temporary Address' },
    { name: 'nationality', label: 'Nationality', radioOption: ['Nepali', 'Foreign'], type: 'radio' }
  ];

  const { kycVerifiedStatus, userDetails } = useSelector((state) => state.user);
  const { email, fullName, gender, phoneNumber, _id } = userDetails;

  const [initialValues, setInitialValues] = useState({
    email: email,
    fullName: fullName,
    gender: gender,
    phoneNumber: phoneNumber,
    dob: '',
    fathersName: '',
    permanentAddress: '',
    temporaryAddress: '',
    nationality: 'Nepali',
    verificationNumber: '',
    verificationPhotoFront: '',
    verificationPhotoBack: ''
  });

  useEffect(() => {
    const fetchKycDetails = async () => {
      if (kycVerifiedStatus === 'pending') {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}user-kyc/${_id}`);
          const data = response.data[0]; // Assuming you only get one object in the array
          setInitialValues({
            email: data.email || email,
            fullName: data.fullName || fullName,
            gender: data.gender || gender,
            phoneNumber: data.phoneNumber || phoneNumber,
            dob: data.dob || '',
            fathersName: data.fathersName || '',
            permanentAddress: data.permanentAddress || '',
            temporaryAddress: data.temporaryAddress || '',
            nationality: data.nationality || 'Nepali',
            verificationNumber: data.verificationNumber || '',
            verificationPhotoFront: '',
            verificationPhotoBack: ''
          });
        } catch (error) {
          console.error('Error fetching KYC details:', error);
        }
      }
    };

    fetchKycDetails();
  }, [kycVerifiedStatus, _id, email, fullName, gender, phoneNumber]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const missingFields = [];
      userDetailsKyc.forEach(item => {
        if (!values[item.name] && item.name !== 'gender') {
          missingFields.push(item.label);
        }
      });
      if (!values.gender) {
        missingFields.push('Gender');
      }
      if (!imageFront || !imageBack) {
        missingFields.push('Image Front', 'Image Back');
      }
      if (missingFields.length > 0) {
        toast.error(`Missing fields: ${missingFields.join(', ')}`);
        return;
      }
      submitUserKyc(values);
    },
  });

  const submitUserKyc = async (values) => {
    let formData = new FormData();
    formData.append('email', values.email);
    formData.append('fullName', values.fullName);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('dob', values.dob);
    formData.append('fathersName', values.fathersName);
    formData.append('permanentAddress', values.permanentAddress);
    formData.append('temporaryAddress', values.temporaryAddress);
    formData.append('userId', _id);
    formData.append('verificationNumber', values.verificationNumber);
    formData.append('front', imageFront);
    formData.append('back', imageBack);
    formData.append('nationality', values.nationality);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}user-kyc`;
      const response = kycVerifiedStatus === 'pending' 
        ? await axios.put(apiUrl, formData)
        : await axios.post(apiUrl, formData);
      const data = response.data;
      if (data.msg === 'KYC submitted! Please wait for verification!') {
        dispatch(setUserKycVerifiedStatus('unVerified'));
        router.push('/dashboard');
      } else if (data.msg) {
        toast(data.msg);
      }
    } catch (error) {
      console.error('Error submitting KYC details:', error);
    }
  };

  const [imageFront, setImageFront] = useState(null);
  const [imageBack, setImageBack] = useState(null);

  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
      {userDetailsKyc.map((item) => {
        if (item.type === 'radio') {
          return (
            <RadioGroup
              key={item.name}
              label={item.label}
              name={item.name}
              type={item.type}
              onChange={formik.handleChange}
              value={formik.values[item.name]} // Correctly bind value to formik
            >
              {item.radioOption.map((val) => (
                <Radio key={val} value={val}>{val}</Radio>
              ))}
            </RadioGroup>
          );
        }
        return (
          <div key={item.name}>
            <label htmlFor={item.name}>{item.label}</label>
            <Input
              id={item.name}
              name={item.name}
              type='text'
              onChange={formik.handleChange}
              value={formik.values[item.name]}
            />
          </div>
        );
      })}

      {formik.values.nationality === 'Nepali' ? (
        <>
          <div>
            <label htmlFor='verificationNumber'>Citizenship Number</label>
            <Input
              id='verificationNumber'
              name='verificationNumber'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.verificationNumber}
            />
          </div>
          <div>
            <label htmlFor='verificationPhotoFront'>Citizenship Photo Front</label>
            <input type="file" onChange={(e) => setImageFront(e.target.files[0])} />
          </div>
          <div>
            <label htmlFor='verificationPhotoBack'>Citizenship Photo Back</label>
            <input type="file" onChange={(e) => setImageBack(e.target.files[0])} />
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor='verificationNumber'>Passport Number</label>
            <Input
              id='verificationNumber'
              name='verificationNumber'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.verificationNumber}
            />
          </div>
          <div>
            <label htmlFor='verificationPhotoFront'>Passport Photo Front</label>
            <input type="file" onChange={(e) => setImageFront(e.target.files[0])} />
          </div>
          <div>
            <label htmlFor='verificationPhotoBack'>Passport Photo Back</label>
            <input type="file" onChange={(e) => setImageBack(e.target.files[0])} />
          </div>
        </>
      )}

      <button className='bg-green-500 text-white rounded p-2 my-4 w-[20%]' type="submit">Submit</button>
    </form>
  );
};

export default UserKyc;
