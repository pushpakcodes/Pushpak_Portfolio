import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CursorFollower from './components/CursorFollower';

function App() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-purple-500/30">
      <CursorFollower />
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
