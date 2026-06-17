// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGrid, FiMap, FiMapPin, FiSquare, FiGlobe, FiBarChart2, FiSettings, FiUser, FiMenu, FiX
} from 'react-icons/fi';

const navItems = [
  { icon: FiGrid, label: 'Dashboard' },
  { icon: FiMap, label: 'Map' },
  { icon: FiMapPin, label: 'Location' },
  { icon: FiSquare, label: 'Bounding Box' },
  { icon: FiGlobe, label: 'Globe' },
  { icon: FiBarChart2, label: 'Analytics' },
  { icon: FiSettings, label: 'Settings' },
];

function Sidebar() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  const handleNavClick = (idx) => {
    setActive(idx);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Sidebar content
  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="mb-9 flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#4ade80]/20]">
          ERIC
        </div>
        <span className="text-[7px] tracking-widest text-white/50 mt-1.5 font-medium">ERIC</span>
      </div>

      {/* Icons */}
      <div className="flex flex-col gap-5 flex-1 w-full px-2">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = idx === active;
          return (
            <motion.div
              key={idx}
              className={`relative w-full flex justify-center cursor-pointer transition-all duration-200 ${
                isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick(idx)}
            >
              {isActive && (
                <motion.div 
                  layoutId="activePill"
                  className="absolute -left-2 w-1.5 h-7 bg-[#4ade80] rounded-full shadow-lg shadow-[#4ade80]/30"
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
              <Icon size={22} className={`${isActive ? 'drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]' : ''}`} />
            </motion.div>
          );
        })}
      </div>

      {/* User Profile */}
      <div className="mt-auto flex flex-col items-center pb-3">
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center cursor-pointer shadow-lg hover:border-[#4ade80]/30 transition-colors"
        >
          <FiUser size={18} className="text-white/70" />
        </motion.div>
        <span className="text-[8px] text-white/40 mt-1.5 tracking-wider">PROFILE</span>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-1 left-4 z-50 w-11 h-11 rounded-xl bg-black border border-white/10 flex items-center justify-center shadow-lg hover:bg-white/5 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <FiX className="text-white text-xl" />
          ) : (
            <FiMenu className="text-white text-xl" />
          )}
        </motion.button>
      )}

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        initial={isMobile ? { x: -280, opacity: 0 } : { x: -80, opacity: 0 }}
        animate={{ 
          x: isMobile ? (isOpen ? 0 : -280) : 0,
          opacity: 1,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 30,
          duration: 0.3 
        }}
        className={`
          fixed left-0 top-0 h-full z-45
          ${isMobile ? 'w-[72px]' : 'w-[72px]'}
          bg-black
          flex flex-col items-center py-6 shadow-2xl
          border-r border-white/5
          ${isMobile ? 'rounded-r-2xl' : 'rounded-r-2xl'}
        `}
        style={{
          background: '#000000',
          boxShadow: isMobile 
            ? '4px 0 32px rgba(0, 0, 0, 0.8)' 
            : '4px 0 32px rgba(0, 0, 0, 0.8)',
        }}
      >
        <SidebarContent />
      </motion.div>

      {/* Mobile Bottom Navigation (when sidebar is closed) */}
      {isMobile && !isOpen && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-md border-t border-white/5 px-2 py-2 flex justify-around items-center"
        >
          {navItems.slice(0, 5).map((item, idx) => {
            const Icon = item.icon;
            const isActive = idx === active;
            return (
              <motion.button
                key={idx}
                onClick={() => {
                  setActive(idx);
                  setIsOpen(false);
                }}
                className={`flex flex-col items-center gap-0.5 p-2 rounded-lg transition-all ${
                  isActive ? 'text-[#4ade80]' : 'text-white/40 hover:text-white/60'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={18} className={isActive ? 'drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]' : ''} />
                <span className="text-[6px] font-medium tracking-wider">{item.label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </>
  );
}

export default Sidebar;