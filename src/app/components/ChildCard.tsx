import { Balita } from '../types';
import { StatusBadge } from './StatusBadge';
import { Baby, Calendar } from 'lucide-react';

interface ChildCardProps {
  balita: Balita;
  onClick: () => void;
}

export function ChildCard({ balita, onClick }: ChildCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Baby className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{balita.nama}</h3>
            <p className="text-sm text-gray-600">{balita.umur} bulan</p>
            <p className="text-xs text-gray-500 mt-1">{balita.alamat}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>Terakhir cek: {new Date(balita.lastCheckup).toLocaleDateString('id-ID')}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={balita.status} size="sm" />
      </div>
    </div>
  );
}
