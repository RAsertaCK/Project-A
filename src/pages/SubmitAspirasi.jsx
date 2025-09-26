import React from 'react';
import Form from '../components/Form';

const SubmitAspirasi = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="animate-float mb-4">
              <span className="text-6xl">📝</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kirim Aspirasi Anonim
            </h1>
            <p className="text-xl text-gray-600">
              Sampaikan pandangan, kritik, dan saran Anda untuk KMK secara anonim dan aman
            </p>
          </div>

          {/* Info Boxes */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="gradient-card rounded-xl p-4 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-800">Aman & Anonim</h3>
              <p className="text-sm text-gray-600">Identitas Anda terlindungi</p>
            </div>
            <div className="gradient-card rounded-xl p-4 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-800">Cepat & Mudah</h3>
              <p className="text-sm text-gray-600">Hanya butuh 5 menit</p>
            </div>
            <div className="gradient-card rounded-xl p-4 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-semibold text-gray-800">Membangun</h3>
              <p className="text-sm text-gray-600">Untuk KMK yang lebih baik</p>
            </div>
          </div>
          
          {/* Form */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitAspirasi;