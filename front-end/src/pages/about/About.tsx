import React from 'react';
import {
  ArrowUpRight,
  Brain,
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Network,
  UsersRound,
} from 'lucide-react';
import './about.css';
import Navbar from '@/components/navbar/Navbar';
import FrameImg from '@/components/frame-img/FrameImg';

const profileImage = new URL('../../assets/foto_curriculo.JPG', import.meta.url).href;

const technicalSkills = [
  {
    icon: Code2,
    title: 'Desenvolvimento de software',
    skills: ['Java', 'Spring Boot', 'JavaScript', 'TypeScript', 'React'],
    description: 'Construção de APIs, organização de código e integração entre sistemas.',
  },
  {
    icon: Database,
    title: 'Dados e persistência',
    skills: ['SQL', 'PostgreSQL', 'Supabase', 'Modelagem de dados'],
    description: 'Estruturação, armazenamento e integração de dados para aplicações digitais.',
  },
  {
    icon: Network,
    title: 'Análise e gestão de produtos',
    skills: ['Requisitos', 'Processos', 'Indicadores', 'Scrum', 'Kanban'],
    description: 'Transformação de necessidades de negócio em demandas e soluções viáveis.',
  },
];

const softSkills = [
  {
    icon: Brain,
    title: 'Pensamento analítico',
    description: 'Investigar problemas, interpretar informações e avaliar alternativas antes de propor soluções.',
  },
  {
    icon: MessageCircle,
    title: 'Comunicação',
    description: 'Conectar perspectivas técnicas e de negócio, alinhando ideias entre diferentes públicos.',
  },
  {
    icon: UsersRound,
    title: 'Colaboração',
    description: 'Contribuir para objetivos compartilhados, trocar conhecimentos e trabalhar entre áreas.',
  },
  {
    icon: Lightbulb,
    title: 'Aprendizado contínuo',
    description: 'Buscar novos conhecimentos e adaptar habilidades a desafios e tecnologias.',
  },
];

const AboutMe: React.FC = () => {
  return (
    <div className="about-page min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-red-900 selection:text-white overflow-hidden">
      <Navbar title="About me" />

      <div className="about-page__backdrop" aria-hidden="true" />

      <main className="about-page__main">
        <header className="about-intro animate-fade-in-up" aria-labelledby="about-title">
          <div className="about-intro__copy">
            <div className="about-eyebrow">
              <span>01</span>
              <span>Introdução</span>
              <i aria-hidden="true" />
            </div>
            <p className="about-intro__overline">Uma jornada entre tecnologia e propósito</p>
            <h1 id="about-title" className="about-intro__name">João Pedro</h1>
            <h2 className="about-intro__role">Software Engineer</h2>
            <p className="about-intro__summary">
              Forjando soluções digitais robustas e experiências intuitivas. Minha jornada é
              guiada pela engenharia de precisão, pela curiosidade e por um olhar atento às
              necessidades de quem usa cada produto.
            </p>
            <a className="about-intro__link" href="#origem">
              Conheça minha trajetória <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="about-intro__portrait">
            <FrameImg className="w-64 h-64 md:w-80 md:h-80 mx-auto" imageUrl={profileImage} />
            <span className="about-intro__portrait-caption">Minas Gerais · Brasil</span>
          </div>
        </header>

        <section className="about-section about-origin" id="origem" aria-labelledby="origin-title">
          <div className="about-section__heading">
            <div className="about-eyebrow"><span>02</span><span>Origem</span></div>
            <h2 id="origin-title">Uma base construída com intenção.</h2>
            <p>Conhecimento acadêmico e experiência prática moldando a forma como resolvo problemas.</p>
          </div>

          <div className="about-origin__grid">
            <article className="about-info-card">
              <div className="about-info-card__icon"><GraduationCap size={19} aria-hidden="true" /></div>
              <div>
                <span className="about-card-label">Formação acadêmica</span>
                <h3>Engenharia de Software</h3>
                <p className="about-info-card__meta">PUC Minas</p>
                <p>
                  Uma formação voltada a desenvolvimento de software, engenharia de requisitos,
                  arquitetura de sistemas e resolução estruturada de problemas.
                </p>
              </div>
            </article>

            <article className="about-info-card">
              <div className="about-info-card__icon"><BriefcaseBusiness size={18} aria-hidden="true" /></div>
              <div>
                <span className="about-card-label">Experiência profissional</span>
                <h3>CNH Industrial</h3>
                <p className="about-info-card__meta">Tecnologia · Operações digitais</p>
                <p>
                  Experiência com plataformas digitais, telemetria e suporte técnico em escala
                  para equipes da América Latina e da América do Norte.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="about-section about-arsenal" aria-labelledby="arsenal-title">
          <div className="about-section__heading">
            <div className="about-eyebrow"><span>03</span><span>Arsenal</span></div>
            <h2 id="arsenal-title">Skills que transformam desafios em soluções.</h2>
            <p>Uma combinação de repertório técnico, visão de produto e competências humanas.</p>
          </div>

          <div className="about-skills">
            <div className="about-skills__technical">
              <div className="about-skills__heading">
                <Code2 size={18} aria-hidden="true" />
                <h3>Habilidades técnicas</h3>
                <span>Technical skills</span>
              </div>
              <div className="about-technical-list">
                {technicalSkills.map(({ icon: Icon, title, skills, description }) => (
                  <article className="about-technical-card" key={title}>
                    <div className="about-technical-card__icon"><Icon size={18} aria-hidden="true" /></div>
                    <div className="about-technical-card__body">
                      <h4>{title}</h4>
                      <ul className="about-skill-tags" aria-label={`Tecnologias e práticas: ${title}`}>
                        {skills.map((skill) => <li key={skill}>{skill}</li>)}
                      </ul>
                      <p>{description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="about-skills__soft">
              <div className="about-skills__heading">
                <UsersRound size={18} aria-hidden="true" />
                <h3>Competências interpessoais</h3>
                <span>Soft skills</span>
              </div>
              <div className="about-soft-grid">
                {softSkills.map(({ icon: Icon, title, description }) => (
                  <article className="about-soft-card" key={title}>
                    <Icon size={18} aria-hidden="true" />
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-section about-philosophy" aria-labelledby="philosophy-title">
          <div className="about-section__heading">
            <div className="about-eyebrow"><span>04</span><span>Filosofia</span></div>
          </div>
          <div className="about-philosophy__content">
            <span className="about-philosophy__mark" aria-hidden="true">“</span>
            <div>
              <h2 id="philosophy-title">Boas soluções começam pela escuta.</h2>
              <p>
                Acredito que tecnologia de qualidade nasce da compreensão genuína dos problemas.
                Por isso, valorizo a colaboração, o aprendizado constante e a construção de
                produtos que conectam necessidades reais a soluções simples, confiáveis e úteis.
              </p>
              <span className="about-philosophy__signature">O próximo capítulo está em construção.</span>
            </div>
          </div>
        </section>

        <footer className="about-footer">
          <p>Pronto para novos desafios e para construir o próximo capítulo.</p>
        </footer>
      </main>
    </div>
  );
};

export default AboutMe;
