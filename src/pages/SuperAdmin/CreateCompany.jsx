import React, { useState, useEffect } from "react";
import axios from 'axios';
import Layout from "../../components/LayoutComponent";
import { useNavigate } from "react-router-dom";
import { BiLockAlt } from "react-icons/bi";
import adduser from "../../assets/adduser.png";


const CreateCompany = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        address: '',
        status: '',
        password: '',
    });

    const navigate = useNavigate();
  
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://192.168.10.103:8008/superAdmin/company/create`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.data && typeof response.data === 'object') {
          setFormData({
            name: response.data.name || '',
            email: response.data.email|| '',
            phone_number: response.data.phone_number || '',
            address: response.data.address || '',
            status: response.data.status || '',
            password: response.password || '',
          });
        } else {
          console.error('Expected an object but got:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error.message);
      }
    };
  
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
    
        const response = await axios.post(`http://192.168.10.103:8008/superAdmin/company/create`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Form submitted successfully:', response.data);
  
   
        navigate('/ReadCompany', { state: { AddCompanySuccessMessage: 'Add company has been successful' } });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
    return (
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 rounded-lg dark:border-gray-700 mt-14 bg-gradient-to-r from-[#CAD7FD] to-[#CBF3EC] via-[#CBD6FF]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl text-black">Create Company</h1>
                <h3 className="text-sm text-black">
                  <span className="text-gray-700">Dashboard / </span> Create Company
                </h3>
              </div>
              
            </div>
            <div className="mt-6 flex">
              <div className="w-full max-w-4xl bg-white rounded-lg shadow-md dark:border dark:border-gray-700 dark:bg-gray-800">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                        <input type="text" name="name" id="name"  value={formData.name} onChange={handleChange}  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama" required="" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <div className="relative">
                          <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required="" />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <div className="flex items-center">
                          <input type="text" name="phone_number" id="phone_number" value={formData.phone_number} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone Number" required="" />
                          <div className="text-gray-500 ml-2">
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat</label>
                        <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Unit" required="" />
                      </div>
                      <div>
                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <input type="text" name="status" id="status" value={formData.status} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Unit" required="" />
                      </div>
                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <div className="relative">
                          <input type="text" name="password" id="password" value={formData.password} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required="" />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <BiLockAlt size={20} className="text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-[#99AEF9] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Tambah
                    </button>
                  </form>
                </div>
              </div>
              <div className="flex justify-center items-center w-1/2">
                <img src={adduser} alt="Illustration" className="max-h-full" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
export default CreateCompany

