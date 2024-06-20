import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import Layout from "../../components/LayoutComponent";
import DeleteAlert from "../../components/modal/DeleteAlert";
import Swal from 'sweetalert2';
import LoadingComponent from "../../components/LoadingComponent";
import UpdateUnitModal from "../../components/modal/UpdateUnitModal";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const UnitPage = () => {
  const [units, setUnits] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState(null);

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

  const handleDeleteUnit = async (unitId) => {
    try {
      const result = await DeleteAlert();
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
       
        await axios.delete(`http://192.168.10.103:8008/company/unit/${unitId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        Swal.fire('Terhapus!', 'Unit telah berhasil dihapus.', 'success');
        fetchUnitsData();
      }
    } catch (error) {
      console.error('Failed to delete unit:', error.message);
    }
  };

  const openModal = (unitId) => {
    setSelectedUnitId(unitId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUnitId(null);
    setIsModalOpen(false);
    fetchUnitsData();
  };

  if (units.length === 0) {
    return <LoadingComponent.TableLoading />;
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(units.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastUnit = currentPage * itemsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - itemsPerPage;

  const filteredUnits = units.filter(unit =>
    unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.entry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.exit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentUnits = filteredUnits.slice(indexOfFirstUnit, indexOfLastUnit);

  return (
    <Layout>
      <div className={`p-4 sm:ml-64 ${isModalOpen ? 'filter blur-sm' : ''}`}>
        <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-xl">Unit</h1>
          <nav className="flex px-1 py-3 text-gray-700  rounded-lg  dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    Dashboard
                </Link>
                </li>
                <li>
                <div className="flex items-center">
                    <IoIosArrowForward className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" />
                    <Link to="/unit" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Unit</Link>
                </div>
                </li>
            </ol>
          </nav>
          {location.state && location.state.successMessage && (
            <div className="p-4 mb-4 mt-3 text-sm text-green-700 bg-green-100 rounded-full dark:bg-green-200 dark:text-green-800" role="alert">
              {location.state.successMessage}
            </div>
          )}
          {location.state && location.state.AddUnitSuccessMessage && (
            <div className="p-4 mb-4 mt-3 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
              {location.state.AddUnitSuccessMessage}
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <Link to="/AddUnit">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block pt-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>
          <table className="w-full mt-8 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">No</th>
                <th scope="col" className="px-6 py-3">Nama</th>
                <th scope="col" className="px-6 py-3">Entry</th>
                <th scope="col" className="px-6 py-3">Exit</th>
                <th scope="col" className="px-6 py-3">Detail</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUnits.map((unit, index) => (
                <tr key={unit.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">{indexOfFirstUnit + index + 1}</td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">{unit.name}</td>
                  <td className="px-6 py-4">{unit.entry}</td>
                  <td className="px-6 py-4">{unit.exit}</td>
                  <td className="px-6 py-4">
                    <Link to={`/DetailUnit/${unit.guid_unit}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Lihat</Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(unit._id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline pr-2"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteUnit(unit._id)} className="font-medium text-red-500 dark:text-red-500 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstUnit + 1}-{Math.min(indexOfLastUnit, filteredUnits.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredUnits.length}</span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              {pageNumbers.map(number => (
                <li key={number}>
                  <button
                    onClick={() => paginate(number)}
                    className={`py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 ${currentPage === number ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 hover:text-gray-700'} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {isModalOpen && (
        <UpdateUnitModal unitId={selectedUnitId} closeModal={closeModal} />
      )}
    </Layout>
  );
};

export default UnitPage;



















 
