import { Users, DollarSign, ArrowUpRight, Flame } from 'lucide-react';
import { MetricsCard } from './metrics-card';

const metrics = [
  {
    icon: Users,
    label: 'Holders',
    value: 'Awaiting Data',
    color: 'border-violet-500/30 bg-violet-950/20',
    glowColor: 'rgba(139, 92, 246, 0.1)',
  },
  {
    icon: DollarSign,
    label: 'Volume',
    value: 'Awaiting Data',
    color: 'border-emerald-500/30 bg-emerald-950/20',
    glowColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    icon: ArrowUpRight,
    label: 'Migration',
    value: 'Awaiting Data',
    color: 'border-blue-500/30 bg-blue-950/20',
    glowColor: 'rgba(59, 130, 246, 0.1)',
  },
  {
    icon: Flame,
    label: 'Burn Status',
    value: 'Awaiting Data',
    color: 'border-rose-500/30 bg-rose-950/20',
    glowColor: 'rgba(244, 63, 94, 0.1)',
  },
];

export function MetricsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
      {metrics.map((metric) => (
        <MetricsCard key={metric.label} {...metric} />
      ))}
    </div>
  );
}