import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          ASMAKA
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Aspirasi
          </Link>
          <Link to="/submit" className="hover:underline">
            Kirim Aspirasi
          </Link>
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;