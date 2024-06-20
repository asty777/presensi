import React, { useState, useEffect } from "react";
import Layout from "../../components/LayoutComponent";
import { useNavigate } from "react-router-dom";
import { FaImage } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from "react-router-dom";

const UpdateCompany = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    status: '',
    password: '', 
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null); 
  const { id } = useParams(); 

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://192.168.10.103:8008/superAdmin/company/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const companyData = response.data;
        setFormData({ ...companyData, password: '' }); 
      } catch (error) {
        console.error('Error fetching company data:', error);
        if (error.response) {
          if (error.response.status === 401) {
            setError('Unauthorized: Invalid token');
          } else if (error.response.status === 404) {
            setError('Company not found');
          } else {
            setError('Failed to fetch company data. Please try again later.');
          }
        } else {
          setError('Failed to fetch company data. Please check your connection.');
        }
      }
    };

    fetchCompanyData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      
      const { password, ...updateData } = formData;
      const payload = password ? formData : updateData;
  
      const response = await axios.put(
        `http://192.168.10.103:8008/company/profile/${id}`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      console.log('Form submitted successfully:', response.data);
      setFormData({
        name: '',
        email: '',
        phone_number: '',
        address: '',
        status: '',
        password: '',
      });
      setError(null); 

      navigate('/ReadCompany', { state: { EditCompanyMessage: 'Edit has been successful' } });
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg dark:border-gray-700 mt-14 ">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl text-black">Update Profile</h1>
              <h3 className="text-sm text-black">
                <span className="text-gray-700">Profile / </span>Update Profile
              </h3>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg ">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="profileImage">
                Profile Image
              </label>
              <div className="flex items-center mt-2">
                <img
                  className="w-32 h-32 rounded-full mr-4"
                  src="https://plus.unsplash.com/premium_photo-1675098654728-ad113d7db26e?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Profile"
                />
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-200"
                  type="button"
                >
                  <FaImage className="w-4 h-4 mr-2 inline" />
                  Change
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="mb-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama" required="" />
                </div>
              </div>
              <div className="mb-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama" required="" />
                </div>
              </div>
              <div className="mb-4">
                <div>
                  <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor telepon</label>
                  <input type="text" name="phone_number" id="phone_number" value={formData.phone_number} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama" required="" />
                </div>
              </div>
              <div className="mb-4">
                <div>
                  <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat</label>
                  <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama" required="" />
                </div>
              </div>
              <div className="mb-4">
                <div>
                  <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                  <input type="text" name="status" id="status" value={formData.status} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama" required="" />
                </div>
              </div>
              <div className="mb-4">
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama" />
                </div>
              </div>
            </div>
          
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full text-white bg-[#99AEF9] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCompany;



