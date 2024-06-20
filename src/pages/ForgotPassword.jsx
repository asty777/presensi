import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertComponent from '../components/AlertComponent';
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const [showNewPassword, setShowNewPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            await AlertComponent.ResetConfirmation("Reset Password");
            const response = await axios.post("http://192.168.10.103:8008/company/reset-pw", { email, newPassword });
            setMessage(response.data.message);
            navigate('/login'); 
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };
    
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#CAD7FD] to-[#CBF3EC] via-[#CBD6FF]">
            <div className="bg-white bg-opacity-50 p-6 rounded-lg max-w-md w-full mx-4">
                <h1 className="text-2xl mb-7 text-center">Reset Password</h1>
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <div className="mb-4 w-full">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-full text-sm"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 w-full relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            name="newPassword"
                            className="w-full px-3 py-2 border rounded-full text-sm"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={toggleNewPasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                        >
                            {showNewPassword ? <HiOutlineEye size={20} className="text-gray-500" /> : <HiOutlineEyeOff size={20} className="text-gray-500" />}
                        </button>
                    </div>
                    <div className="mb-4 w-full relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full px-3 py-2 border rounded-full text-sm"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                        >
                            {showConfirmPassword ? <HiOutlineEye size={20} className="text-gray-500" /> : <HiOutlineEyeOff size={20} className="text-gray-500" />}
                        </button>
                    </div>

                    <button type="submit" className="bg-[#99AEF9] text-white px-4 py-2 rounded-full mt-2">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;









