import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import Input from '../components/Inputbox';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (!(validator.isEmail(formData.email))) {
      toast.error('Please Enter Valid Email');
      return;
    }

    if (formData.password1 !== formData.password2) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password1 == '') {
      toast.error('Please enter a password');
      return;
    }
    if (formData.password1.length < 5) {
      toast.error('Password must contain at least 5 characters');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/register', formData);
      console.log('Server response:', response.data);
      // Reset form after successful submission
      setFormData({ name: '', email: '' , password1: '', password2: ''});
      toast.success("Register Successfully")
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error('Error submitting data');
      }
    }
  };

  return (
    <>
   <div className="flex justify-center items-center h-screen" style={{marginTop:'50px'}}>
  <div className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-center items-center">
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <label className="block mb-10" style={{marginBottom:'20px'}}>
        Username:<br></br>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your Username"
        />
      </label>
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
          name="password1"
          value={formData.password1}
          onChange={handleChange}
          placeholder="Enter your Password"
        />
      </label>
      <label className="block mb-4" style={{marginBottom:'20px'}}> 
        Conferm:<br />
        <Input
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          placeholder="Conferm Password"
        />
      </label><br />
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

export default Register;
