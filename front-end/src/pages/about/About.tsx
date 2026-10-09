import { Link } from 'react-router';
import './about.css';

function About() {
  return (
    <main className="about-container">
      <div className="about-card">
        <span className="about-subtitle">PERFIL & TRAJETÓRIA</span>
        <h1 className="about-title">Sobre Mim</h1>
        <div className="about-divider"></div>
        <p className="about-description">
          Engenheiro de Software focado em tecnologia, desenvolvimento de produtos
          e soluções digitais de alto impacto.
        </p>
        <Link to="/" className="about-back-button">
          ← Voltar ao Menu
        </Link>
      </div>
    </main>
  );
}

export default About;