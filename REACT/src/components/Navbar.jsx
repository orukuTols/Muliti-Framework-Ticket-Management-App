import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const { currentUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
   
    <nav className="grid grid-cols-3 items-center bg-black w-full p-[3vw]  sm:p-[2vw] gap-[10px]">
      
      
      <div className="flex justify-center items-center  transition  col-span-3 sm:col-span-2 sm:justify-start   container mx-auto  hover:text-yellow-300 ">
        <Link to="/" className="text-3xl font-bold hover:text-yellow-300 text-yellow-500 italic">
       
        Tolu's Tickets
        </Link></div>
     

     
        <div className="space-x-4 flex justify-center items-center  transition  col-span-3 sm:col-span-1 sm:justify-end ">
          
          {currentUser ? ( // ⬅️ 3. Conditional Rendering
            <>
              {/* Show user's email or a simple greeting */}
              <span className="text-sm text-gray-400 hidden sm:inline">
                Welcome, {currentUser.email.split('@')[0]}
              </span>
              
              {/* Show the Logout button */}
              <button 
                onClick={handleLogout} 
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            // User is NOT logged in, show Login/Sign Up links
            <>
                  <Link to="/login" className="text-lg font-bold bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-transparent hover:border-blue-900 border border-transparent transition duration-300" href="">
          Login
        </Link>
        
    
        <Link to="/signUp" className="text-lg font-bold bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-transparent hover:text-red hover:border-red-900 border border-transparent transition duration-300"  href="">
          Sign-Up
        </Link>
            </>
          )}
        </div>
  
    </nav>

       
   );
};

export default Navbar;