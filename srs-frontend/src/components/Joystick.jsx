// src/components/Joystick.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronUp, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Joystick() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerSize = isMobile ? 'w-20 h-20' : 'w-36 h-36';
  const centerSize = isMobile ? 'w-8 h-8' : 'w-14 h-14';
  const textSize = isMobile ? 'text-[5px]' : 'text-[8px]';
  const iconSize = isMobile ? 8 : 14;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        absolute z-40
        ${isMobile ? 'bottom-20 right-24' : 'bottom-8 right-8'}
      `}
    >
      <div className={`
        relative rounded-full bg-gradient-to-b from-[#0a1628] to-[#050d1a]
        backdrop-blur-xl border border-white/10 shadow-2xl
        ${containerSize}
        flex items-center justify-center
      `}>
        {/* Outer ring glow */}
        <div className="absolute inset-0.5 rounded-full border border-white/5"></div>
        
        {/* Inner ring */}
        <div className="absolute inset-1 rounded-full border border-white/5"></div>

        {/* Arrow indicators on outer ring - White and bold */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-white/80">
          <FiChevronUp size={iconSize} strokeWidth={3} />
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white/80">
          <FiChevronDown size={iconSize} strokeWidth={3} />
        </div>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 text-white/80">
          <FiChevronLeft size={iconSize} strokeWidth={3} />
        </div>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 text-white/80">
          <FiChevronRight size={iconSize} strokeWidth={3} />
        </div>

        {/* Center Joystick - White with WASD */}
        <motion.div
          drag
          dragConstraints={{
            top: isMobile ? -4 : -10,
            left: isMobile ? -4 : -10,
            right: isMobile ? 4 : 10,
            bottom: isMobile ? 4 : 10,
          }}
          dragElastic={0.15}
          whileDrag={{ scale: 1.05 }}
          className={`
            ${centerSize} rounded-full bg-white shadow-lg cursor-grab 
            flex items-center justify-center border-2 border-white/40
            hover:shadow-xl hover:shadow-white/20
            active:cursor-grabbing
            relative
          `}
        >
          <div className="grid grid-cols-3 gap-0 w-full h-full p-0.5">
            <div className="col-start-2 flex items-end justify-center">
              <span className={`${textSize} font-extrabold text-gray-700/80 tracking-wider`}>W</span>
            </div>
            <div className="row-start-2 flex items-center justify-end">
              <span className={`${textSize} font-extrabold text-gray-700/80 tracking-wider`}>A</span>
            </div>
            <div className="row-start-2 col-start-2 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-gray-400/20"></div>
            </div>
            <div className="row-start-2 col-start-3 flex items-center justify-start">
              <span className={`${textSize} font-extrabold text-gray-700/80 tracking-wider`}>D</span>
            </div>
            <div className="row-start-3 col-start-2 flex items-start justify-center">
              <span className={`${textSize} font-extrabold text-gray-700/80 tracking-wider`}>S</span>
            </div>
          </div>
          <div className="absolute inset-0.5 rounded-full border border-gray-200/20 pointer-events-none"></div>
        </motion.div>

        {/* Label */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[5px] text-white/20 tracking-widest whitespace-nowrap">
          JOYSTICK
        </div>
      </div>
    </motion.div>
  );
}

export default Joystick;