import { LucideIcon } from "lucide-react";
import { cn } from "./ui/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  onClick?: () => void;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  onClick,
  className,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl p-5 shadow-sm transition-all animate-card",
        bgColor,
        onClick && "cursor-pointer hover:shadow-md active:scale-95 btn-lift",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn("p-3 rounded-xl", color)}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm text-gray-600 mt-1">{title}</p>
      </div>
    </div>
  );
}
