import { useEffect, useState } from 'react';
import type { Experience as ExperienceType } from "@/types/Experience";
import { getExperiences } from "@/services/experienceService";
import Navbar from '@/components/navbar/Navbar';
import { ExperienceCard } from '@/components/experience-card/ExperienceCard';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import './experiences.css';

interface ExperienceProps {
  language?: 'pt' | 'en';
}

// Converte número arábico para numeração romana para os capítulos
const toRoman = (num: number): string => {
  const lookup: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let roman = '';
  for (const [val, str] of lookup) {
    while (num >= val) {
      roman += str;
      num -= val;
    }
  }
  return roman || 'I';
};

const seniorityLabels: Record<ExperienceType['seniorityLevel'], { pt: string; en: string }> = {
  ESTAGIO: { pt: 'Estágio', en: 'Internship' },
  JUNIOR: { pt: 'Júnior', en: 'Junior' },
  PLENO: { pt: 'Pleno', en: 'Mid-level' },
  SENIOR: { pt: 'Sênior', en: 'Senior' },
};

function Experiences({ language = 'pt' }: ExperienceProps) {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isPt = language === 'pt';

  useEffect(() => {
    getExperiences()
      .then((data) => {
        setExperiences(data);
      })
      .catch(() => {
        setError(
          isPt 
            ? 'Não foi possível carregar as experiências profissionais no momento.' 
            : 'Could not load professional experiences at this time.'
        );
      })
      .finally(() => setLoading(false));
  }, [isPt]);

  return (
    <div className="experiences-page">
      <Navbar title={isPt ? "Experiências" : "Experiences"} />
      <div className="experiences-page__backdrop" aria-hidden="true" />

      <main className="experiences-page__main">
        {/* Header da Página */}
        <header className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-amber-900/40 bg-amber-950/20 text-amber-500 font-cinzel text-xs tracking-widest uppercase">
            <span>{isPt ? 'Jornada Profissional' : 'Professional Journey'}</span>
          </div>

          <h1 className="font-cinzel text-3xl md:text-5xl text-zinc-100 font-bold tracking-wider mb-4">
            {isPt ? 'Linha do Tempo' : 'Career Timeline'}
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm md:text-base leading-relaxed">
            {isPt 
              ? 'Cada fase representa um marco de evolução técnica, liderança prática e impacto em produtos reais. Clique em um marco para ver os detalhes.' 
              : 'Each phase marks a milestone in technical mastery, practical leadership, and real product impact. Click on a milestone to view full details.'}
          </p>
        </header>

        {/* Estado de Carregamento */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <div className="w-8 h-8 border-2 border-amber-600/30 border-t-amber-500 rounded-full animate-spin mb-4" />
            <p className="font-cinzel text-sm tracking-wider uppercase text-zinc-400">
              {isPt ? 'Carregando experiências...' : 'Loading experiences...'}
            </p>
          </div>
        )}

        {/* Estado de Erro */}
        {!loading && error && (
          <div className="max-w-xl mx-auto p-6 border border-red-900/40 bg-red-950/20 text-center rounded-sm">
            <p className="text-red-400 text-sm font-sans mb-3">{error}</p>
            <p className="text-zinc-500 text-xs font-mono">
              {isPt 
                ? 'Certifique-se de que o serviço backend está ativo na porta 8080.' 
                : 'Make sure the backend service is running on port 8080.'}
            </p>
          </div>
        )}

        {/* Linha do Tempo */}
        {!loading && !error && experiences.length > 0 && (
          <div className="relative">
            {/* Linha contínua vertical para telas médias e superiores */}
            <div className="timeline-line hidden md:block" aria-hidden="true" />

            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const chapterRoman = toRoman(index + 1);
              const position = isPt ? exp.positionPt : exp.positionEn;
              const description = isPt ? exp.descriptionPt : exp.descriptionEn;
              const seniority = seniorityLabels[exp.seniorityLevel]?.[language] ?? exp.seniorityLevel;

              return (
                <div 
                  key={exp.id}
                  className={`timeline-item relative flex flex-col items-center justify-between mb-16 md:mb-24 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Bloco de Conteúdo / Card Clicável (ocupa 48% para melhor preenchimento do espaço) */}
                  <div 
                    onClick={() => setSelectedExperience(exp)}
                    className={`w-full md:w-[48%] mb-6 md:mb-0 ${
                      isEven ? 'md:text-right md:pr-6' : 'md:text-left md:pl-6'
                    }`}
                  >
                    <div 
                      className="timeline-card group"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedExperience(exp);
                        }
                      }}
                      aria-label={`${position} - ${exp.company}`}
                    >
                      {/* Identificador do Capítulo / Título */}
                      <div className={`flex items-center gap-2 mb-1.5 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        <span className="text-amber-600/90 font-cinzel tracking-widest text-xs uppercase font-semibold">
                          {isPt ? `Capítulo ${chapterRoman}` : `Chapter ${chapterRoman}`}
                        </span>
                        <span className="w-8 h-[1px] bg-amber-700/40 hidden md:inline-block" />
                      </div>

                      <h3 className="font-cinzel text-xl md:text-2xl text-zinc-100 font-semibold mb-2 group-hover:text-amber-400 transition-colors leading-snug">
                        {position}
                      </h3>

                      {/* Metadados: Destaque Especial da Empresa, Senioridade e Período */}
                      <div className={`flex flex-wrap items-center gap-2 mb-3 text-xs ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        <span className="inline-flex items-center gap-1.5 text-amber-400 font-cinzel font-semibold px-2 py-0.5 border border-amber-800/60 bg-amber-950/40 tracking-wider shadow-[0_0_10px_rgba(217,119,6,0.15)] group-hover:border-amber-600/80 transition-colors uppercase">
                          <Briefcase size={12} className="text-amber-500" />
                          {exp.company}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400 font-mono">
                          {seniority}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="inline-flex items-center gap-1.5 text-zinc-400 font-mono">
                          <Calendar size={13} className="text-zinc-500" />
                          {exp.startDate} — {exp.current ? (isPt ? 'Atual' : 'Present') : exp.endDate}
                        </span>
                      </div>

                      {/* Descrição resumida */}
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
                        {description}
                      </p>

                      {/* Call to action "Ver mais" */}
                      <div className={`flex items-center gap-1 text-xs text-amber-500/80 group-hover:text-amber-400 font-cinzel tracking-wider uppercase transition-colors ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        <span>{isPt ? 'Ver detalhes da experiência' : 'View experience details'}</span>
                        <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                  {/* Marcador Geométrico no Centro da Linha (centralizado matematicamente) */}
                  <div 
                    className="timeline-marker hidden md:block"
                    onClick={() => setSelectedExperience(exp)}
                    title={isPt ? "Ver detalhes" : "View details"}
                    aria-label={isPt ? "Ver detalhes" : "View details"}
                  />

                  {/* Lado Oposto (ocupa 48% balanceando o espaço vazio com empresa destacada e período) */}
                  <div className={`hidden md:flex md:w-[48%] flex-col justify-center ${
                    isEven ? 'pl-8 text-left' : 'pr-8 text-right'
                  }`}>
                    <span className="font-cinzel text-amber-500 font-semibold text-lg tracking-wider uppercase mb-1">
                      {exp.company}
                    </span>
                    <span className="font-cinzel text-sm text-zinc-300 font-medium">
                      {exp.startDate} — {exp.current ? (isPt ? 'PRESENTE' : 'PRESENT') : exp.endDate}
                    </span>
                    <span className="text-zinc-500 text-xs font-mono mt-0.5">
                      // {seniority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Nenhuma experiência cadastrada */}
        {!loading && !error && experiences.length === 0 && (
          <div className="text-center py-16 text-zinc-500 font-cinzel tracking-wider">
            {isPt ? 'Nenhuma experiência cadastrada até o momento.' : 'No experiences recorded yet.'}
          </div>
        )}
      </main>

      {/* Modal de Detalhes da Experiência */}
      {selectedExperience && (
        <ExperienceCard 
          experience={selectedExperience} 
          onClose={() => setSelectedExperience(null)}
          language={language}
        />
      )}
    </div>
  );
}

export default Experiences;