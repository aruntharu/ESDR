'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiTrash } from 'react-icons/bi';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import eye icons
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import toast from "react-hot-toast";

const AdminSubscribeList = () => {
  const [subscribeList, setSubscribeList] = useState([]);
  const [selectedSubscribe, setSelectedSubscribe] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [subscribeToDelete, setSubscribeToDelete] = useState(null);

  useEffect(() => {
    fetchSubscribeList();
  }, []);

  const fetchSubscribeList = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}subscribe`);
    setSubscribeList(data);
  };

  const confirmDeleteItem = (subscribe) => {
    setSubscribeToDelete(subscribe);
    setDeleteConfirmationOpen(true);
  };

  const deleteItem = async () => {
    if (subscribeToDelete) {
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}subscribe/${subscribeToDelete._id}`);
      if (data) {
        fetchSubscribeList();
        setDeleteConfirmationOpen(false);
        setSubscribeToDelete(null);
        toast.success("Subscription deleted successfully");
      } else {
        toast.error("Failed to delete subscription");
      }
    }
  };

  const handleOpenModal = (subscribe) => {
    setSelectedSubscribe(subscribe);
    onOpen();
  };

  const handleRefresh = async () => {
    await fetchSubscribeList();
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
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribeList.length > 0 && subscribeList.map((item) => (
                <tr key={item._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{item.fullName}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{item.email}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center space-x-2">
                      <div onClick={() => handleOpenModal(item)} className="cursor-pointer">
                        {selectedSubscribe?._id === item._id && isOpen ? <HiEyeOff /> : <HiEye />}
                      </div>
                      <BiTrash onClick={() => confirmDeleteItem(item)} className="cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedSubscribe && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {selectedSubscribe.fullName}'s Subscription Details
                </ModalHeader>
                <ModalBody style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                  <p>Full Name: {selectedSubscribe.fullName}</p>
                  <p>Email: {selectedSubscribe.email}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      {subscribeToDelete && (
        <Modal isOpen={deleteConfirmationOpen} onOpenChange={setDeleteConfirmationOpen}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Confirm Deletion
                </ModalHeader>
                <ModalBody>
                  <p>Are you sure you want to delete this subscription?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    No
                  </Button>
                  <Button color="primary" onPress={deleteItem}>
                    Yes
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

export default AdminSubscribeList;
