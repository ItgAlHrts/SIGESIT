import { useNavigate } from "react-router";
import { ArrowLeft, Plus, Edit } from "lucide-react";
import { Button } from "../../components/ui/button";
import { mockRTData } from "../../data/mockData";
import AdminLayout from "../../components/AdminLayout";

export default function AdminWilayah() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="px-5 py-6">
          <Button
            onClick={() => alert("Tambah wilayah RT baru")}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 mb-6 btn-lift"
          >
            <Plus className="h-5 w-5 mr-2" />
            Tambah Wilayah RT
          </Button>

          {/* RT List */}
          <div className="space-y-3">
            {mockRTData.map((rt) => {
              const stuntingPercentage = (
                (rt.stunting / rt.totalBalita) *
                100
              ).toFixed(1);

              return (
                <div
                  key={rt.rt}
                  className="bg-white rounded-2xl p-5 shadow-sm animate-card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-xl text-gray-800">
                        {rt.rt}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Koordinat: {rt.lat}, {rt.lng}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full ${
                        rt.color === "green"
                          ? "bg-green-500"
                          : rt.color === "yellow"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-blue-600">
                        {rt.totalBalita}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Total</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-green-600">
                        {rt.normal}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Normal</div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-yellow-600">
                        {rt.risiko}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Risiko</div>
                    </div>
                    <div className="bg-red-50 rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-red-600">
                        {rt.stunting}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Stunting</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Persentase Stunting
                      </span>
                      <span className="text-sm font-semibold text-red-600">
                        {stuntingPercentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500"
                        style={{ width: `${stuntingPercentage}%` }}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => alert("Edit wilayah RT")}
                    variant="outline"
                    size="sm"
                    className="w-full rounded-lg btn-lift"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Wilayah
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
