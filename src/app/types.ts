// Types for SIGESIT application

export type UserRole = 'kader' | 'admin';

export type BalitaStatus = 'normal' | 'risiko' | 'stunting';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  wilayah?: string;
  email: string;
}

export interface Balita {
  id: string;
  nama: string;
  tanggalLahir: string;
  umur: number;
  namaIbu: string;
  alamat: string;
  rt: string;
  status: BalitaStatus;
  beratBadan: number;
  tinggiBadan: number;
  lastCheckup: string;
}

export interface Pengukuran {
  id: string;
  balitaId: string;
  tanggal: string;
  beratBadan: number;
  tinggiBadan: number;
  umur: number;
  status: BalitaStatus;
}

export interface Intervensi {
  id: string;
  balitaId: string;
  tanggal: string;
  jenis: 'PMT' | 'Edukasi' | 'Kunjungan Rumah';
  catatan: string;
  kader: string;
}

export interface Kunjungan {
  id: string;
  balitaId: string;
  tanggal: string;
  sudahDikunjungi: boolean;
  edukasiDiberikan: boolean;
  pmtDiberikan: boolean;
  catatan: string;
  status: 'Belum' | 'Selesai';
}

export interface RTData {
  rt: string;
  totalBalita: number;
  normal: number;
  risiko: number;
  stunting: number;
  color: 'green' | 'yellow' | 'red';
  lat: number;
  lng: number;
}
