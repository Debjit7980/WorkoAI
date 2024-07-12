import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BsGlobeAmericas } from "react-icons/bs";
import Search from '../Components/Search';

function LandingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        setIsLoading(true);
        setTimeout(() => {
            localStorage.removeItem('user');
            setIsLoggedIn(false);
            setIsLoading(false);
            navigate('/');
        }, 2000); // Simulate a loading delay of 2 seconds
    };

    return (
        <div className='w-[100%] h-[100vh] flex relative'>
            <div className='flex absolute w-[100%] top-0 p-2 pt-4 justify-end items-center gap-[5rem] text-white z-[100]'>
                <Link to="/" className='mr-auto'>
                    <div className='flex mr-auto items-center tracking-[4px] flex-row text-[1.6rem] ml-[12px] font-[600]'>
                        W  <span className='mr-[4px]'><BsGlobeAmericas /></span> RKO
                    </div>
                </Link>

                {isLoggedIn ? (
                    <>
                        <Link to="/candidate/home" className='text-[20px] font-thin cursor-pointer'>Candidate</Link>
                        <button
                            className='gradient-btn mr-[1rem] cursor-pointer rounded-[30px] mt-0 mb-1 p-2 w-[120px] items-center justify-center flex'
                            onClick={handleLogout}
                        >
                            {isLoading ? (
                                <div className="spinner"></div>
                            ) : (
                                'Logout'
                            )}
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className='text-[20px] font-thin cursor-pointer'>Candidate</Link>
                        <Link to="/login" className='gradient-btn mr-[1rem] cursor-pointer rounded-[30px] mt-0 mb-1 p-2 w-[120px] items-center justify-center flex'>Login</Link>
                    </>
                )}
            </div>
            <div className='w-[37%]  bg-[#07022e]'>
                <Search placeholder1="Search by Company name..." placeholder2="Search by Industry type..."/>
            </div>
            <div className='w-[65%] border border-black flex'>
                <div className='w-[20%] custom-gradient z-0'></div>
                <div className='w-[20%] custom-gradient-box z-0'></div>
                <div className='w-[20%] custom-gradient-box middle z-10'></div>
                <div className='w-[20%] custom-gradient-box last z-0'></div>
                <div className='w-[20%]  bg-[#07022e]'></div>
            </div>
            <div className='absolute top-[48%]  left-[65%] z-[100]'>
                <span className='text-[5.5rem] font-bold text-white '>Welcome .</span>
                <div className='text-white w-[220px] ml-auto'>
                    <span>Discover success with Worko, where Referrals lead to rewarding outcomes</span>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
