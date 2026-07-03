/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface RealisticClownfishProps {
  glowIntensity?: number; // 0 to 100
  isLuminescent?: boolean;
  sonarActive?: boolean;
  sizeClass?: string; // e.g. "w-48 h-48"
}

export default function RealisticClownfish({
  glowIntensity = 80,
  isLuminescent = false,
  sonarActive = false,
  sizeClass = "w-full h-full"
}: RealisticClownfishProps) {
  // Clownfish are not bioluminescent naturally, but under deep sonar scan they can have a neon/fluorescent coral glow!
  const glowOpacity = isLuminescent ? (glowIntensity / 100) * 0.4 : 0;
  const bodyColor = sonarActive ? '#f97316' : '#ea580c'; // Vibrant orange

  return (
    <div className={`relative flex items-center justify-center overflow-hidden pointer-events-none select-none ${sizeClass}`}>
      
      {/* Dynamic scan/glow circle backdrop */}
      {isLuminescent && (
        <div 
          className="absolute transition-all duration-1000 blur-[25px] mix-blend-screen opacity-20 animate-pulse"
          style={{
            width: '120px',
            height: '120px',
            background: `radial-gradient(circle, rgba(249,115,22,0.6) 0%, transparent 75%)`,
          }}
        />
      )}

      <svg 
        viewBox="0 0 220 160" 
        className="w-full h-full drop-shadow-[0_6px_12px_rgba(234,88,12,0.35)] animate-clownfish-idle"
      >
        <defs>
          {/* Neon Coral Glow Filter */}
          <filter id="orange-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Body gradient - vibrant orange to deep reddish coral */}
          <linearGradient id="clown-body-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff7e33" />
            <stop offset="45%" stopColor={bodyColor} />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>

          {/* Fin stripe gradient */}
          <linearGradient id="fin-stripe-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff7e33" />
            <stop offset="70%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        <g className="origin-[110px_80px]">
          
          {/* ================= DORSAL FIN ================= */}
          <path 
            className="animate-clownfish-fin-flutter"
            d="M75,52 C90,24 135,22 150,54 L75,52 Z" 
            fill="url(#clown-body-grad)" 
            stroke="#111827"
            strokeWidth="1.5"
          />
          {/* Dorsal Black edge */}
          <path 
            className="animate-clownfish-fin-flutter"
            d="M78,40 Q112,24 146,42" 
            fill="none" 
            stroke="#111827" 
            strokeWidth="3.5" 
          />
          <path 
            className="animate-clownfish-fin-flutter"
            d="M78,40 Q112,24 146,42" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1.2" 
          />

          {/* ================= VENTRAL FIN ================= */}
          <path 
            className="animate-clownfish-fin-flutter"
            d="M95,102 C110,128 135,124 142,104 Z" 
            fill="url(#clown-body-grad)" 
            stroke="#111827"
            strokeWidth="1.5"
          />
          <path 
            className="animate-clownfish-fin-flutter"
            d="M102,118 Q122,126 138,110" 
            fill="none" 
            stroke="#111827" 
            strokeWidth="3" 
          />

          {/* ================= TAIL FIN (Swishing) ================= */}
          <g className="origin-[162px_80px] animate-clownfish-tail-swish">
            {/* Tail body */}
            <path 
              d="M158,80 L195,44 C190,64 198,80 188,80 C198,80 190,96 195,116 Z" 
              fill="url(#clown-body-grad)"
              stroke="#111827"
              strokeWidth="1.5"
            />
            {/* Black-white stripes on tail */}
            <path d="M174,58 Q182,80 174,102" stroke="#111827" strokeWidth="4" fill="none" />
            <path d="M174,58 Q182,80 174,102" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          </g>

          {/* ================= CLOWNFISH BODY ================= */}
          <path 
            d="M36,80 C55,48 115,44 162,80 C115,116 55,112 36,80 Z" 
            fill="url(#clown-body-grad)" 
            stroke="#111827"
            strokeWidth="1.5"
          />

          {/* ================= WHITE STRIPES (Vibrant and detailed) ================= */}
          {/* Head Stripe */}
          <path 
            d="M58,58 Q66,80 58,102" 
            fill="none" 
            stroke="#111827" 
            strokeWidth="12" 
            strokeLinecap="round" 
          />
          <path 
            d="M58,58 Q66,80 58,102" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="8" 
            strokeLinecap="round" 
          />

          {/* Middle Stripe (with a beautiful forward bulgy shape typical of clownfish) */}
          <path 
            d="M100,50 C114,54 114,80 100,110" 
            fill="none" 
            stroke="#111827" 
            strokeWidth="15" 
            strokeLinecap="round" 
          />
          <path 
            d="M100,50 C114,54 114,80 100,110" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="11" 
            strokeLinecap="round" 
          />

          {/* Rear Stripe near tail */}
          <path 
            d="M146,62 Q150,80 146,98" 
            fill="none" 
            stroke="#111827" 
            strokeWidth="8" 
            strokeLinecap="round" 
          />
          <path 
            d="M146,62 Q150,80 146,98" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="5" 
            strokeLinecap="round" 
          />

          {/* ================= CUTE BIG CLOWNFISH EYE ================= */}
          <circle cx="50" cy="74" r="8" fill="#111827" />
          <circle cx="50" cy="74" r="6.2" fill="#ff9f43" />
          <circle cx="51" cy="73" r="3.5" fill="#111827" />
          <circle cx="49" cy="71" r="1.5" fill="#ffffff" />

          {/* ================= PECTORAL FIN ================= */}
          <path 
            className="origin-[75px_86px] animate-clownfish-pectoral"
            d="M75,86 Q96,96 102,83 Q82,78 75,86" 
            fill="url(#clown-body-grad)" 
            stroke="#111827"
            strokeWidth="1.2"
          />
          {/* Black tip on Pectoral */}
          <path 
            className="origin-[75px_86px] animate-clownfish-pectoral"
            d="M92,91 Q99,88 101,84" 
            fill="none" 
            stroke="#111827" 
            strokeWidth="3.2" 
          />

          {/* Neon Coral fluorescent sheen */}
          {isLuminescent && (
            <path 
              d="M65,68 C90,62 110,65 130,72" 
              fill="none" 
              stroke="#ff9f43" 
              strokeWidth="2" 
              opacity={glowOpacity}
              filter="url(#orange-glow)"
            />
          )}

          {/* Cute smiley mouth */}
          <path d="M38,82 Q42,86 46,81" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
