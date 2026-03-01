import { useNavigate } from "react-router";
import { Users, UserCheck, MapPin, Map, FileText, LogOut } from "lucide-react";
import { Button } from "../../components/ui/button";
import { StatCard } from "../../components/StatCard";
import { mockBalita, mockRTData } from "../../data/mockData";
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
import AdminLayout from "../../components/AdminLayout";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const totalBalita = mockBalita.length;
  const risiko = mockBalita.filter((b) => b.status === "risiko").length;
  const stunting = mockBalita.filter((b) => b.status === "stunting").length;
  const normal = mockBalita.filter((b) => b.status === "normal").length;

  const pieData = [
    { name: "Normal", value: normal, color: "#10B981" },
    { name: "Risiko", value: risiko, color: "#F59E0B" },
    { name: "Stunting", value: stunting, color: "#EF4444" },
  ];

  const barData = mockRTData.map((rt) => ({
    name: rt.rt,
    normal: rt.normal,
    risiko: rt.risiko,
    stunting: rt.stunting,
    total: rt.totalBalita,
  }));

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      navigate("/");
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="px-5 py-6">
          {/* Quick Stats */}
          <div className="flex md:grid overflow-x-auto md:overflow-x-visible gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4 pb-2 md:pb-0">
            <StatCard
              title="Total Balita"
              value={totalBalita}
              icon={Users}
              color="bg-blue-600"
              bgColor="bg-blue-50"
              className="flex-shrink-0 w-[280px] md:w-auto"
            />
            <StatCard
              title="Total Kader"
              value="12"
              icon={UserCheck}
              color="bg-green-600"
              bgColor="bg-green-50"
              className="flex-shrink-0 w-[280px] md:w-auto"
            />
            <StatCard
              title="Risiko"
              value={risiko}
              icon={Users}
              color="bg-yellow-500"
              bgColor="bg-yellow-50"
              className="flex-shrink-0 w-[280px] md:w-auto"
            />
            <StatCard
              title="Stunting"
              value={stunting}
              icon={Users}
              color="bg-red-500"
              bgColor="bg-red-50"
              className="flex-shrink-0 w-[280px] md:w-auto"
            />
          </div>

          {/* Charts */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 animate-card">
            <h3 className="font-semibold text-lg mb-4">
              Distribusi Status Gizi
            </h3>
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

          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 animate-card">
            <h3 className="font-semibold text-lg mb-4">Data per RT</h3>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="normal" fill="#10B981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="risiko" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                  <Bar
                    dataKey="stunting"
                    fill="#EF4444"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Access Menu */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              onClick={() => navigate("/admin/balita")}
              className="h-20 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 flex flex-col items-center justify-center gap-2 animate-card btn-lift"
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">Kelola Balita</span>
            </Button>
            <Button
              onClick={() => navigate("/admin/kader")}
              className="h-20 rounded-xl bg-gradient-to-br from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 flex flex-col items-center justify-center gap-2 animate-card btn-lift"
            >
              <UserCheck className="h-6 w-6" />
              <span className="text-sm">Kelola Kader</span>
            </Button>
            <Button
              onClick={() => navigate("/admin/wilayah")}
              className="h-20 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 flex flex-col items-center justify-center gap-2 animate-card btn-lift"
            >
              <MapPin className="h-6 w-6" />
              <span className="text-sm">Kelola Wilayah</span>
            </Button>
            <Button
              onClick={() => navigate("/admin/peta")}
              className="h-20 rounded-xl bg-gradient-to-br from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 flex flex-col items-center justify-center gap-2 animate-card btn-lift"
            >
              <Map className="h-6 w-6" />
              <span className="text-sm">Peta Monitoring</span>
            </Button>
          </div>

          <Button
            onClick={() => navigate("/admin/laporan")}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 btn-lift"
          >
            <FileText className="h-5 w-5 mr-2" />
            Laporan Lengkap
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
