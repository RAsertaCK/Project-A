import React, { useState } from 'react';
import { db } from '../services/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

const AdminTable = ({ aspirations, loading, onUpdate }) => {
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedAspirasi, setSelectedAspirasi] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const aspirationRef = doc(db, 'aspirations', id);
      await updateDoc(aspirationRef, { status: newStatus });
      onUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Gagal mengubah status aspirasi');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus aspirasi ini?')) {
      return;
    }

    setDeletingId(id);
    try {
      const aspirationRef = doc(db, 'aspirations', id);
      await deleteDoc(aspirationRef);
      onUpdate();
    } catch (error) {
      console.error('Error deleting aspiration:', error);
      alert('Gagal menghapus aspirasi');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Tanggal tidak tersedia';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status === 'pending' ? 'Menunggu' : status === 'approved' ? 'Disetujui' : 'Ditolak'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (aspirations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">Tidak ada data aspirasi</p>
      </div>
    );
  }

  return (
    <>
      {selectedAspirasi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Detail Aspirasi</h3>
              <button 
                onClick={() => setSelectedAspirasi(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Tanggal</h4>
              <p className="text-gray-900">{formatDate(selectedAspirasi.createdAt)}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Pandangan terhadap KMK</h4>
              <p className="text-gray-900">{selectedAspirasi.question1}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Hal yang perlu dibenahi</h4>
              <p className="text-gray-900">{selectedAspirasi.question2}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Tingkat kepuasan</h4>
              <p className="text-gray-900">{selectedAspirasi.question3}/5</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Alasan kepuasan</h4>
              <p className="text-gray-900">{selectedAspirasi.question4}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Kritik dan saran</h4>
              <p className="text-gray-900">{selectedAspirasi.question5}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Pesan untuk KMK</h4>
              <p className="text-gray-900">{selectedAspirasi.question6}</p>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => handleStatusChange(selectedAspirasi.id, 'approved')}
                disabled={updatingId === selectedAspirasi.id || selectedAspirasi.status === 'approved'}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Setujui
              </button>
              <button
                onClick={() => handleStatusChange(selectedAspirasi.id, 'rejected')}
                disabled={updatingId === selectedAspirasi.id || selectedAspirasi.status === 'rejected'}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Tolak
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kepuasan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {aspirations.map((aspirasi) => (
                <tr key={aspirasi.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(aspirasi.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(aspirasi.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {aspirasi.question3}/5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedAspirasi(aspirasi)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Lihat
                    </button>
                    <button
                      onClick={() => handleStatusChange(aspirasi.id, 'approved')}
                      disabled={updatingId === aspirasi.id || aspirasi.status === 'approved'}
                      className="text-green-600 hover:text-green-900 disabled:opacity-50"
                    >
                      {updatingId === aspirasi.id ? 'Memproses...' : 'Setujui'}
                    </button>
                    <button
                      onClick={() => handleStatusChange(aspirasi.id, 'rejected')}
                      disabled={updatingId === aspirasi.id || aspirasi.status === 'rejected'}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {updatingId === aspirasi.id ? 'Memproses...' : 'Tolak'}
                    </button>
                    <button
                      onClick={() => handleDelete(aspirasi.id)}
                      disabled={deletingId === aspirasi.id}
                      className="text-gray-600 hover:text-gray-900 disabled:opacity-50"
                    >
                      {deletingId === aspirasi.id ? 'Menghapus...' : 'Hapus'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminTable;