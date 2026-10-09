import './home.css'
import GameMenu from '../../components/menu/menu';

function Home (){
  const menuItems = [
    { id: '1', label: 'Sobre Mim', onClick: () => console.log('Click 1')},
    { id: '2', label: 'Projetos', href: '/projetos' },
    { id: '4', label: 'Experiência Profissional', href: '/Experiencias' },
    { id: '3', label: 'Contato', href: '/Contatos' },
  ]

  return(
    <main className="w-screen h-screen bg-gray-900 ">
      {/* Background animado e imersivo (Camadas de fogo, fumaça e partículas) */}

      <GameMenu
        title="João Pedro Lisboa Brito"
        subtitle='Software Engeneer'
        items={menuItems} 
      />

    </main>
  )
}

export default Home;