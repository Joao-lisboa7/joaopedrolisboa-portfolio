import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext?: string;
}

export function StatCard({ icon: Icon, label, value, subtext }: StatCardProps) {
  return (
    <div className="stat-card group">
      {/* Marcador decorativo de losango no topo */}
      <div className="stat-card__marker" aria-hidden="true" />
      
      <div className="flex items-center gap-3 mb-2">
        <div className="stat-card__icon-wrap">
          <Icon size={18} className="text-amber-500 group-hover:text-amber-400 transition-colors" />
        </div>
        <span className="font-cinzel text-xs tracking-widest text-zinc-400 uppercase">
          {label}
        </span>
      </div>

      <div className="font-cinzel text-2xl md:text-3xl font-bold text-zinc-100 group-hover:text-amber-300 transition-colors tracking-wide my-1">
        {value}
      </div>

      {subtext && (
        <p className="text-zinc-500 text-xs font-mono tracking-tight mt-1">
          {subtext}
        </p>
      )}
    </div>
  );
}
