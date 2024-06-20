import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoMdClose } from "react-icons/io";

const UpdateUserModal = ({ userId, closeModal }) => {
    const [userData, setUserData] = useState({
        nik: "",
        name: "",
        gender: "",
        email: "",
        phone_number: "",
        password: "",
        unit: "",
        profile_picture: null,
        role: "",
        createdAt: "",
        updatedAt: "",
      });
    
      // State untuk menyimpan URL gambar profil yang baru dipilih
      const [newProfilePictureURL, setNewProfilePictureURL] = useState(null);
    
      useEffect(() => {
        const fetchUserData = async (id) => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
              `http://192.168.10.103:8008/company/user/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setUserData(response.data.user);
          } catch (error) {
            console.error("Failed to fetch user details:", error.message);
          }
        };
    
        if (userId) {
          fetchUserData(userId);
        }
      }, [userId]);
    
      const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        const file = files && files.length > 0 ? files[0] : null;
    
        // Jika input adalah profile_picture, update URL gambar profil yang baru
        if (name === 'profile_picture') {
          setNewProfilePictureURL(URL.createObjectURL(file));
        }
    
        setUserData({
          ...userData,
          [name]: name === 'profile_picture' ? file : value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          for (const key in userData) {
            if (userData[key] !== null) {
              formData.append(key, userData[key]);
            }
          }
    
          const response = await axios.put(
            `http://192.168.10.103:8008/company/user/${userId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
    
          Swal.fire("Updated!", "User has been updated successfully.", "success");
          closeModal();
        } catch (error) {
          console.error("Failed to update user:", error.message);
        }
      };
    

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Update User</h2>
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
          <label className="block text-sm font-medium text-gray-700 border-gray-300 pb-1">Profile Picture</label>
            {/* menggunakan profile picture sebelumny jika, lalu mengubah dgn yang baru jika diedit*/}
            <img
              className="object-cover w-20 h-20 rounded-full mb-2"
              src={newProfilePictureURL || `http://192.168.10.103:8008/uploads/${userData.profile_picture}`}
              alt="Profile"
            />
            <input
              type="file"
              name="profile_picture"
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 border-gray-300 pb-1">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 border-gray-300 pb-1">NIK</label>
              <input
                type="text"
                name="nik"
                value={userData.nik}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 border-gray-300 pb-1">Email</label>
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 border-gray-300 pb-1">Gender</label>
              <input
                type="text"
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 border-gray-300 pb-1">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={userData.phone_number}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700  border-gray-300 pb-1">Unit</label>
                <input
                  type="text"
                  name="unit"
                  value={userData.unit}
                  onChange={handleInputChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
               </div>
               <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <div className="relative">
                    <input type="password" name="password" id="password" value={userData.password} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
                    </div>
                 </div>
          
              <div className="">
                <button
                  type="submit"
                  className="w-full text-white bg-[#99AEF9] mt-5 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Update
                </button>
              </div>
             
            </form>
          </div>
        </div>
      );
    };
    
export default UpdateUserModal;
    


               


