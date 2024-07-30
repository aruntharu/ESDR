'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Input, Radio, RadioGroup } from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUserKycVerifiedStatus } from '@/redux/reducerSlices/userSlice';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

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
    { name: 'fullName', label: 'Applicant Full Name:' },
    { name: 'email', label: 'Applicant Email:' },
    { name: 'phoneNumber', label: 'Phone Number:' },
    { name: 'gender', label: 'Gender:', radioOption: ['male', 'female', 'other'], type: 'radio' },
    { name: 'dob', label: 'Birth Date:' },
    { name: 'fatherName', label: 'Father Name:' },
    { name: 'nationality', label: 'Nationality:', radioOption: ['Nepali', 'International'], type: 'radio' }
  ];

  const { kycVerifiedStatus, userDetails } = useSelector((state) => state.user);
  const { email, fullName, gender, phoneNumber, _id } = userDetails;

  const [initialValues, setInitialValues] = useState({
    email: email,
    fullName: fullName,
    gender: gender,
    phoneNumber: phoneNumber,
    dob: '',
    fatherName: '',
    nationality: 'Nepali',
    citizenshipNumber: '',
    provinceNepal: '',
    districtNepal: '',
    municipalityNepal: '',
    wardNepal: '',
    collegeUniversityNepal: '',
    companyWorkNepal: '',
    coursesNepal: '',
    passportNumber: '',
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
            fatherName: data.fatherName || '',
            nationality: data.nationality || 'Nepali',
            citizenshipNumber: data.citizenshipNumber || '',
            provinceNepal: data.provinceNepal || '',
            districtNepal: data.districtNepal || '',
            municipalityNepal: data.municipalityNepal || '',
            wardNepal: data.wardNepal || '',
            collegeUniversityNepal: data.collegeUniversityNepal || '',
            companyWorkNepal: data.companyWorkNepal || '',
            coursesNepal: data.coursesNepal || '',
            passportNumber: data.passportNumber || '',
            streetAddress: data.streetAddress || '',
            city: data.city || '',
            stateProvince: data.stateProvince || '',
            postalZipCode: data.postalZipCode || '',
            county: data.county || '',
            collegeUniversity: data.collegeUniversity || '',
            companyWork: data.companyWork || '',
            courses: data.courses || '',
            abstract: data.abstract || '',
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
    formData.append('fatherName', values.fatherName);
    formData.append('userId', _id);
    formData.append('citizenshipNumber', values.citizenshipNumber);
    formData.append('provinceNepal', values.provinceNepal);
    formData.append('districtNepal', values.districtNepal);
    formData.append('municipalityNepal', values.municipalityNepal);
    formData.append('wardNepal', values.wardNepal);
    formData.append('collegeUniversityNepal', values.collegeUniversityNepal);
    formData.append('companyWorkNepal', values.companyWorkNepal);
    formData.append('coursesNepal', values.coursesNepal);
    formData.append('passportNumber', values.passportNumber);
    formData.append('streetAddress', values.streetAddress);
    formData.append('city', values.city);
    formData.append('stateProvince', values.stateProvince);
    formData.append('postalZipCode', values.postalZipCode);
    formData.append('county', values.county);
    formData.append('collegeUniversity', values.collegeUniversity);
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
  const [startDate, setStartDate] = useState(null);

  const handleProvinceChange = (event) => {
    const provinceNepal = event.target.value;
    formik.setFieldValue('provinceNepal', provinceNepal);
    formik.setFieldValue('districtNepal', ''); // Reset district selection
  };

  const handleAbstractChange = (event) => {
    const value = event.target.value;
    const wordCount = value.trim().split(/\s+/).length;

    if (wordCount <= 450) {
      formik.setFieldValue('abstract', value);
      formik.setFieldTouched('abstract', true);
    } else {
      toast.error('Abstract cannot exceed 450 words');
    }
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    formik.setFieldValue('dob', date ? format(date, 'dd/MM/yyyy') : '');
  };

  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4 bg-white relative' onSubmit={formik.handleSubmit}>
      <div className="relative z-10">
        <h1 id="header_1" className="text-3xl font-bold my-4">Registration Form</h1>
        <div className="text-lg font-medium mb-8">Fill out the form carefully for registration</div>
        {userDetailsKyc.map((item) => {
          if (item.type === 'radio') {
            return (
              <div className="grid grid-cols-1 gap-2 mb-4" key={item.name}>
                <label htmlFor={item.name}>{item.label}</label>
                <RadioGroup
                  label={item.label}
                  name={item.name}
                  type={item.type}
                  onChange={formik.handleChange}
                  value={formik.values[item.name]}
                  className="w-2/5"
                >
                  {item.radioOption.map((val) => (
                    <Radio key={val} value={val}>{val}</Radio>
                  ))}
                </RadioGroup>
              </div>
            );
          }
          return (
            <div className="grid grid-cols-1 gap-2 mb-4" key={item.name}>
              <label htmlFor={item.name}>{item.label}</label>
              {item.name === 'dob' ? (
                <DatePicker
                  id={item.name}
                  name={item.name}
                  selected={startDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  customInput={
                    <Input
                      name={item.name}
                      value={formik.values[item.name]}
                      onChange={formik.handleChange}
                      className="w-4/5 border-black bg-white"
                    />
                  }
                />
              ) : (
                <Input
                  id={item.name}
                  name={item.name}
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values[item.name]}
                  className={item.name === 'fullName' || item.name === 'fatherName' ? "w-3/5 border-black bg-white" : item.name === 'dob' ? "w-1/5 border-black bg-white" : "w-2/5 border-black bg-white"}
                />
              )}
            </div>
          );
        })}

        {formik.values.nationality === 'Nepali' ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor='citizenshipNumber'>Citizenship Number:</label>
                <Input
                  id='citizenshipNumber'
                  name='citizenshipNumber'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.citizenshipNumber}
                  className="w-full border-black bg-white"
                />
              </div>
              <div></div>
              <div>
                <label htmlFor='provinceNepal'>Province:</label>
                <select
                  id='provinceNepal'
                  name='provinceNepal'
                  className='form-control state w-full'
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
                  className='form-control districtNepal w-full'
                  onChange={formik.handleChange}
                  value={formik.values.districtNepal}
                >
                  <option value="">Select District</option>
                  {provinceDistricts[formik.values.provinceNepal]?.map((districtNepal, index) => (
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
                  className="w-full border-black bg-white"
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
                  className="w-full border-black bg-white"
                />
              </div>
              <div>
                <label htmlFor='collegeUniversityNepal'>College/University:</label>
                <Input
                  id='collegeUniversityNepal'
                  name='collegeUniversityNepal'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.collegeUniversityNepal}
                  className="w-full border-black bg-white"
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
                  className="w-full border-black bg-white"
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
                  className="w-full border-black bg-white"
                />
              </div>
              <div></div>
              <div>
                <label htmlFor='verificationPhotoFront'>Citizenship Photo Front</label>
                <input type="file" className="w-full border-black bg-white" onChange={(e) => setImageFront(e.target.files[0])} />
              </div>
              <div>
                <label htmlFor='verificationPhotoBack'>Citizenship Photo Back</label>
                <input type="file" className="w-full border-black bg-white" onChange={(e) => setImageBack(e.target.files[0])} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor='passportNumber'>Passport Number</label>
                <Input
                  id='passportNumber'
                  name='passportNumber'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.passportNumber}
                  className="w-full border-black bg-white"
                />
              </div>
              <div></div>
              <div>
                <label htmlFor='streetAddress'>Street Address</label>
                <Input
                  id='streetAddress'
                  name='streetAddress'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.streetAddress}
                  className="w-full border-black bg-white"
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
                  className="w-full border-black bg-white"
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
                  className="w-full border-black bg-white"
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
                  className="w-full border-black bg-white"
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
                  className="w-full border-black bg-white"
                />
              </div>
              <div>
                <label htmlFor='collegeUniversity'>College/University:</label>
                <Input
                  id='collegeUniversity'
                  name='collegeUniversity'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.collegeUniversity}
                  className="w-full border-black bg-white"
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
                  className="w-full border-black bg-white"
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
                  className="w-full border-black bg-white"
                />
              </div>
              <div>
                <label htmlFor='verificationPhotoFront'>Verification Photo Front</label>
                <input type="file" className="w-full border-black bg-white" onChange={(e) => setImageFront(e.target.files[0])} />
              </div>
              <div>
                <label htmlFor='verificationPhotoBack'>Verification Photo Back</label>
                <input type="file" className="w-full border-black bg-white" onChange={(e) => setImageBack(e.target.files[0])} />
              </div>
            </div>
          </>
        )}
        <div className="grid grid-cols-1 gap-2 mb-4">
          <label htmlFor='abstract'>Abstract (max 450 words):</label>
          <textarea
            id='abstract'
            name='abstract'
            rows='4'
            onChange={handleAbstractChange}
            value={formik.values.abstract}
            className="form-textarea mt-1 block w-2/5 border-black bg-white"
            style={{ resize: 'none' }}
          />
          {formik.touched.abstract && (
            <p className="text-right text-gray-500">{formik.values.abstract.trim().split(/\s+/).length} / 450 words</p>
          )}
        </div>
        <button className='bg-green-500 text-white rounded p-2 my-4 w-[20%]' type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UserKyc;
