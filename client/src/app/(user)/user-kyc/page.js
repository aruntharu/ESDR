'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Input, Radio, RadioGroup } from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUserKycVerifiedStatus } from '@/redux/reducerSlices/userSlice';
import { useRouter } from 'next/navigation';

const provinceDistricts = {
  Koshi: [
    'Bhojpur', 'Khotang', 'Sankhuwasabha', 'Terhathum', 'Dhankuta', 'Morang',
    'Solukhumbu', 'Udayapur', 'Illam', 'Okhaldhunga', 'Sunsari', 'Jhapa',
    'Panchthar', 'Taplejung'
  ],
  Madhesh: [
    'Parsa', 'Bara', 'Rautahat', 'Sarlahi', 'Siraha', 'Dhanusa', 'Saptari',
    'Mahottari'
  ],
  Bagmati: [
    'Bhaktapur', 'Chitwan', 'Dhading', 'Dolakha', 'Kathmandu', 'Kavrepalanchok',
    'Lalitpur', 'Makwanpur', 'Nuwakot', 'Ramechhap', 'Rasuwa', 'Sindhuli',
    'Sindhupalchok'
  ],
  Gandaki: [
    'Baglung', 'Gorkha', 'Kaski', 'Lamjung', 'Manang', 'Mustang', 'Myagdi',
    'Nawalpur', 'Parbat', 'Syangja', 'Tanahun'
  ],
  Lumbini: [
    'Arghakhanchi', 'Banke', 'Bardiya', 'Dang Deukhuri', 'Eastern Rukum',
    'Gulmi', 'Kapilvastu', 'Parasi', 'Palpa', 'Pyuthan', 'Rolpa', 'Rupandehi'
  ],
  Karnali: [
    'Dailekh', 'Dolpa', 'Humla', 'Jajarkot', 'Jumla', 'Kalikot', 'Mugu',
    'Salyan', 'Surkhet', 'Western Rukum'
  ],
  Sudurpaschim: [
    'Achham', 'Baitadi', 'Bajhang', 'Dadeldhura', 'Darchula', 'Doti', 'Kailali',
    'Kanchanpur', 'Bajura'
  ]
};

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
    citizenshipNumber: '',
    province: '',
    district: '',
    passportNumber: '',
    verificationPhotoFront: '',
    verificationPhotoBack: ''
  });

  const [districtOptions, setDistrictOptions] = useState([]);

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
            citizenshipNumber: data.citizenshipNumber || '',
            province: data.province || '',
            district: data.district || '',
            passportNumber: data.passportNumber || '',
            verificationPhotoFront: '',
            verificationPhotoBack: ''
          });
          if (data.province) {
            setDistrictOptions(provinceDistricts[data.province]);
          }
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
    formData.append('citizenshipNumber', values.citizenshipNumber);
    formData.append('province', values.province);
    formData.append('district', values.district);
    formData.append('passportNumber', values.passportNumber);
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

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    formik.setFieldValue('province', province);
    setDistrictOptions(provinceDistricts[province]);
    formik.setFieldValue('district', ''); // Reset district selection
  };

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
            <label htmlFor='citizenshipNumber'>Citizenship Number:</label>
            <Input
              id='citizenshipNumber'
              name='citizenshipNumber'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.citizenshipNumber}
            />
          </div>
          <div>
            <label htmlFor='province'>Province:</label>
            <select
              id='province'
              name='province'
              className='form-control state'
              onChange={handleProvinceChange}
              value={formik.values.province}
            >
              <option value="">Select Province</option>
              {Object.keys(provinceDistricts).map((province) => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='district'>District:</label>
            <select
              id='district'
              name='district'
              className='form-control district'
              onChange={formik.handleChange}
              value={formik.values.district}
            >
              <option value="">Select District</option>
              {districtOptions.map((district, index) => (
                <option key={index} value={district}>{district}</option>
              ))}
            </select>
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
            <label htmlFor='passportNumber'>Passport Number</label>
            <Input
              id='passportNumber'
              name='passportNumber'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.passportNumber}
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
