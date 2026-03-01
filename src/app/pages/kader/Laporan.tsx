import { useState } from "react";
import { KaderLayout } from "../../components/KaderLayout";
import { generatePDF } from "../../utils/pdf";
import { mockBalita } from "../../data/mockData";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Download,
  Send,
  Users,
  AlertTriangle,
  TrendingDown,
  CheckCircle2,
} from "lucide-react";
import { mockBalita, mockRTData } from "../../data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function Laporan() {
  const [selectedMonth, setSelectedMonth] = useState("2026-02");

  const totalBalita = mockBalita.length;
  const normal = mockBalita.filter((b) => b.status === "normal").length;
  const risiko = mockBalita.filter((b) => b.status === "risiko").length;
  const stunting = mockBalita.filter((b) => b.status === "stunting").length;

  const pieData = [
    { name: "Normal", value: normal, color: "#10B981" },
    { name: "Risiko", value: risiko, color: "#F59E0B" },
    { name: "Stunting", value: stunting, color: "#EF4444" },
  ];

  const months = [
    { value: "2026-02", label: "Februari 2026" },
    { value: "2026-01", label: "Januari 2026" },
    { value: "2025-12", label: "Desember 2025" },
  ];

  const handleDownload = () => {
    // optionally filter by selectedMonth or other criteria before passing
    generatePDF("laporan-kader.pdf", mockBalita);
  };

  const handleSend = () => {
    alert("Laporan akan dikirim ke admin");
  };

  return (
    <KaderLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Laporan</h2>
        <p className="text-gray-600 mt-1">Ringkasan data stunting</p>
      </div>

      {/* Month Filter */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pilih Periode
        </label>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="h-12 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600">{totalBalita}</div>
          <div className="text-sm text-gray-600 mt-1">Total Balita</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600">{normal}</div>
          <div className="text-sm text-gray-600 mt-1">Normal</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-yellow-600">{risiko}</div>
          <div className="text-sm text-gray-600 mt-1">Risiko</div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <TrendingDown className="h-8 w-8 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-600">{stunting}</div>
          <div className="text-sm text-gray-600 mt-1">Stunting</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-lg mb-4">Distribusi Status Gizi</h3>
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

      {/* Per RT Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-lg mb-4">Data per RT</h3>
        <div className="space-y-3">
          {mockRTData.map((rt) => (
            <div key={rt.rt} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-800">{rt.rt}</span>
                <div
                  className={`w-3 h-3 rounded-full ${
                    rt.color === "green"
                      ? "bg-green-500"
                      : rt.color === "yellow"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                ></div>
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
          ))}
        </div>
      </div>

      {/* Percentage Analysis */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-lg mb-4">Analisis Persentase</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Normal</span>
              <span className="text-sm font-semibold text-green-600">
                {((normal / totalBalita) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${(normal / totalBalita) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Risiko</span>
              <span className="text-sm font-semibold text-yellow-600">
                {((risiko / totalBalita) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500"
                style={{ width: `${(risiko / totalBalita) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Stunting</span>
              <span className="text-sm font-semibold text-red-600">
                {((stunting / totalBalita) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500"
                style={{ width: `${(stunting / totalBalita) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-3">
        <Button
          onClick={handleSend}
          className="h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
        >
          <Send className="h-5 w-5 mr-2" />
          Kirim Laporan ke Admin
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          className="h-14 rounded-xl"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Laporan PDF
        </Button>
      </div>
    </KaderLayout>
  );
}
