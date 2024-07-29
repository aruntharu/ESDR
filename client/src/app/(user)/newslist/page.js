'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiTrash } from 'react-icons/bi';
import { FiFilePlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import toast from 'react-hot-toast';

const NewsListPage = () => {
  const router = useRouter();
  const [newsList, setNewsList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}news`);
    setNewsList(data);
  };

  const deleteItem = async () => {
    if (selectedItemId) {
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}news/${selectedItemId}`);
      if (data) {
        fetchNews();
        setIsDeleteModalVisible(false);
        setSelectedItemId(null);
        toast.success("News deleted successfully");
      } else {
        toast.error("Failed to delete news");
      }
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
    setIsDeleteModalVisible(true);
  };

  const handleCloseImageModal = () => {
    onOpenChange(false);
    setSelectedImage(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setSelectedItemId(null);
  };

  return (
    <div className="mx-10">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.push('/newslist/add-news')}
      >
        <FiFilePlus className="size-6 mr-1" />
        <p className="flex">Add News</p>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  News Heading
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {newsList.length > 0 && newsList.map((item) => (
                <tr key={item._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.newsHeading}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.newsDate}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}news-image/${item.newsImage}`}
                      alt="News"
                      className="w-16 h-16 object-cover cursor-pointer"
                      onClick={() => handleImageClick(`${process.env.NEXT_PUBLIC_API_URL}news-image/${item.newsImage}`)}
                    />
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight cursor-pointer"
                      onClick={() => handleDeleteClick(item._id)}
                    >
                      <BiTrash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        footer={null}
        centered
        bodyStyle={{ padding: 0 }}
        width="30%" // Adjusted width to make the modal smaller
        style={{ top: '10%', height: 'auto' }}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </Modal>
      <Modal
        isOpen={isDeleteModalVisible}
        onOpenChange={setIsDeleteModalVisible}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Deletion
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this Past Events?</p>
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
    </div>
  );
};

export default NewsListPage;
