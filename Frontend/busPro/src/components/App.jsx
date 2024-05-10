// import { useState,useEffect } from 'react'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
// import '../App.css'
// import axios from 'axios'

// function App() {
//   const [names, setNames] = useState([])
//   const [bus, setBus] = useState([])
//   useEffect(() =>{
//     axios.get('http://localhost:3000/')
//     .then((response) => {
//       setNames(response.data)
      
//     })
//   },[]);
  

//   const fetchNewPage = () => {
//     axios.get('http://localhost:3000/new')
//       .then((response) => {
//         setBus(response.data);
//         console.log(response.data)
//       })
//       .catch((error) => {
//         console.error('Error fetching new page data:', error);
//       });
    
//   };
//   return (
//     <>
//       <p>name :</p>
//       <ul>
//         {names.map((name) => (
//           <li key={name.id}>{name.name}</li>
//         ))}
//       </ul>
//       <button onClick={fetchNewPage}> Click Me for new page</button>
//       <p>buss :</p>
//       <ul>
//         {bus.map((nam) => (
//           <li key={nam.id}>{nam.namee}</li>
//         ))}
//       </ul>
      
//     </>
//   )
// }

// export default App
// App.js
// Filename - App.js

import React from "react";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "../pages/Home";
// import About from "./pages/about";
import Blogs from "../pages/Blogs";
import SignUp from "../pages/SignUp";
// import Contact from "../pages/contact";
import Buss from "../pages/Buss";
import Error from "../pages/Error";
import Navbar from "./Navigation";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import BusBook from "../pages/BusBook";
// import Tickets from '../pages/Tickets'
import Tickets from "../pages/Tickets";
// import { Login } from "@mui/icons-material";
import { AuthProvider } from './AuthContext.jsx';
function App() {
	return (
		<> 
			<AuthProvider>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/dashborad" element={<Dashboard />} />
				<Route exact path="/Register" element={<Register />} />
				<Route exact path="/Login" element={<Login />} />
				<Route exact path="/Buss" element={<Buss />} />
				{/* <Route
					exact path="/contact"
					element={<Contact />}
				/> */}
				<Route exact path="/blogs" element={<Blogs />} />
				<Route exact path="/busbook" element={<BusBook />} />
				
				<Route
					
				  exact	path="/sign-up"
					element={<SignUp />}
				/>
				<Route exact path="/tickets" element={<Tickets />} />
				<Route path="*" element={<Error />} />
			</Routes>
			</AuthProvider>
		</>
	);
}

export default App;

