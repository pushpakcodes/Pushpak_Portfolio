import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import CursorFollower from './components/CursorFollower';

function App() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-purple-500/30">
      <CursorFollower />
      <Navbar />
      <Hero />
      <BentoGrid />
    </div>
  );
}

export default App;
