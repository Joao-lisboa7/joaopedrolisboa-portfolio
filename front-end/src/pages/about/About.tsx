import React from 'react';
import './about.css';
import Navbar from '@/components/navbar/Navbar';
import FrameImg from '@/components/frame-img/FrameImg';

const profileImage = new URL('../../assets/foto_curriculo.JPG', import.meta.url).href;

const AboutMe: React.FC = () => {
  return (
    <div className="about-page min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-red-900 selection:text-white overflow-hidden">
      <Navbar title="About me"/>

      {/* Efeito de Fundo - Partículas/Cinzas sutis (Simulado com gradiente radial) */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-[#050505]/80 to-[#050505] z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        
        {/* Cabeçalho / Prólogo */}
        <header className="mb-32 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-6 opacity-80">
                <span className="font-cinzel text-amber-600 tracking-widest text-sm uppercase">
                  Prólogo — A Origem
                </span>
                <div className="hidden md:block h-px w-24 bg-gradient-to-r from-amber-600 to-transparent"></div>
              </div>
          

              <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-100 tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                João Pedro
              </h1>
              <h2 className="font-cinzel text-xl md:text-2xl text-red-800 tracking-[0.2em] mb-8 uppercase">
                Software Engineer
              </h2>

              <p className="max-w-xl mx-auto md:mx-0 text-zinc-400 leading-relaxed text-lg border-l border-zinc-800 pl-4 md:border-l-0 md:pl-0">
                Forjando soluções digitais robustas e interfaces imersivas.
                Uma jornada guiada pela engenharia de precisão e pelo design focado na experiência do usuário.
              </p>
            </div>

            <div className="flex-shrink-0 mt-8 md:mt-0">
              <FrameImg className="w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0" imageUrl={profileImage} />
            </div>

          </div>
        </header>

        {/* Trajetória organizada por tópicos */}
        <section className="about-topics mt-24" aria-label="Minha trajetória">
          <article className="about-topic animate-fade-in-up animate-delay-100">
            <div className="about-topic__content">
              <p className="about-topic__chapter">Capítulo I</p>
              <h3 className="about-topic__title">O Despertar</h3>
              <p className="about-topic__description">
                O início da trajetória acadêmica na Pontifícia Universidade Católica (PUC Minas).
                Os primeiros contatos com a lógica de programação, estruturas de dados em C++ e a fundação do pensamento analítico.
              </p>
            </div>
          </article>

          <article className="about-topic animate-fade-in-up animate-delay-200">
            <div className="about-topic__content">
              <p className="about-topic__chapter">Capítulo II</p>
              <h3 className="about-topic__title">A Forja</h3>
              <p className="about-topic__description">
                O domínio das ferramentas e o desenvolvimento de habilidades técnicas.
                A construção de sistemas complexos e plataformas web full-stack, transformando conceitos abstratos em arquiteturas funcionais.
              </p>
              <div className="about-topic__skills">
                {['Java', 'Spring Boot', 'React', 'Next.js', 'PostgreSQL', 'Tailwind CSS'].map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </article>

          <article className="about-topic animate-fade-in-up animate-delay-300">
            <div className="about-topic__content">
              <p className="about-topic__chapter">Capítulo III</p>
              <h3 className="about-topic__title">A Jornada</h3>
              <p className="about-topic__description">
                A entrada no campo de batalha corporativo. Experiência prática na CNH Industrial,
                gerenciando plataformas digitais, telemetria e prestando suporte técnico em escala para a América Latina e América do Norte.
              </p>
            </div>
          </article>

          <article className="about-topic animate-fade-in-up animate-delay-400">
            <div className="about-topic__content">
              <p className="about-topic__chapter">Capítulo IV</p>
              <h3 className="about-topic__title">A Evolução</h3>
              <p className="about-topic__description">
                Consolidação de competências em metodologias ágeis (Scrum, Kanban) e design de banco de dados.
                Desenvolvimento de projetos arquiteturais focados em escalabilidade e interfaces centradas no usuário.
              </p>
            </div>
          </article>
        </section>

        {/* Epílogo */}
        <footer className="mt-32 text-center border-t border-zinc-900 pt-16 animate-fade-in-up animate-delay-500">
          <div className="inline-block mb-6">
             <div className="w-8 h-8 mx-auto border-t border-r border-amber-600 transform -rotate-45 mb-4"></div>
           <div className="w-8 h-8 mx-auto border-t border-r border-amber-600 transform -rotate-45 mb-4"></div>
          </div>
          <h3 className="font-cinzel text-2xl text-amber-600 tracking-widest mb-4 uppercase">
            Epílogo — O Próximo Capítulo
          </h3>
          <p className="max-w-2xl mx-auto text-zinc-400 leading-relaxed mb-12">
            A busca contínua pela maestria em engenharia de software e gestão de produtos.
            Pronto para enfrentar novos desafios, liderar iniciativas técnicas e esculpir a próxima geração de aplicações digitais.
          </p>


          <button className="px-8 py-3 bg-transparent border border-red-900 text-zinc-300 font-cinzel tracking-widest uppercase text-sm hover:bg-red-950/30 hover:border-red-600 transition-all duration-300">
            Estabelecer Contato
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AboutMe;