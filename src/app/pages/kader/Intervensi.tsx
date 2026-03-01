import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { KaderLayout } from '../../components/KaderLayout';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';
import { mockBalita } from '../../data/mockData';

export default function Intervensi() {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedId = location.state?.balitaId;

  const [selectedBalitaId, setSelectedBalitaId] = useState<string>(preselectedId || '');
  const [jenis, setJenis] = useState<'PMT' | 'Edukasi' | 'Kunjungan Rumah' | ''>('');
  const [catatan, setCatatan] = useState('');

  const selectedBalita = mockBalita.find(b => b.id === selectedBalitaId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, save to database
    alert('Intervensi berhasil disimpan!');
    navigate('/kader/data-balita/' + selectedBalitaId);
  };

  return (
    <KaderLayout>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-all"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Intervensi</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Select Child if not preselected */}
          {!preselectedId && (
            <div>
              <Label className="text-base mb-3 block">Pilih Anak</Label>
              <div className="space-y-2">
                {mockBalita.map((balita) => (
                  <button
                    key={balita.id}
                    type="button"
                    onClick={() => setSelectedBalitaId(balita.id)}
                    className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                      selectedBalitaId === balita.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-800">{balita.nama}</p>
                    <p className="text-sm text-gray-600">{balita.umur} bulan</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedBalita && (
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-gray-600">Anak yang dipilih:</p>
              <p className="font-semibold text-lg text-gray-800 mt-1">{selectedBalita.nama}</p>
            </div>
          )}

          {/* Intervention Type */}
          <div>
            <Label className="text-base mb-3 block">Jenis Intervensi</Label>
            <div className="grid grid-cols-1 gap-3">
              {(['PMT', 'Edukasi', 'Kunjungan Rumah'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setJenis(type)}
                  className={`p-4 rounded-xl border-2 transition-all font-medium ${
                    jenis === type
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="catatan" className="text-base">Catatan</Label>
            <Textarea
              id="catatan"
              placeholder="Masukkan catatan intervensi..."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="min-h-32 rounded-xl mt-2"
              required
            />
          </div>

          {/* Suggestions based on type */}
          {jenis && (
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-green-800 mb-2">Saran untuk {jenis}:</p>
              {jenis === 'PMT' && (
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Berikan susu formula atau makanan tambahan berenergi tinggi</li>
                  <li>Pastikan pemberian teratur sesuai jadwal</li>
                  <li>Monitor respon anak terhadap PMT</li>
                </ul>
              )}
              {jenis === 'Edukasi' && (
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Jelaskan pentingnya gizi seimbang</li>
                  <li>Berikan contoh menu makanan bergizi</li>
                  <li>Ajarkan cara pengolahan makanan yang baik</li>
                </ul>
              )}
              {jenis === 'Kunjungan Rumah' && (
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Observasi kondisi rumah dan lingkungan</li>
                  <li>Cek ketersediaan makanan bergizi</li>
                  <li>Berikan motivasi kepada keluarga</li>
                </ul>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={!selectedBalitaId || !jenis || !catatan}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-base font-medium"
          >
            <Save className="h-5 w-5 mr-2" />
            Simpan Intervensi
          </Button>
        </form>
      </div>
    </KaderLayout>
  );
}
