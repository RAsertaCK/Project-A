import React, { useState } from 'react';
import { db } from '../services/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

const AdminTable = ({ aspirations, loading, onUpdate }) => {
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedAspirasi, setSelectedAspirasi] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Approve aspirasi
  const handleApprove = async (id) => {
    setUpdatingId(id);
    try {
      const aspirationRef = doc(db, 'aspirations', id);
      await updateDoc(aspirationRef, { 
        status: 'approved',
        approvedAt: new Date()
      });
      onUpdate();
    } catch (error) {
      console.error('Error approving aspiration:', error);
      alert('Gagal menyetujui aspirasi');
    } finally {
      setUpdatingId(null);
    }
  };

  // Reject aspirasi
  const handleReject = async (id) => {
    setUpdatingId(id);
    try {
      const aspirationRef = doc(db, 'aspirations', id);
      await updateDoc(aspirationRef, { 
        status: 'rejected',
        rejectedAt: new Date()
      });
      onUpdate();
      alert('Aspirasi berhasil ditolak');
    } catch (error) {
      console.error('Error rejecting aspiration:', error);
      alert('Gagal menolak aspirasi');
    } finally {
      setUpdatingId(null);
    }
  };

  // Tarik aspirasi (ubah jadi pending)
  const handleWithdraw = async (id) => {
    setUpdatingId(id);
    try {
      const aspirationRef = doc(db, 'aspirations', id);
      await updateDoc(aspirationRef, { 
        status: 'pending',
        withdrawnAt: new Date()
      });
      onUpdate();
      alert('Aspirasi berhasil ditarik dari tampilan publik');
    } catch (error) {
      console.error('Error withdrawing aspiration:', error);
      alert('Gagal menarik aspirasi');
    } finally {
      setUpdatingId(null);
    }
  };

  // Hapus permanen
  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus permanen aspirasi ini?')) {
      return;
    }
    setUpdatingId(id);
    try {
      const aspirationRef = doc(db, 'aspirations', id);
      await deleteDoc(aspirationRef);
      onUpdate();
      alert('Aspirasi berhasil dihapus permanen');
    } catch (error) {
      console.error('Error deleting aspiration:', error);
      alert('Gagal menghapus aspirasi');
    } finally {
      setUpdatingId(null);
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

  // Filter dan search aspirations
  const filteredAspirations = aspirations.filter(asp => {
    const matchesStatus = filterStatus === 'all' || asp.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      asp.question1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asp.question2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asp.question4?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asp.question5?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asp.question6?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

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
      {/* Filter dan Search Section */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Kelola Aspirasi ({filteredAspirations.length})
        </h2>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari aspirasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Menunggu</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAspirations.map((aspirasi) => (
                <tr key={aspirasi.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(aspirasi.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(aspirasi.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {getRatingStars(aspirasi.question3)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    
                    {/* Untuk status PENDING */}
                    {aspirasi.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(aspirasi.id)}
                          disabled={updatingId === aspirasi.id}
                          className="text-green-600 hover:text-green-800 dark:hover:text-green-400 disabled:opacity-50 transition-colors duration-200 px-3 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40"
                        >
                          {updatingId === aspirasi.id ? '⏳' : '✅'} Approve
                        </button>
                        <button
                          onClick={() => handleReject(aspirasi.id)}
                          disabled={updatingId === aspirasi.id}
                          className="text-orange-600 hover:text-orange-800 dark:hover:text-orange-400 disabled:opacity-50 transition-colors duration-200 px-3 py-1 rounded-lg bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40"
                        >
                          {updatingId === aspirasi.id ? '⏳' : '❌'} Tolak
                        </button>
                        <button
                          onClick={() => handleDelete(aspirasi.id)}
                          disabled={updatingId === aspirasi.id}
                          className="text-red-600 hover:text-red-800 dark:hover:text-red-400 disabled:opacity-50 transition-colors duration-200 px-3 py-1 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40"
                        >
                          {updatingId === aspirasi.id ? '⏳' : '🗑️'} Hapus
                        </button>
                      </>
                    )}

                    {/* Untuk status APPROVED */}
                    {aspirasi.status === 'approved' && (
                      <>
                        <button
                          onClick={() => handleWithdraw(aspirasi.id)}
                          disabled={updatingId === aspirasi.id}
                          className="text-yellow-600 hover:text-yellow-800 dark:hover:text-yellow-400 disabled:opacity-50 transition-colors duration-200 px-3 py-1 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/40"
                        >
                          {updatingId === aspirasi.id ? '⏳' : '📥'} Tarik
                        </button>
                        <button
                          onClick={() => handleDelete(aspirasi.id)}
                          disabled={updatingId === aspirasi.id}
                          className="text-red-600 hover:text-red-800 dark:hover:text-red-400 disabled:opacity-50 transition-colors duration-200 px-3 py-1 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40"
                        >
                          {updatingId === aspirasi.id ? '⏳' : '🗑️'} Hapus
                        </button>
                      </>
                    )}

                    {/* Untuk status REJECTED */}
                    {aspirasi.status === 'rejected' && (
                      <>
                        <button
                          onClick={() => handleApprove(aspirasi.id)}
                          disabled={updatingId === aspirasi.id}
                          className="text-green-600 hover:text-green-800 dark:hover:text-green-400 disabled:opacity-50 transition-colors duration-200 px-3 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40"
                        >
                          {updatingId === aspirasi.id ? '⏳' : '✅'} Approve
                        </button>
                        <button
                          onClick={() => handleDelete(aspirasi.id)}
                          disabled={updatingId === aspirasi.id}
                          className="text-red-600 hover:text-red-800 dark:hover:text-red-400 disabled:opacity-50 transition-colors duration-200 px-3 py-1 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40"
                        >
                          {updatingId === aspirasi.id ? '⏳' : '🗑️'} Hapus
                        </button>
                      </>
                    )}

                    {/* Tombol Lihat Detail (selalu ada) */}
                    <button
                      onClick={() => setSelectedAspirasi(aspirasi)}
                      className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-200 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                    >
                      👁️ Lihat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Aspirasi */}
      {selectedAspirasi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Detail Aspirasi
                </h3>
                <button
                  onClick={() => setSelectedAspirasi(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tanggal
                    </label>
                    <p className="text-gray-600 dark:text-gray-400">
                      {formatDate(selectedAspirasi.createdAt)}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    {getStatusBadge(selectedAspirasi.status)}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Rating
                    </label>
                    <p className="text-gray-600 dark:text-gray-400">
                      {getRatingStars(selectedAspirasi.question3)}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      👀 Pandangan terhadap KMK
                    </label>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {selectedAspirasi.question1}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      🔧 Hal yang perlu dibenahi
                    </label>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {selectedAspirasi.question2}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      💡 Alasan kepuasan
                    </label>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {selectedAspirasi.question4}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      📋 Kritik dan saran
                    </label>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {selectedAspirasi.question5}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      💌 Pesan untuk KMK
                    </label>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-3 rounded-lg italic">
                      "{selectedAspirasi.question6}"
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setSelectedAspirasi(null)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
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