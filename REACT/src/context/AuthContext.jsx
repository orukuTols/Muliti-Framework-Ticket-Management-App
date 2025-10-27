

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; 


const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};

//  The Provider component that wraps the entire app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Tracks if Firebase is still checking the session

  useEffect(() => {
   
    // the user logs in, logs out, or the session changes.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // 'user' is null if logged out, or the user object if logged in
      setLoading(false);    // The initial check is complete
    });

  
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
   
      {!loading && children} 
    </AuthContext.Provider>
  );
};