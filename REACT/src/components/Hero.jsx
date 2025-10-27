import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className=" min-h-[90vh] flex flex-col justify-center items-center text-center text-white hero-section"
    >
      <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Your Ticket. Your World.</h1>
      <p className="text-lg mb-8 sm:text-2xl lg:text-2xl lg:max-lg  max-w-md mx-auto font-bold text-yellow-300 italic">
        Manage, book, and track your tickets easily — all in one place.
      </p>
      <Link to="/signUp" className="px-6 py-4 sm:text-2xl bg-blue-600 hover:bg-blue-700 rounded-lg font-bold italic">
        Get Started
      </Link>
     
   
    </section>
  );
};


export default Hero;