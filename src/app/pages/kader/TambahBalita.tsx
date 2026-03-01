import { useState } from 'react';
import { useNavigate } from 'react-router';
import { KaderLayout } from '../../components/KaderLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';

export default function TambahBalita() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    tanggalLahir: '',
    namaIbu: '',
    alamat: '',
    rt: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would save to database
    alert('Data balita berhasil disimpan!');
    navigate('/kader/data-balita');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KaderLayout>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/kader/data-balita')}
          className="p-2 hover:bg-gray-100 rounded-xl transition-all"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Tambah Data Balita</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="nama" className="text-base">Nama Anak</Label>
            <Input
              id="nama"
              type="text"
              placeholder="Masukkan nama lengkap anak"
              value={formData.nama}
              onChange={(e) => handleChange('nama', e.target.value)}
              className="h-12 rounded-xl mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="tanggalLahir" className="text-base">Tanggal Lahir</Label>
            <Input
              id="tanggalLahir"
              type="date"
              value={formData.tanggalLahir}
              onChange={(e) => handleChange('tanggalLahir', e.target.value)}
              className="h-12 rounded-xl mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="namaIbu" className="text-base">Nama Ibu</Label>
            <Input
              id="namaIbu"
              type="text"
              placeholder="Masukkan nama ibu"
              value={formData.namaIbu}
              onChange={(e) => handleChange('namaIbu', e.target.value)}
              className="h-12 rounded-xl mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="rt" className="text-base">RT</Label>
            <Input
              id="rt"
              type="text"
              placeholder="Contoh: RT 01"
              value={formData.rt}
              onChange={(e) => handleChange('rt', e.target.value)}
              className="h-12 rounded-xl mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="alamat" className="text-base">Alamat Lengkap</Label>
            <Input
              id="alamat"
              type="text"
              placeholder="Masukkan alamat lengkap"
              value={formData.alamat}
              onChange={(e) => handleChange('alamat', e.target.value)}
              className="h-12 rounded-xl mt-2"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-base font-medium mt-6"
          >
            <Save className="h-5 w-5 mr-2" />
            Simpan Data
          </Button>
        </form>
      </div>
    </KaderLayout>
  );
}
