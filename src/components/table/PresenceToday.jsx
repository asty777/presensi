import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotFound from "../../assets/notfound2.png"

const PresenceToday = () => {
    const [presentData, setPresentData] = useState([]);
    const [companyId, setCompanyId] = useState(null);

    useEffect(() => {
        fetchPresenceData();
    }, []);

    const fetchPresenceData = async () => {
        try {
            const token = localStorage.getItem('token');
            const companyIdFromStorage = localStorage.getItem('guid_company');
            setCompanyId(companyIdFromStorage)
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
                
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            console.error('Failed to fetch users data:', error.message);
        }
    };


    return (
        <div>
         <div className="p-4 sm:ml-64">
         <div className="p-4 rounded-lg dark:border-gray-700 ">
         <h1 className="text-xl">Today Presence</h1>
         {presentData.length === 0 ? (
            <div class="flex justify-center items-center mt-28 flex-col">
                <img src={NotFound} class="mx-auto" width="350" alt="Icon"/>
                 <h4 class="text-center text-slate-600  text-xl mt-4">Belum ada Data !</h4>
            </div>
            ) : (
          <table className="w-full mt-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">No</th>
                <th scope="col" className="px-6 py-3">Nama</th>
                <th scope="col" className="px-6 py-3">Tanggal</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Location</th>
              </tr>
            </thead>
            <tbody>
                {presentData.map((presence, index) => (
                  <tr key={presence.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">{presence.name_user}</td>
                    <td className="px-6 py-4">{new Date(presence.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                    <td className="px-6 py-4">
                        {presence.status === 'hadir' && (
                            <button type="button" className="px-3 rounded-full py-2 text-xs font-bold text-center mb-2 text-white bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                 Hadir
                            </button>
                            )}
                            {presence.status === 'sakit' && (
                            <button type="button" className="px-3 rounded-full py-2 text-xs font-bold text-center mb-2 text-white bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Sakit
                            </button>
                            )}
                            {presence.status === 'izin' && (
                            <button type="button" className="px-3 rounded-full py-2 text-xs font-bold text-center mb-2 text-white bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                 Izin
                            </button>
                            )}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">{presence.address}</td>
                  </tr>
                ))}
            </tbody>
          </table>
)}
          </div>
          </div>
          </div>
    
    )
};

export default PresenceToday;

const isValidDate = (date) => {
    return !isNaN(new Date(date).getTime());
};
