import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLayerGroup } from "react-icons/fa";

const PresentAmount = () => {
    const [presentData, setPresentData] = useState([]);
    const [companyId, setCompanyId] = useState(null);
    const [todayCount, setTodayCount] = useState(0);

    useEffect(() => {
        fetchPresenceData();
    }, []);

    const fetchPresenceData = async () => {
        try {
            const token = localStorage.getItem('token');
            const companyIdFromStorage = localStorage.getItem('guid_company');
            setCompanyId(companyIdFromStorage);
            const response = await axios.get('http://192.168.10.103:8008/presence/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data && Array.isArray(response.data.presences)) {
                const currentDate = new Date();
                const formattedCurrentDate = currentDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

                const filteredData = response.data.presences.filter(presence => {
                    const presenceDate = new Date(presence.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
                    return presenceDate === formattedCurrentDate;
                });

                setPresentData(filteredData);
                setTodayCount(filteredData.length); 
                log(setTodayCount)
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            console.error('Failed to fetch users data:', error.message);
        }
    };

    return (
        <>
            <div className="max-w-xl p-6 bg-white mt-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="mb-4 text-xl tracking-tight text-gray-500 dark:text-white">Total Presence Today</h5>
                </a>
                <div className="flex items-center">
                    <div className="bg-slate-100 w-10 h-11 rounded-3xl flex justify-center items-center">
                        <FaLayerGroup className="w-7 h-7 text-blue-500" />
                    </div>
                    <p className="mb-2 ml-4 font-semibold text-2xl text-gray-500 dark:text-gray-400">{todayCount}</p>
                </div>
            </div> 
        </>
    );
}

export default PresentAmount;
