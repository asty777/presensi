import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaInstagram, FaTwitterSquare, FaLinkedin, FaCamera, FaChartLine, FaUsers, FaBell, FaMobileAlt, FaRegCheckCircle, FaRegChartBar, FaRegEye, FaRegSmile } from 'react-icons/fa';
import ProfileImage1 from "../assets/profile.png";

const LandingPage = () => {

    return (
        <div className="bg-gradient-to-b from-[#e7f6ff] to-[#fff7ea] font-montserrat">

            <header className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
                <Link to="/" className='flex items-center'>
                    <h1 className='text-3xl font-bold text-gray-700 italic'>Presensi</h1>
                </Link>
            </header>

            <section className='text-gray-700 bg-gradient-to-r from-[#e0f7fa] to-[#ffffff]'>
                <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                    <h1 className='text-5xl font-bold md:py-6'>
                        Revolutionize Your Employee Attendance
                    </h1>
                    <p className='text-xl font-medium py-4'>
                        An easy-to-use, secure, and efficient attendance system.
                    </p>
                    <Link to="/Login">
                        <button className='hover:bg-[#9cd5dd] bg-[#fef5ea] border border-[#e0a3cf] rounded-full w-[200px] font-medium py-3 text-gray-700 mt-5 transition-transform transform hover:scale-105 duration-300'>
                            Get Started Now
                        </button>
                    </Link>
                </div>
            </section>


            <section id="features" className='w-full bg-gradient-to-r from-[#e0f7fa] to-[#ffffff] py-16 px-4'>
                <div className='max-w-[1240px] mx-auto'>
                    <h2 className='text-3xl font-bold text-center text-gray-700 mb-8'>Key Features of the Attendance System</h2>
                    <div className='grid md:grid-cols-2 gap-8'>
                        <div className='flex flex-col md:flex-row items-center text-center md:text-left p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 4 border-l-4 border-blue-500'>
                            <FaCamera className='text-5xl mb-4 md:mb-0 md:mr-4 text-blue-500' />
                            <div>
                                <h3 className='text-xl font-bold mb-2'>Automated Attendance Recording</h3>
                                <p>Automatically record employee attendance through photo submissions.</p>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row items-center text-center md:text-left p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300  border-l-4 border-green-500'>
                            <FaChartLine className='text-5xl mb-4 md:mb-0 md:mr-4 text-green-500' />
                            <div>
                                <h3 className='text-xl font-bold mb-2'>Real-Time Attendance Reports</h3>
                                <p>Get real-time attendance reports and performance analysis.</p>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row items-center text-center md:text-left p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300  border-l-4 border-purple-500'>
                            <FaUsers className='text-5xl mb-4 md:mb-0 md:mr-4 text-purple-500' />
                            <div>
                                <h3 className='text-xl font-bold mb-2'>HR System Integration</h3>
                                <p>Seamlessly integrates with HR systems for better employee data management.</p>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row items-center text-center md:text-left p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300  border-l-4 border-red-500'>
                            <FaMobileAlt className='text-5xl mb-4 md:mb-0 md:mr-4 text-red-500' />
                            <div>
                                <h3 className='text-xl font-bold mb-2'>Easy Access via Mobile App</h3>
                                <p>Employees can access the attendance system through a user-friendly mobile app.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className='w-full  bg-gradient-to-r from-[#e0f7fa] to-[#ffffff] py-16 px-4'>
                <div className='max-w-[1240px] mx-auto'>
                    <h2 className='text-3xl font-bold text-center text-gray-700 mb-8'>Benefits of Using the Attendance System</h2>
                    <div className='grid md:grid-cols-2 gap-8'>
                        <div className='flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
                            <FaRegCheckCircle className='text-5xl mb-4 text-green-500' />
                            <h3 className='text-xl font-bold mb-2'>Efficiency and Productivity</h3>
                            <p>Increase operational efficiency and employee productivity by reducing manual recording time.</p>
                        </div>
                        <div className='flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
                            <FaRegChartBar className='text-5xl mb-4 text-blue-500' />
                            <h3 className='text-xl font-bold mb-2'>Data Accuracy</h3>
                            <p>Provide accurate and reliable attendance data, reducing the risk of human error.</p>
                        </div>
                        <div className='flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
                            <FaRegEye className='text-5xl mb-4 text-purple-500' />
                            <h3 className='text-xl font-bold mb-2'>Compliance and Transparency</h3>
                            <p>Ensure compliance with company policies and increase transparency in attendance management.</p>
                        </div>
                        <div className='flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
                            <FaRegSmile className='text-5xl mb-4 text-yellow-500' />
                            <h3 className='text-xl font-bold mb-2'>Employee Satisfaction</h3>
                            <p>Enhance employee satisfaction by providing an easy and efficient attendance management system.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* User Testimonials Section */}
            <section id="testimonials" className='w-full bg-gradient-to-r from-[#e0f7fa] to-[#ffffff] py-16 px-4'>
                <div className='max-w-[1240px] mx-auto'>
                    <h2 className='text-3xl font-bold text-center text-gray-700 mb-8'>User Testimonials</h2>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
                            <p className='text-gray-700 mb-4'>
                                "This attendance system has completely transformed the way we manage our employee records. It's efficient, accurate, and user-friendly."
                            </p>
                            <div className='flex items-center'>
                                <img className='w-12 h-12 rounded-full mr-4' src='https://www.shutterstock.com/image-vector/young-smiling-woman-mia-avatar-600nw-2127358541.jpg' alt='User 1' />
                                <div>
                                    <h4 className='text-lg font-bold'>Jasmine Doe</h4>
                                    <p className='text-gray-600'>HR Manager</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
                            <p className='text-gray-700 mb-4'>
                                "A game changer for our company! The real-time reports and mobile access are particularly useful."
                            </p>
                            <div className='flex items-center'>
                                <img className='w-12 h-12 rounded-full mr-4' src={ProfileImage1} alt='User 2' />
                                <div>
                                    <h4 className='text-lg font-bold'>Jane Smith</h4>
                                    <p className='text-gray-600'>Team Lead</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
                            <p className='text-gray-700 mb-4'>
                                "I highly recommend this attendance system to any organization looking to streamline their processes."
                            </p>
                            <div className='flex items-center'>
                                <img className='w-12 h-12 rounded-full mr-4' src='https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600nw-2107967969.jpg' alt='User 3' />
                                <div>
                                    <h4 className='text-lg font-bold'>Mike Johnson</h4>
                                    <p className='text-gray-600'>Operations Manager</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='bg-[#e7f6ff] py-8'>
                <div className='max-w-[1240px] mx-auto px-4'>
                    <div className='flex flex-col md:flex-row justify-between items-center text-gray-700'>
                        <p>&copy; 2024 Presensi. </p>
                        <div className='flex space-x-4 mt-4 md:mt-0'>
                            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'><FaFacebookSquare size={24} className='hover:text-gray-900 transition duration-300' /></a>
                            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'><FaInstagram size={24} className='hover:text-gray-900 transition duration-300' /></a>
                            <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'><FaTwitterSquare size={24} className='hover:text-gray-900 transition duration-300' /></a>
                            <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'><FaLinkedin size={24} className='hover:text-gray-900 transition duration-300' /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;