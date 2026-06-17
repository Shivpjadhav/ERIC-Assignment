// src/components/MiniPreview.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function MiniPreview({ view, setView, children }) {
  const isCamera = view === 'camera';
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
      initial={{ x: -30, opacity: 0, scale: 0.95 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{
        delay: 0.4,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      className={`
        absolute z-30 rounded-[20px] overflow-hidden cursor-pointer group
        ${isMobile ? 'left-9 bottom-[70px] w-[200px] h-[120px]' : 'left-[135px] bottom-[30px] w-[280px] h-[160px]'}
      `}
      layoutId="main-view"
      onClick={() => setView(isCamera ? 'map' : 'camera')}
      whileHover={{
        scale: 1.04,
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(74,222,128,0.08)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="absolute inset-0 bg-[#0a1f3b]/70 backdrop-blur-md border border-white/10 rounded-[20px] shadow-2xl overflow-hidden">
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-[20px] shadow-[inset_0_0_40px_rgba(74,222,128,0.03)] pointer-events-none" />

        {/* Content - Render the actual view */}
        <div className="relative w-full h-full">
          {children}

          {/* Label - top right */}
          <div className={`absolute ${isMobile ? 'top-1.5 right-1.5 px-2 py-0.5' : 'top-3 right-3 px-3 py-1'} bg-black/50 backdrop-blur-sm rounded-full border border-[#1e3a5f] shadow-lg z-10`}>
            <span className={`${isMobile ? 'text-[7px]' : 'text-[9px]'} font-bold tracking-[0.15em] text-white/80`}>
              {isCamera ? 'MAP' : 'CAMERA'}
            </span>
          </div>

          {/* Bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 py-3 rounded-b-[20px] z-10">
            <div className="flex items-center justify-between">
              <span className={`${isMobile ? 'text-[6px]' : 'text-[8px]'} font-medium tracking-[0.1em] text-white/40 uppercase`}>
                {isCamera ? '3D' : 'LIVE'}
              </span>
              <motion.span
                className={`${isMobile ? 'text-[6px]' : 'text-[8px]'} font-bold tracking-[0.1em] text-white/50 uppercase flex items-center gap-1.5`}
                whileHover={{ color: '#4ade80' }}
                transition={{ duration: 0.2 }}
              >
                <span className="inline-block w-1 h-1 rounded-full bg-[#4ade80] pulse-dot shadow-[0_0_8px_#4ade80]" />
                {isMobile ? 'SWITCH' : 'CLICK TO SWITCH'}
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MiniPreview;