"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    getPaymentList();
  }, []);

  const getPaymentList = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}payment`);
      setPaymentList(data);
    } catch (error) {
      console.error('Error fetching payment list:', error);
      toast.error('Error fetching payment list');
    }
  };

  const handleApprove = async (paymentId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}payment/approve`, { paymentId });
      toast.success("Payment approved");
      getPaymentList();
    } catch (error) {
      toast.error("Failed to approve payment");
    }
  };

  const handleReject = async (paymentId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}payment/reject`, { paymentId });
      toast.success("Payment rejected");
      getPaymentList();
    } catch (error) {
      toast.error("Failed to reject payment");
    }
  };

  const handleOpenModal = (payment) => {
    setSelectedPayment(payment);
    onOpen();
  };

  const handleRefresh = async () => {
    await getPaymentList();
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
              {paymentList.length > 0 && paymentList.map((item) => (
                <tr key={item._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.fullName || 'N/A'}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.kycVerifiedStatus || 'N/A'}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.paymentVerifiedStatus || 'N/A'}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Button onPress={() => handleOpenModal(item)}>View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedPayment && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Payment Details
                </ModalHeader>
                <ModalBody style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                  <p>Full Name: {selectedPayment.fullName}</p>
                  <p>KYC Status: {selectedPayment.kycVerifiedStatus}</p>
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
                  <Button color="success" onPress={() => handleApprove(selectedPayment._id)}>
                    Approve
                  </Button>
                  <Button color="danger" onPress={() => handleReject(selectedPayment._id)}>
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
