interface LanguageBarProps {
  name: string;
  percent: number;
  text: string;
  rankIndex: number;
}

export function LanguageBar({ name, percent, text, rankIndex }: LanguageBarProps) {
  // Gradientes e tons sutis de âmbar, fogo e ouro escuro para a identidade Dark Souls
  const glowColors = [
    'from-amber-600 via-amber-500 to-yellow-500 shadow-amber-500/20',
    'from-orange-700 via-amber-600 to-amber-500 shadow-amber-600/20',
    'from-red-800 via-orange-700 to-amber-600 shadow-orange-700/20',
    'from-zinc-700 via-amber-800 to-amber-700 shadow-amber-800/20',
    'from-zinc-800 via-zinc-700 to-zinc-600 shadow-zinc-700/20',
  ];

  const activeGradient = glowColors[rankIndex % glowColors.length];

  return (
    <div className="language-bar-item group">
      <div className="flex items-center justify-between mb-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-amber-500 rotate-45 inline-block group-hover:scale-125 transition-transform" />
          <span className="font-cinzel text-sm font-semibold text-zinc-200 tracking-wider group-hover:text-amber-400 transition-colors">
            {name}
          </span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs">
          <span>{text}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-amber-400/90 font-semibold">{percent.toFixed(1)}%</span>
        </div>
      </div>

      <div className="language-bar-track">
        <div
          className={`language-bar-fill bg-gradient-to-r ${activeGradient} shadow-md`}
          style={{ width: `${Math.max(percent, 2)}%` }}
        />
      </div>
    </div>
  );
}
