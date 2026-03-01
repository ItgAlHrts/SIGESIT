import { useState } from "react";
import { useNavigate } from "react-router";
import { LogIn, Leaf, Droplets } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { UserRole } from "../types";

const logoImg = new URL("../../assets/LOGO.png", import.meta.url).href;

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("kader");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login - in production this would validate credentials
    setTimeout(() => {
      if (role === "kader") {
        navigate("/kader");
      } else {
        navigate("/admin");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4FAF9F] via-[#4A8FC2] to-[#F47A20] flex items-center justify-center p-5 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 right-10 w-24 h-24 bg-white opacity-10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Title Section */}
        <div className="text-center mb-10">
          <div className="mb-6 transform hover:scale-110 transition-transform duration-300 flex justify-center">
            <div className="bg-white rounded-3xl p-4 shadow-2xl">
              <img
                src={logoImg}
                alt="SIGESIT Logo"
                className="w-20 h-20 rounded-2xl mx-auto"
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            SIGESIT
          </h1>
          <p className="text-white text-lg opacity-95 drop-shadow-md">
            Sistem Informasi Gizi dan Stunting
          </p>
        </div>
        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role Selection */}
            <div>
              <Label className="text-base font-semibold text-gray-800 mb-4 block">
                Pilih Akses Sebagai
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole("kader")}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 font-semibold text-base ${
                    role === "kader"
                      ? "border-[#4FAF9F] bg-gradient-to-br from-[#4FAF9F]/10 to-[#4FAF9F]/5 text-[#4FAF9F] shadow-lg scale-105"
                      : "border-gray-200 text-gray-600 hover:border-[#4FAF9F]/40 hover:bg-[#4FAF9F]/5"
                  }`}
                >
                  👩‍⚕️ Kader
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 font-semibold text-base ${
                    role === "admin"
                      ? "border-[#4A8FC2] bg-gradient-to-br from-[#4A8FC2]/10 to-[#4A8FC2]/5 text-[#4A8FC2] shadow-lg scale-105"
                      : "border-gray-200 text-gray-600 hover:border-[#4A8FC2]/40 hover:bg-[#4A8FC2]/5"
                  }`}
                >
                  🔐 Admin
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Username / Email
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Masukkan username atau email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl mt-2 border-2 border-gray-200 focus:border-[#4FAF9F] focus:shadow-lg transition-all bg-gray-50"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl mt-2 border-2 border-gray-200 focus:border-[#4A8FC2] focus:shadow-lg transition-all bg-gray-50"
                required
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-base font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="inline-block animate-spin mr-2">⏳</span>
              ) : (
                <LogIn className="h-5 w-5 mr-2" />
              )}
              {isLoading ? "Sedang Login..." : "Masuk"}
            </Button>
          </form>
        </div>{" "}
        {/* end login card */}
        {/* Footer Info */}
        <div className="text-center mt-6 text-white text-sm opacity-90">
          <p>@2026 HIMAFOR UNIMUS | DESA TAMBAKLOROK</p>
        </div>
      </div>
    </div>
  );
}
