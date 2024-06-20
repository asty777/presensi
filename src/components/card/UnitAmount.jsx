import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLayerGroup } from "react-icons/fa";
const UnitAmount = () => {
    const [units, setUnits] = useState([]);
    const [companyId, setCompanyId] = useState(null);
  
    useEffect(() => {
      fetchUnitsData();
    }, []);
  
    const fetchUnitsData = async () => {
      try {
        const token = localStorage.getItem('token');
        const companyIdFromStorage = localStorage.getItem('guid_company');
        setCompanyId(companyIdFromStorage);
  
        const response = await axios.get('http://192.168.10.103:8008/company/unit', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.data && Array.isArray(response.data.units)) {
          setUnits(response.data.units);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch units data:', error.message);
      }
    };
  
    
  
    const countUnits = () => {
      return units.length;
    };

    return(
        <>
        <div class="max-w-xl p-6 bg-white mt-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-4 text-xl tracking-tight text-gray-500 dark:text-white">Number Of Units</h5>
            </a>
            <div class="flex items-center">
                <div class="bg-slate-100 w-10 h-11 rounded-3xl flex justify-center items-center">
                    <FaLayerGroup className="w-7 h-7 text-blue-500" />
                </div>
                <p class="mb-2 ml-4 font-semibold text-2xl text-gray-500 dark:text-gray-400">{countUnits()}</p>
            </div>
        </div> 
        </>
    )
}
export default UnitAmount


