import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import AspirasiCard from '../components/AspirasiCard';
import Loader from '../components/Loader';

const Home = () => {
  const [aspirations, setAspirations] = useState([]);
  const [loading, setLoading] = useState(true);

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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
        </div>

        {/* Aspirasi List */}
        {loading ? (
          <Loader />
        ) : aspirations.length > 0 ? (
          <div className="space-y-6">
            {aspirations.map((aspirasi, index) => (
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
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Belum ada aspirasi yang disetujui
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Jadilah yang pertama mengirimkan aspirasi untuk KMK!
            </p>
            <a 
              href="/submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-300 inline-block hover:shadow-lg"
            >
              ✨ Kirim Aspirasi Pertama
            </a>
          </div>
        )}

        {/* Footer CTA */}
        {aspirations.length > 0 && (
          <div className="text-center mt-12 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Punya aspirasi juga?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Sampaikan pendapatmu untuk kemajuan KMK bersama
              </p>
              <a 
                href="/submit" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-all duration-300 inline-block hover:shadow-lg"
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