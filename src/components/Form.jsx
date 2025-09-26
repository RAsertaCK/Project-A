import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Form = () => {
  const [formData, setFormData] = useState({
    question1: '',
    question2: '',
    question3: 3,
    question4: '',
    question5: '',
    question6: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'question3' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'aspirations'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setSubmitSuccess(true);
      setFormData({
        question1: '',
        question2: '',
        question3: 3,
        question4: '',
        question5: '',
        question6: ''
      });
    } catch (err) {
      setError('Terjadi kesalahan saat mengirim aspirasi. Silakan coba lagi.');
      console.error('Error submitting aspiration:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="gradient-card rounded-2xl p-8 text-center animate-fade-in">
        <div className="text-6xl mb-4 animate-float">🎉</div>
        <h3 className="text-2xl font-bold text-green-600 mb-4">Terima kasih!</h3>
        <p className="text-gray-700 mb-6">
          Aspirasi Anda telah berhasil dikirim dan sedang menunggu persetujuan admin.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 hover-lift"
        >
          Kirim Aspirasi Lain
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="gradient-form rounded-2xl p-8 shadow-xl">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 animate-fade-in">
          <div className="flex items-center">
            <span className="text-xl mr-2">⚠️</span>
            {error}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <label className="text-gray-700 text-sm font-bold mb-3 flex items-center">
            <span className="mr-2">👀</span>
            1. Apa pandangan kamu terhadap KMK?
          </label>
          <textarea
            name="question1"
            value={formData.question1}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            rows="4"
            placeholder="Bagaimana pandanganmu tentang KMK selama ini..."
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <label className="text-gray-700 text-sm font-bold mb-3 flex items-center">
            <span className="mr-2">🔧</span>
            2. Hal apa yang perlu dibenahi di KMK?
          </label>
          <textarea
            name="question2"
            value={formData.question2}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            rows="4"
            placeholder="Menurutmu, apa yang perlu diperbaiki..."
          />
        </div>
      </div>

      <div className="gradient-card rounded-xl p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <label className="text-gray-700 text-sm font-bold mb-4 flex items-center">
          <span className="mr-2">⭐</span>
          3. Seberapa puas kamu terhadap kinerja pengurus KMK? (Skala 1–5)
        </label>
        <div className="flex justify-center space-x-4">
          {[1, 2, 3, 4, 5].map(num => (
            <label key={num} className="flex flex-col items-center cursor-pointer">
              <input
                type="radio"
                name="question3"
                value={num}
                checked={formData.question3 === num}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                formData.question3 === num 
                  ? 'bg-blue-600 text-white border-blue-600 scale-110' 
                  : 'bg-white text-gray-400 border-gray-300 hover:border-blue-400'
              }`}>
                {num}
              </div>
              <span className="text-xs mt-2 text-gray-600">{num === 1 ? 'Sangat Buruk' : num === 5 ? 'Sangat Puas' : ''}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <label className="text-gray-700 text-sm font-bold mb-3 flex items-center">
            <span className="mr-2">💡</span>
            4. Apa alasan dari kepuasanmu?
          </label>
          <textarea
            name="question4"
            value={formData.question4}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            rows="3"
            placeholder="Jelaskan alasan penilaianmu..."
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <label className="text-gray-700 text-sm font-bold mb-3 flex items-center">
            <span className="mr-2">📋</span>
            5. Kritik dan saran untuk KMK
          </label>
          <textarea
            name="question5"
            value={formData.question5}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            rows="3"
            placeholder="Apa kritik dan saran membangunmu..."
          />
        </div>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <label className="text-gray-700 text-sm font-bold mb-3 flex items-center">
          <span className="mr-2">💌</span>
          6. Pesan untuk KMK dan kepengurusannya
        </label>
        <textarea
          name="question6"
          value={formData.question6}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          rows="3"
          placeholder="Tuliskan pesan khususmu untuk KMK..."
        />
      </div>

      <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 hover-lift shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Mengirim...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="mr-2">🚀</span>
              Kirim Aspirasi
            </div>
          )}
        </button>
        
        <p className="text-gray-600 text-sm mt-4">
          🔒 Aspirasi Anda akan dikirim secara anonim dan aman
        </p>
      </div>
    </form>
  );
};

export default Form;