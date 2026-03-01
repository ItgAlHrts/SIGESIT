import { useParams, useNavigate } from 'react-router';
import { KaderLayout } from '../../components/KaderLayout';
import { StatusBadge } from '../../components/StatusBadge';
import { Button } from '../../components/ui/button';
import { ArrowLeft, ClipboardCheck, Home, Activity } from 'lucide-react';
import { mockBalita, mockPengukuran, mockIntervensi } from '../../data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DetailBalita() {
  const { id } = useParams();
  const navigate = useNavigate();

  const balita = mockBalita.find(b => b.id === id);
  const pengukuranData = mockPengukuran.filter(p => p.balitaId === id);
  const intervensiData = mockIntervensi.filter(i => i.balitaId === id);

  if (!balita) {
    return (
      <KaderLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Data tidak ditemukan</p>
        </div>
      </KaderLayout>
    );
  }

  return (
    <KaderLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/kader/data-balita')}
          className="p-2 hover:bg-gray-100 rounded-xl transition-all"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Profil Kesehatan</h2>
      </div>

      {/* Child Info Card */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{balita.nama}</h3>
            <p className="text-gray-600 mt-1">{balita.umur} bulan</p>
          </div>
          <StatusBadge status={balita.status} size="lg" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white/60 rounded-xl p-3">
            <p className="text-xs text-gray-600">Ibu</p>
            <p className="font-semibold text-gray-800">{balita.namaIbu}</p>
          </div>
          <div className="bg-white/60 rounded-xl p-3">
            <p className="text-xs text-gray-600">RT</p>
            <p className="font-semibold text-gray-800">{balita.rt}</p>
          </div>
          <div className="bg-white/60 rounded-xl p-3">
            <p className="text-xs text-gray-600">Berat Badan</p>
            <p className="font-semibold text-gray-800">{balita.beratBadan} kg</p>
          </div>
          <div className="bg-white/60 rounded-xl p-3">
            <p className="text-xs text-gray-600">Tinggi Badan</p>
            <p className="font-semibold text-gray-800">{balita.tinggiBadan} cm</p>
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-3 mt-4">
          <p className="text-xs text-gray-600">Alamat</p>
          <p className="font-semibold text-gray-800">{balita.alamat}</p>
        </div>
      </div>

      {/* Growth Charts */}
      {pengukuranData.length > 0 && (
        <>
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
            <h3 className="font-semibold text-lg mb-4">Grafik Berat Badan</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pengukuranData}>
                  <XAxis 
                    dataKey="umur" 
                    label={{ value: 'Umur (bulan)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis label={{ value: 'Berat (kg)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="beratBadan" stroke="#3B82F6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
            <h3 className="font-semibold text-lg mb-4">Grafik Tinggi Badan</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pengukuranData}>
                  <XAxis 
                    dataKey="umur" 
                    label={{ value: 'Umur (bulan)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis label={{ value: 'Tinggi (cm)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="tinggiBadan" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Measurement History */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-lg mb-4">Riwayat Pengukuran</h3>
        <div className="space-y-3">
          {pengukuranData.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-800">{new Date(p.tanggal).toLocaleDateString('id-ID')}</p>
                <p className="text-sm text-gray-600 mt-1">
                  BB: {p.beratBadan} kg | TB: {p.tinggiBadan} cm
                </p>
              </div>
              <StatusBadge status={p.status} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Intervention History */}
      {intervensiData.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="font-semibold text-lg mb-4">Riwayat Intervensi</h3>
          <div className="space-y-3">
            {intervensiData.map((i) => (
              <div key={i.id} className="p-3 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-700">{i.jenis}</span>
                  <span className="text-xs text-gray-600">
                    {new Date(i.tanggal).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{i.catatan}</p>
                <p className="text-xs text-gray-500 mt-1">Oleh: {i.kader}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-3">
        <Button
          onClick={() => navigate('/kader/cek-gizi', { state: { balitaId: id } })}
          className="h-14 rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
        >
          <ClipboardCheck className="h-5 w-5 mr-2" />
          Cek Gizi
        </Button>
        <Button
          onClick={() => navigate('/kader/kunjungan')}
          className="h-14 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
        >
          <Home className="h-5 w-5 mr-2" />
          Kunjungan
        </Button>
        <Button
          onClick={() => navigate('/kader/intervensi', { state: { balitaId: id } })}
          className="h-14 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600"
        >
          <Activity className="h-5 w-5 mr-2" />
          Intervensi
        </Button>
      </div>
    </KaderLayout>
  );
}
