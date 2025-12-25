import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();
  const isArtPage = location.pathname === '/art';

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center ${isArtPage ? 'w-8 h-8' : 'w-6 h-6 rounded-full'}`}
      animate={{
        x: mousePosition.x - (isArtPage ? 16 : 12),
        y: mousePosition.y - (isArtPage ? 16 : 12),
        scale: isHovering ? 1.2 : 1,
        rotate: isArtPage ? (mousePosition.x % 20) - 10 : 0, // Subtle swim wobble
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
      style={isArtPage ? {
        filter: "grayscale(100%) sepia(100%) saturate(600%) hue-rotate(10deg) brightness(1.2) contrast(1.2) drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 15px rgba(255, 223, 0, 0.6))"
      } : {
        backgroundColor: '#7dd3fc', // Sky-300 (Lighter Sky Blue)
        border: '3px solid #374151', // Gray-700
        boxShadow: "0 0 20px 5px rgba(125, 211, 252, 0.8), 0 0 40px 10px rgba(125, 211, 252, 0.4)" // Matching glow
      }}
    >
      {isArtPage && <span className="text-2xl transform -scale-x-100">🐠</span>}
    </motion.div>
  );
};

export default CursorFollower;
