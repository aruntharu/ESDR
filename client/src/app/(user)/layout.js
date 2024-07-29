"use client";
import SideBar from "@/components/sidebar/page";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@nextui-org/react";
import React from "react";
import { Avatar } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/reducerSlices/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
const layout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(logoutUser());
    router.push("/connectwithus");
  };
  const { kycVerifiedStatus ,userDetails} = useSelector((state) => state.user);
  const generateKycDiv = ()=>{
    if(kycVerifiedStatus=== 'unVerified'){
       return <p className='p-2 bg-orange-100 rounded-lg text-md'> ⚠️Join 16th ESDR. <Link href="/user-kyc">Please Register Now</Link> </p>
    }else if(kycVerifiedStatus === 'pending'){
      return <p className='p-2 bg-orange-100 rounded-lg text-md'>Submitted, Wait for form verification<Link href="/user-kyc">For Correction: Edit Now</Link> </p>
    }else if(kycVerifiedStatus === 'rejected'){
      return <p className='p-2 bg-orange-100 rounded-lg text-md'> Your Registration Form was rejected. <Link href="/user-kyc">Re-submit Now</Link> </p>
    }
  }
  return (
    <div className="max-h-screen">
      <div className='flex grid  pl-52 absolute'>
      {generateKycDiv()}
      </div> 
      <div className="flex m-4">
        <div className="flex flex-col items-center">
          <Image src="/logo.png" width={140} height={140} className="" />

          <SideBar />
        </div>
        <div className="w-4/5">
          <div className="flex justify-end ">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="/logo.png"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold"></p>

                  <p className="font-semibold">{userDetails.fullName}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => logout()}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          {children}
        </div>
      </div>

    </div>
  );
};

export default layout;