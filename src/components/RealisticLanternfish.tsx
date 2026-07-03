/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface RealisticLanternfishProps {
  glowIntensity?: number; // 0 to 100
  isLuminescent?: boolean;
  sonarActive?: boolean;
  sizeClass?: string; // e.g. "w-48 h-48"
}

export default function RealisticLanternfish({
  glowIntensity = 80,
  isLuminescent = true,
  sonarActive = false,
  sizeClass = "w-full h-full"
}: RealisticLanternfishProps) {
  const baseOpacity = isLuminescent ? (glowIntensity / 100) : 0.05;
  const dynamicGlow = baseOpacity * 0.85;

  // Glow color changes depending on sonar pings
  const photophoreColor = sonarActive ? '#22d3ee' : '#38bdf8'; // Cyan or Sky-blue
  const photophoreGlow = sonarActive ? 'rgba(34, 211, 238, 0.9)' : 'rgba(56, 189, 248, 0.7)';

  return (
    <div className={`relative flex items-center justify-center overflow-hidden pointer-events-none select-none ${sizeClass}`}>
      
      {/* Soft bioluminescent side wash */}
      {isLuminescent && (
        <div 
          className="absolute transition-all duration-1000 blur-[30px] mix-blend-screen opacity-35 animate-pulse"
          style={{
            width: '140px',
            height: '100px',
            background: `radial-gradient(ellipse, ${photophoreGlow} 0%, transparent 80%)`,
          }}
        />
      )}

      <svg 
        viewBox="0 0 220 160" 
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(2,132,199,0.4)] animate-lantern-idle"
      >
        <defs>
          {/* Glowing Filters */}
          <filter id="photophore-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Sleek, deep-sea silver/blue metallic gradient for skin */}
          <linearGradient id="lantern-body-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#082f49" />    {/* Deep Sky Blue */}
            <stop offset="35%" stopColor="#1e293b" />   {/* Metallic Slate */}
            <stop offset="70%" stopColor="#0284c7" />   {/* Silver Blue */}
            <stop offset="100%" stopColor="#0f172a" />  {/* Dark Slate tail */}
          </linearGradient>

          {/* Translucent fins gradient */}
          <linearGradient id="lantern-fin-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e1e2f" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Group with continuous procedural swimming posture */}
        <g className="origin-[110px_80px]">
          
          {/* ================= DORSAL FIN (Back layer) ================= */}
          <path 
            className="animate-lantern-fin-flutter"
            d="M90,56 C95,30 120,25 135,38 C125,48 110,51 90,56 Z" 
            fill="url(#lantern-fin-grad)" 
            stroke="#1e293b"
            strokeWidth="0.5"
          />

          {/* ================= VENTRAL FIN ================= */}
          <path 
            className="animate-lantern-fin-flutter"
            d="M100,102 C115,122 130,120 140,108 C125,106 112,104 100,102 Z" 
            fill="url(#lantern-fin-grad)" 
            stroke="#1e293b"
            strokeWidth="0.5"
          />

          {/* ================= TAIL SWISHING ================= */}
          <g className="origin-[162px_80px] animate-lantern-tail-swish">
            <path 
              d="M158,80 L200,48 C195,68 205,80 195,80 C205,80 195,92 200,112 Z" 
              fill="url(#lantern-fin-grad)"
              stroke="#0369a1"
              strokeWidth="0.5"
              opacity="0.9"
            />
          </g>

          {/* ================= MAIN HYDRODYNAMIC BODY ================= */}
          <path 
            d="M32,80 C50,54 110,50 160,80 C110,110 50,106 32,80 Z" 
            fill="url(#lantern-body-grad)" 
            stroke="#0284c7"
            strokeWidth="0.6"
          />

          {/* ================= GLOWING PHOTOPHORES (Luminescent Organs) ================= */}
          {/* Beautiful double-deck rows of bioluminescent photophores on lower body */}
          <g filter="url(#photophore-glow)" opacity={0.9}>
            {/* Lower row */}
            <circle cx="60" cy="98" r="2.2" fill={photophoreColor} />
            <circle cx="72" cy="100" r="2.2" fill={photophoreColor} />
            <circle cx="84" cy="101" r="2.2" fill={photophoreColor} />
            <circle cx="96" cy="101" r="2.2" fill={photophoreColor} />
            <circle cx="108" cy="99" r="2.2" fill={photophoreColor} />
            <circle cx="120" cy="97" r="2.2" fill={photophoreColor} />
            <circle cx="132" cy="94" r="2.2" fill={photophoreColor} />
            <circle cx="144" cy="90" r="2.2" fill={photophoreColor} />

            {/* Upper row */}
            <circle cx="68" cy="90" r="1.8" fill={photophoreColor} />
            <circle cx="80" cy="92" r="1.8" fill={photophoreColor} />
            <circle cx="92" cy="93" r="1.8" fill={photophoreColor} />
            <circle cx="104" cy="92" r="1.8" fill={photophoreColor} />
            <circle cx="116" cy="89" r="1.8" fill={photophoreColor} />
            <circle cx="128" cy="85" r="1.8" fill={photophoreColor} />

            {/* Special glowing tail reflector patch (glandular photophore) */}
            <ellipse cx="156" cy="80" rx="3" ry="5" fill={photophoreColor} />
          </g>

          {/* White core highlights inside photophores */}
          {isLuminescent && (
            <g opacity={dynamicGlow}>
              <circle cx="60" cy="98" r="0.8" fill="#ffffff" />
              <circle cx="72" cy="100" r="0.8" fill="#ffffff" />
              <circle cx="84" cy="101" r="0.8" fill="#ffffff" />
              <circle cx="96" cy="101" r="0.8" fill="#ffffff" />
              <circle cx="108" cy="99" r="0.8" fill="#ffffff" />
              <circle cx="120" cy="97" r="0.8" fill="#ffffff" />
              <circle cx="132" cy="94" r="0.8" fill="#ffffff" />
              <circle cx="144" cy="90" r="0.8" fill="#ffffff" />
              <circle cx="68" cy="90" r="0.6" fill="#ffffff" />
              <circle cx="80" cy="92" r="0.6" fill="#ffffff" />
              <circle cx="92" cy="93" r="0.6" fill="#ffffff" />
              <circle cx="104" cy="92" r="0.6" fill="#ffffff" />
              <ellipse cx="156" cy="80" rx="1" ry="2.2" fill="#ffffff" />
            </g>
          )}

          {/* ================= HUGE ADAPTED MARINE EYE ================= */}
          {/* Deep sea golden-green reflective eye to capture stray photons */}
          <circle cx="52" cy="74" r="9.5" fill="#0f172a" stroke="#0284c7" strokeWidth="1.2" />
          <circle cx="52" cy="74" r="7.2" fill="#1e1b4b" />
          <circle cx="52" cy="74" r="7.2" fill="url(#lantern-fin-grad)" opacity="0.65" />
          <circle cx="49" cy="71" r="2.8" fill="#ffffff" />
          <circle cx="54" cy="76" r="1.2" fill="#38bdf8" opacity="0.8" />

          {/* ================= PECTORAL FIN (Fluttering) ================= */}
          <path 
            className="origin-[75px_84px] animate-lantern-pectoral"
            d="M75,84 Q95,92 102,81 Q85,78 75,84" 
            fill="url(#lantern-fin-grad)" 
            stroke="#1e293b"
            strokeWidth="0.5"
            opacity="0.95"
          />

          {/* Silver scale shimmer accent lines */}
          <path d="M72,70 C90,65 110,68 132,74" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          <path d="M78,76 C94,72 114,74 134,80" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />

          {/* Gill cover */}
          <path d="M68,68 C64,74 64,82 68,88" fill="none" stroke="#0369a1" strokeWidth="1" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}
