// src/pages/CameraView.jsx
import React, { useState, useEffect } from "react";

function CameraView({ isPreview = false }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If preview mode, render simplified version without labels
  if (isPreview) {
    return (
      <div className="w-full h-full overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/assets/videos/warehouse.mp4"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        src="/assets/videos/warehouse.mp4"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent, transparent 2px, rgba(103, 99, 99, 0.02) 3px)",
        }}
      />

      {/* Corner brackets - Responsive */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`
          absolute border-l-2 border-t-2 border-[#4ade80]/40
          ${isMobile ? 'top-10 left-10 w-8 h-8' : 'top-20 left-20 w-16 h-16'}
        `}></div>
        <div className={`
          absolute border-r-2 border-t-2 border-[#4ade80]/40
          ${isMobile ? 'top-10 right-10 w-8 h-8' : 'top-20 right-20 w-16 h-16'}
        `}></div>
        <div className={`
          absolute border-l-2 border-b-2 border-[#4ade80]/40
          ${isMobile ? 'bottom-10 left-10 w-8 h-8' : 'bottom-20 left-20 w-16 h-16'}
        `}></div>
        <div className={`
          absolute border-r-2 border-b-2 border-[#4ade80]/40
          ${isMobile ? 'bottom-10 right-10 w-8 h-8' : 'bottom-20 right-20 w-16 h-16'}
        `}></div>
      </div>

      {/* Camera label - Responsive */}
      <div className={`absolute left-1/2 -translate-x-1/2 z-10 ${isMobile ? 'top-[94px]' : 'top-[70px]'}`}>
        <div
          className={`
            px-4 py-1.5 rounded-xl text-white font-semibold
            ${isMobile ? 'text-[10px] px-3 py-1' : 'text-sm px-6 py-2'}
          `}
          style={{
            background: "#000000",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {isMobile ? 'CAMERA' : 'CAMERA VIEW'}
        </div>
      </div>

      {/* Status indicator - Mobile only */}
      {isMobile && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse shadow-[0_0_8px_#4ade80]"></div>
          <span className="text-[8px] text-white/40 font-mono tracking-wider">LIVE</span>
        </div>
      )}
    </div>
  );
}

export default CameraView;