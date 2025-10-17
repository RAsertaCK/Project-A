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

  // Calculate statistics
  const stats = {
    total: aspirations.length,
    pending: aspirations.filter(a => a.status === 'pending').length,
    approved: aspirations.filter(a => a.status === 'approved').length,
    rejected: aspirations.filter(a => a.status === 'rejected').length,
    averageRating: aspirations.length > 0 
      ? (aspirations.reduce((sum, a) => sum + (a.question3 || 0), 0) / aspirations.length).toFixed(1)
      : 0
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={() => setAuthLoading(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                🎯 Dashboard Admin ASMAKA
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Halo, <span className="text-blue-600 dark:text-blue-400 font-semibold">{user.email}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center"
            >
              🚪 Keluar
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-lg">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm opacity-90">Total Aspirasi</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-4 text-white shadow-lg">
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-sm opacity-90">Menunggu Review</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white shadow-lg">
            <div className="text-2xl font-bold">{stats.approved}</div>
            <div className="text-sm opacity-90">Telah Dipublikasi</div>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-4 text-white shadow-lg">
            <div className="text-2xl font-bold">{stats.rejected}</div>
            <div className="text-sm opacity-90">Ditolak</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg">
            <div className="text-2xl font-bold">{stats.averageRating}</div>
            <div className="text-sm opacity-90">Rating Rata-rata</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            📊 Ringkasan Moderasi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="font-semibold text-blue-600 dark:text-blue-400">
                {((stats.approved / stats.total) * 100 || 0).toFixed(1)}%
              </div>
              <div className="text-gray-600 dark:text-gray-300">Tingkat Persetujuan</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="font-semibold text-green-600 dark:text-green-400">
                {stats.pending}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Perlu Tindakan</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="font-semibold text-purple-600 dark:text-purple-400">
                {stats.total}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Total Masuk</div>
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
        <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
          <p>© 2025 ASMAKA - Aspirasi Massa KMK</p>
          <p className="text-sm">Dashboard Admin v1.1 • Terakhir update: {new Date().toLocaleDateString('id-ID')}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;