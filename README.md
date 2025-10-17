# 🎯 ASMAKA - Sistem Aspirasi KMK

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-9.9.4-FFCA28?style=for-the-badge&logo=firebase)
![Tailwind](https://img.shields.io/badge/Tailwind-3.1.8-38B2AC?style=for-the-badge&logo=tailwind-css)

[🚀 Live Demo](https://asmaka-c22de.web.app) • 
[📖 Dokumentasi](#dokumentasi) • 
[💻 Installation](#installation) • 
[👥 Usage](#usage)

</div>

## 📋 Tentang Proyek

ASMAKA (Aspirasi Masyarakat KMK) adalah aplikasi web modern untuk komunitas KMK yang memungkinkan pengiriman aspirasi secara anonim, aman, dan transparan.

## Dokumentasi

### 🎯 Fitur Utama

- **🔒 Anonimitas** - Identitas pengirim terjaga
- **📊 Rating System** - Penilaian 1-5 untuk kinerja KMK  
- **⚡ Real-time** - Update data otomatis dengan Firebase
- **📱 Responsive** - Optimal di semua device

### 🏗️ Tech Stack

**Frontend:**
- React.js 18.2.0
- Tailwind CSS 3.1.8
- React Router DOM 6.3.0

**Backend:**
- Firebase Firestore (Database)
- Firebase Authentication (Login Admin)
- Firebase Hosting (Deployment)

[⬆️ Back to top](#-asmaka---sistem-aspirasi-kmk)

## Installation

### Prerequisites
- Node.js version 14 atau lebih tinggi
- npm atau yarn
- Akun Firebase

### 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/RAsertaCK/Project-A.git
cd Project-A

# Install dependencies
npm install

# Jalankan development server
npm start
```

### 🔧 Setup Firebase

1. **Buat Firebase Project:**
   - Buka [Firebase Console](https://console.firebase.google.com)
   - Klik "Create Project" - beri nama "ASMAKA"
   - Ikuti setup wizard

2. **Aktifkan Services:**
   - **Authentication** → Sign-in method → Enable Email/Password
   - **Firestore Database** → Create Database → Start in test mode
   - **Tambahkan admin user** di Authentication → Users

3. **Environment Variables:**
   Buat file `.env.local` di root project:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

[⬆️ Back to top](#-asmaka---sistem-aspirasi-kmk)

## Usage

### 👤 Untuk Pengguna Biasa

1. **Akses Aplikasi:**
   - Buka https://asmaka-c22de.web.app
   - Atau http://localhost:3000 (development)

2. **Kirim Aspirasi:**
   - Klik "Kirim Aspirasi" di navbar
   - Isi semua field form dengan jujur
   - Klik "Kirim Aspirasi" - status: pending

3. **Lihat Aspirasi:**
   - Buka halaman utama
   - Lihat aspirasi yang sudah disetujui admin

### 🔐 Untuk Administrator

1. **Login Admin:**
   - Akses `/admin` di browser
   - Login dengan email/password admin
   - Masuk ke dashboard moderasi

2. **Moderasi Aspirasi:**
   - Lihat daftar aspirasi pending
   - Klik "Lihat" untuk baca detail
   - Approve/Reject dengan tombol aksi
   - Aspirasi approved akan tampil di publik

3. **Management Data:**
   - Filter by status (all, pending, approved, rejected)
   - Hapus aspirasi jika diperlukan
   - Pantau statistics sederhana

[⬆️ Back to top](#-asmaka---sistem-aspirasi-kmk)

## Deployment

### 🚀 Firebase Hosting

```bash
# Build production version
npm run build

# Install Firebase CLI
npm install -g firebase-tools

# Login dan deploy
firebase login
firebase init hosting
firebase deploy
```

### 🔒 Production Checklist

- [ ] Firebase Security Rules updated
- [ ] Environment variables configured
- [ ] Admin user created
- [ ] Test semua functionality

### 🌐 Custom Domain (Optional)
- Buka Firebase Console → Hosting
- Add custom domain
- Update DNS records

[⬆️ Back to top](#-asmaka---sistem-aspirasi-kmk)

## 🤝 Contributing

Kontribusi dipersilakan! Ikuti steps:

1. **Fork repository**
2. **Buat feature branch:**
   ```bash
   git checkout -b feature/nama-feature
   ```
3. **Commit changes:**
   ```bash
   git commit -m 'Add nama feature'
   ```
4. **Push ke branch:**
   ```bash
   git push origin feature/nama-feature
   ```
5. **Buat Pull Request**

## 📄 License

MIT License - bebas digunakan untuk personal dan komersial.

## 👨‍💻 Developer

**RAsertaCK**  
- GitHub: [https://github.com/RAsertaCK](https://github.com/RAsertaCK)
- Project: [https://github.com/RAsertaCK/Project-A](https://github.com/RAsertaCK/Project-A)

## 🙏 Acknowledgments

- React.js Team untuk framework yang amazing
- Tailwind CSS untuk utility-first CSS
- Firebase Team untuk backend services
- KMK Community untuk inspirasi

---

<div align="center">

### ❓ Butuh Bantuan?

Buka [GitHub Issues](https://github.com/RAsertaCK/Project-A/issues) untuk report bugs atau request features.

**⭐ Jangan lupa kasih star jika project ini membantu!**

</div>

---

