import { KaderLayout } from "../../components/KaderLayout";
import { StatCard } from "../../components/StatCard";
import {
  Users,
  AlertTriangle,
  TrendingDown,
  Plus,
  ClipboardCheck,
  Calendar,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockBalita, mockRTData, tipsKesehatan } from "../../data/mockData";
import { ChildCard } from "../../components/ChildCard";

export default function Beranda() {
  const navigate = useNavigate();

  // Calculate statistics
  const totalBalita = mockBalita.length;
  const risiko = mockBalita.filter((b) => b.status === "risiko").length;
  const stunting = mockBalita.filter((b) => b.status === "stunting").length;
  const normal = mockBalita.filter((b) => b.status === "normal").length;

  // Pie chart data
  const pieData = [
    { name: "Normal", value: normal, color: "#10B981" },
    { name: "Risiko", value: risiko, color: "#F59E0B" },
    { name: "Stunting", value: stunting, color: "#EF4444" },
  ];

  // Bar chart data - per RT
  const barData = mockRTData.map((rt) => ({
    name: rt.rt,
    normal: rt.normal,
    risiko: rt.risiko,
    stunting: rt.stunting,
  }));

  // Children needing attention
  const childrenNeedAttention = mockBalita
    .filter((b) => b.status !== "normal")
    .slice(0, 3);

  return (
    <KaderLayout>
      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Halo Kader 👋</h2>
        <p className="text-gray-600 mt-1">Selamat datang di SIGESIT</p>
      </div>

      {/* Stats Cards */}
      <div className="flex md:grid overflow-x-auto md:overflow-x-visible gap-3 mb-6 md:grid-cols-3 pb-2 md:pb-0">
        <StatCard
          title="Total Balita"
          value={totalBalita}
          icon={Users}
          color="bg-blue-600"
          bgColor="bg-blue-50"
          className="flex-shrink-0 w-[280px] md:w-auto"
        />
        <StatCard
          title="Risiko"
          value={risiko}
          icon={AlertTriangle}
          color="bg-yellow-500"
          bgColor="bg-yellow-50"
          className="flex-shrink-0 w-[280px] md:w-auto"
        />
        <StatCard
          title="Stunting"
          value={stunting}
          icon={TrendingDown}
          color="bg-red-500"
          bgColor="bg-red-50"
          className="flex-shrink-0 w-[280px] md:w-auto"
        />
      </div>

      {/* Charts */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-lg mb-4">Statistik Status Gizi</h3>
        <div className="h-48 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {pieData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-lg mb-4">Data per RT</h3>
        <div className="h-48 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="normal" fill="#10B981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="risiko" fill="#F59E0B" radius={[8, 8, 0, 0]} />
              <Bar dataKey="stunting" fill="#EF4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Children Needing Attention */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-4">Anak Perlu Perhatian</h3>
        <div className="space-y-3">
          {childrenNeedAttention.map((balita) => (
            <ChildCard
              key={balita.id}
              balita={balita}
              onClick={() => navigate(`/kader/data-balita/${balita.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-1 gap-3">
          <Button
            onClick={() => navigate("/kader/tambah-balita")}
            className="h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
          >
            <Plus className="h-5 w-5 mr-2" />
            Input Data Balita
          </Button>
          <Button
            onClick={() => navigate("/kader/cek-gizi")}
            className="h-14 rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
          >
            <ClipboardCheck className="h-5 w-5 mr-2" />
            Cek Gizi Anak
          </Button>
          <Button
            onClick={() => navigate("/kader/kunjungan")}
            className="h-14 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Kunjungan Hari Ini
          </Button>
        </div>
      </div>

      {/* Health Tips */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-4">Tips Kesehatan Hari Ini</h3>
        <div className="space-y-3">
          {tipsKesehatan.map((tip) => (
            <div
              key={tip.id}
              className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{tip.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {tip.judul}
                  </h4>
                  <p className="text-sm text-gray-600">{tip.isi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </KaderLayout>
  );
}
