import { useState } from "react";
import { Download } from "lucide-react";
import { generatePDF } from "../../utils/pdf";
import { mockBalita, mockRTData } from "../../data/mockData";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
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
  LineChart,
  Line,
} from "recharts";
import AdminLayout from "../../components/AdminLayout";

export default function AdminLaporan() {
  const [selectedMonth, setSelectedMonth] = useState("2026-02");
  const [selectedRT, setSelectedRT] = useState("all");

  const totalBalita = mockBalita.length;
  const normal = mockBalita.filter((b) => b.status === "normal").length;
  const risiko = mockBalita.filter((b) => b.status === "risiko").length;
  const stunting = mockBalita.filter((b) => b.status === "stunting").length;

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
  }));

  const trendData = [
    { month: "Okt", stunting: 3, risiko: 2 },
    { month: "Nov", stunting: 3, risiko: 3 },
    { month: "Des", stunting: 2, risiko: 3 },
    { month: "Jan", stunting: 2, risiko: 2 },
    { month: "Feb", stunting: 2, risiko: 3 },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="px-5 py-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026-02">Februari 2026</SelectItem>
                <SelectItem value="2026-01">Januari 2026</SelectItem>
                <SelectItem value="2025-12">Desember 2025</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRT} onValueChange={setSelectedRT}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua RT</SelectItem>
                {mockRTData.map((rt) => (
                  <SelectItem key={rt.rt} value={rt.rt}>
                    {rt.rt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-card">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">
                {totalBalita}
              </div>
              <div className="text-xs text-gray-600 mt-1">Total Balita</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{normal}</div>
              <div className="text-xs text-gray-600 mt-1">Normal</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600">{risiko}</div>
              <div className="text-xs text-gray-600 mt-1">Risiko</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-600">{stunting}</div>
              <div className="text-xs text-gray-600 mt-1">Stunting</div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 animate-card">
            <h3 className="font-semibold text-lg mb-4">
              Distribusi Status Gizi
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
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
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 animate-card">
            <h3 className="font-semibold text-lg mb-4">Perbandingan per RT</h3>
            <div className="h-64">
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

          {/* Trend Line */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 animate-card">
            <h3 className="font-semibold text-lg mb-4">
              Tren 5 Bulan Terakhir
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="stunting"
                    stroke="#EF4444"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="risiko"
                    stroke="#F59E0B"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm text-gray-600">Stunting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm text-gray-600">Risiko</span>
              </div>
            </div>
          </div>

          {/* Detailed Table */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
            <h3 className="font-semibold text-lg mb-4">Detail per RT</h3>
            <div className="space-y-2">
              {mockRTData.map((rt) => {
                const percentage = (
                  (rt.stunting / rt.totalBalita) *
                  100
                ).toFixed(1);
                return (
                  <div key={rt.rt} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-800">
                        {rt.rt}
                      </span>
                      <span className="text-sm font-semibold text-red-600">
                        {percentage}% stunting
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          {rt.totalBalita}
                        </div>
                        <div className="text-xs text-gray-600">Total</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          {rt.normal}
                        </div>
                        <div className="text-xs text-gray-600">Normal</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-600">
                          {rt.risiko}
                        </div>
                        <div className="text-xs text-gray-600">Risiko</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-600">
                          {rt.stunting}
                        </div>
                        <div className="text-xs text-gray-600">Stunting</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Download Button */}
          <Button
            onClick={() => generatePDF("laporan-admin.pdf", mockBalita)}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Laporan PDF
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
