import { useState } from 'react';
import { KaderLayout } from '../../components/KaderLayout';
import { mockRTData, mockBalita } from '../../data/mockData';
import { MapPin, Users, AlertTriangle, TrendingDown } from 'lucide-react';
import { StatusBadge } from '../../components/StatusBadge';

export default function PetaRT() {
  const [selectedRT, setSelectedRT] = useState<string | null>(null);

  const selectedRTData = mockRTData.find(rt => rt.rt === selectedRT);
  const childrenInRT = mockBalita.filter(b => b.rt === selectedRT);

  return (
    <KaderLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Peta Stunting per RT</h2>
        <p className="text-gray-600 mt-1">Visualisasi data stunting di wilayah Anda</p>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold mb-3">Legenda Status Wilayah</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700">Aman (Stunting {'<'} 20%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-700">Risiko (Stunting 20-40%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-700">Tinggi (Stunting {'>'} 40%)</span>
          </div>
        </div>
      </div>

      {/* Map Area - Simulated with cards */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold mb-4">Peta Wilayah RT</h3>
        <div className="grid grid-cols-2 gap-4">
          {mockRTData.map((rt) => {
            const stuntingPercentage = ((rt.stunting / rt.totalBalita) * 100).toFixed(0);
            const colorClasses = {
              green: 'bg-green-100 border-green-500 text-green-700',
              yellow: 'bg-yellow-100 border-yellow-500 text-yellow-700',
              red: 'bg-red-100 border-red-500 text-red-700'
            };

            return (
              <button
                key={rt.rt}
                onClick={() => setSelectedRT(rt.rt)}
                className={`relative p-6 rounded-2xl border-4 transition-all hover:scale-105 ${
                  colorClasses[rt.color]
                } ${selectedRT === rt.rt ? 'ring-4 ring-blue-500' : ''}`}
              >
                <MapPin className="h-8 w-8 mb-2 mx-auto" />
                <div className="font-bold text-xl">{rt.rt}</div>
                <div className="text-sm mt-2">
                  {rt.totalBalita} balita
                </div>
                <div className="text-xs mt-1 font-semibold">
                  {stuntingPercentage}% stunting
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected RT Details */}
      {selectedRTData && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="font-semibold text-lg mb-4">Detail {selectedRTData.rt}</h3>
          
          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <Users className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-blue-600">{selectedRTData.totalBalita}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-green-600">{selectedRTData.normal}</div>
              <div className="text-xs text-gray-600">Normal</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-3 text-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-yellow-600">{selectedRTData.risiko}</div>
              <div className="text-xs text-gray-600">Risiko</div>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center">
              <TrendingDown className="h-5 w-5 text-red-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-red-600">{selectedRTData.stunting}</div>
              <div className="text-xs text-gray-600">Stunting</div>
            </div>
          </div>

          {/* Children List */}
          <h4 className="font-semibold mb-3">Daftar Balita</h4>
          <div className="space-y-2">
            {childrenInRT.map((balita) => (
              <div
                key={balita.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-medium text-gray-800">{balita.nama}</p>
                  <p className="text-sm text-gray-600">{balita.umur} bulan</p>
                </div>
                <StatusBadge status={balita.status} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overall Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Ringkasan Keseluruhan</h3>
        <div className="space-y-3">
          {mockRTData.map((rt) => (
            <div key={rt.rt} className="bg-white rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">{rt.rt}</span>
                <div className={`w-4 h-4 rounded-full ${
                  rt.color === 'green' ? 'bg-green-500' :
                  rt.color === 'yellow' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{rt.totalBalita} balita</span>
                <span className="font-semibold text-red-600">{rt.stunting} stunting</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </KaderLayout>
  );
}
