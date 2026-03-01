# SIGESIT - Sistem Informasi Gizi dan Stunting

Aplikasi mobile health monitoring untuk kader posyandu dalam memantau pertumbuhan balita dan deteksi dini stunting.

## 🎯 Fitur Utama

### Untuk Kader Posyandu
- **Dashboard Kesehatan** - Statistik real-time balita dengan chart interaktif
- **Manajemen Data Balita** - CRUD data balita dengan pencarian
- **Cek Gizi** - Sistem 3 langkah untuk pemeriksaan gizi dan deteksi stunting
- **Intervensi** - Pencatatan PMT, Edukasi, dan Kunjungan Rumah
- **Kunjungan** - Checklist kunjungan harian dengan catatan
- **Peta RT** - Visualisasi stunting per wilayah RT
- **Laporan** - Generate laporan bulanan
- **Profil** - Manajemen profil kader

### Untuk Admin
- **Dashboard Admin** - Overview lengkap semua data
- **Kelola Balita** - Manajemen data balita dengan statistik
- **Kelola Kader** - CRUD data kader dan assignment wilayah
- **Kelola Wilayah RT** - Konfigurasi wilayah dan target
- **Peta Monitoring** - Monitoring real-time per wilayah
- **Laporan Lengkap** - Analisis data komprehensif dengan chart

## 📱 Screens (16 screens total)

### Authentication (1)
1. Login - Role selection (Kader/Admin)

### Kader App (10 screens)
2. Beranda - Dashboard with stats, charts, tips
3. Data Balita - List balita dengan filter
4. Detail Balita - Health profile dengan growth charts
5. Tambah Balita - Form input balita baru
6. Cek Gizi - 3-step nutrition check
7. Intervensi - Form intervensi dengan suggestions
8. Kunjungan - Daily visit checklist
9. Peta RT - Color-coded stunting map
10. Laporan - Monthly report dengan charts
11. Profil - Kader profile dan settings

