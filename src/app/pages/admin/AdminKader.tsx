import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, Plus, Edit, Trash2, MapPin } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import AdminLayout from "../../components/AdminLayout";

interface Kader {
  id: string;
  nama: string;
  email: string;
  wilayah: string[];
  totalBalita: number;
  status: "Aktif" | "Nonaktif";
}

const mockKader: Kader[] = [
  {
    id: "1",
    nama: "Ibu Sari",
    email: "sari@posyandu.id",
    wilayah: ["RT 01", "RT 02"],
    totalBalita: 20,
    status: "Aktif",
  },
  {
    id: "2",
    nama: "Ibu Dewi",
    email: "dewi@posyandu.id",
    wilayah: ["RT 03", "RT 04"],
    totalBalita: 25,
    status: "Aktif",
  },
  {
    id: "3",
    nama: "Ibu Maya",
    email: "maya@posyandu.id",
    wilayah: ["RT 05"],
    totalBalita: 15,
    status: "Aktif",
  },
];

export default function AdminKader() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredKader = mockKader.filter(
    (kader) =>
      kader.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kader.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
                placeholder="Cari kader..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl"
              />
            </div>
            <Button
              onClick={() => alert("Tambah kader baru")}
              className="h-12 px-4 rounded-xl bg-gradient-to-r from-green-600 to-green-500"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 animate-card">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">
                {mockKader.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Kader</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">
                {mockKader.filter((k) => k.status === "Aktif").length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Kader Aktif</div>
            </div>
          </div>

          {/* Kader List */}
          <div className="space-y-3">
            {filteredKader.map((kader) => (
              <div
                key={kader.id}
                className="bg-white rounded-2xl p-4 shadow-sm animate-card"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {kader.nama}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{kader.email}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{kader.wilayah.join(", ")}</span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      kader.status === "Aktif"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {kader.status}
                  </span>
                </div>

                <div className="bg-blue-50 rounded-xl p-3 mb-3">
                  <p className="text-sm text-gray-600">Menangani</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {kader.totalBalita} Balita
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => alert("Edit kader")}
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-lg btn-lift"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      confirm("Nonaktifkan kader?") &&
                      alert("Kader dinonaktifkan")
                    }
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 btn-lift"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Nonaktifkan
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
