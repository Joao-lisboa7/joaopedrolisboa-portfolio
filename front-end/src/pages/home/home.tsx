import './home.css';
import Navbar from '../../components/navbar/Navbar';
import GameMenu from '../../components/menu/menu';

function Home (){
  const menuItems = [
    { id: '1', label: 'Sobre Mim', href: '/about'},
    { id: '2', label: 'Projetos', href: '/projetos' },
    { id: '4', label: 'Experiência', href: '/experiences' },
    { id: '5', label: 'Estatísticas', href: '/statistics' },
    { id: '3', label: 'Contato', href: '/Contatos' },
  ]

  return(
    <main className="home-page">
      {/* Vídeo de background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="home-page__background"
        src="/video/Faiscas-de-Fogo-SnapYT.App.mp4"
      />

      <Navbar title="Home" showBackButton={false} />

      <GameMenu
        title="João Pedro Lisboa Brito"
        subtitle='Software Engeneer'
        items={menuItems} 
      />

    </main>
  )
}

export default Home;
