import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Layout from "../../components/LayoutComponent";
import { IoMdArrowBack } from "react-icons/io";
import PiePresence from "../../components/chart/PiePresence";
import LoadingComponent from "../../components/LoadingComponent";
import NotFound from "../../assets/notfound2.png"
import { IoIosArrowForward } from "react-icons/io";
import moment from "moment";


const DetailPresence = () => {
    const [present, setPresent] = useState([]);
    const [todayPresence, setTodayPresence] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { guid_user } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [monthlyResponse, yearlyResponse] = await Promise.all([
                    axios.get(`http://192.168.10.103:8008/company/user/presence/${guid_user}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }),
                    axios.get(`http://192.168.10.103:8008/company/user/presence/graph/${guid_user}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                ]);

                let allPresence = monthlyResponse.data.presence;
                setPresent(allPresence);

                // Sort data based on created_at 
                allPresence.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                // Get the latest presence record
                const latestIndex = allPresence.length > 0 ? allPresence.length - 1 : 0;
                const latestPresence = allPresence[latestIndex];
                console.log("Latest Presence:", latestPresence);
        
                // Set Today's Presence menjadi data terbaru
                setTodayPresence(latestPresence ? [latestPresence] : []);

                // Set chart data yearly
                const yearlyData = yearlyResponse.data;
                setChartData(yearlyData);

                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch presence data:', error.message);
                setError('Failed to fetch presence data');
                setLoading(false);
            }
        };

        fetchData();
    }, [guid_user]);


    if (loading) {
        return <LoadingComponent.TableLoading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const isValidDate = (dateString) => {
        const timestamp = Date.parse(dateString);
        return !isNaN(timestamp);
    };

    return (
        <>
        <Layout>
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
                    <h1 className="text-xl ">Detail Presence Report</h1>
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
                                <Link to="" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Detail Presence Report</Link>
                            </div>
                            </li>
                        </ol>
                    </nav>

                    <div>
                        {present.length === 0 ? (
                            <div class="flex justify-center items-center mt-28 flex-col">
                                <img src={NotFound} class="mx-auto" width="350" alt="Icon"/>
                                <h4 class="text-center text-slate-600  text-xl mt-4">Belum ada Data !</h4>
                            </div>
                        ) : (
                            todayPresence.map((item, index) => (
                                <div key={index}>
                                    <h2 className="text-gray-500 text-lg mt-4">
                                        <span className="text-2xl text-slate-700"> {item.name_user} </span> | 
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb:ml-14 mb-2">
                                        <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <a href="#">
                                                <img className="rounded-t-lg w-25 h-30" src={`http://192.168.10.103:8008/uploads/${item.image}`} alt="Bukti"/>
                                            </a>
                                            <div className="p-5">
                                                <a href="#">
                                                    <h5 className="mt-2 text-xl font-semibold tracking-tight text-blue-900 dark:text-white">Latest Presence</h5>
                                                </a>
                                                <p className="mt-2 mb-3 font-sm text-gray-700 dark:text-gray-400"> {isValidDate(item.createdAt) ? new Date(item.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : 'invalid date'} | {item.location} | {item.address}</p>
                                                {item.status === 'hadir' && (
                                                    <button type="button" className="px-3 rounded-full py-2 text-xs font-bold text-center mb-2 text-white bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Hadir
                                                    </button>
                                                )}
                                                {item.status === 'sakit' && (
                                                    <button type="button" className="px-3 rounded-full py-2 text-xs font-bold text-center mb-2 text-white bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Sakit
                                                    </button>
                                                )}
                                                {item.status === 'izin' && (
                                                    <button type="button" className="px-3 rounded-full py-2 text-xs font-bold text-center mb-2 text-white bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Izin
                                                    </button>
                                                )}
                                                <p className="mb-3 font-normal text-sky-500 dark:text-sky-500">{item.note}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="bg-white border border-gray-200 rounded-lg shadow p-4 dark:bg-gray-800 dark:border-gray-700">
                                                <div style={{ width: '380px', height: '430px' }}>
                                                    <PiePresence chartData={chartData} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {present.length > 0 && (
                    <table className="w-full mt-8 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                   Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Note
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {present.map((presence, index) => (
                                <tr key={presence.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        {index + 1}
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                        {presence.name_user}
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                    {isValidDate(presence.createdAt) ? new Date(presence.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : 'invalid date'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {presence.location}
                                    </td>
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
                                    <td className="px-6 py-4">
                                        {presence.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {presence.note}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                </div>
            </div>
        </Layout>

        </>
    )
}
export default DetailPresence;


















