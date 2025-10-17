import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-gray-300 mb-4 animate-bounce-subtle">404</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Halaman Tidak Ditemukan</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak ditemukan. Mungkin halaman tersebut telah dipindahkan atau dihapus.
        </p>
        <Link 
          to="/" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-block hover-lift shadow-md"
        >
          🏠 Kembali ke Beranda
        </Link>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
          <Link to="/" className="gradient-card rounded-xl p-4 text-center hover-lift">
            <div className="text-2xl mb-2">🌟</div>
            <div className="font-semibold text-gray-800">Aspirasi</div>
          </Link>
          <Link to="/submit" className="gradient-card rounded-xl p-4 text-center hover-lift">
            <div className="text-2xl mb-2">📝</div>
            <div className="font-semibold text-gray-800">Kirim Aspirasi</div>
          </Link>
          <Link to="/admin" className="gradient-card rounded-xl p-4 text-center hover-lift">
            <div className="text-2xl mb-2">🔐</div>
            <div className="font-semibold text-gray-800">Admin</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;