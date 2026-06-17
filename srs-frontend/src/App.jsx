// src/App.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGroup } from "framer-motion";
import Sidebar from './components/Sidebar';
import TopStatusBar from './components/TopStatusBar';
import MissionCard from './components/MissionCard';
import ModeSwitcher from './components/ModeSwitcher';
import EmergencyButton from './components/EmergencyButton';
import Joystick from './components/Joystick';
import MiniPreview from './components/MiniPreview';
import ZoomControls from './components/ZoomControls';
import CameraView from './pages/CameraView';
import MapView from './pages/MapView';

function App() {
  const [view, setView] = useState('camera');
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
    <div className="relative h-screen w-screen overflow-hidden bg-[#979797]">
      <LayoutGroup>
        <AnimatePresence>
          {view === "camera" ? (
            <motion.div
              key="camera"
              layoutId="shared-screen"
              className="absolute inset-0"
              transition={{
                layout: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <CameraView />
            </motion.div>
          ) : (
            <motion.div
              key="map"
              layoutId="shared-screen"
              className="absolute inset-0"
              transition={{
                layout: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <MapView />
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>

      <Sidebar />
      <TopStatusBar />
      <MissionCard />

      {/* Quick Goal - Responsive */}
      <div className={`
        absolute z-20
        ${isMobile ? 'top-[91px] left-[15px]' : 'top-[65px] left-[90px]'}
      `}>
        <motion.div 
          className="rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer group"
          style={{
            background: '#ffffffd9',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            height: isMobile ? '32px' : '40px',
          }}
          whileHover={{ scale: 1.02 }}
        >
          <span className={`text-[#081a33] font-semibold tracking-wider ${isMobile ? 'text-[8px]' : 'text-xs'}`}>
            QUICK GOAL
          </span>
          <div className={`rounded-full bg-[#081a33] flex items-center justify-center shadow-md ${isMobile ? 'w-5 h-5' : 'w-7 h-7'}`}>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`text-white ${isMobile ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </div>
        </motion.div>
      </div>

      {/* Right Side Controls - Responsive */}
      <div className={`
        absolute z-30 flex flex-col gap-3 items-end
        ${isMobile ? 'top-[50px] right-2' : 'top-4 right-4'}
      `}>
        <ModeSwitcher />

        {/* Initiate Button - Responsive */}
        <motion.div
          className="rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer group"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            height: isMobile ? '32px' : '40px',
          }}
          whileHover={{ scale: 1.03 }}
        >
          <span className={`text-[#081a33] font-semibold tracking-wider ${isMobile ? 'text-[8px]' : 'text-xs'}`}>
            INITIATE
          </span>

          <div className={`rounded-full bg-[#081a33] flex items-center justify-center shadow-md ${isMobile ? 'w-5 h-5' : 'w-7 h-7'}`}>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className={`text-white ${isMobile ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              whileHover={{ x: 4 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </div>
        </motion.div>
      </div>

      <EmergencyButton />
      <Joystick />
      
      {/* MiniPreview with actual view content */}
      <MiniPreview view={view} setView={setView}>
        {view === "camera" ? (
          <MapView isPreview={true} />
        ) : (
          <CameraView isPreview={true} />
        )}
      </MiniPreview>
      
      <ZoomControls />
    </div>
  );
}

export default App;