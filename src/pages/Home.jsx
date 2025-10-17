import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import AspirasiCard from '../components/AspirasiCard';
import Loader from '../components/Loader';

const Home = () => {
  const [aspirations, setAspirations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState('all');

  useEffect(() => {
    const q = query(
      collection(db, 'aspirations'),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const aspirasiData = [];
      querySnapshot.forEach((doc) => {
        aspirasiData.push({ id: doc.id, ...doc.data() });
      });
      setAspirations(aspirasiData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching aspirations:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter aspirations by rating
  const filteredAspirations = aspirations.filter(asp => {
    if (filterRating === 'all') return true;
    if (filterRating === 'high') return asp.question3 >= 4;
    if (filterRating === 'medium') return asp.question3 === 3;
    if (filterRating === 'low') return asp.question3 <= 2;
    return true;
  });

  // Calculate average rating
  const averageRating = aspirations.length > 0 
    ? (aspirations.reduce((sum, a) => sum + (a.question3 || 0), 0) / aspirations.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="animate-float mb-6">
            <img 
              src="/logo-kmk-180.png" 
              alt="Logo KMK" 
              className="w-16 h-16 mx-auto" 
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Aspirasi untuk KMK
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Wadah aspirasi dan feedback untuk kemajuan KMK bersama
          </p>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{aspirations.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Aspirasi Terpublikasi</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
            <div className="text-gray-600 dark:text-gray-300">Anonim</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Tersedia</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">{averageRating}/5</div>
            <div className="text-gray-600 dark:text-gray-300">Rating Rata-rata</div>
          </div>
        </div>

        {/* Filter Section */}
        {aspirations.length > 0 && (
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Aspirasi Publik ({filteredAspirations.length})
            </h2>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Rating</option>
              <option value="high">⭐ 4-5 (Tinggi)</option>
              <option value="medium">⭐ 3 (Sedang)</option>
              <option value="low">⭐ 1-2 (Rendah)</option>
            </select>
          </div>
        )}

        {/* Aspirasi List */}
        {loading ? (
          <Loader />
        ) : filteredAspirations.length > 0 ? (
          <div className="space-y-6">
            {filteredAspirations.map((aspirasi, index) => (
              <div 
                key={aspirasi.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AspirasiCard aspirasi={aspirasi} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center animate-fade-in shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4">
              {aspirations.length === 0 ? '😢' : '🔍'}
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              {aspirations.length === 0 ? 'Belum ada aspirasi yang disetujui' : 'Tidak ada aspirasi dengan filter ini'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {aspirations.length === 0 
                ? 'Jadilah yang pertama mengirimkan aspirasi untuk KMK!' 
                : 'Coba ubah filter rating untuk melihat lebih banyak aspirasi.'}
            </p>
            <a 
              href="/submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-300 inline-block hover:shadow-lg"
            >
              {aspirations.length === 0 ? '✨ Kirim Aspirasi Pertama' : '📝 Kirim Aspirasi Baru'}
            </a>
          </div>
        )}

        {/* Footer CTA */}
        {aspirations.length > 0 && (
          <div className="text-center mt-12 animate-fade-in">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Punya aspirasi juga?
              </h3>
              <p className="mb-6 opacity-90">
                Sampaikan pendapatmu untuk kemajuan KMK bersama
              </p>
              <a 
                href="/submit" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg transition-all duration-300 inline-block hover:shadow-lg font-semibold"
              >
                📝 Kirim Aspirasi Sekarang
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;