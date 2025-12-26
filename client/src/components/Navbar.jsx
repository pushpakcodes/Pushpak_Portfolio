import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const isArtPage = currentPath === '/art';

  const isActive = (path) => currentPath === path;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Art', path: '/art' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50">
      <div className={`flex items-center gap-1 md:gap-2 backdrop-blur-md border rounded-full p-1 md:p-1.5 px-2 md:px-3 shadow-lg ${
        isArtPage 
          ? 'bg-black/5 border-black/10 shadow-black/5' 
          : 'bg-white/5 border-white/10 shadow-black/20'
      }`}>
        {navItems.map((item) => (
          <div 
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`
              px-3 md:px-5 py-1.5 md:py-2.5 rounded-full cursor-pointer transition-all text-xs md:text-sm font-medium
              ${isActive(item.path) 
                ? isArtPage
                  ? 'bg-black/10 text-black hover:bg-black/20 shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  : 'bg-white/10 text-white hover:bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.5)]'
                : isArtPage
                  ? 'text-gray-500 hover:text-black'
                  : 'text-gray-400 hover:text-white'
              }
              ${item.name === 'Home' ? 'md:px-7' : ''}
            `}
          >
            {item.name}
          </div>
        ))}
        <a 
          href="https://drive.google.com/file/d/1DPxLG1CGsQIVaOvcQWYmJuvKHMBFkjA-/view?usp=drive_link" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`
            px-3 md:px-6 py-1.5 md:py-2.5 rounded-full cursor-pointer transition-all text-xs md:text-sm font-medium border ml-1 md:ml-2 block
            ${isArtPage
              ? 'bg-black/10 hover:bg-black/20 text-black border-black/5'
              : 'bg-white/10 hover:bg-white/20 text-white border-white/5'
            }
          `}
        >
          Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