### Admin App (6 screens)
12. Admin Dashboard - Complete statistics
13. Admin Balita - Manage all children data
14. Admin Kader - Manage health workers
15. Admin Wilayah - Manage RT areas
16. Admin Peta - Monitoring map
17. Admin Laporan - Comprehensive reports

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) - Trust, health
- **Success**: Green (#10B981) - Normal status
- **Warning**: Yellow (#F59E0B) - Risk status
- **Danger**: Red (#EF4444) - Stunting status
- **Background**: Gray 50 (#F9FAFB)

### Components
- Large touch-friendly buttons (min 44px height)
- Rounded cards (16-24px radius)
- Status badges with color coding
- Interactive charts (Recharts)
- Bottom navigation for main sections

## 🏗️ Tech Stack

- **Framework**: React 18.3.1
- **Routing**: React Router 7.13.0
- **Styling**: Tailwind CSS 4.1.12
- **Charts**: Recharts 2.15.2
- **Icons**: Lucide React 0.487.0
- **UI Components**: Radix UI
- **Forms**: React Hook Form 7.55.0

## 📂 Project Structure

```
/src/app/
├── pages/
│   ├── Login.tsx
│   ├── kader/
│   │   ├── Beranda.tsx
│   │   ├── DataBalita.tsx
│   │   ├── DetailBalita.tsx
│   │   ├── TambahBalita.tsx
│   │   ├── CekGizi.tsx
│   │   ├── Intervensi.tsx
│   │   ├── Kunjungan.tsx
│   │   ├── PetaRT.tsx
│   │   ├── Laporan.tsx
│   │   └── Profil.tsx
│   └── admin/
│       ├── AdminDashboard.tsx
│       ├── AdminBalita.tsx
│       ├── AdminKader.tsx
│       ├── AdminWilayah.tsx
│       ├── AdminPeta.tsx
│       └── AdminLaporan.tsx
├── components/
│   ├── KaderLayout.tsx
│   ├── StatusBadge.tsx
│   ├── StatCard.tsx
│   └── ChildCard.tsx
├── data/
│   └── mockData.ts
├── types.ts
├── routes.ts
└── App.tsx
```

## 🚀 How to Use

### Login
1. Pilih role: Kader atau Admin
2. Input username dan password (any value untuk demo)
3. Klik "Masuk"

### Kader Workflow
1. **View Dashboard** - Lihat statistik dan anak yang perlu perhatian
2. **Add Child** - Tambah data balita baru
3. **Check Nutrition** - Lakukan pemeriksaan gizi 3 langkah
4. **Intervention** - Catat intervensi PMT/Edukasi/Kunjungan
5. **Daily Visit** - Checklist kunjungan harian
6. **View Map** - Monitor sebaran stunting per RT
7. **Generate Report** - Buat laporan bulanan

### Admin Workflow
1. **Monitor Dashboard** - Overview semua data
2. **Manage Data** - CRUD balita, kader, wilayah
3. **View Analytics** - Chart dan trend analysis
4. **Generate Reports** - Laporan komprehensif

## 🎯 Key Features Explained

### Cek Gizi (3-Step Process)
**Step 1**: Pilih anak dari list
**Step 2**: Input berat badan dan tinggi badan
**Step 3**: Hasil otomatis dengan rekomendasi
- Status: Normal/Risiko/Stunting
- Rekomendasi spesifik per status
- Quick action: Lakukan Penanganan

### Status Color Coding
- 🟢 **Green** (Normal) - Pertumbuhan baik
- 🟡 **Yellow** (Risiko) - Perlu monitoring
- 🔴 **Red** (Stunting) - Butuh intervensi segera

### Peta RT (Interactive Map)
- Color-coded per RT berdasarkan % stunting
- Click untuk detail per RT
- List balita per wilayah
- Legend untuk interpretasi

## 📊 Data Structure

### Balita (Child)
- Personal info (nama, tanggal lahir, alamat)
- Growth data (berat, tinggi)
- Status (normal/risiko/stunting)
- Measurement history
- Intervention records

### Pengukuran (Measurement)
- Timestamp
- Weight, height
- Age at measurement
- Calculated status

### Intervensi (Intervention)
- Type: PMT/Edukasi/Kunjungan Rumah
- Date, notes
- Assigned kader

## 🔐 Role-Based Access

### Kader
- Input dan edit data balita di wilayahnya
- Cek gizi dan intervensi
- View dan create laporan
- Limited to assigned RT areas

### Admin
- Full access ke semua data
- Manage kader dan wilayah
- System-wide analytics
- Generate comprehensive reports

## 💡 UX Principles

1. **Max 3 steps** per action
2. **Simple language** - Bahasa Indonesia, non-technical
3. **Visual feedback** - Colors, charts, badges
4. **Touch-friendly** - Large buttons (56px)
5. **Mobile-first** - Optimized for mobile screens
6. **Clear hierarchy** - Important info prominent
7. **Quick access** - Common actions easily accessible

## 🎨 Style Guidelines

### Typography
- Headers: Bold, 2xl-3xl
- Body: Regular, base-lg
- Labels: Medium, sm-base

### Spacing
- Cards: p-5 (20px)
- Grid gaps: gap-3 to gap-6
- Sections: mb-6

### Shadows
- Cards: shadow-sm
- Elevated: shadow-lg
- Active: shadow-xl

## 📱 Mobile Optimization

- Bottom navigation for main sections
- Sticky action buttons
- Large tap targets (minimum 44x44px)
- Readable text sizes (minimum 14px)
- Thumb-friendly layout
- One-handed operation support

## 🔄 Future Enhancements

- [ ] Backend integration (Supabase)
- [ ] Real-time notifications
- [ ] Offline mode
- [ ] Export to PDF
- [ ] Photo upload for children
- [ ] SMS reminders
- [ ] Growth chart comparison with WHO standards
- [ ] Multi-language support

## 📝 Notes

This is a demo application with mock data. In production:
- Connect to real database
- Implement authentication
- Add data validation
- Implement WHO growth chart calculations
- Add export functionality
- Implement push notifications
- Add data backup

---

Built with ❤️ for community health workers
