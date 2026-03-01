import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { StatusBadge } from "../../components/StatusBadge";
import { mockBalita } from "../../data/mockData";
import AdminLayout from "../../components/AdminLayout";

export default function AdminBalita() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBalita = mockBalita.filter(
    (balita) =>
      balita.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      balita.namaIbu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      balita.rt.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id: string, nama: string) => {
    if (confirm(`Hapus data ${nama}?`)) {
      alert("Data berhasil dihapus");
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="px-5 py-6">
          {/* Search & Add */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari balita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl"
              />
            </div>
            <Button
              onClick={() => alert("Tambah balita baru")}
              className="h-12 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-card">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredBalita.length}
              </div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredBalita.filter((b) => b.status === "normal").length}
              </div>
              <div className="text-xs text-gray-600">Normal</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredBalita.filter((b) => b.status === "risiko").length}
              </div>
              <div className="text-xs text-gray-600">Risiko</div>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-red-600">
                {filteredBalita.filter((b) => b.status === "stunting").length}
              </div>
              <div className="text-xs text-gray-600">Stunting</div>
            </div>
          </div>

          {/* Table View */}
          <div className="space-y-3">
            {filteredBalita.map((balita) => (
              <div
                key={balita.id}
                className="bg-white rounded-2xl p-4 shadow-sm animate-card"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {balita.nama}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Ibu: {balita.namaIbu}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {balita.alamat} - {balita.rt}
                    </p>
                  </div>
                  <StatusBadge status={balita.status} size="sm" />
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-600">Umur</p>
                    <p className="font-semibold text-sm">{balita.umur} bln</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-600">BB</p>
                    <p className="font-semibold text-sm">
                      {balita.beratBadan} kg
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-600">TB</p>
                    <p className="font-semibold text-sm">
                      {balita.tinggiBadan} cm
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => alert("Edit data")}
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-lg btn-lift"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(balita.id, balita.nama)}
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 btn-lift"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
