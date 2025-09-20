import React from 'react';
import Form from '../components/Form';

const SubmitAspirasi = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Kirim Aspirasi Anonim</h1>
        <p className="text-gray-600 text-center mb-8">
          Sampaikan pandangan, kritik, dan saran Anda untuk KMK secara anonim
        </p>
        
        <Form />
      </div>
    </div>
  );
};

export default SubmitAspirasi;