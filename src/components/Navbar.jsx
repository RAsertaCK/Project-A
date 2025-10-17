import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo dan Nama */}
          <Link 
            to="/" 
            className="flex items-center z-50"
            onClick={closeMenu}
          >
            <img 
              src="/logo-kmk-180.png" 
              alt="Logo KMK" 
              className="w-8 h-8 mr-3" 
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight">ASMAKA</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 leading-tight">Aspirasi Massa KMK</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            <Link 
              to="/" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              🏠 Aspirasi
            </Link>
            <Link 
              to="/submit" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              📝 Kirim Aspirasi
            </Link>
            <Link 
              to="/admin" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md"
            >
              🔐 Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Dark Mode Toggle Mobile */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* Animated Hamburger Button */}
            <button 
              className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-50 relative bg-gray-100 dark:bg-gray-800 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {/* Animated Hamburger Lines */}
              <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`md:hidden fixed inset-0 bg-black z-40 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
          }`} 
          onClick={closeMenu}
        ></div>

        {/* Mobile Menu Slide Panel */}
        <div 
          className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          
          {/* Header Mobile Menu */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo-kmk-180.png" 
                alt="Logo KMK" 
                className="w-10 h-10" 
              />
              <div className="flex flex-col">
                <span className="font-bold">ASMAKA</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Aspirasi Massa KMK</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-4 space-y-2">
            <Link 
              to="/" 
              className="flex items-center space-x-3 font-medium py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-gray-700 dark:text-gray-300"
              onClick={closeMenu}
            >
              <span>🏠</span>
              <span>Aspirasi</span>
            </Link>
            
            <Link 
              to="/submit" 
              className="flex items-center space-x-3 font-medium py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-gray-700 dark:text-gray-300"
              onClick={closeMenu}
            >
              <span>📝</span>
              <span>Kirim Aspirasi</span>
            </Link>
            
            <Link 
              to="/admin" 
              className="flex items-center space-x-3 font-medium py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
              onClick={closeMenu}
            >
              <span>🔐</span>
              <span>Admin Panel</span>
            </Link>
          </div>

          {/* Dark Mode Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              Mode: {isDarkMode ? '🌙 Dark' : '☀️ Light'}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;