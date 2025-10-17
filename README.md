# 🎯 ASMAKA - Sistem Aspirasi KMK

<div align="center">

<img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react" alt="React">
<img src="https://img.shields.io/badge/Firebase-9.9.4-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase">
<img src="https://img.shields.io/badge/Tailwind-3.1.8-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">

<br>
🚀 **Live Demo** • 📖 **Dokumentasi** • 💻 **Installation** • 👥 **Usage**

</div>

## 📋 Tentang Proyek
ASMAKA (Aspirasi Masyarakat KMK) adalah aplikasi web modern untuk komunitas KMK yang memungkinkan pengiriman aspirasi secara anonim, aman, dan transparan.

## 🎯 Fitur Utama
- 🔒 **Anonimitas** - Identitas pengirim terjaga
- 📊 **Rating System** - Penilaian 1-5 untuk kinerja KMK  
- ⚡ **Real-time** - Update data otomatis dengan Firebase
- 📱 **Responsive** - Optimal di semua device

## 🏗️ Tech Stack
**Frontend:**
- React.js 18.2.0
- Tailwind CSS 3.1.8  
- React Router DOM 6.3.0

**Backend:**
- Firebase Firestore (Database)
- Firebase Authentication (Login Admin)
- Firebase Hosting (Deployment)

---

## ⚡ Quick Start

### Prerequisites
- Node.js 14+
- npm atau yarn
- Akun Firebase

### Installation
```bash
# Clone repository
git clone https://github.com/RAsertaCK/Project-A.git
cd Project-A

# Install dependencies
npm install

# Jalankan development server
npm start
🔥 Firebase Setup
1. Buat Project Firebase
Buka Firebase Console

Klik "Create Project"

Beri nama "ASMAKA"

Ikuti setup wizard

2. Aktifkan Layanan
Authentication → Sign-in method → Enable Email/Password

Firestore Database → Create Database → Start in test mode

Authentication → Users → Add user (email admin)

3. Environment Variables
Buat file .env.local:

env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
4. Firebase Config
src/firebase/config.js:

javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
👨‍💻 Usage
Untuk Pengguna
Akses: https://asmaka-c22de.web.app atau http://localhost:3000

Kirim Aspirasi: Klik "Kirim Aspirasi" → Isi form → Submit

Lihat Aspirasi: Buka halaman utama untuk lihat yang approved

Untuk Admin
Login: Akses /admin → Login dengan email/password

Moderasi: Lihat aspirasi pending → Approve/Reject

Management: Filter, hapus, dan pantau statistics

🚀 Deployment
Firebase Hosting
bash
# Build production
npm run build

# Install Firebase CLI
npm install -g firebase-tools

# Deploy
firebase login
firebase init hosting
firebase deploy
Security Rules
javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /aspirations/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.admin == true;
    }
  }
}
Production Checklist
Firebase Security Rules updated

Environment variables configured

Admin user created

All functionality tested

Build success tanpa error

🤝 Contributing
bash
# Buat branch baru
git checkout -b feature/nama-feature

# Commit changes  
git commit -m 'feat: add nama feature'

# Push branch
git push origin feature/nama-feature

# Buat Pull Request
Commit Convention
feat: New feature

fix: Bug fix

docs: Documentation

style: Formatting

refactor: Code restructuring

📄 License
MIT License - bebas digunakan untuk personal dan komersial.

👨‍💻 Developer
RAsertaCK
GitHub: https://github.com/RAsertaCK
Project: https://github.com/RAsertaCK/Project-A

<div align="center">
❓ Butuh Bantuan?
Buka GitHub Issues untuk report bug atau request feature.

⭐ Jangan lupa kasih star jika project ini membantu!

</div> ```