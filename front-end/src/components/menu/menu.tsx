import { useState } from 'react';
import { Link } from 'react-router';
import './menu.css';

export interface MenuItem {
  id: string;
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface GameMenuProps {
  items: MenuItem[];
  title?: string;
  subtitle?: string;
}

export function GameMenu({ items, title, subtitle }: GameMenuProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="game-menu-container">
      {title && (
        <div className="game-menu-header">
          <h2 className="game-menu-title">{title}</h2>
          {subtitle && <span className="game-menu-subtitle">{subtitle}</span>}
          <div className="game-menu-divider"></div>
        </div>
      )}

      <nav className="game-menu-nav">
        <ul className="game-menu-list">
          {items.map((item) => {
            const isHovered = hoveredId === item.id;

            return (
              <li 
                key={item.id} 
                className={`game-menu-item ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="menu-item-decorator left-decorator">
                  <span className="spark"></span>
                </div>
                
                {item.href ? (
                  item.href.startsWith('http') ? (
                    <a
                      href={item.href}
                      className="menu-item-text"
                      onClick={item.onClick}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="menu-item-text"
                      onClick={item.onClick}
                    >
                      {item.label}
                    </Link>
                  )
                ) : (
                  <button className="menu-item-text" onClick={item.onClick}>
                    {item.label}
                  </button>
                )}

                <div className="menu-item-decorator right-decorator">
                  <span className="spark"></span>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default GameMenu;
