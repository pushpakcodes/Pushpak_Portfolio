import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1.5 px-3 shadow-lg shadow-black/20">
        {navItems.map((item) => (
          <div 
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`
              px-5 py-2.5 rounded-full cursor-pointer transition-all text-sm font-medium
              ${isActive(item.path) 
                ? 'bg-white/10 text-white hover:bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                : 'text-gray-400 hover:text-white'
              }
              ${item.name === 'Home' ? 'px-7' : ''}
            `}
          >
            {item.name}
          </div>
        ))}
        <a 
          href="https://drive.google.com/file/d/1DPxLG1CGsQIVaOvcQWYmJuvKHMBFkjA-/view?usp=drive_link" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full cursor-pointer transition-all text-sm font-medium border border-white/5 ml-2 block"
        >
          Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
