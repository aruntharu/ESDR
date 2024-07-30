"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [verificationData, setVerificationData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { isOpen: isKycModalOpen, onOpen: onKycModalOpen, onOpenChange: onKycModalOpenChange } = useDisclosure();
  const { isOpen: isPaymentModalOpen, onOpen: onPaymentModalOpen, onOpenChange: onPaymentModalOpenChange } = useDisclosure();

  useEffect(() => {
    fetchVerificationData();
  }, []);

  const fetchVerificationData = async () => {
    try {
      const kycResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}user-kyc`);
      const kycData = kycResponse.data;

      const paymentResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}payment`);
      const paymentData = paymentResponse.data;

      const combinedData = kycData.map(kyc => {
        const payment = paymentData.find(payment => payment.userId === kyc.userId) || {};
        return { ...kyc, payment };
      });

      setVerificationData(combinedData);
    } catch (error) {
      console.error('Error fetching verification data:', error);
      toast.error('Error fetching verification data');
    }
  };

  const handleApproveKyc = async (userId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}user-kyc/approve`, { userId });
      toast.success("User KYC approved");
      fetchVerificationData();
    } catch (error) {
      toast.error("Failed to approve KYC");
    }
  };

  const handleRejectKyc = async (userId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}user-kyc/reject`, { userId });
      toast.success("User KYC rejected");
      fetchVerificationData();
    } catch (error) {
      toast.error("Failed to reject KYC");
    }
  };

  const handleApprovePayment = async (paymentId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}payment/approve`, { paymentId });
      toast.success("Payment approved");
      fetchVerificationData();
    } catch (error) {
      toast.error("Failed to approve payment");
    }
  };

  const handleRejectPayment = async (paymentId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}payment/reject`, { paymentId });
      toast.success("Payment rejected");
      fetchVerificationData();
    } catch (error) {
      toast.error("Failed to reject payment");
    }
  };

  const handleOpenKycModal = (user) => {
    setSelectedUser(user);
    onKycModalOpen();
  };

  const handleOpenPaymentModal = (payment) => {
    setSelectedPayment(payment);
    onPaymentModalOpen();
  };

  const handleRefresh = async () => {
    await fetchVerificationData();
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
                  KYC Created Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  KYC Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment Created Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {verificationData.length > 0 && verificationData.map((item) => (
                <tr key={item.userId}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{item.fullName}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{new Date(item.createdAt).toLocaleString()}</p>
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
                    <p className="text-gray-900 whitespace-no-wrap">{item.payment.createdAt ? new Date(item.payment.createdAt).toLocaleString() : "N/A"}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <span
                      className={
                        item.payment.paymentVerifiedStatus === "pending"
                          ? "bg-orange-200 text-orange-900 px-3 py-1 font-semibold rounded-full leading-tight"
                          : item.payment.paymentVerifiedStatus === "rejected"
                          ? "bg-red-200 text-red-900 px-3 py-1 font-semibold rounded-full leading-tight"
                          : "bg-green-200 text-green-900 px-3 py-1 font-semibold rounded-full leading-tight"
                      }
                    >
                      {item.payment.paymentVerifiedStatus || "N/A"}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex space-x-2">
                      {item.kycVerifiedStatus === "pending" && (
                        <Button onPress={() => handleOpenKycModal(item)}>View KYC</Button>
                      )}
                      {item.payment.paymentVerifiedStatus === "pending" && (
                        <Button onPress={() => handleOpenPaymentModal(item.payment)}>View Payment</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KYC Modal */}
      {selectedUser && (
        <Modal isOpen={isKycModalOpen} onOpenChange={onKycModalOpenChange}>
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
                  <Button color="success" onPress={() => handleApproveKyc(selectedUser.userId)}>
                    Approve
                  </Button>
                  <Button color="danger" onPress={() => handleRejectKyc(selectedUser.userId)}>
                    Reject
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {/* Payment Modal */}
      {selectedPayment && (
        <Modal isOpen={isPaymentModalOpen} onOpenChange={onPaymentModalOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Payment Details
                </ModalHeader>
                <ModalBody style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                  <p>Created At: {new Date(selectedPayment.createdAt).toLocaleString()}</p>
                  {selectedPayment.paymentImages.map((image, index) => (
                    <div key={index}>
                      <p>Payment Image {index + 1}</p>
                      <img
                        onClick={() => {
                          window.open(
                            `${process.env.NEXT_PUBLIC_API_URL}uploads/paymentImage/${image}`,
                            '_blank'
                          ).focus();
                        }}
                        src={`${process.env.NEXT_PUBLIC_API_URL}uploads/paymentImage/${image}`}
                      />
                    </div>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="success" onPress={() => handleApprovePayment(selectedPayment._id)}>
                    Approve
                  </Button>
                  <Button color="danger" onPress={() => handleRejectPayment(selectedPayment._id)}>
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
