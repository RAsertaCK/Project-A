import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="gradient-bg text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold animate-slide-in flex items-center">
            <span className="text-3xl mr-2">🌟</span>
            ASMAKA
          </Link>
          <div className="space-x-4 md:space-x-6">
            <Link 
              to="/" 
              className="hover:text-blue-200 transition-colors duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
            >
              🏠 Aspirasi
            </Link>
            <Link 
              to="/submit" 
              className="hover:text-blue-200 transition-colors duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
            >
              📝 Kirim Aspirasi
            </Link>
            <Link 
              to="/admin" 
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium hover-lift shadow-md"
            >
              🔐 Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;