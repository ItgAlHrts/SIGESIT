import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { Home, Users, ClipboardCheck, Map, FileText, User } from "lucide-react";
import { cn } from "./ui/utils";

interface KaderLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/kader", icon: Home, label: "Beranda" },
  { path: "/kader/data-balita", icon: Users, label: "Data Balita" },
  { path: "/kader/cek-gizi", icon: ClipboardCheck, label: "Cek Gizi" },
  { path: "/kader/peta", icon: Map, label: "Peta" },
  { path: "/kader/laporan", icon: FileText, label: "Laporan" },
];

export function KaderLayout({ children }: KaderLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 md:px-5 pt-4 md:pt-6 pb-3 md:pb-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white p-2 rounded-full shadow-md animate-logo">
              <img
                src={new URL("../../assets/LOGO.png", import.meta.url).href}
                alt="SIGESIT Logo"
                className="h-8 w-8 md:h-10 md:w-10"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold">SIGESIT</h1>
              <p className="text-xs md:text-sm text-blue-100">
                Sistem Informasi Gizi dan Stunting
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/kader/profil")}
            className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all active:scale-95"
          >
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-6">{children}</div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all",
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                <Icon className={cn("h-6 w-6", isActive && "scale-110")} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
