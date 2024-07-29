'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from '@nextui-org/react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { setLoginDetails } from '@/redux/reducerSlices/userSlice';
import { useDispatch } from 'react-redux';
import CustomNavBar from '@/components/navbar/page';
import * as Yup from 'yup';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import eye icons
import 'react-phone-number-input/style.css'; // Import default styles
import PhoneInput from 'react-phone-number-input';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[@$!%*?&]/, 'Must contain at least one special character')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default function App() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selected, setSelected] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      registerUser(values);
    },
  });

  const formikLogin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  const registerUser = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}register`, requestOptions);
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.msg);
        setSelected('login');
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const loginUser = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, requestOptions);
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.msg);
        dispatch(setLoginDetails(data));
        if (data.user.role === 'user') {
          router.push('/dashboard');
        } else {
          router.push('/admin-dashboard');
        }
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <CustomNavBar />
      <div className="relative w-full h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
          autoPlay
          loop
          muted
        >
          <source src="/upload/drone2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex flex-col w-full h-full justify-center items-center">
          <Card className="flex self-center max-w-full w-[340px]">
            <CardBody className="overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <Image src="/upload/ksl.png" width={150} height={120} className="mx-4" />
                <Image src="/logo.png" width={70} height={80} className="mx-4" />
              </div>
              <p className="text-center text-sm text-[#175459] mb-4">
                ESDR is longest flagship program of Kathmandu School of Law
              </p>
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="login" title="Login">
                  <form onSubmit={formikLogin.handleSubmit} className="flex flex-col gap-4">
                    <Input
                      name="email"
                      type="text"
                      onChange={formikLogin.handleChange}
                      value={formikLogin.values.email}
                      isRequired
                      label="Email"
                      placeholder="Enter your email"
                      className={`focus:outline-none ${formikLogin.errors.email && formikLogin.touched.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formikLogin.errors.email && formikLogin.touched.email && (
                      <div className="text-red-500 text-sm">{formikLogin.errors.email}</div>
                    )}

                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={formikLogin.handleChange}
                        value={formikLogin.values.password}
                        isRequired
                        label="Password"
                        placeholder="Enter your password"
                        className={`focus:outline-none ${formikLogin.errors.password && formikLogin.touched.password ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                      >
                        {showPassword ? <HiEyeOff className="text-gray-500" /> : <HiEye className="text-gray-500" />}
                      </button>
                    </div>
                    {formikLogin.errors.password && formikLogin.touched.password && (
                      <div className="text-red-500 text-sm">{formikLogin.errors.password}</div>
                    )}

                    <p className="text-center text-small">
                      Need to create an account?{' '}
                      <Link size="sm" onPress={() => setSelected('sign-up')}>
                        Sign up
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button type="submit" fullWidth color="primary">
                        Login
                      </Button>
                    </div>
                  </form>
                </Tab>

                <Tab key="sign-up" title="Sign up">
                  <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                    <Input
                      name="fullName"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.fullName}
                      isRequired
                      label="Full Name"
                      placeholder="Enter your full name"
                      className={`focus:outline-none ${formik.errors.fullName && formik.touched.fullName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formik.errors.fullName && formik.touched.fullName && (
                      <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
                    )}

                    <Input
                      name="email"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      isRequired
                      label="Email"
                      placeholder="Enter your email"
                      className={`focus:outline-none ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    )}

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number *
                        <PhoneInput
                          international
                          defaultCountry="US"
                          name="phoneNumber"
                          value={formik.values.phoneNumber}
                          onChange={(value) => formik.setFieldValue('phoneNumber', value)}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.errors.phoneNumber && formik.touched.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter phone number"
                        />
                      </label>
                    </div>
                    {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                      <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
                    )}

                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isRequired
                        label="Password"
                        placeholder="Enter your password"
                        className={`focus:outline-none ${formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                      >
                        {showPassword ? <HiEyeOff className="text-gray-500" /> : <HiEye className="text-gray-500" />}
                      </button>
                    </div>
                    {formik.errors.password && formik.touched.password && (
                      <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    )}

                    <div className="relative">
                      <Input
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        isRequired
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        className={`focus:outline-none ${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                      >
                        {showConfirmPassword ? <HiEyeOff className="text-gray-500" /> : <HiEye className="text-gray-500" />}
                      </button>
                    </div>
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                      <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                    )}

                    <p className="text-center text-small">
                      Already have an account?{' '}
                      <Link size="sm" onPress={() => setSelected('login')}>
                        Login
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button type="submit" fullWidth color="primary">
                        Sign up
                      </Button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
