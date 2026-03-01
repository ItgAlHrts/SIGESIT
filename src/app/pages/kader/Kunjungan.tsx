import { useState } from 'react';
import { KaderLayout } from '../../components/KaderLayout';
import { Checkbox } from '../../components/ui/checkbox';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Save, Calendar } from 'lucide-react';
import { mockBalita } from '../../data/mockData';
import { StatusBadge } from '../../components/StatusBadge';

interface KunjunganData {
  balitaId: string;
  sudahDikunjungi: boolean;
  edukasiDiberikan: boolean;
  pmtDiberikan: boolean;
  catatan: string;
}

export default function Kunjungan() {
  const [kunjunganData, setKunjunganData] = useState<Record<string, KunjunganData>>(
    mockBalita.reduce((acc, balita) => ({
      ...acc,
      [balita.id]: {
        balitaId: balita.id,
        sudahDikunjungi: false,
        edukasiDiberikan: false,
        pmtDiberikan: false,
        catatan: ''
      }
    }), {})
  );

  const updateKunjungan = (balitaId: string, field: keyof KunjunganData, value: boolean | string) => {
    setKunjunganData(prev => ({
      ...prev,
      [balitaId]: {
        ...prev[balitaId],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // In production, save to database
    const completed = Object.values(kunjunganData).filter(k => k.sudahDikunjungi).length;
    alert(`Berhasil menyimpan ${completed} data kunjungan!`);
  };

  const totalSelesai = Object.values(kunjunganData).filter(k => k.sudahDikunjungi).length;
  const totalBelum = mockBalita.length - totalSelesai;

  return (
    <KaderLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Kunjungan Hari Ini</h2>
        <p className="text-gray-600 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{totalSelesai}</div>
          <div className="text-sm text-gray-600 mt-1">Selesai</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">{totalBelum}</div>
          <div className="text-sm text-gray-600 mt-1">Belum</div>
        </div>
      </div>

      {/* Visit List */}
      <div className="space-y-4 mb-6">
        {mockBalita.map((balita) => {
          const data = kunjunganData[balita.id];
          const isCompleted = data.sudahDikunjungi;

          return (
            <div
              key={balita.id}
              className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all ${
                isCompleted ? 'border-green-200 bg-green-50/30' : 'border-gray-100'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{balita.nama}</h3>
                  <p className="text-sm text-gray-600">{balita.alamat}</p>
                </div>
                <StatusBadge status={balita.status} size="sm" />
              </div>

              {/* Checklist */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Checkbox
                    id={`visited-${balita.id}`}
                    checked={data.sudahDikunjungi}
                    onCheckedChange={(checked) => 
                      updateKunjungan(balita.id, 'sudahDikunjungi', checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`visited-${balita.id}`}
                    className="flex-1 cursor-pointer font-medium text-gray-700"
                  >
                    Sudah dikunjungi
                  </label>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Checkbox
                    id={`edukasi-${balita.id}`}
                    checked={data.edukasiDiberikan}
                    onCheckedChange={(checked) => 
                      updateKunjungan(balita.id, 'edukasiDiberikan', checked as boolean)
                    }
                    disabled={!data.sudahDikunjungi}
                  />
                  <label
                    htmlFor={`edukasi-${balita.id}`}
                    className="flex-1 cursor-pointer text-gray-700"
                  >
                    Edukasi diberikan
                  </label>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Checkbox
                    id={`pmt-${balita.id}`}
                    checked={data.pmtDiberikan}
                    onCheckedChange={(checked) => 
                      updateKunjungan(balita.id, 'pmtDiberikan', checked as boolean)
                    }
                    disabled={!data.sudahDikunjungi}
                  />
                  <label
                    htmlFor={`pmt-${balita.id}`}
                    className="flex-1 cursor-pointer text-gray-700"
                  >
                    PMT diberikan
                  </label>
                </div>
              </div>

              {/* Notes */}
              {data.sudahDikunjungi && (
                <Textarea
                  placeholder="Catatan kunjungan..."
                  value={data.catatan}
                  onChange={(e) => updateKunjungan(balita.id, 'catatan', e.target.value)}
                  className="min-h-20 rounded-xl"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-base font-medium sticky bottom-20 shadow-lg"
      >
        <Save className="h-5 w-5 mr-2" />
        Simpan Semua ({totalSelesai}/{mockBalita.length})
      </Button>
    </KaderLayout>
  );
}
