import React, { useState, useEffect } from "react";
import axios from 'axios';
import Layout from "../../components/LayoutComponent";
import { HiOutlineUserAdd, HiOutlineOfficeBuilding } from "react-icons/hi";
import updateuser from "../../assets/updateuser2.png"
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const AddUnitPage = () => {
  const [companyId, setCompanyId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    entry: '',
    exit: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const companyIdFromStorage = localStorage.getItem('guid_company');
    setCompanyId(companyIdFromStorage);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`http://192.168.10.103:8008/company/unit/create}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data && typeof response.data === 'object') {
        setFormData({
          name: response.data.name || '',
          entry: response.data.entry || '',
          exit: response.data.exit || '',
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
  
      const response = await axios.post(`http://192.168.10.103:8008/company/unit/create`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Form submitted successfully:', response.data);
      
      navigate('/Unit', { state: { AddUnitSuccessMessage: 'Add unit has been successful' } });
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
              <h1 className="text-xl text-black">Add Unit</h1>
              <nav className="flex px-1 py-3 text-gray-700  rounded-lg  dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                    <Link to="/unit" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        Unit
                    </Link>
                    </li>
                    <li>
                    <div className="flex items-center">
                        <IoIosArrowForward className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" />
                        <Link to="/AddUnit" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Add Unit</Link>
                    </div>
                    </li>
                </ol>
              </nav>
            </div>
            <div className="text-black">
              <HiOutlineUserAdd size={32} />
            </div>
          </div>
          <div className="mt-6 flex">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md dark:border dark:border-gray-700 dark:bg-gray-800">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Nama" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="entry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entry</label>
                    <input 
                      type="text" 
                      name="entry" 
                      id="entry" 
                      value={formData.entry} 
                      onChange={handleChange} 
                      className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="NIK" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="exit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Exit</label>
                    <input 
                      type="text" 
                      name="exit" 
                      id="exit" 
                      value={formData.exit} 
                      onChange={handleChange} 
                      className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Exit" 
                      required 
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-[#99AEF9] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Simpan
                  </button>
                </form>
              </div>
            </div>
            <div className="flex justify-center items-center w-1/2">
              <img src={updateuser} alt="Illustration" className="max-h-full" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddUnitPage;
