// Filename - "./components/Navbar.js

import React, { useState,useEffect } from "react";
// import { Nav, NavLink, NavMenu } from "./NavbarElements";
import { Link, NavLink } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import { Dropdown } from 'flowbite-react';
// import { Logout } from "@mui/icons-material";
// import DropdownMenu from "./Dropdwon";
// import useAuth from './useAuth';
// const { token, logout } = useAuth();
import { useAuth } from './AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();



  const handleLogout = () => {
    // Logic for handling logout
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    toast.success("Logout successfully")
  };
  
	return (
		<>	
		<div >


<nav className="top-0 left-0 right-0 z-10 bg-first-color navBar" style={{ backgroundColor: '#27374D',width:'100%' ,minWidth: '100vh'}}>
  <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
  <NavLink  to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
        <span className="self-center text-2xl font-semibold whitespace-nowrap " style={{color:'#DDE6ED'}}>BusPro</span>
    </NavLink>
    {/* <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button> */}
    <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown" style={{zIndex:'9999'}}>
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
        <li className="rounded bg-white dark:text-white ">
    <NavLink to="/" className="block py-2 px-3 md:p-0 " activestyle="true" style={{paddingTop: '4.5px',color:'#DDE6ED'}}>Home</NavLink>
</li>
<li className="rounded bg-white">
    <Dropdown label="More" dismissOnClick={true} className="block py-2 px-3 md:p-0" style={{color:'#DDE6ED'}}>
        
            <NavLink to="/dashborad" activestyle="true">
              <Dropdown.Item style={{paddingLeft: '2rem',paddingTop:'3px', width: '10rem', backgroundColor: 'white', ':hover': { backgroundColor: 'blue' } }}>Dashboard</Dropdown.Item>
            </NavLink>
        

            <NavLink to="/blogs" activestyle="true">
              <Dropdown.Item style={{paddingLeft: '2rem', width: '10rem', backgroundColor: 'white', ':hover': { backgroundColor: 'blue' } }}>Blogs</Dropdown.Item>
            </NavLink>
           
            {isLoggedIn ? (
        // <NavLink to="/logout" activestyle="true" onClick={handleLogout}>
       <>
          <Dropdown.Item style={{ paddingLeft: '2rem', width: '10rem', backgroundColor: 'white', ':hover': { backgroundColor: 'blue' } }} onClick={handleLogout}>Logout</Dropdown.Item>
          <NavLink to="/tickets" activestyle="true" >
           <Dropdown.Item style={{ paddingLeft: '2rem', width: '10rem', backgroundColor: 'white', ':hover': { backgroundColor: 'blue' } }}>Tickets</Dropdown.Item>
        </NavLink>
        </>
      ) : (
        <>
        <NavLink to="/register" activestyle="true" >
           <Dropdown.Item style={{ paddingLeft: '2rem', width: '10rem', backgroundColor: 'white', ':hover': { backgroundColor: 'blue' } }}>Register</Dropdown.Item>
        </NavLink>
        <NavLink to="/login" activestyle="true">
        <Dropdown.Item style={{ paddingLeft: '2rem', width: '10rem', backgroundColor: 'white', ':hover': { backgroundColor: 'blue' } }}>Login</Dropdown.Item>
        </NavLink>
        </>
      )}
        
    </Dropdown>
</li>



      </ul>
    </div>
  </div>
</nav>

		</div>
		</>
	);
};

export default Navbar;
