import React from 'react';

const AspirasiCard = ({ aspirasi }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Tanggal tidak tersedia';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="text-sm text-gray-500 mb-2">
        {formatDate(aspirasi.createdAt)}
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Pandangan terhadap KMK</h3>
        <p className="mt-1 text-gray-900">{aspirasi.question1}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Hal yang perlu dibenahi</h3>
        <p className="mt-1 text-gray-900">{aspirasi.question2}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Tingkat kepuasan (1-5)</h3>
        <div className="flex items-center mt-1">
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {aspirasi.question3}/5
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Alasan kepuasan</h3>
        <p className="mt-1 text-gray-900">{aspirasi.question4}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Kritik dan saran</h3>
        <p className="mt-1 text-gray-900">{aspirasi.question5}</p>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-gray-700">Pesan untuk KMK</h3>
        <p className="mt-1 text-gray-900">{aspirasi.question6}</p>
      </div>
    </div>
  );
};

export default AspirasiCard;