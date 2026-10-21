import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import { StatCard } from '@/components/wakatime/StatCard';
import { LanguageBar } from '@/components/wakatime/LanguageBar';
import { getWakatimeStats, getWakatimeAllTime } from '@/services/wakatimeService';
import type { WakatimeStats, WakatimeAllTime } from '@/types/Wakatime';
import { Clock, TrendingUp, Calendar, Code, FolderGit2, Monitor, RefreshCw } from 'lucide-react';
import './statistics.css';

interface StatisticsProps {
  language?: 'pt' | 'en';
}

export default function Statistics({ language = 'pt' }: StatisticsProps) {
  const [range, setRange] = useState<'last_7_days' | 'last_30_days'>('last_7_days');
  const [stats, setStats] = useState<WakatimeStats | null>(null);
  const [allTime, setAllTime] = useState<WakatimeAllTime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isPt = language === 'pt';

  const fetchData = async (selectedRange: string) => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, allTimeRes] = await Promise.all([
        getWakatimeStats(selectedRange),
        getWakatimeAllTime(),
      ]);
      setStats(statsRes);
      setAllTime(allTimeRes);
    } catch {
      setError(
        isPt
          ? 'Não foi possível carregar as métricas do Wakatime. Certifique-se de que o backend está ativo.'
          : 'Could not load Wakatime metrics at this moment. Ensure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(range);
  }, [range]);

  return (
    <div className="statistics-page">
      <Navbar title={isPt ? "Estatísticas" : "Statistics"} />
      <div className="statistics-page__backdrop" aria-hidden="true" />

      <main className="statistics-page__main">
        {/* Header no estilo Grimório / Jornada RPG */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-amber-900/40 bg-amber-950/20 text-amber-500 font-cinzel text-xs tracking-widest uppercase">
            <span>{isPt ? 'Grimório de Codificação' : 'Coding Grimoire'}</span>
          </div>

          <h1 className="font-cinzel text-3xl md:text-5xl text-zinc-100 font-bold tracking-wider mb-4">
            {isPt ? 'Métricas & Produtividade' : 'Metrics & Productivity'}
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm md:text-base leading-relaxed">
            {isPt
              ? 'Dados de atividade de desenvolvimento em tempo real rastreados via WakaTime API, evidenciando consistência técnica, dedicação acumulada e foco em linguagens modernas.'
              : 'Real-time coding analytics tracked via WakaTime API, demonstrating engineering consistency, lifetime dedication, and modern language expertise.'}
          </p>

          {/* Toggle de Intervalo */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setRange('last_7_days')}
              className={`range-btn ${range === 'last_7_days' ? 'range-btn--active' : 'range-btn--inactive'}`}
            >
              {isPt ? 'Últimos 7 Dias' : 'Last 7 Days'}
            </button>
            <button
              onClick={() => setRange('last_30_days')}
              className={`range-btn ${range === 'last_30_days' ? 'range-btn--active' : 'range-btn--inactive'}`}
            >
              {isPt ? 'Últimos 30 Dias' : 'Last 30 Days'}
            </button>
          </div>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <div className="w-8 h-8 border-2 border-amber-600/30 border-t-amber-500 rounded-full animate-spin mb-4" />
            <p className="font-cinzel text-sm tracking-wider uppercase text-zinc-400">
              {isPt ? 'Consultando registros do WakaTime...' : 'Fetching WakaTime records...'}
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="max-w-xl mx-auto p-6 border border-red-900/40 bg-red-950/20 text-center rounded-sm">
            <p className="text-red-400 text-sm font-sans mb-3">{error}</p>
            <button
              onClick={() => fetchData(range)}
              className="inline-flex items-center gap-2 text-xs font-cinzel text-amber-500 hover:text-amber-400 uppercase tracking-wider"
            >
              <RefreshCw size={14} />
              {isPt ? 'Tentar novamente' : 'Try again'}
            </button>
          </div>
        )}

        {/* Dados Carregados */}
        {!loading && !error && stats && (
          <div className="space-y-10">
            {/* Cards de Métricas Principais (KPIs para Recrutadores) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                icon={Clock}
                label={isPt ? 'Tempo Total Acumulado' : 'Lifetime Coding Hours'}
                value={allTime?.data.text || '—'}
                subtext={isPt ? 'Desde o início dos registros' : 'Since account tracking'}
              />
              <StatCard
                icon={Calendar}
                label={range === 'last_7_days' ? (isPt ? 'Últimos 7 Dias' : 'Last 7 Days') : (isPt ? 'Últimos 30 Dias' : 'Last 30 Days')}
                value={stats.data.humanReadableTotal || '—'}
                subtext={isPt ? 'Tempo ativo no editor' : 'Active editor duration'}
              />
              <StatCard
                icon={TrendingUp}
                label={isPt ? 'Média Diária' : 'Daily Average'}
                value={stats.data.humanReadableDailyAverage || '—'}
                subtext={isPt ? 'Constância e dedicação' : 'Consistency and focus'}
              />
            </div>

            {/* Painel de Linguagens Dominantes */}
            <div className="statistics-panel">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Code size={20} className="text-amber-500" />
                  <h2 className="font-cinzel text-xl text-zinc-100 font-semibold tracking-wide">
                    {isPt ? 'Linguagens Mais Utilizadas' : 'Dominant Languages'}
                  </h2>
                </div>
                <span className="text-xs font-mono text-zinc-500">
                  {stats.data.languages?.length || 0} {isPt ? 'tecnologias detectadas' : 'detected'}
                </span>
              </div>

              <div className="space-y-4">
                {stats.data.languages?.slice(0, 6).map((lang, idx) => (
                  <LanguageBar
                    key={lang.name}
                    name={lang.name}
                    percent={lang.percent}
                    text={lang.text}
                    rankIndex={idx}
                  />
                ))}
              </div>
            </div>

            {/* Grade Inferior: Projetos Recentes e Ambientes/IDEs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Projetos */}
              <div className="statistics-panel">
                <div className="flex items-center gap-3 mb-5">
                  <FolderGit2 size={18} className="text-amber-500" />
                  <h3 className="font-cinzel text-lg text-zinc-100 font-semibold tracking-wide">
                    {isPt ? 'Projetos em Atividade' : 'Active Projects'}
                  </h3>
                </div>
                <div>
                  {stats.data.projects && stats.data.projects.length > 0 ? (
                    stats.data.projects.slice(0, 5).map((proj) => (
                      <div key={proj.name} className="stat-list-row">
                        <span className="font-mono text-sm text-zinc-300 truncate pr-4">
                          {proj.name}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                          <span>{proj.text}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-amber-500/90 font-semibold">{proj.percent.toFixed(0)}%</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-500 text-xs font-mono">
                      {isPt ? 'Nenhum projeto registrado no período.' : 'No projects logged for this period.'}
                    </p>
                  )}
                </div>
              </div>

              {/* Editores & Ferramentas */}
              <div className="statistics-panel">
                <div className="flex items-center gap-3 mb-5">
                  <Monitor size={18} className="text-amber-500" />
                  <h3 className="font-cinzel text-lg text-zinc-100 font-semibold tracking-wide">
                    {isPt ? 'Ambientes de Desenvolvimento' : 'Development Environments'}
                  </h3>
                </div>
                <div>
                  {stats.data.editors && stats.data.editors.length > 0 ? (
                    stats.data.editors.slice(0, 4).map((ed) => (
                      <div key={ed.name} className="stat-list-row">
                        <span className="font-mono text-sm text-zinc-300">
                          {ed.name}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                          <span>{ed.text}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-amber-500/90 font-semibold">{ed.percent.toFixed(0)}%</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-500 text-xs font-mono">
                      {isPt ? 'Nenhum editor registrado.' : 'No editors logged.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
