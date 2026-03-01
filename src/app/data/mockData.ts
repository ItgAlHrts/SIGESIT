import { Balita, Pengukuran, Intervensi, RTData } from '../types';

export const mockBalita: Balita[] = [
  {
    id: '1',
    nama: 'Ahmad Rizki',
    tanggalLahir: '2022-03-15',
    umur: 35,
    namaIbu: 'Siti Aminah',
    alamat: 'Jl. Melati No. 12',
    rt: 'RT 01',
    status: 'normal',
    beratBadan: 13.5,
    tinggiBadan: 92,
    lastCheckup: '2026-02-15'
  },
  {
    id: '2',
    nama: 'Fatimah Zahra',
    tanggalLahir: '2021-08-20',
    umur: 54,
    namaIbu: 'Nur Hasanah',
    alamat: 'Jl. Mawar No. 5',
    rt: 'RT 01',
    status: 'risiko',
    beratBadan: 14.2,
    tinggiBadan: 96,
    lastCheckup: '2026-02-10'
  },
  {
    id: '3',
    nama: 'Muhammad Farhan',
    tanggalLahir: '2023-01-10',
    umur: 25,
    namaIbu: 'Dewi Lestari',
    alamat: 'Jl. Anggrek No. 8',
    rt: 'RT 02',
    status: 'stunting',
    beratBadan: 9.8,
    tinggiBadan: 78,
    lastCheckup: '2026-02-18'
  },
  {
    id: '4',
    nama: 'Aisyah Putri',
    tanggalLahir: '2022-11-05',
    umur: 27,
    namaIbu: 'Ratna Sari',
    alamat: 'Jl. Kenanga No. 15',
    rt: 'RT 02',
    status: 'normal',
    beratBadan: 11.2,
    tinggiBadan: 85,
    lastCheckup: '2026-02-12'
  },
  {
    id: '5',
    nama: 'Budi Santoso',
    tanggalLahir: '2021-05-22',
    umur: 57,
    namaIbu: 'Sri Wahyuni',
    alamat: 'Jl. Dahlia No. 20',
    rt: 'RT 03',
    status: 'risiko',
    beratBadan: 15.8,
    tinggiBadan: 98,
    lastCheckup: '2026-02-08'
  },
  {
    id: '6',
    nama: 'Zahra Amelia',
    tanggalLahir: '2023-06-15',
    umur: 20,
    namaIbu: 'Lina Marlina',
    alamat: 'Jl. Bougenville No. 3',
    rt: 'RT 03',
    status: 'normal',
    beratBadan: 10.5,
    tinggiBadan: 82,
    lastCheckup: '2026-02-20'
  },
  {
    id: '7',
    nama: 'Rama Wijaya',
    tanggalLahir: '2022-09-30',
    umur: 28,
    namaIbu: 'Maya Indah',
    alamat: 'Jl. Cempaka No. 7',
    rt: 'RT 04',
    status: 'stunting',
    beratBadan: 10.2,
    tinggiBadan: 80,
    lastCheckup: '2026-02-14'
  },
  {
    id: '8',
    nama: 'Siti Nurhaliza',
    tanggalLahir: '2021-12-18',
    umur: 50,
    namaIbu: 'Eka Putri',
    alamat: 'Jl. Flamboyan No. 11',
    rt: 'RT 04',
    status: 'normal',
    beratBadan: 15.2,
    tinggiBadan: 100,
    lastCheckup: '2026-02-16'
  }
];

export const mockPengukuran: Pengukuran[] = [
  // Ahmad Rizki
  { id: '1', balitaId: '1', tanggal: '2025-08-15', beratBadan: 11.5, tinggiBadan: 85, umur: 29, status: 'normal' },
  { id: '2', balitaId: '1', tanggal: '2025-11-15', beratBadan: 12.5, tinggiBadan: 88, umur: 32, status: 'normal' },
  { id: '3', balitaId: '1', tanggal: '2026-02-15', beratBadan: 13.5, tinggiBadan: 92, umur: 35, status: 'normal' },
  
  // Fatimah Zahra
  { id: '4', balitaId: '2', tanggal: '2025-08-20', beratBadan: 12.8, tinggiBadan: 90, umur: 48, status: 'normal' },
  { id: '5', balitaId: '2', tanggal: '2025-11-20', beratBadan: 13.5, tinggiBadan: 93, umur: 51, status: 'risiko' },
  { id: '6', balitaId: '2', tanggal: '2026-02-10', beratBadan: 14.2, tinggiBadan: 96, umur: 54, status: 'risiko' },
  
  // Muhammad Farhan
  { id: '7', balitaId: '3', tanggal: '2025-08-10', beratBadan: 8.5, tinggiBadan: 72, umur: 19, status: 'stunting' },
  { id: '8', balitaId: '3', tanggal: '2025-11-10', beratBadan: 9.2, tinggiBadan: 75, umur: 22, status: 'stunting' },
  { id: '9', balitaId: '3', tanggal: '2026-02-18', beratBadan: 9.8, tinggiBadan: 78, umur: 25, status: 'stunting' },
];

export const mockIntervensi: Intervensi[] = [
  {
    id: '1',
    balitaId: '3',
    tanggal: '2026-02-19',
    jenis: 'PMT',
    catatan: 'Diberikan susu formula dan biskuit berenergi tinggi',
    kader: 'Ibu Sari'
  },
  {
    id: '2',
    balitaId: '3',
    tanggal: '2026-02-19',
    jenis: 'Edukasi',
    catatan: 'Edukasi pola makan bergizi untuk ibu',
    kader: 'Ibu Sari'
  },
  {
    id: '3',
    balitaId: '2',
    tanggal: '2026-02-11',
    jenis: 'Kunjungan Rumah',
    catatan: 'Monitoring pola makan dan aktivitas anak',
    kader: 'Ibu Sari'
  }
];

export const mockRTData: RTData[] = [
  {
    rt: 'RT 01',
    totalBalita: 12,
    normal: 8,
    risiko: 3,
    stunting: 1,
    color: 'yellow',
    lat: -6.2088,
    lng: 106.8456
  },
  {
    rt: 'RT 02',
    totalBalita: 10,
    normal: 7,
    risiko: 2,
    stunting: 1,
    color: 'yellow',
    lat: -6.2095,
    lng: 106.8465
  },
  {
    rt: 'RT 03',
    totalBalita: 15,
    normal: 12,
    risiko: 2,
    stunting: 1,
    color: 'green',
    lat: -6.2080,
    lng: 106.8450
  },
  {
    rt: 'RT 04',
    totalBalita: 8,
    normal: 4,
    risiko: 2,
    stunting: 2,
    color: 'red',
    lat: -6.2100,
    lng: 106.8470
  }
];

export const tipsKesehatan = [
  {
    id: '1',
    judul: 'Pentingnya Protein untuk Pertumbuhan',
    isi: 'Berikan anak makanan tinggi protein seperti telur, ikan, dan tempe setiap hari untuk mendukung pertumbuhan optimal.',
    icon: '🥚'
  },
  {
    id: '2',
    judul: 'ASI Eksklusif 6 Bulan',
    isi: 'Berikan ASI eksklusif hingga usia 6 bulan tanpa makanan atau minuman tambahan lainnya.',
    icon: '🍼'
  },
  {
    id: '3',
    judul: 'Imunisasi Lengkap',
    isi: 'Pastikan anak mendapat imunisasi lengkap sesuai jadwal untuk mencegah penyakit.',
    icon: '💉'
  }
];
