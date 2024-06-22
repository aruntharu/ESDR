"use client";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserKycVerifiedStatus } from "@/redux/reducerSlices/userSlice";

const page = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    checkKycStatus()
  }, []);
  
  const checkKycStatus = async ()=> {
   const {data} =await axios.get(`http://localhost:8000/kyc-status/${userDetails._id}`)
    dispatch(setUserKycVerifiedStatus(data.kycVerifiedStatus))
  }
  const { userDetails } = useSelector((state) => state.user);
  return (
    <div className="grid grid-cols-4 ">
      <div className="col-span-3">
        <div className="flex text-2xl m-6 p-2">
          <div className="font-mono font-extrabold grid grid-cols-2 text-green-400">
            {" "}
            <p className="px-1 text-black">Hello, </p> {userDetails.fullName}
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default page;