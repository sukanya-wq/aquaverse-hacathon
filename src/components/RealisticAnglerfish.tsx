/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface RealisticAnglerfishProps {
  glowIntensity?: number; // 0 to 100
  isLuminescent?: boolean;
  sonarActive?: boolean;
  sizeClass?: string; // e.g. "w-48 h-48"
}

export default function RealisticAnglerfish({
  glowIntensity = 80,
  isLuminescent = true,
  sonarActive = false,
  sizeClass = "w-full h-full"
}: RealisticAnglerfishProps) {
  const baseOpacity = isLuminescent ? (glowIntensity / 100) : 0.05;
  const dynamicGlow = baseOpacity * 0.85;

  // Lure color changes when active or sonar is pinging
  const lureColor = sonarActive ? '#22d3ee' : '#bef264'; // Neon cyan on sonar, Lime/Yellow default
  const lureGlowColor = sonarActive ? 'rgba(34,211,238,0.85)' : 'rgba(234,179,8,0.7)';

  return (
    <div className={`relative flex items-center justify-center overflow-hidden pointer-events-none select-none ${sizeClass}`}>
      
      {/* Bioluminescent lure halo */}
      {isLuminescent && (
        <div 
          className="absolute transition-all duration-1000 blur-[35px] mix-blend-screen opacity-40 animate-pulse"
          style={{
            top: '20%',
            left: '52%',
            width: '120px',
            height: '120px',
            background: `radial-gradient(circle, ${lureGlowColor} 0%, transparent 75%)`,
          }}
        />
      )}

      <svg 
        viewBox="0 0 240 200" 
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(15,23,42,0.6)]"
      >
        <defs>
          {/* Intense Glow Filter for the Esca/Lure bulb */}
          <filter id="lure-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Skin and body gradient - dark abyssal texture */}
          <linearGradient id="angler-body-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e1e2f" />    {/* Abyssal Slate */}
            <stop offset="40%" stopColor="#0f111a" />   {/* Near Pitch Black */}
            <stop offset="85%" stopColor="#02040a" />   {/* Deep Space Black */}
            <stop offset="100%" stopColor="#1e152a" />  {/* Dark Purple highlight */}
          </linearGradient>

          {/* Spine fins / frills */}
          <linearGradient id="angler-fin-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#312e81" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0.2" />
          </linearGradient>

          {/* Bioluminescent side pores */}
          <linearGradient id="lateral-line-glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8 * dynamicGlow} />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Group to sway the entire anglerfish gently */}
        <g className="origin-[120px_100px] animate-angler-idle">
          
          {/* ================= DORSAL FIN / SPINE FRILLS (Back Layer) ================= */}
          <path 
            className="animate-angler-fin-flutter"
            d="M90,72 C110,40 140,55 160,78 C145,85 110,85 90,72 Z" 
            fill="url(#angler-fin-grad)" 
            stroke="#1e293b"
            strokeWidth="0.5"
          />

          {/* ================= LOWER VENTRAL FIN ================= */}
          <path 
            className="animate-angler-fin-flutter"
            d="M120,122 C135,142 155,142 165,128 C150,125 135,124 120,122 Z" 
            fill="url(#angler-fin-grad)" 
            stroke="#1e293b"
            strokeWidth="0.5"
          />

          {/* ================= TAIL FIN (Back Swishing) ================= */}
          <g className="origin-[185px_100px] animate-angler-tail-swish">
            <path 
              d="M180,100 L220,70 C215,90 225,100 215,100 C225,100 215,110 220,130 Z" 
              fill="url(#angler-fin-grad)"
              stroke="#1e293b"
              strokeWidth="0.5"
              opacity="0.85"
            />
          </g>

          {/* ================= THE GLOW LURE / ILLICIUM (Antenna) ================= */}
          <g className="origin-[105px_78px] animate-angler-lure-sway">
            {/* Rigid and curvy stalk */}
            <path 
              d="M105,78 C90,45 105,25 125,22" 
              fill="none" 
              stroke="#0f111a" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
            {/* Shiny cartilage sheath */}
            <path 
              d="M105,78 C90,45 105,25 125,22" 
              fill="none" 
              stroke="#4b5563" 
              strokeWidth="0.8" 
              strokeLinecap="round" 
              opacity="0.5"
            />
            {/* The Esca (Glowing bulb at the end) */}
            <circle 
              cx="125" 
              cy="22" 
              r="6.5" 
              fill={lureColor} 
              filter="url(#lure-glow)" 
              opacity={0.9}
            />
            <circle 
              cx="125" 
              cy="22" 
              r="2.5" 
              fill="#ffffff" 
              opacity="0.9"
            />
          </g>

          {/* ================= MAIN ANGLERFISH BODY ================= */}
          {/* Bulky, aggressive predatory outline */}
          <path 
            d="M50,110 C50,75 100,66 180,100 C155,130 90,132 50,110 Z" 
            fill="url(#angler-body-grad)" 
            stroke="#1e293b"
            strokeWidth="0.8"
          />

          {/* ================= THE HUGE JAW & TEETH ================= */}
          {/* Upper Lip Margin */}
          <path d="M50,104 C65,103 84,107 94,114" fill="none" stroke="#1e293b" strokeWidth="2" />
          
          {/* Lower Jaw (Protruding and heavy) */}
          <path d="M46,112 C58,118 80,123 94,114" fill="none" stroke="#02040a" strokeWidth="2.5" />

          {/* Realistic Translucent Needle Teeth (Upper) */}
          <polygon points="56,104 54,111 58,104" fill="#e2e8f0" opacity="0.9" />
          <polygon points="64,104 60,113 67,104" fill="#ffffff" opacity="0.95" />
          <polygon points="72,105 69,112 75,105" fill="#e2e8f0" opacity="0.8" />
          <polygon points="80,107 77,115 83,107" fill="#ffffff" opacity="0.9" />
          <polygon points="88,110 86,114 90,110" fill="#e2e8f0" opacity="0.75" />

          {/* Realistic Translucent Needle Teeth (Lower - long and scary!) */}
          <polygon points="52,114 49,103 55,114" fill="#ffffff" opacity="0.95" />
          <polygon points="60,116 57,102 63,116" fill="#ffffff" opacity="0.9" />
          <polygon points="68,118 66,105 72,118" fill="#e2e8f0" opacity="0.85" />
          <polygon points="76,120 73,108 80,120" fill="#ffffff" opacity="0.9" />
          <polygon points="84,118 82,109 88,118" fill="#e2e8f0" opacity="0.8" />

          {/* ================= BIOLUMINESCENT LATERAL PORE DOTS ================= */}
          {/* Glowing blue spots mimicking abyssal species communication signals */}
          <path 
            d="M95,95 C115,105 145,108 170,105" 
            fill="none" 
            stroke="url(#lateral-line-glow)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeDasharray="1 6"
          />
          {isLuminescent && (
            <path 
              d="M95,95 C115,105 145,108 170,105" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
              strokeDasharray="1 6"
              opacity={dynamicGlow * 0.9}
            />
          )}

          {/* Additional side glowing pores */}
          {isLuminescent && (
            <g opacity={dynamicGlow}>
              <circle cx="100" cy="85" r="1.5" fill="#22d3ee" className="animate-pulse" />
              <circle cx="115" cy="88" r="1.2" fill="#22d3ee" />
              <circle cx="130" cy="92" r="1.5" fill="#22d3ee" className="animate-pulse" />
              <circle cx="145" cy="95" r="1" fill="#22d3ee" />
            </g>
          )}

          {/* ================= SMALL REFLECTIVE CAT EYE ================= */}
          {/* Highly adapted flat eye with large white lens structure */}
          <circle cx="90" cy="90" r="4.5" fill="#02040a" stroke="#1e293b" strokeWidth="0.8" />
          <circle cx="89" cy="89" r="1.8" fill="#ffffff" />
          <circle cx="91" cy="91" r="0.8" fill="#22d3ee" opacity="0.75" />

          {/* ================= PECTORAL FIN (Fanning) ================= */}
          <path 
            className="origin-[115px_110px] animate-angler-pectoral"
            d="M115,110 C125,118 130,118 128,112 C125,108 120,106 115,110 Z" 
            fill="url(#angler-fin-grad)" 
            stroke="#1e293b"
            strokeWidth="0.5"
          />

          {/* Gills slits */}
          <path d="M104,104 C101,108 101,114 104,118" stroke="#02040a" strokeWidth="1" opacity="0.8" />

        </g>
      </svg>
    </div>
  );
}
