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
                  className={`timeline-item relative flex flex-col items-center justify-between mb-20 md:mb-28 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Bloco de Conteúdo / Card Clicável */}
                  <div 
                    onClick={() => setSelectedExperience(exp)}
                    className={`w-full md:w-5/12 mb-6 md:mb-0 ${
                      isEven ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'
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
                      <p className="text-amber-600/90 font-cinzel tracking-widest text-xs uppercase mb-1">
                        {isPt ? `Capítulo ${chapterRoman}` : `Chapter ${chapterRoman}`}
                      </p>

                      <h3 className="font-cinzel text-xl md:text-2xl text-zinc-100 font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                        {position}
                      </h3>

                      {/* Metadados: Empresa, Senioridade e Período */}
                      <div className={`flex flex-wrap items-center gap-2 mb-3 text-xs ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        <span className="inline-flex items-center gap-1 text-amber-500 font-cinzel font-medium">
                          <Briefcase size={13} className="text-amber-600" />
                          {exp.company}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400 font-mono">
                          {seniority}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="inline-flex items-center gap-1 text-zinc-400 font-mono">
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
                        <span>{isPt ? 'Ver detalhes da missão' : 'View mission details'}</span>
                        <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                  {/* Marcador Geométrico no Centro da Linha */}
                  <div 
                    className="timeline-marker absolute left-0 md:left-1/2 w-3.5 h-3.5 bg-red-800 rotate-45 transform md:-translate-x-1/2 border border-amber-500/60 shadow-[0_0_12px_rgba(153,27,27,0.85)] z-10 hidden md:block cursor-pointer"
                    onClick={() => setSelectedExperience(exp)}
                    title={isPt ? "Ver detalhes" : "View details"}
                    aria-hidden="true"
                  />

                  {/* Espaçador para o lado oposto da timeline */}
                  <div className="hidden md:block md:w-5/12" aria-hidden="true" />
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