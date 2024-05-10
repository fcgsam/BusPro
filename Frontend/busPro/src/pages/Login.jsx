import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import Input from '../components/Inputbox';
import { useNavigate } from 'react-router-dom';
// import useAuth from '../components/useAuth.jsx';
import { useAuth } from '../components/AuthContext.jsx';

function Login() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();


    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email: formData.email,
        password: formData.password
      });

      const { token, user } = response.data;

      // Store token and user in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update authentication state
      login();

      // Redirect to the home page
      navigate('/');
      toast.success(`Welcome, ${user.name}`)
    } catch (error) {
      console.error('Error logging in:', error);
    }

    

    // try {
        // axios.post("http://localhost:3000/api/login", { email:formData.email, password:formData.password })
        // .then(response => {

        //   const { token, user } = response.data;
        //   console.log("266 :",user)
        //   localStorage.setItem("token", token); // Store token in local storage
        //    // Log auth status
        //   localStorage.setItem("auth",true)
        //   localStorage.setItem("user", JSON.stringify(user));
          
        //   console.log("28")
        //   navigate("/"); // Redirect to the home page
        // }).catch(error => {
        //     setFormData({email:'',password:''})
        //     toast.error('Error logging in:', error);
        //   });
        // login(formData.email, formData.password);
    // } catch (error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     const errorMessage = error.response.data.error;
    //     toast.error(errorMessage);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     toast.error('No response received from the server');
    //   } else {
    //     // Something happened in setting up the request that triggered an error
    //     toast.error('Error submitting data');
      // }
    // }
  };

  return (
    <>
   <div className="flex justify-center items-center h-screen" style={{marginTop:'50px'}}>
  <div className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-center items-center">
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <label className="block mb-4" style={{marginBottom:'20px'}}>
        Email:<br />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        />
      </label>
      <label className="block mb-4" style={{marginBottom:'20px'}}>
        Password:<br />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your Password"
        />
      </label>
      <button type='supmit' className="animated-button">
        <span>Submit</span>
        <span></span>
      </button>

    </form>
  </div>
</div>


    </>
  );
}

export default Login;
