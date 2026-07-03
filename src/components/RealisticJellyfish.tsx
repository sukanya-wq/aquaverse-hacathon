/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface RealisticJellyfishProps {
  glowIntensity?: number; // 0 to 100
  isLuminescent?: boolean;
  sonarActive?: boolean;
  sizeClass?: string; // e.g. "w-64 h-80"
}

export default function RealisticJellyfish({
  glowIntensity = 85,
  isLuminescent = true,
  sonarActive = false,
  sizeClass = "w-full h-full"
}: RealisticJellyfishProps) {
  const baseOpacity = isLuminescent ? (glowIntensity / 100) : 0.05;
  // Shimmer modifies intensity dynamically
  const dynamicGlow = baseOpacity * 0.95;

  // Color values based on sonar or general bioluminescence
  const glowColorMain = sonarActive ? 'rgba(34, 211, 238, 0.85)' : 'rgba(168, 85, 247, 0.8)'; // Cyan on sonar, Purple default
  const glowColorInner = sonarActive ? 'rgba(6, 182, 212, 0.95)' : 'rgba(236, 72, 153, 0.85)'; // Teal on sonar, Pink default
  const glowColorAccent = 'rgba(129, 140, 248, 0.7)'; // Indigo accent

  return (
    <div className={`relative flex items-center justify-center overflow-hidden pointer-events-none select-none ${sizeClass}`}>
      
      {/* Bioluminescent radial halo */}
      <div 
        className="absolute w-4/5 h-4/5 rounded-full transition-all duration-1000 blur-[40px] mix-blend-color-dodge opacity-45 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${sonarActive ? 'rgba(34,211,238,0.45)' : 'rgba(147,51,234,0.3)'} 0%, transparent 70%)`,
        }}
      />

      <svg 
        viewBox="0 0 200 300" 
        className="w-full h-full drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]"
      >
        <defs>
          {/* Glowing Filters */}
          <filter id="jelly-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="intense-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="3" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Realistic Translucent Gradients */}
          <linearGradient id="jelly-bell-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sonarActive ? '#22d3ee' : '#a855f7'} stopOpacity={0.85 * dynamicGlow} />
            <stop offset="60%" stopColor={sonarActive ? '#0891b2' : '#7c3aed'} stopOpacity={0.6 * dynamicGlow} />
            <stop offset="100%" stopColor={sonarActive ? '#0e7490' : '#4c1d95'} stopOpacity={0.2 * dynamicGlow} />
          </linearGradient>

          <linearGradient id="jelly-inner-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sonarActive ? '#e0f2fe' : '#fbcfe8'} stopOpacity={0.9 * dynamicGlow} />
            <stop offset="50%" stopColor={sonarActive ? '#06b6d4' : '#db2777'} stopOpacity={0.85 * dynamicGlow} />
            <stop offset="100%" stopColor="#311042" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="tentacle-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sonarActive ? '#22d3ee' : '#ec4899'} stopOpacity={0.8 * dynamicGlow} />
            <stop offset="30%" stopColor={sonarActive ? '#06b6d4' : '#818cf8'} stopOpacity={0.6 * dynamicGlow} />
            <stop offset="70%" stopColor={sonarActive ? '#0891b2' : '#6366f1'} stopOpacity={0.3 * dynamicGlow} />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Group containing the entire jellyfish to apply core contraction pulse animation */}
        <g 
          className="origin-[100px_45px] animate-jelly-pulse"
          style={{
            transformBox: 'fill-box'
          }}
        >
          {/* ================= TENTACLES (Back Layer) ================= */}
          <g className="opacity-75">
            {/* Left fine tentacle */}
            <path 
              className="animate-sway-t1"
              d="M75,70 Q60,130 80,180 T70,260" 
              fill="none" 
              stroke="url(#tentacle-grad)" 
              strokeWidth="1.2" 
            />
            {/* Right fine tentacle */}
            <path 
              className="animate-sway-t2"
              d="M125,70 Q140,130 120,180 T130,260" 
              fill="none" 
              stroke="url(#tentacle-grad)" 
              strokeWidth="1.2"
            />
            {/* Center fine tentacle */}
            <path 
              className="animate-sway-t3"
              d="M100,75 Q90,140 110,200 T95,280" 
              fill="none" 
              stroke="url(#tentacle-grad)" 
              strokeWidth="1.5"
            />
          </g>

          {/* ================= ORAL ARMS (Middle Layer, frilly ribbon-like) ================= */}
          <g className="filter-jelly-glow opacity-90">
            {/* Left ribbon */}
            <path 
              className="animate-wave-r1"
              d="M85,68 Q75,110 90,150 T80,230" 
              fill="none" 
              stroke="url(#jelly-inner-grad)" 
              strokeWidth="3.5" 
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Right ribbon */}
            <path 
              className="animate-wave-r2"
              d="M115,68 Q125,110 110,150 T120,230" 
              fill="none" 
              stroke="url(#jelly-inner-grad)" 
              strokeWidth="3.5" 
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Main Center frilly arm (complex double-stroke for thick translucent look) */}
            <path 
              className="animate-wave-r3"
              d="M100,70 Q110,120 95,170 T105,250" 
              fill="none" 
              stroke="url(#jelly-inner-grad)" 
              strokeWidth="5" 
              strokeLinecap="round"
              opacity="0.9"
            />
            <path 
              className="animate-wave-r3"
              d="M100,70 Q110,120 95,170 T105,250" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              opacity={0.4 * dynamicGlow}
            />
          </g>

          {/* ================= INNER ORGANS / GONADS (Glowing core) ================= */}
          <g filter="url(#jelly-glow)">
            {/* Horseshoe-shaped bioluminescent organs inside the bell */}
            <path 
              d="M82,46 C80,30 120,30 118,46 C115,54 85,54 82,46 Z" 
              fill="none" 
              stroke="url(#jelly-inner-grad)" 
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path 
              d="M90,48 C92,38 108,38 110,48" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={0.6 * dynamicGlow}
            />
          </g>

          {/* ================= THE BELL / CAP (Foreground Layer) ================= */}
          <g filter="url(#intense-glow)">
            {/* Translucent main outer umbrella dome */}
            <path 
              d="M50,55 C50,22 150,22 150,55 C150,68 135,70 100,68 C65,70 50,68 50,55 Z" 
              fill="url(#jelly-bell-grad)" 
            />

            {/* Glowing rim accent highlighting the bell edge */}
            <path 
              d="M50,55 C50,68 135,70 100,68 C65,70 50,68 50,55" 
              fill="none" 
              stroke={sonarActive ? '#e0f2fe' : '#f3e8ff'} 
              strokeWidth="1.5"
              opacity={0.7 * dynamicGlow}
            />

            {/* Bright highlight ridge on top of bell representing glass-like refraction */}
            <path 
              d="M60,42 C80,26 120,26 140,42" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="2" 
              strokeLinecap="round"
              opacity={0.55 * dynamicGlow}
            />

            {/* Delicate radial ridges/lines on the bell surface */}
            <path d="M100,28 L100,68" stroke="url(#jelly-bell-grad)" strokeWidth="1" opacity="0.4" />
            <path d="M80,31 C85,45 88,55 85,68" stroke="url(#jelly-bell-grad)" strokeWidth="1" opacity="0.3" />
            <path d="M120,31 C115,45 112,55 115,68" stroke="url(#jelly-bell-grad)" strokeWidth="1" opacity="0.3" />
          </g>
        </g>
      </svg>
    </div>
  );
}
