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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="animate-float mb-6">
            <span className="text-6xl">🌟</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Aspirasi untuk KMK
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wadah aspirasi dan feedback untuk kemajuan KMK bersama
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="gradient-card rounded-2xl p-6 text-center hover-lift animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl font-bold text-blue-600 mb-2">{aspirations.length}</div>
            <div className="text-gray-600">Aspirasi Terpublikasi</div>
          </div>
          <div className="gradient-card rounded-2xl p-6 text-center hover-lift animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Anonim</div>
          </div>
          <div className="gradient-card rounded-2xl p-6 text-center hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">Tersedia</div>
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
          <div className="gradient-card rounded-2xl p-12 text-center animate-fade-in">
            <div className="text-6xl mb-4 animate-pulse">😢</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Belum ada aspirasi yang disetujui
            </h3>
            <p className="text-gray-600 mb-6">
              Jadilah yang pertama mengirimkan aspirasi untuk KMK!
            </p>
            <a 
              href="/submit" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-block hover-lift shadow-md"
            >
              ✨ Kirim Aspirasi Pertama
            </a>
          </div>
        )}

        {/* Footer CTA */}
        {aspirations.length > 0 && (
          <div className="text-center mt-12 animate-fade-in">
            <div className="gradient-card rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Punya aspirasi juga?
              </h3>
              <p className="text-gray-600 mb-6">
                Sampaikan pendapatmu untuk kemajuan KMK bersama
              </p>
              <a 
                href="/submit" 
                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 inline-block hover-lift shadow-md"
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