import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const artItems = [
  { type: 'video', src: '/art/art-1.mp4' },
  { type: 'image', src: '/art/art-2.jpg' },
  { type: 'image', src: '/art/art-3.jpg' },
  { type: 'image', src: '/art/art-4.jpg' },
  { type: 'video', src: '/art/art-5.mp4' },
  { type: 'image', src: '/art/art-6.jpg' },
  { type: 'video', src: '/art/art-7.mp4' },
  { type: 'video', src: '/art/art-8.mp4' },
  { type: 'image', src: '/art/art-9.jpg' },
  { type: 'video', src: '/art/art-10.mp4' },
  { type: 'video', src: '/art/art-11.mp4' },
  { type: 'image', src: '/art/art-12.jpg' },
  { type: 'video', src: '/art/art-13.mp4' },
  { type: 'image', src: '/art/art-14.jpg' },
  { type: 'video', src: '/art/art-15.mp4' },
  { type: 'video', src: '/art/art-16.mp4' },
  { type: 'video', src: '/art/art-17.mp4' },
  { type: 'video', src: '/art/art-18.mp4' },
  { type: 'image', src: '/art/art-19.jpg' },
  { type: 'video', src: '/art/art-20.mp4' },
];

const Art = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showBanner, setShowBanner] = useState(true);
  const [selectedArt, setSelectedArt] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Hide banner after 2 seconds (even quicker transition)
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const calculateMovement = (baseX, baseY, speed) => {
    return {
      x: baseX + mousePosition.x * speed,
      y: baseY + mousePosition.y * speed,
    };
  };

  const dots = [
    { x: '10%', y: '15%', size: 4, speed: 1.2 },
    { x: '85%', y: '10%', size: 3, speed: 0.8 },
    { x: '25%', y: '45%', size: 5, speed: 1.5 },
    { x: '75%', y: '55%', size: 3, speed: 0.9 },
    { x: '15%', y: '85%', size: 4, speed: 1.1 },
    { x: '90%', y: '90%', size: 6, speed: 1.3 },
    { x: '50%', y: '25%', size: 2, speed: 0.7 },
  ];

  // Text animation variants
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.03,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      }
    },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showBanner && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
          >
            {/* Top Shutter */}
            <motion.div
              initial={{ height: "50%" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              className="absolute top-0 left-0 w-full bg-[#050505] z-0"
            />
            
            {/* Bottom Shutter */}
            <motion.div
              initial={{ height: "50%" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              className="absolute bottom-0 left-0 w-full bg-[#050505] z-0"
            />

            {/* Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.8 } }}
              variants={sentence}
              className="relative z-10 px-4 text-center mix-blend-difference"
            >
              <h2 className="text-3xl md:text-6xl font-oregon text-white tracking-widest leading-relaxed">
                {"Pushpak Codes In Dark But Lives In Light".split("").map((char, index) => (
                  <motion.span key={index} variants={letter}>
                    {char}
                  </motion.span>
                ))}
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden bg-white">
        {/* Parallax Dots (Dark) */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {dots.map((dot, index) => (
            <motion.div
              key={index}
              className="absolute bg-black/10 rounded-full blur-[1px]"
              style={{
                left: dot.x,
                top: dot.y,
                width: dot.size,
                height: dot.size,
              }}
              animate={calculateMovement(0, 0, dot.speed)}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: showBanner ? 3.5 : 0 }}
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-black mb-6 font-display"
            >
              Pushpak Loves Art !
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: showBanner ? 3.7 : 0.2 }}
              className="text-xl md:text-2xl text-gray-600 font-light italic"
            >
              "What Is Earth Without Art It Is Just Piece Of Rock "
            </motion.p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {artItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (showBanner ? 3.5 : 0) + index * 0.1 }}
                className="break-inside-avoid rounded-2xl overflow-hidden bg-gray-50 border border-black/5 hover:border-purple-500/30 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer"
                onClick={() => setSelectedArt(item)}
              >
                {item.type === 'video' ? (
                  <div className="relative">
                    <video
                      src={item.src}
                      className="w-full h-auto object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={item.src}
                      alt="Art piece"
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedArt(null)}
          >
            <button
              onClick={() => setSelectedArt(null)}
              className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors z-[80]"
            >
              <FaTimes size={30} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedArt.type === 'video' ? (
                <video
                  src={selectedArt.src}
                  className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                  autoPlay
                  controls
                  playsInline
                />
              ) : (
                <img
                  src={selectedArt.src}
                  alt="Art piece full view"
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Art;
