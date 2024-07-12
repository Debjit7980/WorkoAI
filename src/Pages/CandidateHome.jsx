import React, { useEffect, useState } from 'react';
import Search from '../Components/Search';
import ListCard from '../Components/ListCard';
import { BsGlobeAmericas } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

function CandidateHome() {
  const [referrals, setReferrals] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showReferrals, setShowReferrals] = useState(true); // New state for visibility
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

  const fetchReferrals = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setReferrals(data.slice(0, 9)); // Set first 10 items for referrals
      setFilteredReferrals(data.slice(0, 9));
    } catch (error) {
      console.error('Error fetching referrals:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setServices(data.slice(10, 19));
      setFilteredServices(data.slice(10, 19));
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchReferrals();
    fetchServices();
  }, []);

  const handleShowReferrals = () => {
    setShowReferrals(true);
  };

  const handleShowServices = () => {
    setShowReferrals(false);
  };

  const handleSearch = (query1, query2) => {
    const queryId = parseInt(query1, 10);
    const queryUserId = parseInt(query2, 10);

    setFilteredReferrals(referrals.filter(referral => 
      (!isNaN(queryId) ? referral.id === queryId : true) && 
      (!isNaN(queryUserId) ? referral.id === queryUserId : true)
    ));
    
    setFilteredServices(services.filter(service => 
      (!isNaN(queryId) ? service.id === queryId : true) && 
      (!isNaN(queryUserId) ? service.id === queryUserId : true)
    ));
  };

  return (
    <div className='w-[100%] h-[100vh] pb-[12px] flex relative bg-[#07022e]'>
      <div className='flex absolute w-[100%] top-0 p-2 pt-4 justify-end items-center gap-[5rem] text-white z-10'>
        <Link to="/" className='mr-auto'>
          <div className='flex mr-auto items-center tracking-[4px] flex-row text-[1.6rem] ml-[12px] font-[600]'>
            W  <span className='mr-[4px]'><BsGlobeAmericas /></span> RKO
          </div>
        </Link>
        <button className='text-[16px] font-thin cursor-pointer' onClick={handleShowReferrals}>Referral</button>
        <button className='text-[16px] font-thin cursor-pointer' onClick={handleShowServices}>Services</button>
        {isLoggedIn ? (
          <>
            <Link to="/candidate/home" className='text-[16px] font-thin cursor-pointer'>Candidate</Link>
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
      <div className='w-[32%] h-[100vh] candidate-form'>
        <Search placeholder1="Search by Referral Id" placeholder2="Search by Service Id" onSearch={handleSearch}/>
      </div>

      <div className="cards-container flex flex-col gap-[50px] w-[68%] h-[88%] overflow-y-scroll z-1 mt-[5rem] candidate">
        {showReferrals && (<><h1 className='mt-[1rem] text-white ml-[2%] text-[32px]'>Referral</h1>
          <ListCard title="Referrals" items={filteredReferrals} /></>)}
        {!showReferrals && (<><h1 className='mt-[1rem] text-white ml-[2%] text-[32px]'>Services</h1>
          <ListCard title="Services" items={filteredServices}/></>)}
      </div>
    </div>
  );
}

export default CandidateHome;
