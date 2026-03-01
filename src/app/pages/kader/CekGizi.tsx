import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { KaderLayout } from '../../components/KaderLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockBalita } from '../../data/mockData';
import { StatusBadge } from '../../components/StatusBadge';
import { BalitaStatus } from '../../types';

export default function CekGizi() {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedId = location.state?.balitaId;

  const [step, setStep] = useState(1);
  const [selectedBalitaId, setSelectedBalitaId] = useState<string>(preselectedId || '');
  const [beratBadan, setBeratBadan] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [result, setResult] = useState<{
    status: BalitaStatus;
    rekomendasi: string[];
  } | null>(null);

  const selectedBalita = mockBalita.find(b => b.id === selectedBalitaId);

  const calculateStatus = (): BalitaStatus => {
    // Simple mock calculation - in production would use WHO growth charts
    const bb = parseFloat(beratBadan);
    const tb = parseFloat(tinggiBadan);
    const umur = selectedBalita?.umur || 0;

    // Mock logic
    if (tb < 75 || bb < 9) return 'stunting';
    if (tb < 85 || bb < 11) return 'risiko';
    return 'normal';
  };

  const getRecommendations = (status: BalitaStatus): string[] => {
    if (status === 'stunting') {
      return [
        'Segera lakukan intervensi PMT (Pemberian Makanan Tambahan)',
        'Rujuk ke puskesmas untuk pemeriksaan lebih lanjut',
        'Tingkatkan asupan protein (telur, ikan, tempe, tahu)',
        'Lakukan kunjungan rutin setiap 2 minggu',
        'Berikan edukasi gizi kepada ibu'
      ];
    } else if (status === 'risiko') {
      return [
        'Tingkatkan asupan makanan bergizi',
        'Tambahkan protein dalam menu harian',
        'Periksa kembali dalam 1 bulan',
        'Monitor tumbuh kembang secara rutin',
        'Berikan edukasi pola makan sehat'
      ];
    } else {
      return [
        'Pertahankan pola makan yang sehat',
        'Lanjutkan pemberian ASI/makanan bergizi',
        'Periksa rutin setiap 3 bulan',
        'Pastikan imunisasi lengkap'
      ];
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedBalitaId) {
      setStep(2);
    } else if (step === 2 && beratBadan && tinggiBadan) {
      const status = calculateStatus();
      const rekomendasi = getRecommendations(status);
      setResult({ status, rekomendasi });
      setStep(3);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedBalitaId('');
    setBeratBadan('');
    setTinggiBadan('');
    setResult(null);
  };

  return (
    <KaderLayout>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/kader')}
          className="p-2 hover:bg-gray-100 rounded-xl transition-all"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Cek Gizi Anak</h2>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                step >= s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-8 h-1 mx-1 ${
                  step > s ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Child */}
      {step === 1 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Pilih Anak</h3>
          <div className="space-y-3">
            {mockBalita.map((balita) => (
              <button
                key={balita.id}
                onClick={() => setSelectedBalitaId(balita.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedBalitaId === balita.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{balita.nama}</p>
                    <p className="text-sm text-gray-600 mt-1">{balita.umur} bulan - {balita.rt}</p>
                  </div>
                  <StatusBadge status={balita.status} size="sm" />
                </div>
              </button>
            ))}
          </div>
          <Button
            onClick={handleNext}
            disabled={!selectedBalitaId}
            className="w-full h-14 rounded-xl mt-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
          >
            Lanjut
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      )}

      {/* Step 2: Input Measurements */}
      {step === 2 && selectedBalita && (
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-2xl p-4">
            <p className="text-sm text-gray-600">Anak yang dipilih:</p>
            <p className="font-semibold text-lg text-gray-800 mt-1">{selectedBalita.nama}</p>
            <p className="text-sm text-gray-600">{selectedBalita.umur} bulan</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Input Data Pengukuran</h3>
            <div className="space-y-5">
              <div>
                <Label htmlFor="beratBadan" className="text-base">Berat Badan (kg)</Label>
                <Input
                  id="beratBadan"
                  type="number"
                  step="0.1"
                  placeholder="Contoh: 12.5"
                  value={beratBadan}
                  onChange={(e) => setBeratBadan(e.target.value)}
                  className="h-12 rounded-xl mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="tinggiBadan" className="text-base">Tinggi Badan (cm)</Label>
                <Input
                  id="tinggiBadan"
                  type="number"
                  step="0.1"
                  placeholder="Contoh: 85.5"
                  value={tinggiBadan}
                  onChange={(e) => setTinggiBadan(e.target.value)}
                  className="h-12 rounded-xl mt-2"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 h-14 rounded-xl"
              >
                Kembali
              </Button>
              <Button
                onClick={handleNext}
                disabled={!beratBadan || !tinggiBadan}
                className="flex-1 h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              >
                Cek Status
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && result && selectedBalita && (
        <div className="space-y-6">
          {/* Status Card */}
          <div className={`rounded-2xl p-6 shadow-lg ${
            result.status === 'normal' ? 'bg-gradient-to-br from-green-50 to-green-100' :
            result.status === 'risiko' ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' :
            'bg-gradient-to-br from-red-50 to-red-100'
          }`}>
            <div className="flex items-center justify-center mb-4">
              {result.status === 'normal' ? (
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              ) : (
                <AlertCircle className="h-16 w-16 text-red-600" />
              )}
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Hasil Pemeriksaan</h3>
              <div className="flex justify-center mb-4">
                <StatusBadge status={result.status} size="lg" />
              </div>
              <div className="bg-white/60 rounded-xl p-4 mt-4">
                <p className="font-semibold text-gray-800">{selectedBalita.nama}</p>
                <p className="text-sm text-gray-600 mt-1">
                  BB: {beratBadan} kg | TB: {tinggiBadan} cm
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Rekomendasi</h3>
            <div className="space-y-3">
              {result.rekomendasi.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold">{idx + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 gap-3">
            {result.status !== 'normal' && (
              <Button
                onClick={() => navigate('/kader/intervensi', { state: { balitaId: selectedBalitaId } })}
                className="h-14 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600"
              >
                Lakukan Penanganan
              </Button>
            )}
            <Button
              onClick={handleReset}
              variant="outline"
              className="h-14 rounded-xl"
            >
              Cek Anak Lain
            </Button>
            <Button
              onClick={() => navigate('/kader')}
              className="h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      )}
    </KaderLayout>
  );
}
