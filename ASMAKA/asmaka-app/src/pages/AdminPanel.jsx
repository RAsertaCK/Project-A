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
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={() => setAuthLoading(true)} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel Admin ASMAKA</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Keluar
        </button>
      </div>
      
      <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-blue-700">
          Halo, {user.email}. Di sini Anda dapat memoderasi aspirasi yang masuk. Aspirasi dengan status "Disetujui" akan ditampilkan di halaman publik.
        </p>
      </div>
      
      <AdminTable 
        aspirations={aspirations} 
        loading={loading} 
        onUpdate={fetchAspirations}
      />
    </div>
  );
};

export default AdminPanel;