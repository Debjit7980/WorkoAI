import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsGlobeAmericas } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/candidate/home');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoading(true);
    setTimeout(() => {
      if (user && user.email === email && user.password === password) {
        setIsLoading(false);
        navigate('/candidate/home');
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid email or password');
        return;
      }
    }, 1200)

  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage(`Confirm Password doesn't match`);
      return;
    }

    const user = { email, password };
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoading(false);
      setIsSignUp(false);
      setErrorMessage('');
      setConfirmPassword("");
      setEmail("");
      setPassword("");
    }, 1200)

  };



  return (
    <div className='relative width-[100%] md:h-[100vh] bg-[#07022e]'>
      <div className='flex absolute w-[100%] top-0 p-2 pt-4 justify-end items-center gap-[5rem] text-white z-[100]'>
        <Link to="/" className='mr-auto'>
          <div className='flex mr-auto items-center tracking-[4px] flex-row text-[1.6rem] ml-[12px] font-[600]'>
            W  <span className='mr-[4px]'><BsGlobeAmericas /></span> RKO
          </div>
        </Link>

      </div>
      <div className='w-[100%] h-[100vh] flex items-center justify-center'>
        <div className='md:w-[26%] w-[80%] shadow-9xl pb-6 form mt-[2.5rem] md:mt-0'>
          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className='p-4 w-[95%] mx-auto gap-[30px] flex flex-col items-center justify-center'>
            <h1 className='mr-auto ml-[4%] text-white text-[1.4rem]'>{isSignUp ? 'Sign Up' : 'Login'}</h1>
            <div>
              <svg width="120px" height="120px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="9" r="3" stroke="#472f8f" strokeWidth="0.8" />
                <circle cx="12" cy="12" r="10" stroke="#472f8f" strokeWidth="0.8" />
                <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#472f8f" strokeWidth="0.8" strokeLinecap="round" />
              </svg>
            </div>
            <div className='w-[95%] h-[40px] relative'>
              <MdOutlineMail className='w-[20px] h-[20px] text-[#472f8f] absolute left-[10px] top-[10px] z-10' />
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required className='text-left bg-[#03001C] text-white pl-10 w-[100%] z-1 absolute top-0 left-0 h-[40px] rounded-[40px]  focus:outline-none' placeholder='Email' />
            </div>
            <div className='w-[95%] h-[40px] relative'>
              <RiLockPasswordFill className='w-[20px] h-[20px] text-[#472f8f] absolute left-[10px] top-[10px] z-10' />
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required className='text-left bg-[#03001C] text-white pl-10 w-[100%] z-1 absolute top-0 left-0 h-[40px] rounded-[40px]  focus:outline-none' placeholder='Password' />
            </div>
            {isSignUp && (
              <div className='w-[95%] h-[40px] relative'>
                <TiTickOutline className='w-[20px] h-[20px] text-[#472f8f] absolute left-[10px] top-[10px] z-10' />
                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required className='text-left bg-[#03001C] text-white pl-10 w-[100%] z-1 absolute top-0 left-0 h-[40px] rounded-[40px]  focus:outline-none' placeholder='Confirm Password' />
              </div>
            )}
            {/* {errorMessage && <p className='text-[#8f289c]'>{errorMessage}</p>} */}
            <button
              value="submit"
              className='gradient-btn rounded-[40px] flex w-[95%] p-2 text-white tracking-[1px] items-center justify-center'>
              {isSignUp ?
                (isLoading ?
                  (<div className="spinner"></div>)
                  : 'Sign Up')
                :
                (isLoading ?
                  (<div className="spinner"></div>)
                  : 'Login'
                )}
            </button>
          </form>
          {errorMessage && <p className='text-[#8f289c] ml-[24px] -mt-[5px] mb-[12px]'>{errorMessage}</p>}
          {!isSignUp ? (
            <p className='text-center text-white font-thin'>
              Don't have an account ?{' '}
              <span onClick={() => setIsSignUp(true)} className='cursor-pointer text-[#8f289c] font-[400]'>
                Sign Up
              </span>
            </p>
          ) : (<p className='text-center text-white font-thin'>
            Already have an account ?{' '}
            <span onClick={() => setIsSignUp(false)} className='cursor-pointer text-[#8f289c] font-[400]'>
              Login
            </span>
          </p>)}
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
