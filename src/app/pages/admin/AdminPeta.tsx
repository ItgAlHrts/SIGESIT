import { useState } from "react";
import { MapPin } from "lucide-react";
import { mockRTData, mockBalita } from "../../data/mockData";
import { StatusBadge } from "../../components/StatusBadge";
import AdminLayout from "../../components/AdminLayout";

export default function AdminPeta() {
  const [selectedRT, setSelectedRT] = useState<string | null>(null);

  const selectedRTData = mockRTData.find((rt) => rt.rt === selectedRT);
  const childrenInRT = mockBalita.filter((b) => b.rt === selectedRT);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="px-5 py-6">
          {/* Legend */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 animate-card">
            <h3 className="font-semibold mb-3">Legenda</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-700">
                  Aman ({"<"} 20% stunting)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-700">
                  Risiko (20-40% stunting)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-700">
                  Tinggi ({">"} 40% stunting)
                </span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
            <h3 className="font-semibold mb-4">Peta Wilayah</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mockRTData.map((rt) => {
                const stuntingPercentage = (
                  (rt.stunting / rt.totalBalita) *
                  100
                ).toFixed(0);
                const colorClasses = {
                  green: "bg-green-100 border-green-500 text-green-700",
                  yellow: "bg-yellow-100 border-yellow-500 text-yellow-700",
                  red: "bg-red-100 border-red-500 text-red-700",
                };

                return (
                  <button
                    key={rt.rt}
                    onClick={() => setSelectedRT(rt.rt)}
                    className={`relative p-6 rounded-2xl border-4 transition-all hover:scale-105 animate-card ${
                      colorClasses[rt.color]
                    } ${selectedRT === rt.rt ? "ring-4 ring-blue-500" : ""}`}
                  >
                    <MapPin className="h-10 w-10 mb-2 mx-auto" />
                    <div className="font-bold text-xl">{rt.rt}</div>
                    <div className="text-sm mt-2">{rt.totalBalita} balita</div>
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
            <div className="bg-white rounded-2xl p-5 shadow-sm animate-card">
              <h3 className="font-semibold text-lg mb-4">
                Detail {selectedRTData.rt}
              </h3>

              <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {selectedRTData.totalBalita}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Total</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-green-600">
                    {selectedRTData.normal}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Normal</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-yellow-600">
                    {selectedRTData.risiko}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Risiko</div>
                </div>
                <div className="bg-red-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-red-600">
                    {selectedRTData.stunting}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Stunting</div>
                </div>
              </div>

              <h4 className="font-semibold mb-3">Daftar Balita</h4>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {childrenInRT.map((balita) => (
                  <div
                    key={balita.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{balita.nama}</p>
                      <p className="text-sm text-gray-600">
                        {balita.umur} bulan - {balita.alamat}
                      </p>
                    </div>
                    <StatusBadge status={balita.status} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
