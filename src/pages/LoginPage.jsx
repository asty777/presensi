import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Login4 from "../assets/login4.png";
import { Link } from 'react-router-dom';
import AlertComponent from '../components/AlertComponent';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to decode the JWT token
    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://192.168.1.6:8008/company/login', { email, password })
            .then(result => {
                console.log(result);
                const { data } = result;
                if (data.token) {
                    const decodedToken = decodeToken(data.token);
                    console.log('Decoded Token:', decodedToken);
                    
                    if (decodedToken.status === false) {
                        AlertComponent.Error('Akun belum berlangganan');
                        return;
                    }

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('name', decodedToken.name); 
                    try {
                        const userRole = decodedToken.role;
                        console.log('User Role:', userRole);

                        if (userRole === 'Admin Company' || userRole === 'Super Admin') {
                            navigate('/Dashboard');
                        }
                        AlertComponent.SuccessLogin('Login successful');
                    } catch (error) {
                        console.error('Error decoding token:', error);
                    }
                }
            })
            .catch(err => {
                console.error('Login error:', err);
                AlertComponent.Error('Invalid email or password.');
            });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="flex justify-between min-h-screen font-sans">
            <div className="hidden relative w-1/2 bg-center bg-cover lg:block" style={{ backgroundImage: `url(${Login4})` }}>
                <div className="flex absolute bottom-20 justify-center w-full">
                    <div className="max-w-md text-center">
                        <span className="text-3xl font-bold leading-loose text-gray-900">
                            Control Your Business
                        </span>
                        <p className="font-light leading-7 text-gray-500">
                            With our attendance system, you can easily manage your employees' attendance.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex-1 mx-auto max-w-2xl">
                <div className="flex flex-col px-8 pt-10 lg:px-14 xl:px-24">
                    <div className="pt-20 pb-6">
                        <h1 className="text-3xl font-bold tracking-wide leading-loose whitespace-nowrap">
                            Login
                        </h1>
                        <span className="font-light text-gray-500">
                            Login now to manage your job made easy.
                        </span>
                        {error && <div className="mt-4 text-red-500">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="pt-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <div className="flex overflow-hidden items-center mt-2 w-full rounded-lg border border-gray-400 transition-all focus-within:shadow-lg focus-within:border-orange-500">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        className="text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="name@email.com" 
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="pt-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        id="password" 
                                        className="bg-white border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="password" 
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                                    >
                                        {showPassword ? <HiOutlineEye size={20} className="text-gray-500" /> : <HiOutlineEyeOff size={20} className="text-gray-500" />}
                                    </button>
                                </div>
                            </div>
                            <div className="pt-8">
                                <button
                                    type="submit"
                                    className="py-4 px-8 w-full text-white bg-[#718BDD] rounded-lg shadow-lg hover:bg-[#5279F1] focus:ring-4 focus:ring-red-100 focus:outline-none"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <div className="pt-4">
                        <div className="font-light text-center text-gray-500">
                            Forgot your password? 
                            <Link to="/ForgotPassword" className="font-normal text-teal-500 hover:text-teal-600">
                                Reset Password
                            </Link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;




