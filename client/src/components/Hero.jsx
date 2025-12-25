import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 bg-[#050505]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Main Title */}
      <div className="relative text-center z-10 max-w-5xl px-4">
        <p className="text-gray-500 text-xs tracking-[0.2em] mb-6 uppercase font-medium animate-fade-in-up font-sans">
          Dynamic Web Magic with Me
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-white mb-8 leading-[1.3] font-sans">
          Transforming Concepts into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-white inline-block mt-2">
            Seamless User Experiences
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light font-sans">
          Hi! I'm <span 
            className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent font-medium" 
            aria-hidden="true" 
            style={{
              backgroundImage: 'linear-gradient(135deg, rgb(255, 0, 128), rgb(121, 40, 202), rgb(0, 112, 243), rgb(56, 189, 248), rgb(255, 0, 128))',
              WebkitTextFillColor: 'transparent',
              animationDuration: '10s'
            }}
          >
            Pushpak Jadhav
          </span>, a Full Stack Developer
          <br className="hidden md:block" /> based in India with a passion for code.
        </p>

        {/* CTA Button */}
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none group hover:scale-105 transition-transform duration-300">
          {/* Continuous Purple Shiny Line Animation */}
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#581c87_0%,#a855f7_50%,#581c87_100%)]" />
          
          {/* Inner Content (The Black Button) */}
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0a0a0a] px-8 text-sm font-medium text-white backdrop-blur-3xl gap-2">
            <span className="relative font-medium text-base z-10">Show my work</span>
            <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform duration-300 text-gray-300 z-10" />
          </span>
        </button>
      </div>

      {/* Floating Elements (simulated) */}
      <motion.div 
        animate={calculateMovement(-0.05)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-50"
      />
      <motion.div 
        animate={calculateMovement(0.08)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full opacity-50"
      />
      <motion.div 
        animate={calculateMovement(-0.1)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-30"
      />
      <motion.div 
        animate={calculateMovement(0.06)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/2 right-[10%] w-1 h-1 bg-white rounded-full opacity-20"
      />
      <motion.div 
        animate={calculateMovement(-0.12)}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute bottom-1/3 right-[20%] w-2 h-2 bg-purple-400/20 rounded-full blur-[1px]"
      />
      
      {/* Additional Parallax Dots */}
      <motion.div 
        animate={calculateMovement(0.15)}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
        className="absolute top-[15%] right-[15%] w-1 h-1 bg-blue-300/40 rounded-full"
      />
      <motion.div 
        animate={calculateMovement(-0.08)}
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
        className="absolute bottom-[20%] left-[15%] w-1.5 h-1.5 bg-white/30 rounded-full"
      />
      <motion.div 
        animate={calculateMovement(0.1)}
        transition={{ type: "spring", stiffness: 45, damping: 20 }}
        className="absolute top-[60%] left-[5%] w-1 h-1 bg-purple-300/40 rounded-full"
      />
      <motion.div 
        animate={calculateMovement(-0.15)}
        transition={{ type: "spring", stiffness: 55, damping: 15 }}
        className="absolute bottom-[10%] right-[40%] w-1 h-1 bg-white/20 rounded-full"
      />
    </div>
  );
};

export default Hero;
