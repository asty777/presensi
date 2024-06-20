import React from "react";
import Layout from "../components/LayoutComponent";
import Dashboardpng2 from "../assets/dashboard4.png";
import Dashboardpng3 from "../assets/dashboard8.png";
import UnitAmount from "../components/card/UnitAmount";
import UserAmount from "../components/card/UserAmount";
import CompanyAmount from "../components/card/CompanyAmount";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PresenceToday from "../components/table/PresenceToday";
import PresentAmount from "../components/card/TodayPresenceAmount";

const DashboardPage = () => {
  const userRole = localStorage.getItem('role');
  const userName = localStorage.getItem('name'); 

  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl">Dashboard</h1>
              </div>
              <div className="flex flex-col items-end">
              <p className="text-gray-700 text-lg dark:text-gray-400">Welcome, <span className="font-bold">{userName}</span></p>
                <p className="text-gray-700 text-sm dark:text-gray-400">{getCurrentDate()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <nav className="flex px-1 py-3 text-gray-700 rounded-lg dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li>
                    <div className="flex items-center">
                      <Link to="/dashboard" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Dashboard</Link>
                      <IoIosArrowForward className="rtl:rotate-180 block w-4 h-4 mx-1 text-gray-400" />
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            <div className="mt-8 w-full border border-gray-300 bg-white rounded-lg">
                <Carousel 
                    showThumbs={false} 
                    autoPlay 
                    interval={3000} 
                    infiniteLoop 
                    className="w-full h-full"
                >
                    <div>
                        <img src={Dashboardpng2} alt="Sample Image 1" style={{ width: '100%', height: '400px' }} />
                    </div>
                    <div>
                        <img src={Dashboardpng3} alt="Sample Image 2" style={{ width: '100%', height: '400px' }} />
                    </div>
                    <div>
                        <img src={Dashboardpng2} alt="Sample Image 3" style={{ width: '100%', height: '400px' }} />
                    </div>
                </Carousel>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-5 mt-8">
              {userRole === 'Admin Company' ? (
                <>
                  <UnitAmount />
                  <UserAmount />
                  <PresentAmount/>
                </>
              ) : (
                <CompanyAmount />
              )}
            </div>
          </div>
        </div>
        {userRole === "Admin Company" && <PresenceToday />}
      </Layout>
    </div>
  );
}

export default DashboardPage;







