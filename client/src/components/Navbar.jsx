import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1.5 px-3 shadow-lg shadow-black/20">
        <div className="bg-white/10 text-white px-7 py-2.5 rounded-full cursor-pointer hover:bg-white/20 transition-all text-sm font-medium shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          Home
        </div>
        {['About', 'Projects', 'Contact'].map((item) => (
          <div key={item} className="text-gray-400 hover:text-white px-5 py-2.5 cursor-pointer transition-colors text-sm font-medium">
            {item}
          </div>
        ))}
        <div className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full cursor-pointer transition-all text-sm font-medium border border-white/5 ml-2">
          Book a Call
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
