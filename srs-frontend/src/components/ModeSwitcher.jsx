// src/components/ModeSwitcher.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function ModeSwitcher() {
  const [mode, setMode] = useState('AUTO');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className={`
        relative
        rounded-full
        px-3 py-1.5
        flex items-center gap-2
        ${isMobile ? 'absolute top-[4px] right-1 z-30' : ''}
      `}
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        height: isMobile ? '32px' : '40px',
      }}
    >
      <span className={`font-medium tracking-wider ${isMobile ? 'text-[7px] text-[#081a33]/60' : 'text-xs text-[#081a33]'} mr-1`}>
        MODE
      </span>
      {['AUTO', 'MANUAL'].map((m) => (
        <motion.div
          key={m}
          className={`px-2 py-0.5 rounded-full font-semibold cursor-pointer transition-all ${
            mode === m 
              ? 'bg-[#081a33] text-white shadow-md' 
              : 'bg-transparent text-[#081a33] hover:bg-white/50'
          } ${isMobile ? 'text-[7px]' : 'text-[10px]'}`}
          onClick={() => setMode(m)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          {m}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ModeSwitcher;