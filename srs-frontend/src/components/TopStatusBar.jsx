// src/components/TopStatusBar.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiBatteryCharging,
  FiWifi,
  FiShield,
  FiCpu
} from 'react-icons/fi';

const indicators = [
  {
    icon: FiBatteryCharging,
    label: '',
    value: '100%'
  },
  {
    icon: FiWifi,
    label: 'Signal',
    value: 'Strong'
  },
  {
    icon: FiShield,
    label: 'Failsafe',
    value: 'Okay'
  },
  {
    icon: FiCpu,
    label: 'System',
    value: 'Okay'
  }
];

function TopStatusBar() {
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
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`
        absolute top-0 z-50
        ${isMobile ? 'left-[15%] -translate-x-1/2' : 'left-[calc(30%+35px)] -translate-x-1/2'}
      `}
    >
      <div
        className={`
          bg-black
          rounded-b-2xl
          flex
          items-center
          justify-around
          border border-white/10
          shadow-2xl
          ${isMobile ? 'w-[calc(100vw-80px)] max-w-[400px] h-[45px] px-2' : 'w-[490px] h-[50px]'}
        `}
      >
        {indicators.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`flex items-center ${isMobile ? 'gap-1' : 'gap-2'}`}
            >
              <div className="text-[#4ade80]">
                <Icon size={isMobile ? 14 : 18} />
              </div>

              <span className={`text-white/70 ${isMobile ? 'text-[8px]' : 'text-xs'}`}>
                {item.label}
              </span>

              <span className={`text-white font-semibold ${isMobile ? 'text-[8px]' : 'text-xs'}`}>
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default TopStatusBar;