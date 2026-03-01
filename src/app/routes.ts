import { createBrowserRouter } from 'react-router';

// Auth
import Login from './pages/Login';

// Kader Pages
import Beranda from './pages/kader/Beranda';
import DataBalita from './pages/kader/DataBalita';
import DetailBalita from './pages/kader/DetailBalita';
import TambahBalita from './pages/kader/TambahBalita';
import CekGizi from './pages/kader/CekGizi';
import Intervensi from './pages/kader/Intervensi';
import Kunjungan from './pages/kader/Kunjungan';
import PetaRT from './pages/kader/PetaRT';
import Laporan from './pages/kader/Laporan';
import Profil from './pages/kader/Profil';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBalita from './pages/admin/AdminBalita';
import AdminKader from './pages/admin/AdminKader';
import AdminWilayah from './pages/admin/AdminWilayah';
import AdminPeta from './pages/admin/AdminPeta';
import AdminLaporan from './pages/admin/AdminLaporan';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login
  },
  // Kader Routes
  {
    path: '/kader',
    Component: Beranda
  },
  {
    path: '/kader/data-balita',
    Component: DataBalita
  },
  {
    path: '/kader/data-balita/:id',
    Component: DetailBalita
  },
  {
    path: '/kader/tambah-balita',
    Component: TambahBalita
  },
  {
    path: '/kader/cek-gizi',
    Component: CekGizi
  },
  {
    path: '/kader/intervensi',
    Component: Intervensi
  },
  {
    path: '/kader/kunjungan',
    Component: Kunjungan
  },
  {
    path: '/kader/peta',
    Component: PetaRT
  },
  {
    path: '/kader/laporan',
    Component: Laporan
  },
  {
    path: '/kader/profil',
    Component: Profil
  },
  // Admin Routes
  {
    path: '/admin',
    Component: AdminDashboard
  },
  {
    path: '/admin/balita',
    Component: AdminBalita
  },
  {
    path: '/admin/kader',
    Component: AdminKader
  },
  {
    path: '/admin/wilayah',
    Component: AdminWilayah
  },
  {
    path: '/admin/peta',
    Component: AdminPeta
  },
  {
    path: '/admin/laporan',
    Component: AdminLaporan
  }
]);
