// import { useState,useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from './AuthContext';

// const useAuth = () => {
//   const auth = useContext(AuthContext); // Ensure this line is inside a functional component
//     const navigate = useNavigate();
//   const [token, setToken] = useState(localStorage.getItem('token') || null);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:3000/api/login", { email, password });
//       const { token, user } = response.data;

//       localStorage.setItem("token", token); // Store token in local storage
//       setToken(token); // Set token in state
//       localStorage.setItem("auth", true);
//       localStorage.setItem("user", JSON.stringify(user)); // Store user object

//       // navigate("/"); // Redirect to the home page
//     } catch (error) {
//       console.error('Login error:', error);
//       // Handle login error here (e.g., display error message)
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('auth');
//     localStorage.removeItem('user');
//     navigate("/login"); // Redirect to the login page after logout
//   };

//   return {
//     token,
//     auth,
//     login,
//     logout
//   };
// };

// export default useAuth;
