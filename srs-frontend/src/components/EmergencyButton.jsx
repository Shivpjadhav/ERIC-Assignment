import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function EmergencyButton() {
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
      className={`
        absolute z-40 flex flex-col items-center
        ${isMobile ? 'bottom-20 right-2' : 'right-8 top-1/2 -translate-y-1/2'}
      `}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 20px #facc15",
            "0 0 50px #facc15",
            "0 0 20px #facc15",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className={`
          relative rounded-full bg-[#facc15] flex items-center justify-center cursor-pointer
          ${isMobile ? 'w-20 h-20' : 'w-28 h-28'}
        `}
      >
        {/* Circular Text */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={isMobile ? "0 0 80 80" : "0 0 120 120"}
        >
          <defs>
            <path
              id="topArc"
              d={isMobile ? "M 10 40 A 28 28 0 0 1 70 40" : "M 15 60 A 42 42 0 0 1 105 60"}
            />
            <path
              id="bottomArc"
              d={isMobile ? "M 70 40 A 28 28 0 0 1 10 40" : "M 105 60 A 42 42 0 0 1 15 60"}
            />
          </defs>

          <text
            fill="#1e293b"
            fontSize={isMobile ? "7" : "10"}
            fontWeight="900"
            letterSpacing={isMobile ? "2" : "3"}
          >
            <textPath
              href="#topArc"
              startOffset="50%"
              textAnchor="middle"
            >
              EMERGENCY
            </textPath>
          </text>

          <text
            fill="#1e293b"
            fontSize={isMobile ? "7" : "10"}
            fontWeight="900"
            letterSpacing={isMobile ? "2" : "3"}
          >
            <textPath
              href="#bottomArc"
              startOffset="50%"
              textAnchor="middle"
            >
              STOP
            </textPath>
          </text>
        </svg>

        {/* Red Center */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            rounded-full bg-[#dc2626] flex items-center justify-center shadow-inner border-2 border-red-700
            ${isMobile ? 'w-[52px] h-[52px]' : 'w-[72px] h-[72px]'}
          `}
        >
          {/* Static Bold Arrows */}
          <svg
            width={isMobile ? "38" : "55"}
            height={isMobile ? "42" : "60"}
            viewBox="0 0 100 100"
            fill="none"
          >
            <g
              stroke="white"
              strokeWidth={isMobile ? "9" : "11"}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Arrow 1 */}
              <path d="M53 15 A22 32 0 0 1 80 40" />
              <path d="M85 40 L87 26" />
              <path d="M80 40 L66 41" />

              {/* Arrow 2 */}
              <g transform="rotate(120 50 50)">
                <path d="M53 15 A22 32 0 0 1 80 40" />
                <path d="M80 40 L84 20" />
                <path d="M80 40 L66 41" />
              </g>

              {/* Arrow 3 */}
              <g transform="rotate(240 50 50)">
                <path d="M53 15 A22 32 0 0 1 80 40" />
                <path d="M80 40 L87 22" />
                <path d="M80 40 L66 41" />
              </g>
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default EmergencyButton;