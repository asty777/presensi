import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/LayoutComponent";
import LoadingComponent from "../../components/LoadingComponent";
import { IoIosArrowForward } from "react-icons/io";

const DetailUnit = () => {
    const [units, setUnits] = useState([]);
    const { guid_unit } = useParams();
  
    useEffect(() => {
      fetchDetailUnit();
    }, [guid_unit]);

    const fetchDetailUnit = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://192.168.10.103:8008/company/unit/user/${guid_unit}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      
          console.log('Response data:', response.data); 
      
          if (response.data && Array.isArray(response.data.userUnit)) {
            setUnits(response.data.userUnit);
          } else {
            console.error('Expected an array but got:', response.data);
          }
        } catch (error) {
          console.error('Failed to fetch data detail unit:', error.message);
        }
      };
      
    if (units.length === 0) {
        return <LoadingComponent.DetailUnitLoading />;
      }
      

    const groupedUnits = units.reduce((acc, unit) => {
      if (!acc[unit.unit]) {
        acc[unit.unit] = [];
      }
      acc[unit.unit].push(unit);
      return acc;
    }, {});

    return (
        <Layout>
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
                    <h1 className="text-xl">Unit</h1>
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
                                <Link to="" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Add Unit</Link>
                            </div>
                            </li>
                        </ol>
                    </nav>
                    {Object.keys(groupedUnits).map((unitGroup, index) => (
                        <div key={index}>
                            <h2 className="text-gray-500 text-lg mt-4">
                                <span className="text-2xl text-slate-700">{unitGroup}</span> |
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
                            {groupedUnits[unitGroup].map((unit, idx) => (
                                <div key={idx} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <div className="relative overflow-hidden rounded-full bg-gray-200 h-40 w-40 mx-auto mt-7">
                                        <img className="object-cover w-full h-full" src={`http://192.168.10.103:8008/uploads/${unit.profile_picture}`} alt="Profile" />
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between border-b border-gray-200 mt-2">
                                            <p className="text-sm text-gray-700 dark:text-gray-400">Nama :</p>
                                            <p className="text-sm text-gray-700  dark:text-gray-400 mb-2">{unit.name}</p>
                                            
                                        </div>
                                        <div className="flex justify-between border-b border-gray-200 mt-2">
                                            <p className="text-sm text-gray-700 dark:text-gray-400">NIK :</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">{unit.nik}</p>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-200 mt-2">
                                            <p className="text-sm text-gray-700 dark:text-gray-400">Gender :</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">{unit.gender}</p>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-200 mt-2">
                                            <p className="text-sm text-gray-700 dark:text-gray-400">Email :</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">{unit.email}</p>
                                        </div>
                                        <div className="flex justify-center">
                                            <Link to={`/DetailPresence/${unit.guid_user}`}>
                                                <button className='bg-[#fef5ea] rounded-full border border-[#e0a3cf] w-[130px] font-medium text-xs my-6 py-3'>Show Presence</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            </div>
                        </div>
                    ))}
                </div>
            </div>         
        </Layout>
    );
}

export default DetailUnit;





