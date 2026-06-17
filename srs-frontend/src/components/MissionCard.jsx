// src/components/MissionCard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPause } from 'react-icons/fi';

function MissionCard() {
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
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.25 }}
      className={`
        absolute z-30 
        rounded-full px-4 py-4 
        flex items-center gap-3 shadow-lg
        ${isMobile ? 'top-[55px] left-4' : 'top-4 left-[90px]'}
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
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse shadow-[0_0_10px_#4ade80]" />
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#4ade80] animate-ping opacity-75" />
        </div>
        <span className={`font-medium text-[#081a33]/60 ${isMobile ? 'text-[7px]' : 'text-xs'} tracking-wider`}>
          Status
        </span>
        <span className={`font-bold text-[#081a33] ${isMobile ? 'text-[8px]' : 'text-sm'}`}>
          On Mission 1234
        </span>
      </div>
      <motion.div 
        className={`rounded-full flex items-center justify-center cursor-pointer shadow-md ${
          isMobile ? 'w-6 h-6 bg-[#081a33]' : 'w-8 h-8 bg-[#081a33]'
        }`}
        whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(74, 222, 128, 0.2)' }}
        whileTap={{ scale: 0.95 }}
      >
        <FiPause className={`${isMobile ? 'text-white text-[8px]' : 'text-white text-sm'}`} />
      </motion.div>
    </motion.div>
  );
}

export default MissionCard;