🎯 ASMAKA - Sistem Aspirasi KMK
<div align="center">
https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react
https://img.shields.io/badge/Firebase-9.9.4-FFCA28?style=for-the-badge&logo=firebase
https://img.shields.io/badge/Tailwind-3.1.8-38B2AC?style=for-the-badge&logo=tailwind-css

🚀 Live Demo •
📖 Dokumentasi •
💻 Installation •
👥 Usage

</div>
📋 Tentang Proyek
ASMAKA (Aspirasi Masyarakat KMK) adalah aplikasi web modern untuk komunitas KMK yang memungkinkan pengiriman aspirasi secara anonim, aman, dan transparan.

Dokumentasi
🎯 Fitur Utama
🔒 Anonimitas - Identitas pengirim terjaga

📊 Rating System - Penilaian 1-5 untuk kinerja KMK

⚡ Real-time - Update data otomatis dengan Firebase

📱 Responsive - Optimal di semua device

🏗️ Tech Stack
Frontend:

React.js 18.2.0

Tailwind CSS 3.1.8

React Router DOM 6.3.0

Backend:

Firebase Firestore (Database)

Firebase Authentication (Login Admin)

Firebase Hosting (Deployment)

⬆️ Back to top

Installation
Prerequisites
Node.js version 14 atau lebih tinggi

npm atau yarn

Akun Firebase

🚀 Quick Start
bash
# Clone repository
git clone https://github.com/RAsertaCK/Project-A.git
cd Project-A

# Install dependencies
npm install

# Jalankan development server
npm start
🔧 Setup Firebase
Buat Firebase Project:

Buka Firebase Console

Klik "Create Project" - beri nama "ASMAKA"

Ikuti setup wizard

Aktifkan Services:

Authentication → Sign-in method → Enable Email/Password

Firestore Database → Create Database → Start in test mode

Tambahkan admin user di Authentication → Users

Environment Variables:
Buat file .env.local di root project:

env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
⬆️ Back to top

Usage
👤 Untuk Pengguna Biasa
Akses Aplikasi:

Buka https://asmaka-c22de.web.app

Atau http://localhost:3000 (development)

Kirim Aspirasi:

Klik "Kirim Aspirasi" di navbar

Isi semua field form dengan jujur

Klik "Kirim Aspirasi" - status: pending

Lihat Aspirasi:

Buka halaman utama

Lihat aspirasi yang sudah disetujui admin

🔐 Untuk Administrator
Login Admin:

Akses /admin di browser

Login dengan email/password admin

Masuk ke dashboard moderasi

Moderasi Aspirasi:

Lihat daftar aspirasi pending

Klik "Lihat" untuk baca detail

Approve/Reject dengan tombol aksi

Aspirasi approved akan tampil di publik

Management Data:

Filter by status (all, pending, approved, rejected)

Hapus aspirasi jika diperlukan

Pantau statistics sederhana

⬆️ Back to top

Deployment
🚀 Firebase Hosting
bash
# Build production version
npm run build

# Install Firebase CLI
npm install -g firebase-tools

# Login dan deploy
firebase login
firebase init hosting
firebase deploy
🔒 Production Checklist
Firebase Security Rules updated

Environment variables configured

Admin user created

Test semua functionality

🌐 Custom Domain (Optional)
Buka Firebase Console → Hosting

Add custom domain

Update DNS records

⬆️ Back to top

🤝 Contributing
Kontribusi dipersilakan! Ikuti steps:

Fork repository

Buat feature branch:

bash
git checkout -b feature/nama-feature
Commit changes:

bash
git commit -m 'Add nama feature'
Push ke branch:

bash
git push origin feature/nama-feature
Buat Pull Request

📄 License
MIT License - bebas digunakan untuk personal dan komersial.

👨‍💻 Developer
RAsertaCK

GitHub: https://github.com/RAsertaCK

Project: https://github.com/RAsertaCK/Project-A

🙏 Acknowledgments
React.js Team untuk framework yang amazing

Tailwind CSS untuk utility-first CSS

Firebase Team untuk backend services

KMK Community untuk inspirasi

<div align="center">
❓ Butuh Bantuan?
Buka GitHub Issues untuk report bugs atau request features.

⭐ Jangan lupa kasih star jika project ini membantu!

</div>