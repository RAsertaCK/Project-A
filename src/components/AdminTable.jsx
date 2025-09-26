import React, { useState } from 'react';
import { db } from '../services/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

const AdminTable = ({ aspirations, loading, onUpdate }) => {
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedAspirasi, setSelectedAspirasi] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

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
    const statusConfig = {
      pending: { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: '⏳',
        text: 'Menunggu' 
      },
      approved: { 
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: '✅',
        text: 'Disetujui' 
      },
      rejected: { 
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: '❌',
        text: 'Ditolak' 
      }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color} flex items-center`}>
        <span className="mr-1">{config.icon}</span>
        {config.text}
      </span>
    );
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Filter aspirations based on status
  const filteredAspirations = filterStatus === 'all' 
    ? aspirations 
    : aspirations.filter(asp => asp.status === filterStatus);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Memuat data aspirasi...</p>
      </div>
    );
  }

  if (aspirations.length === 0) {
    return (
      <div className="gradient-card rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Belum ada aspirasi
        </h3>
        <p className="text-gray-600">
          Tidak ada aspirasi yang masuk untuk saat ini
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Filter Section */}
      <div className="gradient-card rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Aspirasi</h3>
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                filterStatus === status
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status === 'all' ? 'Semua' : 
               status === 'pending' ? 'Menunggu' :
               status === 'approved' ? 'Disetujui' : 'Ditolak'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="gradient-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">{aspirations.length}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="gradient-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {aspirations.filter(a => a.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Menunggu</div>
        </div>
        <div className="gradient-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {aspirations.filter(a => a.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600">Disetujui</div>
        </div>
        <div className="gradient-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {aspirations.filter(a => a.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600">Ditolak</div>
        </div>
      </div>

      {/* Aspirasi Table */}
      <div className="gradient-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAspirations.map((aspirasi) => (
                <tr key={aspirasi.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(aspirasi.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(aspirasi.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getRatingStars(aspirasi.question3)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedAspirasi(aspirasi)}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200 px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100"
                    >
                      👁️ Lihat
                    </button>
                    <button
                      onClick={() => handleStatusChange(aspirasi.id, 'approved')}
                      disabled={updatingId === aspirasi.id || aspirasi.status === 'approved'}
                      className="text-green-600 hover:text-green-800 disabled:opacity-50 transition-colors duration-200 px-3 py-1 rounded-lg bg-green-50 hover:bg-green-100"
                    >
                      {updatingId === aspirasi.id ? '⏳' : '✅'} Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(aspirasi.id, 'rejected')}
                      disabled={updatingId === aspirasi.id || aspirasi.status === 'rejected'}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors duration-200 px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100"
                    >
                      {updatingId === aspirasi.id ? '⏳' : '❌'} Reject
                    </button>
                    <button
                      onClick={() => handleDelete(aspirasi.id)}
                      disabled={deletingId === aspirasi.id}
                      className="text-gray-600 hover:text-gray-800 disabled:opacity-50 transition-colors duration-200 px-3 py-1 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                      {deletingId === aspirasi.id ? '⏳' : '🗑️'} Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAspirasi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Detail Aspirasi</h3>
              <button 
                onClick={() => setSelectedAspirasi(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Header Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-600 mb-1">Tanggal</h4>
                  <p className="text-gray-800">{formatDate(selectedAspirasi.createdAt)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-green-600 mb-1">Rating</h4>
                  <p className="text-gray-800">{getRatingStars(selectedAspirasi.question3)}</p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Pandangan terhadap KMK</h4>
                  <p className="text-gray-800">{selectedAspirasi.question1}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Hal yang perlu dibenahi</h4>
                  <p className="text-gray-800">{selectedAspirasi.question2}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Alasan kepuasan</h4>
                  <p className="text-gray-800">{selectedAspirasi.question4}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Kritik dan saran</h4>
                  <p className="text-gray-800">{selectedAspirasi.question5}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Pesan untuk KMK</h4>
                  <p className="text-gray-800 italic">"{selectedAspirasi.question6}"</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  onClick={() => handleStatusChange(selectedAspirasi.id, 'approved')}
                  disabled={updatingId === selectedAspirasi.id || selectedAspirasi.status === 'approved'}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors duration-200"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleStatusChange(selectedAspirasi.id, 'rejected')}
                  disabled={updatingId === selectedAspirasi.id || selectedAspirasi.status === 'rejected'}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors duration-200"
                >
                  ❌ Reject
                </button>
                <button
                  onClick={() => setSelectedAspirasi(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminTable;