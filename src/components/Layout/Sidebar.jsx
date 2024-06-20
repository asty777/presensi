import React from 'react';
import { GoHome } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { IoMdFitness } from "react-icons/io";
import { FiLogOut } from "react-icons/fi"; 
import AlertComponent from '../AlertComponent';
import { useNavigate } from 'react-router-dom';
import { FaLayerGroup } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen }) => {
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    AlertComponent.LogoutConfirmation("Pemberitahuan!").then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
      }
    });
  };

  const itemCompanySidebar = [
    {
      name: "Dashboard",
      icon: GoHome,
      path: "/dashboard",
    },
    {
      name: "User",
      icon: CiUser,
      path: "/user",
    },
    {
      name: "Unit",
      icon:  FaLayerGroup,
      path: "/unit",
    },
    {
      name: "Logout", 
      icon: FiLogOut,
      onClick: handleLogout, 
    },
  ];

  const itemAdminSidebar = [
    {
        name: "Dashboard",
        icon: GoHome,
        path: "/dashboard",
    },

    {
      name: "Company",
      icon: GoHome,
      path: "/ReadCompany",
    },
    {
      name: "Logout", 
      icon: FiLogOut,
      onClick: handleLogout, 
    },
  ];

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {userRole === 'Admin Company' &&
            itemCompanySidebar.map((item, index) => (
              <li key={index}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <item.icon
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span className="ml-3">{item.name}</span>
                  </button>
                ) : (
                  <a
                    href={item.path}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <item.icon
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span className="ml-3">{item.name}</span>
                  </a>
                )}
              </li>
            ))}
          {userRole === 'Super Admin' &&
            itemAdminSidebar.map((item, index) => (
              <li key={index}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <item.icon
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span className="ml-3">{item.name}</span>
                  </button>
                ) : (
                  <a
                    href={item.path}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <item.icon
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span className="ml-3">{item.name}</span>
                  </a>
                )}
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;


