import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/LayoutComponent';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent';
import { FaCrown, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const DetailCompany = () => {
  const [company, setCompany] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  const { id } = useParams(); 

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const token = localStorage.getItem('token');
      const companyIdFromStorage = localStorage.getItem('guid_company');
      setCompanyId(companyIdFromStorage);
      const response = await axios.get(`http://192.168.10.103:8008/superAdmin/company/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data && typeof response.data === 'object') {
        setCompany(response.data);
      } else {
        console.error('Expected an object but got:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch company data:', error.message);
    }
  };


  if (!company) {
    return <LoadingComponent.ProfileLoading/>


  }

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
            <h1 className="text-xl">Profile</h1>
            <h3 className="text-sm">
              <span className="text-gray-500">Dashboard / </span>Profile
            </h3>
            <div className="p-4 mt-5 bg-gradient-to-r from-[#CAD7FD] to-[#CBF3EC] via-[#CBD6FF] shadow-md">
              <div className="m-5 flex flex-col md:flex-row md:gap-10">
                <img
                  src="https://plus.unsplash.com/premium_photo-1675098654728-ad113d7db26e?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Profile"
                  className="h-32 w-32 rounded-full"
                />
                <div className="flex flex-col gap-3 md:order-1">
                  <div>
                    <h3 className="font-medium mt-16">{company.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h3 className="text-xs mt-1 font-light">{company.email}</h3>
                    </div>
                    <div>
                    {company.status ? (
                      <button
                        type="button"
                        className="px-4 py-1 text-xs font-medium text-center inline-flex items-center text-[#409261] bg-[#E9FFEF] rounded-lg"
                      >
                        <FaCrown className="w-3 h-3 text-yellow-400 me-2" />
                        {company.status} Premium
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="px-2 py-1 text-xs font-medium text-center inline-flex items-center text-white bg-[#ef4444] rounded-lg"
                      >
                        <FaCrown className="w-3 h-3 text-yellow-400 me-2" />
                        {company.status} Not Premium
                      </button>
                    )}
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
            <div className="w-xl mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-6 text-2xl font-medium text-gray-900 dark:text-white text-center">
                Contact Information
              </h5>
              <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400 w-6 h-6 mr-4" />
                <div>
                  <span className="block text-gray-500 dark:text-gray-400">
                    Company Code :
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {company.code}
                  </span>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400 w-6 h-6 mr-4" />
                <div>
                  <span className="block text-gray-500 dark:text-gray-400">
                    Alamat :
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {company.address}
                  </span>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <FaEnvelope className="text-gray-500 dark:text-gray-400 w-6 h-6 mr-4" />
                <div>
                  <span className="block text-gray-500 dark:text-gray-400">
                    Email :
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {company.email}
                  </span>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <FaPhone className="text-gray-500 dark:text-gray-400 w-6 h-6 mr-4" />
                <div>
                  <span className="block text-gray-500 dark:text-gray-400">
                    Nomor Telepon :
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {company.phone_number}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Link to={`/UpdateProfile/${company._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                    Update
                  </button>
                </Link>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default DetailCompany;