import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import Layout from "../../components/LayoutComponent";
import DeleteAlert from "../../components/modal/DeleteAlert";
import LoadingComponent from "../../components/LoadingComponent";
import { FaPlus } from "react-icons/fa";

const ReadCompany = () => {
    const [companies, setCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation(); 

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

    const handleDeleteCompany = async (companyId) => {
        try {
        const result = await DeleteAlert();
        if (result.isConfirmed) {
            const token = localStorage.getItem('token');
            await axios.delete(`http://192.168.10.103:8008/superAdmin/company/${companyId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            });

            fetchCompaniesData(); 
        }
        } catch (error) {
        console.error('Failed to delete company:', error.message);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    if (companies.length === 0) {
        return <LoadingComponent.TableLoading />;
    }

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredCompanies.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastCompany = currentPage * itemsPerPage;
    const indexOfFirstCompany = indexOfLastCompany - itemsPerPage;
    const currentCompany = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

    return (
        <Layout>
        <div className="p-4 sm:ml-64">
            <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
                <h1 className="text-xl">Company</h1>
                <h3 className="text-sm">
                    <span className="text-gray-500">Dashboard / </span>Company
                </h3>
                {location.state && location.state.AddCompanySuccessMessage && (
                    <div className="p-4 mb-4 mt-3 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                        {location.state.AddCompanySuccessMessage}
                    </div>
                )}
                {location.state && location.state.EditCompanyMessage && (
                    <div className="p-4 mb-4 mt-3 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                        {location.state.EditCompanyMessage}
                    </div>
                )}
                <div className="flex justify-between items-center mt-4">
                    <Link to="/CreateCompany">
                        <button
                            type="button"
                            className="px-5 py-3 text-xs font-medium text-center inline-flex items-center text-white bg-[#99AEF9] rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <FaPlus className="mr-1" />
                        </button>
                    </Link>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block pt-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for items"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                    <table className="w-full mt-8 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nama
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Detail
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCompany.map((company, index) => (
                                <tr key={company.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    {index + 1}
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                    {company.name}
                                </td>
                                <td className="px-6 py-4">
                                {company.status ? (
                                    <button type="button" className="px-3 rounded-full py-2 text-xs font-medium text-center text-white bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    {company.status} premium
                                    </button>
                                ) : (
                                    <button type="button" className="px-3 rounded-full py-2 text-xs font-medium text-center text-white bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    {company.status} not premium
                                    </button>
                                )}
                                </td>
                                <td className="px-6 py-4">
                                    {company.email}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/DetailCompany/${company._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Detail</Link>
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/UpdateCompany/${company._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline pr-2">Edit</Link>
                                    <button onClick={() => handleDeleteCompany(company._id)} className="font-medium text-red-500 dark:text-blue-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstCompany + 1}-{Math.min(indexOfLastCompany, filteredCompanies.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredCompanies.length}</span>
                    </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        {pageNumbers.map(number => (
                            <li key={number}>
                                <a href="#" onClick={() => paginate(number)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === number ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' : ''}`}>{number}</a>
                            </li>
                        ))}
                    </ul>
            </nav>
      </div>
    </div>
  </Layout>
);
}
export default ReadCompany;

