import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  glowColor: string;
}

export function MetricsCard({
  icon: Icon,
  label,
  value,
  color,
  glowColor,
}: MetricsCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-xl border p-3',
        'transition-all duration-300',
        'hover:scale-[1.02]',
        color
      )}
      style={{
        '--glow-color': glowColor,
        boxShadow: `0 0 20px -5px ${glowColor}`,
      }}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-xl" />
      <div className="relative flex items-center justify-center gap-3">
        <Icon className="h-4 w-4" />
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">{label}</span>
          <span className="text-sm font-bold">{value}</span>
        </div>
      </div>
    </div>
  );
}