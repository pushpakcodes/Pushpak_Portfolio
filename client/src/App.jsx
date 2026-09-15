import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import CursorFollower from './components/CursorFollower';
import About from './components/About';
import Projects from './components/Projects';
import Art from './components/Art';
import Contact from './components/Contact';
import Blogs from './components/Blogs';
import BlogDetail from './components/BlogDetail';

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_URL !== undefined 
      ? import.meta.env.VITE_API_URL 
      : (import.meta.env.DEV ? 'http://localhost:5000' : '');
    fetch(`${API_BASE}/api/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error(err));
  }, []);

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
          <Route path="/projects" element={<Projects />} />
          <Route path="/art" element={<Art />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail blogs={blogs} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Analytics />
    </Router>
  );
}

export default App;
