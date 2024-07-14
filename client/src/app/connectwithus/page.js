'use client'
import React from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import { useFormik } from 'formik';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { setLoginDetails } from "@/redux/reducerSlices/userSlice";
import { useDispatch } from "react-redux";
import CustomNavBar from "@/components/navbar/page";


export default function App() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [selected, setSelected] = React.useState("login");
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
    onSubmit: values => {
      registerUser(values);
    },
  });

  const formikLogin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      loginUser(values);
    },
  });


 
  const registerUser = async(values)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}register`, requestOptions);
  const data = await response.json()

  if(response.status == '200'){
    toast.success(data.msg)
    setSelected('login')
  }else{
    toast.error(data.msg)
  }
}


  const loginUser = async(values)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, requestOptions);
  const data = await response.json()

  if(response.status == '200'){
    toast.success(data.msg)
    dispatch(setLoginDetails(data))
    if(data.user.role == 'user'){
      router.push('/dashboard')
    }else{
      router.push('/admin-dashboard')
    }

  }else{
    toast.error(data.msg)
  }
}

  return (
    <div>
      <CustomNavBar/>
    <div className="flex flex-col w-full">
      <Card className="flex self-center max-w-full w-[340px] ">
        <CardBody className="overflow-hidden">
        <Image src="/logo.png" width={150} height={160} className='my-4 mx-4'/>
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
                isRequired label="Email" placeholder="Enter your email" />
                <Input
                name="password"
                type="password"
                onChange={formikLogin.handleChange}
                value={formikLogin.values.password} 
                isRequired label="Password" placeholder="Enter your password"
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
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
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 ">
                <Input
                 name="fullName"
                 type="text"
                 onChange={formik.handleChange}
                 value={formik.values.fullName} 
                isRequired label="Full Name" placeholder="Enter your full name" />
                <Input 
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email} 
                isRequired label="Email" placeholder="Enter your email" />
                <Input 
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber} 
                isRequired label="Phone Number" placeholder="Enter your Phone Number" />
                <Input
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password} 
                isRequired label="Password" placeholder="Enter your password"
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
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
  );
}
