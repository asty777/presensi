
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Layout from "../../components/LayoutComponent";
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import adduser from "../../assets/adduser.png";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
const AddUserPage = () => {
  const [companyId, setCompanyId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    profile_picture: null,
    gender: '',
    email: '',
    phone_number: '',
    password: '',
    unit: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const companyIdFromStorage = localStorage.getItem('guid_company');
    setCompanyId(companyIdFromStorage);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files && files.length > 0 ? files[0] : null;

    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'profile_picture' ? file : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
  
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
     
      const response = await axios.post(
        `http://192.168.10.103:8008/company/create-user`,
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      console.log('Form submitted successfully:', response.data);
      
      navigate('/User', { state: { AddUserSuccessMessage: 'Add user has been successful' } });
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
                <h1 className="text-xl text-black">Add User</h1>
                 <nav className="flex px-1 py-3 text-gray-700  rounded-lg  dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                            <Link to="/user" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                User
                            </Link>
                            </li>
                            <li>
                            <div className="flex items-center">
                                <IoIosArrowForward className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" />
                                <Link to="/AddUser" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Add User</Link>
                            </div>
                            </li>
                        </ol>
                    </nav>
              </div>
              
            </div>
            <div className="mt-6 flex">
              <div className="w-full max-w-4xl bg-white rounded-lg shadow-md dark:border dark:border-gray-700 dark:bg-gray-800">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required="" />
                      </div>
                      <div>
                        <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIK</label>
                        <input type="text" name="nik" id="nik" value={formData.nik} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="NIK" required="" />
                      </div>    
                         <div>
                        <label htmlFor="profile_picture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                        <div className="relative">
                          <input type="file" name="profile_picture" id="profile_picture" onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <MdOutlinePhotoCamera size={20} className="text-gray-500" />
                          </div>
                        </div>
                      </div>
                    
                      <div>
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                        <input type="text" name="gender" id="gender" value={formData.gender} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gender" required="" />
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
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <div className="relative">
                          <input type="text" name="password" id="password" value={formData.password} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required="" />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <BiLockAlt size={20} className="text-gray-500" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="unit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
                        <input type="text" name="unit" id="unit" value={formData.unit} onChange={handleChange} className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Unit" required="" />
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
export default AddUserPage;

