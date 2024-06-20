import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoMdClose } from "react-icons/io";

const UpdateUnitModal = ({ unitId, closeModal }) => {
  const [unitData, setUnitData] = useState({
    name: '',
    entry: '',
    exit: ''
  });

  useEffect(() => {
    const fetchUnitDetails = async (id) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://192.168.10.103:8008/company/unit/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUnitData(response.data.unit);
      } catch (error) {
        console.error('Failed to fetch unit details:', error.message);
      }
    };

    if (unitId) {
      fetchUnitDetails(unitId);
    }
  }, [unitId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUnitData({
      ...unitData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://192.168.10.103:8008/company/unit/${unitId}`, unitData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      Swal.fire('Updated!', 'Unit has been updated successfully.', 'success');
      closeModal();
    } catch (error) {
      console.error('Failed to update unit:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Update Unit</h2>
          <button
            type="button"
            onClick={closeModal}
            className="flex items-center justify-center px-2 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <IoMdClose className="h-5 w-5" />
          </button>
        </div>
        <hr className="border-t border-gray-300 mb-4" />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 border-gray-300 pb-1">Name</label>
            <input
              type="text"
              name="name"
              value={unitData.name}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 border-gray-300 pb-1">Entry</label>
            <input
              type="text"
              name="entry"
              value={unitData.entry}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 border-gray-300 pb-1">Exit</label>
            <input
              type="text"
              name="exit"
              value={unitData.exit}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUnitModal;


