'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiTrash } from 'react-icons/bi';
import { FiFilePlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [esdrList, setEsdrList] = useState([]);

  useEffect(() => {
    fetchEsdr();
  }, []);

  const fetchEsdr = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}esdr`);
      setEsdrList(data);
    } catch (error) {
      console.error('Error fetching ESDR list:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}esdr/${id}`);
      if (data) {
        fetchEsdr();
      }
    } catch (error) {
      console.error('Error deleting ESDR item:', error);
    }
  };

  return (
    <div className="mx-10">
      <div className='flex' onClick={() => router.push('/esdrlist/add-esdr')}>
        <p className='flex'>
          <FiFilePlus className='size-6' />Add Esdr
        </p>
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
              {esdrList.length > 0 && esdrList.map((item) => (
                <tr key={item._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">{item.esdrHeading}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{item.esdrDate}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {console.log(`${process.env.NEXT_PUBLIC_API_URL}uploads/esdrImage/${item.esdrImage}`)}
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}uploads/esdrImage/${item.esdrImage}`}
                      alt="Esdr Image"
                      className="w-16 h-16 object-cover"
                      onError={(e) => e.target.src = '/placeholder-image.png'}
                    />
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <BiTrash onClick={() => deleteItem(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
