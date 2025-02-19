"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [kycList, setKycList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    getKycList();
  }, []);

  const getKycList = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}user-kyc`);
    setKycList(data);
  };

  const handleApprove = async (userId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}user-kyc/approve`, { userId });
      toast.success("User KYC approved");
      getKycList();
    } catch (error) {
      toast.error("Failed to approve KYC");
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}user-kyc/reject`, { userId });
      toast.success("User KYC rejected");
      getKycList();
    } catch (error) {
      toast.error("Failed to reject KYC");
    }
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleRefresh = async () => {
    await getKycList();
    toast.success("Refreshed successfully");
  };

  return (
    <div className="mx-10">
      <div className="flex mb-4">
        <Button auto onPress={handleRefresh}>
          Refresh
        </Button>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date/Time
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  KYC status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {kycList.length > 0 && kycList.map((item) => (
                <tr key={item.userId}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.fullName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <span
                      className={
                        item.kycVerifiedStatus === "pending"
                          ? "bg-orange-200 text-orange-900 px-3 py-1 font-semibold rounded-full leading-tight"
                          : item.kycVerifiedStatus === "rejected"
                          ? "bg-red-200 text-red-900 px-3 py-1 font-semibold rounded-full leading-tight"
                          : "bg-green-200 text-green-900 px-3 py-1 font-semibold rounded-full leading-tight"
                      }
                    >
                      {item.kycVerifiedStatus}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {item.kycVerifiedStatus === "pending" ? (
                      <Button onPress={() => handleOpenModal(item)}>View Details</Button>
                    ) : item.kycVerifiedStatus === "rejected" ? (
                      "No action"
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedUser && (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            {selectedUser.userId}'s KYC Details
          </ModalHeader>
          <ModalBody style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <p>Full Name: {selectedUser.fullName}</p>
            <p>Date of Birth: {selectedUser.dob}</p>
            {selectedUser.nationality === 'Nepali' ? (
              <>
                <p>Citizenship Number: {selectedUser.citizenshipNumber}</p>
                <p>Province: {selectedUser.provinceNepal}</p>
                <p>District: {selectedUser.districtNepal}</p>
                <p>Municipality/VDC: {selectedUser.municipalityNepal}</p>
                <p>Ward: {selectedUser.wardNepal}</p>
                <p>Company/Work: {selectedUser.companyWorkNepal}</p>
                <p>College/University: {selectedUser.collegeUniversityNepal}</p>
                <p>Courses: {selectedUser.coursesNepal}</p>
              </>
            ) : (
              <>
                <p>Passport Number: {selectedUser.passportNumber}</p>
                <p>Street Address: {selectedUser.streetAddress}</p>
                <p>City: {selectedUser.city}</p>
                <p>State/Province: {selectedUser.stateProvince}</p>
                <p>Postal/Zip Code: {selectedUser.postalZipCode}</p>
                <p>County: {selectedUser.county}</p>
                <p>Company/Work: {selectedUser.companyWork}</p>
                <p>Courses: {selectedUser.courses}</p>
              </>
            )}
            <p>Permanent Address: {selectedUser.permanentAddress}</p>
            <p>Temporary Address: {selectedUser.temporaryAddress}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Phone Number: {selectedUser.phoneNumber}</p>
            <p>Abstract: {selectedUser.abstract}</p>
            <p>Verification Front Image</p>
            <img
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_API_URL}${selectedUser.verificationPhotoFront}`,
                  '_blank'
                ).focus();
              }}
              src={`${process.env.NEXT_PUBLIC_API_URL}${selectedUser.verificationPhotoFront}`}
            />
            <p>Verification Back Image</p>
            <img
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_API_URL}${selectedUser.verificationPhotoBack}`,
                  '_blank'
                ).focus();
              }}
              src={`${process.env.NEXT_PUBLIC_API_URL}${selectedUser.verificationPhotoBack}`}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="success" onPress={() => handleApprove(selectedUser.userId)}>
              Approve
            </Button>
            <Button color="danger" onPress={() => handleReject(selectedUser.userId)}>
              Reject
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
)}

    </div>
  );
};

export default Page;
