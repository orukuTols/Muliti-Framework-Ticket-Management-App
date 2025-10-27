
import React from 'react';
import { useAuth } from '../context/AuthContext';
import LandingPage from '../pages/LandingPage';
import TicketManager from '../pages/TicketManager';

const HomeRouter = () => {
    const { currentUser, loading } = useAuth();
    
    if (loading) {
        
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <p className="text-xl text-blue-400">Loading  session...</p>
            </div>
        );
    }
    
    if (currentUser) {
return <TicketManager />;
    }
    
    // If no user is logged in, show the Landing Page.
    return <LandingPage />;
};

export default HomeRouter;