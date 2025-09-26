import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from '../services/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import AdminTable from '../components/AdminTable';
import AdminLogin from '../components/AdminLogin';
import Loader from '../components/Loader';

const AdminPanel = () => {
  const [aspirations, setAspirations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchAspirations = () => {
    const q = query(collection(db, 'aspirations'), orderBy('createdAt', 'desc'));
    
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

    return unsubscribe;
  };

  useEffect(() => {
    if (user) {
      const unsubscribe = fetchAspirations();
      return () => unsubscribe();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={() => setAuthLoading(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="gradient-card rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🎯 Dashboard Admin ASMAKA
              </h1>
              <p className="text-gray-600">
                Halo, <span className="text-blue-600 font-semibold">{user.email}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover-lift shadow-md"
            >
              🚪 Keluar
            </button>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="gradient-card rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-2xl font-bold mb-4">Selamat Datang di Panel Admin!</h2>
          <p className="mb-4">
            Di sini Anda dapat memoderasi aspirasi yang masuk. Aspirasi dengan status "Disetujui" akan ditampilkan di halaman publik.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 p-4 rounded-lg">
              <div className="text-2xl font-bold">{aspirations.length}</div>
              <div>Total Aspirasi</div>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <div className="text-2xl font-bold">
                {aspirations.filter(a => a.status === 'pending').length}
              </div>
              <div>Menunggu Review</div>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <div className="text-2xl font-bold">
                {aspirations.filter(a => a.status === 'approved').length}
              </div>
              <div>Telah Dipublikasi</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <AdminTable 
          aspirations={aspirations} 
          loading={loading} 
          onUpdate={fetchAspirations}
        />

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>© 2025 ASMAKA - Sistem Aspirasi KMK</p>
          <p className="text-sm">Dashboard Admin v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;