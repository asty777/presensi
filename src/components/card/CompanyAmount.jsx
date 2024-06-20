import React, { useState, useEffect } from 'react';
import axios from 'axios';
const CompanyAmount = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetchCompaniesData();
    }, []);

    const fetchCompaniesData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://192.168.10.103:8008/superAdmin/company', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setCompanies(response.data); 
            } else {
                console.error('Failed to fetch companies:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch companies:', error.message);
        }
    };

    const countCompanies = () => {
        return companies.length;
    };

    const countPremiumCompanies = () => {
        return companies.filter(company => company.status === true).length;
    };

    const countNonPremiumCompanies = () => {
        return companies.filter(company => company.status === false).length;
    };

    return(
        <>
           <div class="max-w-xl p-6 bg-[#8cc4ea] mt-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 class="mb-4 text-xl tracking-tight text-gray-800 dark:text-white">Jumlah Company</h5>
                    </a>
                    <div class="flex items-center">
                        <div class="bg-slate-100  w-10 h-11  rounded-3xl">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-7 mt-2 ml-2"  viewBox="0 0 448 512">
                                <path fill="#6366f1" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                            </svg>
                        </div>
                         <p class="mb-2 ml-4 font-semibold  text-2xl text-gray-800 dark:text-gray-400">{countCompanies()}</p>
                    </div>
           </div>
           <div class="max-w-xl p-6 bg-[#f1ecfc] mt-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 class="mb-4 text-xl tracking-tight text-gray-700 dark:text-white">Jumlah Perusahaan Premium</h5>
                    </a>
                    <div class="flex items-center">
                        <div class="bg-slate-100  w-10 h-11  rounded-3xl">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-7 mt-2 ml-2"  viewBox="0 0 448 512">
                                <path fill="#6366f1" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                            </svg>
                        </div>
                         <p class="mb-2 ml-4 font-semibold  text-2xl text-gray-700 dark:text-gray-400">{countPremiumCompanies()}</p>
                    </div>
           </div>
           <div class="max-w-xl p-6 bg-[#f7dc7b] mt-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 class="mb-4 text-xl tracking-tight text-gray-700 dark:text-white">Jumlah Perusahaan Tidak Premium</h5>
                    </a>
                    <div class="flex items-center">
                        <div class="bg-slate-100  w-10 h-11  rounded-3xl">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-7 mt-2 ml-2"  viewBox="0 0 448 512">
                                <path fill="#6366f1" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                            </svg>
                        </div>
                         <p class="mb-2 ml-4 font-semibold  text-2xl text-gray-700 dark:text-gray-400">{countNonPremiumCompanies()}</p>
                    </div>
           </div>
        
        </>
    )
}
export default CompanyAmount;
