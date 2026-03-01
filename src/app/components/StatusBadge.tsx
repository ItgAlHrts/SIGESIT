import { cn } from './ui/utils';
import { BalitaStatus } from '../types';

interface StatusBadgeProps {
  status: BalitaStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig: { [key in BalitaStatus]: { label: string; color: string; textColor: string } } = {
  normal: {
    label: 'Normal',
    color: 'bg-green-500',
    textColor: 'text-white'
  },
  risiko: {
    label: 'Risiko',
    color: 'bg-yellow-500',
    textColor: 'text-white'
  },
  stunting: {
    label: 'Stunting',
    color: 'bg-red-500',
    textColor: 'text-white'
  }
};

export function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium',
        config.color,
        config.textColor,
        sizeClasses[size],
        className
      )}
    >
      {config.label}
    </span>
  );
}
