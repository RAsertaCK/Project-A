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

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600 bg-green-100 border-green-200';
    if (rating >= 3) return 'text-blue-600 bg-blue-100 border-blue-200';
    if (rating >= 2) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getRatingEmoji = (rating) => {
    if (rating >= 4) return '😊';
    if (rating >= 3) return '🙂';
    if (rating >= 2) return '😐';
    return '😞';
  };

  return (
    <div className="gradient-card rounded-2xl p-6 mb-6 hover-lift border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm text-gray-500 flex items-center">
          <span className="mr-2">📅</span>
          {formatDate(aspirasi.createdAt)}
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getRatingColor(aspirasi.question3)} flex items-center`}>
          <span className="mr-1">{aspirasi.question3}/5</span>
          <span>⭐</span>
          <span className="ml-1">{getRatingEmoji(aspirasi.question3)}</span>
        </div>
      </div>
      
      <div className="space-y-5">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-primary-600 mb-2 flex items-center">
            <span className="mr-2">👀</span>
            Pandangan terhadap KMK
          </h3>
          <p className="text-gray-800 leading-relaxed">{aspirasi.question1}</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-primary-600 mb-2 flex items-center">
            <span className="mr-2">🔧</span>
            Hal yang perlu dibenahi
          </h3>
          <p className="text-gray-800 leading-relaxed">{aspirasi.question2}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-primary-600 mb-2 flex items-center">
            <span className="mr-2">💡</span>
            Alasan kepuasan
          </h3>
          <p className="text-gray-800 leading-relaxed">{aspirasi.question4}</p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-primary-600 mb-2 flex items-center">
            <span className="mr-2">📋</span>
            Kritik dan saran
          </h3>
          <p className="text-gray-800 leading-relaxed">{aspirasi.question5}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
          <h3 className="text-sm font-semibold text-primary-600 mb-2 flex items-center">
            <span className="mr-2">💌</span>
            Pesan untuk KMK
          </h3>
          <p className="text-gray-800 leading-relaxed italic">"{aspirasi.question6}"</p>
        </div>
      </div>
    </div>
  );
};

export default AspirasiCard;