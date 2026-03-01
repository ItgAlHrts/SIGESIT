import { useState } from 'react';
import { KaderLayout } from '../../components/KaderLayout';
import { ChildCard } from '../../components/ChildCard';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { mockBalita } from '../../data/mockData';

export default function DataBalita() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBalita = mockBalita.filter(balita =>
    balita.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    balita.namaIbu.toLowerCase().includes(searchQuery.toLowerCase()) ||
    balita.rt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <KaderLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Balita</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari nama anak, ibu, atau RT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl"
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-green-600">
            {mockBalita.filter(b => b.status === 'normal').length}
          </div>
          <div className="text-xs text-gray-600 mt-1">Normal</div>
        </div>
        <div className="bg-yellow-50 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {mockBalita.filter(b => b.status === 'risiko').length}
          </div>
          <div className="text-xs text-gray-600 mt-1">Risiko</div>
        </div>
        <div className="bg-red-50 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-red-600">
            {mockBalita.filter(b => b.status === 'stunting').length}
          </div>
          <div className="text-xs text-gray-600 mt-1">Stunting</div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3 mb-6">
        {filteredBalita.length > 0 ? (
          filteredBalita.map((balita) => (
            <ChildCard
              key={balita.id}
              balita={balita}
              onClick={() => navigate(`/kader/data-balita/${balita.id}`)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada data ditemukan</p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => navigate('/kader/tambah-balita')}
        className="fixed right-5 bottom-24 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all active:scale-95"
      >
        <Plus className="h-6 w-6 text-white" />
      </button>
    </KaderLayout>
  );
}
