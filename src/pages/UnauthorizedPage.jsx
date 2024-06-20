// src/pages/UnauthorizedPage.js
import React from 'react';
import Error from "../assets/error2.svg";
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div>
       <div class="flex justify-center items-center h-screen flex-col">
        <img src={Error} class="mx-auto" width="300" alt="Icon"/>
        <h4 class="text-center text-slate-600  text-xl mt-4">Anda tidak diizinkan mengakses halaman ini!</h4>
        <div class="mt-3">
            <Link to="/Dashboard">
              <button type="button" class="mt-5 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-80/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Kembali</button>
            </Link>
        </div>
    </div>
    </div>
  );
};

export default UnauthorizedPage;
