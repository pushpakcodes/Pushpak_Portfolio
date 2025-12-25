import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateMovement = (factor) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { x, y };
  };

  return (
    <div className="h-screen bg-[#050505] text-white overflow-hidden flex flex-col justify-center px-4 md:px-8 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: 'url("/about-bg.jpg")' }}
      ></div>
      
      {/* Animated Gradient Orbs for depth */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>
      </div>

      {/* Parallax Dots (7 Manually Placed Dots) */}
      <motion.div 
        animate={calculateMovement(-0.05)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-50 pointer-events-none"
      />
      <motion.div 
        animate={calculateMovement(0.08)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full opacity-50 pointer-events-none"
      />
      <motion.div 
        animate={calculateMovement(-0.1)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-30 pointer-events-none"
      />
      <motion.div 
        animate={calculateMovement(0.06)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/2 right-[10%] w-1 h-1 bg-white rounded-full opacity-20 pointer-events-none"
      />
      <motion.div 
        animate={calculateMovement(-0.12)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute bottom-1/3 right-[20%] w-2 h-2 bg-purple-400/20 rounded-full blur-[1px] pointer-events-none"
      />
      <motion.div 
        animate={calculateMovement(0.15)}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
        className="absolute top-[15%] right-[35%] w-1 h-1 bg-blue-300/40 rounded-full pointer-events-none"
      />
      <motion.div 
        animate={calculateMovement(-0.08)}
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
        className="absolute bottom-[20%] left-[15%] w-1.5 h-1.5 bg-white/30 rounded-full pointer-events-none"
      />
      {/* Additional Dots */}
      <motion.div 
        animate={calculateMovement(0.12)}
        transition={{ type: "spring", stiffness: 45, damping: 20 }}
        className="absolute top-[10%] left-[50%] w-1 h-1 bg-purple-300/40 rounded-full pointer-events-none"
      />
      <motion.div 
        animate={calculateMovement(-0.15)}
        transition={{ type: "spring", stiffness: 55, damping: 15 }}
        className="absolute top-[80%] right-[45%] w-1 h-1 bg-white/20 rounded-full pointer-events-none"
      />
      <motion.div 
        animate={calculateMovement(0.2)}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        className="absolute top-[20%] left-[10%] w-0.5 h-0.5 bg-blue-400/60 rounded-full pointer-events-none"
      />
      <motion.div 
        animate={calculateMovement(-0.18)}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        className="absolute bottom-[5%] right-[5%] w-1 h-1 bg-purple-300/40 rounded-full pointer-events-none"
      />
      <motion.div 
        animate={calculateMovement(0.1)}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
        className="absolute top-[40%] left-[5%] w-1.5 h-1.5 bg-white/10 rounded-full pointer-events-none"
      />
      <motion.div 
        animate={calculateMovement(-0.25)}
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
        className="absolute top-[60%] right-[15%] w-0.5 h-0.5 bg-blue-200/50 rounded-full pointer-events-none"
      />
      <motion.div 
        animate={calculateMovement(0.14)}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        className="absolute bottom-[15%] left-[40%] w-1 h-1 bg-purple-400/30 rounded-full pointer-events-none"
      />
      
      {/* High Density Starfield Dots */}
      <motion.div animate={calculateMovement(-0.03)} transition={{ type: "spring", stiffness: 40 }} className="absolute top-[8%] left-[8%] w-0.5 h-0.5 bg-white/40 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(0.05)} transition={{ type: "spring", stiffness: 50 }} className="absolute top-[12%] right-[12%] w-1 h-1 bg-blue-400/20 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(-0.07)} transition={{ type: "spring", stiffness: 45 }} className="absolute bottom-[8%] left-[8%] w-0.5 h-0.5 bg-purple-400/30 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(0.09)} transition={{ type: "spring", stiffness: 55 }} className="absolute bottom-[12%] right-[25%] w-1 h-1 bg-white/20 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(-0.04)} transition={{ type: "spring", stiffness: 40 }} className="absolute top-[45%] left-[2%] w-0.5 h-0.5 bg-white/30 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(0.06)} transition={{ type: "spring", stiffness: 50 }} className="absolute top-[55%] right-[2%] w-0.5 h-0.5 bg-blue-300/30 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(-0.08)} transition={{ type: "spring", stiffness: 45 }} className="absolute top-[2%] left-[40%] w-1 h-1 bg-purple-300/20 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(0.11)} transition={{ type: "spring", stiffness: 60 }} className="absolute bottom-[2%] right-[40%] w-0.5 h-0.5 bg-white/40 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(-0.05)} transition={{ type: "spring", stiffness: 40 }} className="absolute top-[25%] left-[15%] w-0.5 h-0.5 bg-blue-200/30 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(0.07)} transition={{ type: "spring", stiffness: 50 }} className="absolute top-[75%] right-[15%] w-1 h-1 bg-purple-200/20 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(-0.09)} transition={{ type: "spring", stiffness: 45 }} className="absolute top-[35%] left-[85%] w-0.5 h-0.5 bg-white/30 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(0.13)} transition={{ type: "spring", stiffness: 55 }} className="absolute bottom-[35%] left-[5%] w-1 h-1 bg-blue-400/20 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(-0.06)} transition={{ type: "spring", stiffness: 40 }} className="absolute top-[18%] right-[30%] w-0.5 h-0.5 bg-white/20 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(0.08)} transition={{ type: "spring", stiffness: 50 }} className="absolute bottom-[18%] left-[30%] w-0.5 h-0.5 bg-purple-300/30 rounded-full pointer-events-none" />
      <motion.div animate={calculateMovement(-0.1)} transition={{ type: "spring", stiffness: 45 }} className="absolute top-[65%] left-[65%] w-1 h-1 bg-white/10 rounded-full pointer-events-none" />


      {/* Floating Astronaut */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
          ...calculateMovement(0.03)
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          type: "spring", stiffness: 50, damping: 20
        }}
        className="absolute top-[15%] right-[5%] md:right-[10%] w-24 h-24 md:w-32 md:h-32 pointer-events-none z-0 opacity-80"
      >
        <img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Astronaut%20Light%20Skin%20Tone.png" 
          alt="Floating Astronaut" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        />
      </motion.div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full pt-20 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-[10px] md:text-xs tracking-[0.3em] text-blue-400 uppercase mb-4 font-bold">MORE ABOUT ME</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight">
            Meet <span className="text-white italic drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Pushpak</span>,
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 font-light italic">
            - The Soul That Runs Between <span className="font-serif text-purple-200">Art</span> and <span className="font-serif text-blue-200">Tech</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-lg font-light"
          >
            <p>
              I’m Pushpak Jadhav, a full-stack software developer based in Pune, India, working primarily with the MERN stack and modern web technologies. I enjoy solving challenging problems and actively practice competitive programming as a LeetCode Knight (1867) and a CodeChef 3-star.
            </p>
            <p>
              I’ve built end-to-end applications ranging from HR management systems to AI-powered Excel automation tools, handling backend architecture, APIs, frontend UX, and deployment. I’ve also designed and developed a portfolio website for Bollywood Art Director Mrugakshi Nadkarni.
            </p>
            <p>
              I find inspiration where art meets nature — from Van Gogh’s skies to quiet, living landscapes. Creating, like coding, helps me understand the world with patience and curiosity. Nature truly is the greatest creator.
            </p>
            <p className="text-white font-medium pt-2 text-lg">
              Let's connect — who knows what we can build together!
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-3 md:pt-4">
              <a href="https://github.com/pushpakcodes/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 text-gray-300 hover:text-white">
                <Github className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://www.linkedin.com/in/pushpak-jadhav" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 text-gray-300 hover:text-white">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="mailto:pushpakzworkspace@gmail.com" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 text-gray-300 hover:text-white">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="tel:+919322805835" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 text-gray-300 hover:text-white">
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative flex justify-center md:justify-end order-first md:order-last mb-4 md:mb-0 md:-translate-y-8"
          >
            <div className="relative w-[200px] h-[200px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden border-4 border-white/5 shadow-2xl bg-[#0a0a0a]">
              <img 
                src="/librarypic.jpg" 
                alt="Pushpak" 
                className="w-full h-full object-cover scale-110 translate-x-4"
              />
              {/* Overlay gradient to match dark theme */}
              <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay"></div>
            </div>
            
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-purple-500/10 blur-[80px] -z-10 rounded-full transform translate-x-10 translate-y-10"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
