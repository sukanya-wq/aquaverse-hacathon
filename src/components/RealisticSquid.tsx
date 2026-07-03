/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface RealisticSquidProps {
  glowIntensity?: number; // 0 to 100
  isLuminescent?: boolean;
  sonarActive?: boolean;
  sizeClass?: string; // e.g. "w-48 h-48"
}

export default function RealisticSquid({
  glowIntensity = 80,
  isLuminescent = true,
  sonarActive = false,
  sizeClass = "w-full h-full"
}: RealisticSquidProps) {
  const baseOpacity = isLuminescent ? (glowIntensity / 100) : 0.05;
  const dynamicGlow = baseOpacity * 0.8;

  const mainColor = sonarActive ? '#a855f7' : '#c084fc'; // Neon violet/purple
  const glowColor = sonarActive ? 'rgba(168,85,247,0.85)' : 'rgba(192,132,252,0.6)';

  return (
    <div className={`relative flex items-center justify-center overflow-hidden pointer-events-none select-none ${sizeClass}`}>
      
      {/* Intense chromatophore pulse glow backdrop */}
      {isLuminescent && (
        <div 
          className="absolute transition-all duration-1000 blur-[30px] mix-blend-screen opacity-30 animate-pulse"
          style={{
            top: '25%',
            width: '130px',
            height: '130px',
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 75%)`,
          }}
        />
      )}

      <svg 
        viewBox="0 0 200 240" 
        className="w-full h-full drop-shadow-[0_6px_12px_rgba(168,85,247,0.35)]"
      >
        <defs>
          <filter id="squid-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Chromatophore purple-blue shimmering skin gradient */}
          <linearGradient id="squid-body-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b0764" />    {/* Intense dark purple */}
            <stop offset="45%" stopColor={mainColor} />  {/* Vibrant purple */}
            <stop offset="100%" stopColor="#1e1b4b" />  {/* Metallic deep indigo */}
          </linearGradient>

          {/* Translucent tentacle web gradient */}
          <linearGradient id="tentacle-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Group with contract-and-glide jet propulsion animation */}
        <g className="origin-[100px_60px] animate-squid-jet">
          
          {/* ================= STUNNING TOP FINS ================= */}
          <path 
            className="animate-squid-fin-ripple"
            d="M100,20 L60,55 L100,50 L140,55 Z" 
            fill="url(#squid-body-grad)" 
            stroke="#581c87"
            strokeWidth="0.8"
          />

          {/* ================= SQUID HEAD & EYES ================= */}
          {/* Hydrodynamic mantle/body */}
          <path 
            d="M100,30 C125,50 125,100 115,120 L85,120 C75,100 75,50 100,30 Z" 
            fill="url(#squid-body-grad)" 
            stroke="#581c87"
            strokeWidth="0.8"
          />

          {/* Two huge expressive deep sea eyes */}
          <circle cx="82" cy="112" r="7.5" fill="#0f172a" stroke="#c084fc" strokeWidth="1" />
          <circle cx="82" cy="112" r="5" fill="#0284c7" />
          <circle cx="81" cy="111" r="1.5" fill="#ffffff" />

          <circle cx="118" cy="112" r="7.5" fill="#0f172a" stroke="#c084fc" strokeWidth="1" />
          <circle cx="118" cy="112" r="5" fill="#0284c7" />
          <circle cx="119" cy="111" r="1.5" fill="#ffffff" />

          {/* ================= WAVING FEEDING TENTACLES ================= */}
          <g className="opacity-95">
            {/* Tentacle 1 */}
            <path 
              className="origin-[88px_120px] animate-squid-tentacle-1"
              d="M88,120 Q84,155 86,195 Q88,205 82,215" 
              fill="none" 
              stroke="url(#tentacle-grad)" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
            />
            {/* Tentacle 2 */}
            <path 
              className="origin-[94px_120px] animate-squid-tentacle-2"
              d="M94,120 Q102,160 92,200 Q86,215 95,225" 
              fill="none" 
              stroke="url(#tentacle-grad)" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            {/* Tentacle 3 */}
            <path 
              className="origin-[106px_120px] animate-squid-tentacle-3"
              d="M106,120 Q98,160 108,200 Q114,215 105,225" 
              fill="none" 
              stroke="url(#tentacle-grad)" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            {/* Tentacle 4 */}
            <path 
              className="origin-[112px_120px] animate-squid-tentacle-4"
              d="M112,120 Q116,155 114,195 Q112,205 118,215" 
              fill="none" 
              stroke="url(#tentacle-grad)" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
            />
          </g>

          {/* ================= BIOLUMINESCENT CHROMATOPHORES ================= */}
          {/* Grid of tiny bioluminescent spots that pulse on the mantle */}
          <g opacity={0.8} className="animate-pulse">
            <circle cx="100" cy="55" r="2" fill="#e9d5ff" />
            <circle cx="92" cy="68" r="1.5" fill="#c084fc" />
            <circle cx="108" cy="68" r="1.5" fill="#c084fc" />
            <circle cx="100" cy="80" r="2.2" fill="#e9d5ff" className="animate-pulse" />
            <circle cx="88" cy="86" r="1.2" fill="#c084fc" />
            <circle cx="112" cy="86" r="1.2" fill="#c084fc" />
            <circle cx="100" cy="98" r="2.5" fill="#e9d5ff" className="animate-pulse" />
          </g>

          {isLuminescent && (
            <g opacity={dynamicGlow} filter="url(#squid-glow)">
              <ellipse cx="100" cy="42" rx="4" ry="1" fill="#e9d5ff" />
              <ellipse cx="100" cy="60" rx="6" ry="1.2" fill="#e9d5ff" />
              <ellipse cx="100" cy="74" rx="8" ry="1.5" fill="#e9d5ff" />
            </g>
          )}

        </g>
      </svg>
    </div>
  );
}
