# 🎯 ASMAKA - Sistem Aspirasi KMK

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-9.9.4-FFCA28?style=for-the-badge&logo=firebase)
![Tailwind](https://img.shields.io/badge/Tailwind-3.1.8-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Platform aspirasi anonim untuk komunitas KMK** - Wadah penyampaian pendapat, kritik, dan saran secara transparan dan aman.

[🚀 Live Demo](https://asmaka-c22de.web.app) • [📖 Dokumentasi](#-dokumentasi) • [💻 Installation](#-installation) • [👥 Usage](#-usage-guide) • [🔧 Deployment](#-deployment)

</div>

## 📋 Tentang Proyek {#tentang-proyek}

ASMAKA (Aspirasi Masyarakat KMK) adalah aplikasi web modern yang memungkinkan anggota komunitas KMK untuk menyampaikan aspirasi secara anonim, aman, dan transparan. Platform ini dibangun dengan teknologi terkini untuk memastikan pengalaman pengguna yang optimal.

### ✨ Keunggulan
- **🔒 Anonimitas Terjaga** - Identitas pengirim sepenuhnya rahasia
- **⚡ Real-time Updates** - Data terupdate secara otomatis
- **📱 Responsive Design** - Optimal di desktop, tablet, dan mobile
- **🎨 Modern UI/UX** - Interface yang intuitif dan user-friendly

[⬆️ Kembali ke Atas](#-asmaka---sistem-aspirasi-kmk)

## 📖 Dokumentasi {#dokumentasi}

### 🎯 Fitur Utama

| Fitur | Deskripsi | Status |
|-------|-----------|--------|
| **Form Aspirasi Anonim** | Pengguna dapat mengirim aspirasi tanpa login | ✅ Live |
| **Moderasi Admin** | Panel admin untuk approve/reject aspirasi | ✅ Live |
| **Tampilan Publik** | Aspirasi approved ditampilkan ke publik | ✅ Live |
| **Rating System** | Sistem penilaian 1-5 untuk kinerja KMK | ✅ Live |
| **Real-time Database** | Data tersinkronisasi secara real-time | ✅ Live |

### 🏗️ Architecture Diagram

```
ASMAKA Architecture
│
├── Frontend (React.js)
│   ├── Components → Reusable UI components
│   ├── Pages → Main application pages
│   └── Services → Firebase integration
│
├── Backend (Firebase)
│   ├── Firestore → Database for aspirations
│   ├── Authentication → Admin login system
│   └── Hosting → Production deployment
│
└── Styling (Tailwind CSS)
    ├── Utility-first CSS
    ├── Responsive design
    └── Custom animations
```

### 🔧 Technical Specifications

- **Frontend Framework**: React.js 18.2.0
- **Styling**: Tailwind CSS 3.1.8
- **Routing**: React Router DOM 6.3.0
- **Backend Service**: Firebase 9.9.4
- **Database**: Cloud Firestore
- **Authentication**: Firebase Auth
- **Deployment**: Firebase Hosting
- **Build Tool**: Create React App

[⬆️ Kembali ke Atas](#-asmaka---sistem-aspirasi-kmk)

## 💻 Installation {#installation}

### Prerequisites

- **Node.js** version 14.0 atau lebih tinggi
- **npm** version 6.0 atau lebih tinggi
- **Akun Firebase** untuk backend services
- **Git** untuk version control

### 🚀 Quick Installation

```bash
# 1. Clone repository
git clone https://github.com/RAsertaCK/Project-A.git
cd Project-A

# 2. Install dependencies
npm install

# 3. Setup environment variables
# Buat file .env.local dan isi dengan config Firebase Anda

# 4. Jalankan aplikasi
npm start
```

### 🔧 Detailed Setup

#### Step 1: Firebase Project Setup
1. Buka [Firebase Console](https://console.firebase.google.com)
2. Klik "Create Project" → Beri nama "ASMAKA"
3. Pilih enable Google Analytics (opsional)
4. Tunggu hingga project created

#### Step 2: Authentication Setup
1. Di Firebase Console, pilih "Authentication"
2. Klik tab "Sign-in method"
3. Aktifkan "Email/Password" provider
4. Klik tab "Users" → "Add user" untuk buat admin account

#### Step 3: Firestore Database
1. Pilih "Firestore Database" dari sidebar
2. Klik "Create Database"
3. Pilih "Start in test mode" untuk development
4. Pilih location terdekat

#### Step 4: Environment Configuration
Buat file `.env.local` di root project:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

#### Step 5: Security Rules (Production)
```javascript
// Firestore Rules untuk production
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

### 🐛 Troubleshooting

#### Error: Port 3000 already in use
```bash
# Gunakan port berbeda
npm start -- --port 3001
```

#### Error: Module not found
```bash
# Clear cache dan install ulang
rm -rf node_modules
rm package-lock.json
npm install
```

#### Error: Firebase config
Pastikan file `.env.local` ada di root folder dan variabel sudah benar.

[⬆️ Kembali ke Atas](#-asmaka---sistem-aspirasi-kmk)

## 👥 Usage Guide {#usage-guide}

### 👤 Untuk Pengguna Biasa

#### Mengirim Aspirasi
1. **Buka aplikasi** di browser
2. **Klik "Kirim Aspirasi"** di navigation bar
3. **Isi form** dengan data yang jujur dan konstruktif:
   - Pandangan terhadap KMK
   - Hal yang perlu dibenahi
   - Rating kepuasan (1-5)
   - Kritik dan saran
   - Pesan untuk KMK
4. **Klik "Kirim Aspirasi"** - data akan masuk status "pending"

#### Melihat Aspirasi
1. **Buka halaman utama** (/)
2. **Scroll** untuk melihat aspirasi yang sudah approved
3. **Baca** pandangan dan saran dari anggota lain

### 🔐 Untuk Administrator

#### Login ke Dashboard
1. **Akses** `/admin` di browser
2. **Login** dengan email dan password admin
3. **Masuk** ke panel moderasi

#### Moderasi Aspirasi
1. **Lihat daftar** aspirasi yang masuk (status: pending)
2. **Klik "Lihat"** untuk membaca detail aspirasi
3. **Pilih aksi**:
   - **✅ Approve** - Tampilkan ke publik
   - **❌ Reject** - Tolak aspirasi
   - **🗑️ Hapus** - Hapus permanen

#### Management Data
- **Filter** aspirasi berdasarkan status (all, pending, approved, rejected)
- **View statistics** jumlah aspirasi per kategori
- **Real-time updates** tanpa perlu refresh

### 📊 Flow Diagram

```
User Flow:
User → Submit Aspirasi → Status: Pending → Admin Review → Approved/Rejected

Admin Flow:
Login → Dashboard → Moderasi → Approve/Reject → Update Status

Public Flow:
Visit Site → View Approved Aspirasi → Get Inspired → Submit New Aspirasi
```

### ⚠️ Best Practices

#### Untuk Pengirim Aspirasi:
- Gunakan bahasa yang sopan dan konstruktif
- Berikan kritik yang membangun
- Sertakan saran perbaikan yang spesifik
- Jangan sertakan informasi pribadi

#### Untuk Admin:
- Review aspirasi secara berkala
- Berikan alasan jelas untuk rejection
- Jaga kerahasiaan data pengguna
- Backup data secara berkala

[⬆️ Kembali ke Atas](#-asmaka---sistem-aspirasi-kmk)

## 🔧 Deployment {#deployment}

### 🚀 Firebase Hosting (Recommended)

```bash
# 1. Build production version
npm run build

# 2. Install Firebase CLI
npm install -g firebase-tools

# 3. Login ke Firebase
firebase login

# 4. Initialize project
firebase init hosting

# 5. Deploy ke production
firebase deploy
```

### 🌐 Alternatif Deployment Options

#### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Netlify Deployment
1. Drag & drop folder `build` ke [Netlify Drop](https://app.netlify.com/drop)
2. Atau connect GitHub repository untuk auto-deploy

#### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://RAsertaCK.github.io/Project-A",

# Deploy
npm run build
npx gh-pages -d build
```

### 🔒 Production Checklist

- [ ] Environment variables configured
- [ ] Firebase Security Rules updated
- [ ] Domain configured (jika menggunakan custom domain)
- [ ] SSL certificate verified
- [ ] Error monitoring setup
- [ ] Backup strategy in place

### 📈 Performance Optimization

- **Code Splitting** - React.lazy() untuk lazy loading
- **Image Optimization** - Compress images sebelum upload
- **Caching Strategy** - Service worker untuk offline support
- **CDN Setup** - Firebase Hosting dengan global CDN

[⬆️ Kembali ke Atas](#-asmaka---sistem-aspirasi-kmk)

## 🤝 Contributing {#contributing}

Kontribusi sangat dipersilakan! Berikut cara berkontribusi:

### 🐛 Report Bugs
1. Check [existing issues](https://github.com/RAsertaCK/Project-A/issues)
2. Buat issue baru dengan template bug report
3. Sertakan steps to reproduce dan expected behavior

### 💡 Suggest Features
1. Buat issue dengan label "enhancement"
2. Jelaskan feature proposal secara detail
3. Sertakan use cases dan manfaat

### 🔧 Code Contribution
1. **Fork** repository
2. **Buat feature branch**:
```bash
git checkout -b feature/amazing-feature
```
3. **Commit changes**:
```bash
git commit -m 'Add some amazing feature'
```
4. **Push to branch**:
```bash
git push origin feature/amazing-feature
```
5. **Buat Pull Request**

### 📝 Coding Standards
- Gunakan ESLint dan Prettier
- Follow React best practices
- Tulis komentar yang jelas
- Test sebelum submit PR

[⬆️ Kembali ke Atas](#-asmaka---sistem-aspirasi-kmk)

## 📄 License {#license}

Distributed under the MIT License. See `LICENSE` file for more information.

**MIT License Highlights:**
- ✅ Bebas digunakan untuk komersial
- ✅ Bebas dimodifikasi dan didistribusikan
- ✅ Bebas digunakan untuk private projects
- ✅ Hanya require attribution

## 👨‍💻 Developer {#developer}

- **RAsertaCK** - [GitHub Profile](https://github.com/RAsertaCK)
- **Email**: [Your Email]
- **LinkedIn**: [Your LinkedIn Profile]

## 🙏 Acknowledgments {#acknowledgments}

- [React.js Team](https://reactjs.org) - Amazing UI framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Firebase Team](https://firebase.google.com) - Backend services
- [KMK Community](https://kmk.example.com) - Inspiration and support
- All contributors and testers

## 📞 Support {#support}

Jika Anda membutuhkan bantuan:

- **📋 Create Issue** - [GitHub Issues](https://github.com/RAsertaCK/Project-A/issues)
- **💬 Discussion** - [GitHub Discussions](https://github.com/RAsertaCK/Project-A/discussions)
- **📧 Email** - [Your Email] untuk pertanyaan privat

## 🚀 Changelog {#changelog}

### v1.0.0 (Current)
- ✅ Initial release
- ✅ Form aspirasi anonim
- ✅ Admin moderation panel
- ✅ Real-time database
- ✅ Responsive design

### Upcoming Features
- [ ] Export data to PDF
- [ ] Advanced filtering
- [ ] User notifications
- [ ] Multi-language support

---

<div align="center">

## ⭐ Support Project

**Jika project ini membantu Anda, jangan lupa berikan ⭐ star di repository!**

[⬆️ Kembali ke Atas](#-asmaka---sistem-aspirasi-kmk)

---

**Dibuat dengan ❤️ untuk KMK Community**

© 2024 ASMAKA Project. All rights reserved.

</div>
