import './home.css';
import Navbar from '../../components/navbar/navbar';
import GameMenu from '../../components/menu/Menu';

function Home (){
  const menuItems = [
    { id: '1', label: 'Sobre Mim', href: '/about'},
    { id: '2', label: 'Projetos', href: '/projetos' },
    { id: '4', label: 'Experiência', href: '/Experiencias' },
    { id: '3', label: 'Contato', href: '/Contatos' },
  ]

  return(
    <main className="relative w-screen h-screen bg-gray-900 overflow-hidden">
      {/* Vídeo de background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/video/Faiscas-de-Fogo-SnapYT.App.mp4"
      />

      <Navbar title="Home"/>

      <GameMenu
        title="João Pedro Lisboa Brito"
        subtitle='Software Engeneer'
        items={menuItems} 
      />

    </main>
  )
}

export default Home;