import React from 'react';
import Form from '../components/Form';

const SubmitAspirasi = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="animate-float mb-4">
              <img 
                src="/logo-kmk-180.png" 
                alt="Logo KMK" 
                className="w-16 h-16 mx-auto" 
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Kirim Aspirasi Anonim
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Sampaikan pandangan, kritik, dan saran Anda untuk KMK secara anonim dan aman
            </p>
          </div>

          {/* Info Boxes */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center animate-fade-in border border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Aman & Anonim</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Identitas Anda terlindungi</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center animate-fade-in border border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Cepat & Mudah</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Hanya butuh 5 menit</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center animate-fade-in border border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Membangun</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Untuk KMK yang lebih baik</p>
            </div>
          </div>
          
          {/* Form */}
          <div className="animate-fade-in">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitAspirasi;