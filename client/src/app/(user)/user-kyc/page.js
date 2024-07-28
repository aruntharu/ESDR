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
    nationality: 'Nepali',
    citizenshipNumber: '',
    provinceNepal: '',
    districtNepal: '',
    municipalityNepal: '',
    wardNepal: '',
    companyWorkNepal: '',
    coursesNepal: '',
    streetAddress: '',
    city: '',
    stateProvince: '',
    postalZipCode: '',
    county: '',
    companyWork: '',
    courses: '',
    abstract: '',
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
            nationality: data.nationality || 'Nepali',
            citizenshipNumber: data.citizenshipNumber || '',
            provinceNepal: data.provinceNepal || '',
            districtNepal: data.districtNepal || '',
            municipalityNepal: data.municipalityNepal || '',
            wardNepal: data.wardNepal || '',
            companyWorkNepal: data.companyWorkNepal || '',
            coursesNepal: data.coursesNepal || '',
            streetAddress: data.streetAddress || '',
            city: data.city || '',
            stateProvince: data.stateProvince || '',
            postalZipCode: data.postalZipCode || '',
            county: data.county || '',
            companyWork: data.companyWork || '',
            courses: data.courses || '',
            abstract: data.abstract || '',
            verificationPhotoFront: '',
            verificationPhotoBack: ''
          });
          if (data.provinceNepal) {
            setDistrictOptions(provinceDistricts[data.provinceNepal]);
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
    formData.append('userId', _id);
    formData.append('citizenshipNumber', values.citizenshipNumber);
    formData.append('provinceNepal', values.provinceNepal);
    formData.append('districtNepal', values.districtNepal);
    formData.append('municipalityNepal', values.municipalityNepal);
    formData.append('wardNepal', values.wardNepal);
    formData.append('companyWorkNepal', values.companyWorkNepal);
    formData.append('coursesNepal', values.coursesNepal);
    formData.append('streetAddress', values.streetAddress);
    formData.append('city', values.city);
    formData.append('stateProvince', values.stateProvince);
    formData.append('postalZipCode', values.postalZipCode);
    formData.append('county', values.county);
    formData.append('companyWork', values.companyWork);
    formData.append('courses', values.courses);
    formData.append('abstract', values.abstract);
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
    const provinceNepal = event.target.value;
    formik.setFieldValue('provinceNepal', provinceNepal);
    setDistrictOptions(provinceDistricts[provinceNepal]);
    formik.setFieldValue('districtNepal', ''); // Reset district selection
  };

  const handleAbstractChange = (event) => {
    const value = event.target.value;
    const wordCount = value.trim().split(/\s+/).length;

    if (wordCount <= 450) {
      formik.setFieldValue('abstract', value);
    } else {
      toast.error('Abstract cannot exceed 450 words');
    }
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
            <label htmlFor='provinceNepal'>Province:</label>
            <select
              id='provinceNepal'
              name='provinceNepal'
              className='form-control state'
              onChange={handleProvinceChange}
              value={formik.values.provinceNepal}
            >
              <option value="">Select Province</option>
              {Object.keys(provinceDistricts).map((provinceNepal) => (
                <option key={provinceNepal} value={provinceNepal}>{provinceNepal}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='districtNepal'>District:</label>
            <select
              id='districtNepal'
              name='districtNepal'
              className='form-control districtNepal'
              onChange={formik.handleChange}
              value={formik.values.districtNepal}
            >
              <option value="">Select District</option>
              {districtOptions.map((districtNepal, index) => (
                <option key={index} value={districtNepal}>{districtNepal}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='municipalityNepal'>Municipality/VDC:</label>
            <Input
              id='municipalityNepal'
              name='municipalityNepal'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.municipalityNepal}
            />
          </div>
          <div>
            <label htmlFor='wardNepal'>Ward:</label>
            <Input
              id='wardNepal'
              name='wardNepal'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.wardNepal}
            />
          </div>
          <div>
            <label htmlFor='companyWorkNepal'>Company/Work:</label>
            <Input
              id='companyWorkNepal'
              name='companyWorkNepal'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.companyWorkNepal}
            />
          </div>
          <div>
            <label htmlFor='coursesNepal'>Courses:</label>
            <Input
              id='coursesNepal'
              name='coursesNepal'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.coursesNepal}
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
            <label htmlFor='streetAddress'>Street Address</label>
            <Input
              id='streetAddress'
              name='streetAddress'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.streetAddress}
            />
          </div>
          <div>
            <label htmlFor='city'>City</label>
            <Input
              id='city'
              name='city'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.city}
            />
          </div>
          <div>
            <label htmlFor='stateProvince'>State/Province</label>
            <Input
              id='stateProvince'
              name='stateProvince'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.stateProvince}
            />
          </div>
          <div>
            <label htmlFor='postalZipCode'>Postal/Zip Code</label>
            <Input
              id='postalZipCode'
              name='postalZipCode'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.postalZipCode}
            />
          </div>
          <div>
            <label htmlFor='county'>County</label>
            <Input
              id='county'
              name='county'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.county}
            />
          </div>
          <div>
            <label htmlFor='companyWork'>Company/Work:</label>
            <Input
              id='companyWork'
              name='companyWork'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.companyWork}
            />
          </div>
          <div>
            <label htmlFor='courses'>Courses:</label>
            <Input
              id='courses'
              name='courses'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.courses}
            />
          </div>
          <div>
            <label htmlFor='verificationPhotoFront'>Verification Photo Front</label>
            <input type="file" onChange={(e) => setImageFront(e.target.files[0])} />
          </div>
          <div>
            <label htmlFor='verificationPhotoBack'>Verification Photo Back</label>
            <input type="file" onChange={(e) => setImageBack(e.target.files[0])} />
          </div>
        </>
      )}
      <div>
        <label htmlFor='abstract'>Abstract (max 450 words):</label>
        <Input
          id='abstract'
          name='abstract'
          type='text'
          rows='4'
          onChange={handleAbstractChange}
          value={formik.values.abstract}
        />
      </div>
      <button className='bg-green-500 text-white rounded p-2 my-4 w-[20%]' type="submit">Submit</button>
    </form>
  );
};

export default UserKyc;
