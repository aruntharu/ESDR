'use client';
import CustomNavBar from '@/components/navbar/page';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PersonDetails = ({ params }) => {
  const [personDetails, setPersonDetails] = useState({});

  useEffect(() => {
    if (params.id) {
      fetchPersonDetails();
    }
  }, [params.id]);

  const fetchPersonDetails = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}committee/${params.id}`);
    setPersonDetails(data);
  };

  return (
    <div>
      <CustomNavBar />
      <div>
        <img src={`${process.env.NEXT_PUBLIC_API_URL}uploads/committeeImage/${personDetails?.personPhoto}`} alt="Committee Member" />
        <p className="text-3xl m-2 text-black">{personDetails?.fullName}</p>
        <p className="text-3xl m-2 text-black">{personDetails?.designation}</p>
        <p className="text-3xl m-2 text-black">{personDetails?.personDescription}</p>
      </div>
    </div>
  );
};

export default PersonDetails;
