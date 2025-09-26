# 🎯 ASMAKA - Sistem Aspirasi KMK

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-9.9.4-FFCA28?style=for-the-badge&logo=firebase)
![Tailwind](https://img.shields.io/badge/Tailwind-3.1.8-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Platform aspirasi anonim untuk komunitas KMK** - Wadah penyampaian pendapat, kritik, dan saran secara transparan dan aman.

[🚀 Live Demo](https://asmaka-c22de.web.app) • [📖 Dokumentasi](#dokumentasi) • [💻 Installation](#installation)

</div>

## 📋 Tentang Proyek

ASMAKA (Aspirasi Masyarakat KMK) adalah aplikasi web modern yang memungkinkan anggota komunitas KMK untuk:

- ✨ **Mengirim aspirasi** secara anonim dan aman
- 👁️ **Melihat aspirasi** yang telah disetujui oleh admin
- 🔐 **Panel admin** untuk memoderasi konten
- 📱 **Responsive design** yang optimal di semua device

### 🎯 Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| **🔒 Anonimitas** | Identitas pengirim terjaga dengan aman |
| **📊 Rating System** | Sistem penilaian 1-5 untuk kinerja KMK |
| **🎨 Modern UI** | Interface yang user-friendly dengan animasi |
| **⚡ Real-time** | Update data secara real-time dengan Firebase |
| **📱 Responsive** | Optimal di desktop, tablet, dan mobile |

## 🚀 Tech Stack

### Frontend
- **React.js** - UI Framework
- **Tailwind CSS** - Styling & Design System
- **React Router** - Navigation & Routing

### Backend & Infrastructure
- **Firebase Firestore** - Database Real-time
- **Firebase Authentication** - Sistem Login Admin
- **Firebase Hosting** - Deployment & Hosting

## 📦 Installation

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- Akun Firebase

### Langkah Installasi

1. **Clone repository**
```bash
git clone https://github.com/RAsertaCK/Project-A.git
cd Project-A
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Firebase**
   - Buat project baru di [Firebase Console](https://console.firebase.google.com)
   - Aktifkan Authentication (Email/Password)
   - Buat Firestore Database
   - Copy config ke `.env.local`

4. **Konfigurasi Environment**
```env
# .env.local
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

5. **Jalankan aplikasi**
```bash
npm start
```
Aplikasi akan terbuka di http://localhost:3000

## 🔧 Firebase Setup

### 1. Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /aspirations/{documentId} {
      allow create: if request.auth == null;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### 2. Authentication
- Aktifkan **Email/Password** provider
- Tambahkan user admin di Firebase Console

## 📁 Project Structure

```
asmaka-app/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   │   ├── Form.jsx       # Form aspirasi
│   │   ├── AspirasiCard.jsx # Kartu tampilan aspirasi
│   │   ├── AdminTable.jsx # Tabel admin
│   │   ├── Navbar.jsx     # Navigation bar
│   │   └── Loader.jsx     # Loading component
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Halaman utama
│   │   ├── SubmitAspirasi.jsx # Form page
│   │   ├── AdminPanel.jsx # Dashboard admin
│   │   └── NotFound.jsx   # 404 page
│   ├── services/
│   │   └── firebase.js    # Firebase configuration
│   └── App.jsx            # Main app component
├── tailwind.config.js     # Tailwind configuration
└── package.json          # Dependencies
```

## 🎨 Customization

### Warna Theme
Edit `tailwind.config.js` untuk mengubah warna:
```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#3b82f6', // Ubah warna primary
        600: '#2563eb',
      }
    }
  }
}
```

### Konten Pertanyaan
Edit form questions di `src/components/Form.jsx`:
```jsx
// Ubah pertanyaan sesuai kebutuhan
const questions = [
  "Pandangan terhadap KMK?",
  "Hal yang perlu dibenahi?",
  // ... lainnya
]
```

## 🚀 Deployment

### Firebase Hosting (Recommended)
```bash
npm run build
firebase login
firebase init
firebase deploy
```

### Alternatif Hosting
- **Vercel**: `npm install -g vercel && vercel`
- **Netlify**: Drag & drop `build` folder
- **GitHub Pages**: `npm install -g gh-pages && gh-pages -d build`

## 👥 Usage Guide

### Untuk Pengguna Biasa
1. Kunjungi halaman utama
2. Klik "Kirim Aspirasi"
3. Isi form dengan jujur dan konstruktif
4. Submit - aspirasi akan masuk status "pending"

### Untuk Admin
1. Login di `/admin`
2. Moderasi aspirasi yang masuk
3. Approve/reject dengan tombol aksi
4. Aspirasi approved akan tampil di halaman utama

## 🤝 Contributing

Kontribusi dipersilakan! Ikuti langkah:

1. Fork project
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License.

## 👨‍💻 Developer

- **RAsertaCK** - [GitHub](https://github.com/RAsertaCK)

## 🙏 Acknowledgments

- [React.js](https://reactjs.org) - UI Framework
- [Tailwind CSS](https://tailwindcss.com) - CSS Framework
- [Firebase](https://firebase.google.com) - Backend Services
- KMK Community - Untuk inspirasi project

---

<div align="center">

**⭐ Jangan lupa kasih star jika project ini membantu!**

</div>

## 📞 Support

Jika ada pertanyaan atau issues, silakan buat [GitHub Issue](https://github.com/RAsertaCK/Project-A/issues) atau hubungi developer.

---

**Dibuat dengan ❤️ untuk KMK Community**
