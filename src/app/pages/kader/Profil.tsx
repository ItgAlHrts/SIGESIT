import { useState } from "react";
import { useNavigate } from "react-router";
import { KaderLayout } from "../../components/KaderLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../components/ui/dialog";
import { User, MapPin, Shield, Edit, Lock, LogOut } from "lucide-react";

export default function Profil() {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [name, setName] = useState("Ibu Sari");
  const [role, setRole] = useState("Kader Posyandu");
  const [wilayah, setWilayah] = useState("Wilayah RT 01 - RT 04");

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      navigate("/");
    }
  };

  return (
    <KaderLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Profil</h2>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Ibu Sari</h3>
          <p className="text-gray-600 mt-1">Kader Posyandu</p>
          <div className="flex items-center gap-2 mt-3 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>Wilayah RT 01 - RT 04</span>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-3xl font-bold text-blue-600">45</div>
          <div className="text-sm text-gray-600 mt-1">Total Balita</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-3xl font-bold text-green-600">156</div>
          <div className="text-sm text-gray-600 mt-1">Data Terinput</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <button
          onClick={() => setEditOpen(true)}
          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-all border-b border-gray-100"
        >
          <div className="p-3 bg-blue-100 rounded-xl">
            <Edit className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-800">Edit Profil</p>
            <p className="text-sm text-gray-600">Ubah informasi profil Anda</p>
          </div>
        </button>

        <button
          onClick={() => setPwdOpen(true)}
          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-all border-b border-gray-100"
        >
          <div className="p-3 bg-green-100 rounded-xl">
            <Lock className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-800">Ganti Password</p>
            <p className="text-sm text-gray-600">Perbarui password Anda</p>
          </div>
        </button>

        <button
          onClick={() => alert("Informasi tentang SIGESIT")}
          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-all"
        >
          <div className="p-3 bg-purple-100 rounded-xl">
            <Shield className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-800">Tentang SIGESIT</p>
            <p className="text-sm text-gray-600">Versi 1.0.0</p>
          </div>
        </button>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profil</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm">Nama</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm">Peran</Label>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm">Wilayah</Label>
              <Input
                value={wilayah}
                onChange={(e) => setWilayah(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditOpen(false)}
              className="mr-2"
            >
              Batal
            </Button>
            <Button
              onClick={() => {
                alert("Profil diperbarui");
                setEditOpen(false);
              }}
            >
              Simpan
            </Button>
          </DialogFooter>
          <DialogClose />
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={pwdOpen} onOpenChange={setPwdOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ganti Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm">Password Lama</Label>
              <Input type="password" className="mt-2" />
            </div>
            <div>
              <Label className="text-sm">Password Baru</Label>
              <Input type="password" className="mt-2" />
            </div>
            <div>
              <Label className="text-sm">Konfirmasi Password</Label>
              <Input type="password" className="mt-2" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPwdOpen(false)}
              className="mr-2"
            >
              Batal
            </Button>
            <Button
              onClick={() => {
                alert("Password berhasil diperbarui (mock)");
                setPwdOpen(false);
              }}
            >
              Simpan
            </Button>
          </DialogFooter>
          <DialogClose />
        </DialogContent>
      </Dialog>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full h-14 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        <LogOut className="h-5 w-5 mr-2" />
        Keluar
      </Button>
    </KaderLayout>
  );
}
