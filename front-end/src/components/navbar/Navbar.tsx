import { useState, useEffect } from 'react';
import { Mail, User } from 'lucide-react';

interface NavbarProps {
  title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title = 'Untitled' }) => {
  const [activeLang, setActiveLang] = useState<'ENG' | 'POR'>('ENG');

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-1 bg-transparent text-white border-b border-white/5 relative z-50">
      {/* Left side: Page Title */}
      <div className="flex items-center">
        <h1 className="title-font leading-none">
          {title}
        </h1>
      </div>

      {/* Right side: Controls */}
      <div className="flex items-center gap-6 md:gap-8">
        {/* Language Toggle Group */}
        <div className="flex bg-black/40 border border-gray-800 rounded-sm overflow-hidden backdrop-blur-sm">
          <button
            onClick={() => setActiveLang('ENG')}
            className={`px-4 py-1.5 text-xs font-semibold tracking-wider transition-colors duration-200 ${
              activeLang === 'ENG'
                ? 'bg-red-800 text-white'
                : 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            ENG
          </button>
          <button
            onClick={() => setActiveLang('POR')}
            className={`px-4 py-1.5 text-xs font-semibold tracking-wider transition-colors duration-200 ${
              activeLang === 'POR'
                ? 'bg-red-800 text-white'
                : 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            POR
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-5">
          <button className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            <Mail size={20} strokeWidth={1.5} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            <User size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
