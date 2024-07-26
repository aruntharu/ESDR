'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiTrash } from 'react-icons/bi';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import eye icons
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import toast from "react-hot-toast";

const AdminContactList = () => {
  const [contactList, setContactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showMessage, setShowMessage] = useState({}); // State to manage visibility of messages
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    fetchContactList();
  }, []);

  const fetchContactList = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}contact`);
    setContactList(data);
  };

  const confirmDeleteItem = (contact) => {
    setContactToDelete(contact);
    setDeleteConfirmationOpen(true);
  };

  const deleteItem = async () => {
    if (contactToDelete) {
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}contact/${contactToDelete._id}`);
      if (data) {
        fetchContactList();
        setDeleteConfirmationOpen(false);
        setContactToDelete(null);
        toast.success("Contact deleted successfully");
      } else {
        toast.error("Failed to delete contact");
      }
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleOpenModal = (contact) => {
    setSelectedContact(contact);
    onOpen();
  };

  const toggleMessageVisibility = (id) => {
    setShowMessage((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRefresh = async () => {
    await fetchContactList();
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
                  Phone Number
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {contactList.length > 0 && contactList.map((item) => (
                <tr key={item._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{item.contactFullName}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{item.contactPhoneNumber}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{item.contactMail}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {showMessage[item._id] ? item.contactMessage : truncateText(item.contactMessage, 50)}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center space-x-2">
                      <div onClick={() => handleOpenModal(item)} className="cursor-pointer">
                        {selectedContact?._id === item._id && isOpen ? <HiEyeOff /> : <HiEye />}
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
      {selectedContact && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {selectedContact.contactFullName}'s Contact Details
                </ModalHeader>
                <ModalBody style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                  <p>Full Name: {selectedContact.contactFullName}</p>
                  <p>Phone Number: {selectedContact.contactPhoneNumber}</p>
                  <p>Email: {selectedContact.contactMail}</p>
                  <p>Message: {selectedContact.contactMessage}</p>
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
      {contactToDelete && (
        <Modal isOpen={deleteConfirmationOpen} onOpenChange={setDeleteConfirmationOpen}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Confirm Deletion
                </ModalHeader>
                <ModalBody>
                  <p>Are you sure you want to delete this contact?</p>
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

export default AdminContactList;
