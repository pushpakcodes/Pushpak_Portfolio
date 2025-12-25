import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import CursorFollower from './components/CursorFollower';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="bg-[#050505] min-h-screen text-white selection:bg-purple-500/30">
        <CursorFollower />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <BentoGrid />
            </>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
