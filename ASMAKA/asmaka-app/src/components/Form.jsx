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
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <p>Terima kasih! Aspirasi Anda telah berhasil dikirim dan sedang menunggu persetujuan.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          1. Apa pandangan kamu terhadap KMK?
        </label>
        <textarea
          name="question1"
          value={formData.question1}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          2. Dari pandangan kamu terhadap KMK, adakah sesuatu hal yang perlu dibenahi di dalam lingkungan KMK saat ini, jika ada tuliskan alasanmu!
        </label>
        <textarea
          name="question2"
          value={formData.question2}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          3. Seberapa puas kamu terhadap kinerja pengurus KMK? (Skala 1–5)
        </label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map(num => (
            <label key={num} className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="question3"
                value={num}
                checked={formData.question3 === num}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">{num}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          4. Apa alasan dari kepuasanmu terhadap kinerja kepengurusan KMK?
        </label>
        <textarea
          name="question4"
          value={formData.question4}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          5. Berikan kritik dan saran untuk KMK dan kepengurusan KMK?
        </label>
        <textarea
          name="question5"
          value={formData.question5}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          6. Berikan pesan yang ingin kalian sampaikan untuk KMK dan kepengurusannya.
        </label>
        <textarea
          name="question6"
          value={formData.question6}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        {isSubmitting ? 'Mengirim...' : 'Kirim Aspirasi'}
      </button>
    </form>
  );
};

export default Form;