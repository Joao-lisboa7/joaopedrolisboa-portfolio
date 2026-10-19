import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Experience } from '@/types/Experience';

export interface ExperienceCardProps {
  experience: Experience;
  onClose?: () => void;
  language?: 'pt' | 'en';
}

export function ExperienceCard({ experience, onClose, language = 'pt' }: ExperienceCardProps) {
  // Evento para fechar ao pressionar a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const isPt = language === 'pt';

  // Formatação amigável da senioridade
  const seniorityLabel: Record<Experience['seniorityLevel'], { pt: string; en: string }> = {
    ESTAGIO: { pt: 'Estágio', en: 'Internship' },
    JUNIOR: { pt: 'Júnior', en: 'Junior' },
    PLENO: { pt: 'Pleno', en: 'Mid-level' },
    SENIOR: { pt: 'Sênior', en: 'Senior' },
  };

  const position = isPt ? experience.positionPt : experience.positionEn;
  const description = isPt ? experience.descriptionPt : experience.descriptionEn;

  // Separa o texto da descrição em tópicos/atividades
  const activities = description
    .split('.')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return (
    /* Container Overlay com Fundo Embaçado */
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in transition-all duration-300"
      onClick={onClose}
    >
      {/* Card Principal */}
      <div 
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col border border-zinc-800 bg-[#0A0A0C]/95 p-6 md:p-8 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-300"
        onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar no interior do card
      >
        {/* Efeito Glow no Topo */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-600/60 to-transparent" />

        {/* Detalhes de Cantos Metalizados (Estilização do Sistema) */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-amber-600/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-amber-600/50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-amber-600/50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-amber-600/50 pointer-events-none" />

        {/* Botão de Fechar (X) */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-amber-500 hover:bg-zinc-900/80 transition-all border border-zinc-800/80 hover:border-amber-600/60 rounded-sm group focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            aria-label={isPt ? "Fechar experiência" : "Close experience"}
            title={isPt ? "Fechar" : "Close"}
          >
            <X 
              size={18}
              strokeWidth={2}
              className="transition-transform group-hover:rotate-90 duration-300" 
              aria-hidden="true"
            />
          </button>
        )}

        {/* Cabeçalho do Card */}
        <div className="mb-5 pr-10">
          {/* Tag de Empresa, Senioridade e Período */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="font-cinzel text-amber-500 tracking-wider text-xs font-semibold px-2.5 py-1 border border-amber-900/40 bg-amber-950/30 uppercase">
                {experience.company}
              </span>
              <span className="text-zinc-500 text-xs font-mono tracking-tight">
                // {seniorityLabel[experience.seniorityLevel]?.[language] ?? experience.seniorityLevel}
              </span>
            </div>

            <span className="font-cinzel text-xs text-zinc-400 tracking-wider">
              {experience.startDate} — {experience.current ? <strong className="text-amber-500">{isPt ? 'PRESENTE' : 'PRESENT'}</strong> : experience.endDate}
            </span>
          </div>

          {/* Cargo */}
          <h2 className="font-cinzel text-2xl md:text-3xl text-zinc-100 font-bold tracking-wide leading-snug">
            {position}
          </h2>

          {/* Linha Divisória Limpa (sem ícones brilhantes) */}
          <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-amber-600/40 via-red-900/60 to-transparent" />
        </div>

        {/* Lista de Atividades por Tópicos com distribuição harmônica */}
        <div className="space-y-3 overflow-y-auto pr-2 max-h-[52vh]">
          <h3 className="font-cinzel text-xs text-amber-600/90 tracking-widest uppercase font-semibold">
            {isPt ? 'Principais Atividades & Responsabilidades' : 'Key Activities & Responsibilities'}
          </h3>

          <ul className="space-y-3">
            {activities.map((activity, index) => (
              <li key={index} className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
                {/* Marcador Geométrico estilo Losango */}
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rotate-45 bg-red-800 border border-amber-600/60" />
                <span>{activity}.</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rodapé do Card */}
        <div className="mt-6 pt-4 border-t border-zinc-900/80 flex justify-between items-center text-[11px] text-zinc-500 font-cinzel tracking-widest">
          <span>{isPt ? 'REGISTRO DE EXPERIÊNCIA' : 'EXPERIENCE RECORD'}</span>
          {onClose && (
            <button 
              type="button"
              onClick={onClose}
              className="hover:text-amber-500 transition-colors uppercase"
            >
              {isPt ? 'FECHAR [ESC]' : 'CLOSE [ESC]'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}