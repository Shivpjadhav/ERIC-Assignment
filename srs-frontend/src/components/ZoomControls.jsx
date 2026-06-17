// src/components/ZoomControls.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

function ZoomControls() {
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
      transition={{ delay: 0.5 }}
      className={`
        absolute z-30
        ${isMobile ? 'left-2 bottom-[75px]' : 'left-[90px] bottom-[40px]'}
      `}
    >
      <div
        className={`
          flex flex-col items-center gap-1
          px-1 py-2
          rounded-full
          ${isMobile ? 'h-[110px]' : 'h-[143px]'}
        `}
        style={{
          background: '#d5d4d4',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        }}
      >
        {/* Plus */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`
            rounded-full
            bg-black
            flex items-center justify-center
            cursor-pointer
            ${isMobile ? 'w-3 h-3' : 'w-3 h-3'}
          `}
        >
          <FiPlus size={isMobile ? 12 : 14} className="text-white" />
        </motion.div>

        {/* Line */}
        <div className={`${isMobile ? 'w-[2px] h-16' : 'w-[2px] h-24'} bg-black/10 rounded-full relative`}>
          <div className="absolute bottom-0 w-[2px] h-3 bg-black rounded-full"></div>
        </div>

        {/* Minus */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`
            rounded-full
            bg-black
            flex items-center justify-center
            cursor-pointer
            ${isMobile ? 'w-3 h-3' : 'w-3 h-3'}
          `}
        >
          <FiMinus size={isMobile ? 12 : 14} className="text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ZoomControls;