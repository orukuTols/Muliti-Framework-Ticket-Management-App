
import React, { useState } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    setError('');       

    try {
     
      const userCredential = await createUserWithEmailAndPassword(
        auth,email,password) 
      console.log('User signed up successfully:', userCredential.user);
      alert(`Welcome, ${userCredential.user.email}! Account created.`);
  navigate('/login');
    } catch (error) {
      setError(error.message);
      console.error("Sign Up Error:", error.message);
    }
  };


  return (
  
    
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className=" bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Create Your Account</h1>
        

        {error && <p className="text-white-500 mb-4 text-center border border-green-500 p-2 rounded font-bold italics">{error}</p>}
        
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-yellow-500 text-sm font-bold italics mb-1">Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring-yellow-400 focus:border-yellow-400 text-white"
            />
          </div>
          
          {/* Password Field */}
          <div>
            <label className="block text-yellow-500 text-sm font-bold italics  mb-1">Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} // Updates 'password' state
              required
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring-yellow-400 focus:border-yellow-400 text-white"
            />
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

  


export default SignUpPage;