/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface RealisticBarracudaProps {
  glowIntensity?: number; // 0 to 100
  isLuminescent?: boolean;
  sonarActive?: boolean;
  sizeClass?: string; // e.g. "w-48 h-48"
}

export default function RealisticBarracuda({
  glowIntensity = 80,
  isLuminescent = false,
  sonarActive = false,
  sizeClass = "w-full h-full"
}: RealisticBarracudaProps) {
  const baseOpacity = isLuminescent ? (glowIntensity / 100) : 0.05;
  const bodyColor = sonarActive ? '#38bdf8' : '#64748b'; // Cyan scan or steel-blue grey

  return (
    <div className={`relative flex items-center justify-center overflow-hidden pointer-events-none select-none ${sizeClass}`}>
      
      {/* Sleek metallic shimmer shadow */}
      {isLuminescent && (
        <div 
          className="absolute transition-all duration-1000 blur-[20px] mix-blend-screen opacity-20 animate-pulse"
          style={{
            width: '150px',
            height: '70px',
            background: `radial-gradient(ellipse, rgba(56,189,248,0.5) 0%, transparent 75%)`,
          }}
        />
      )}

      <svg 
        viewBox="0 0 240 140" 
        className="w-full h-full drop-shadow-[0_4px_10px_rgba(30,41,59,0.4)] animate-barracuda-idle"
      >
        <defs>
          {/* Shimmering scales silver gradient */}
          <linearGradient id="barracuda-body-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#475569" />    {/* Steel nose */}
            <stop offset="40%" stopColor={bodyColor} />  {/* Shimmering body */}
            <stop offset="80%" stopColor="#cbd5e1" />   {/* Silver lateral band */}
            <stop offset="100%" stopColor="#334155" />  {/* Dark tail connection */}
          </linearGradient>

          {/* Fin translucent gradient */}
          <linearGradient id="barracuda-fin-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <g className="origin-[120px_70px]">
          
          {/* ================= REAR FIN (Vigorous Swishing) ================= */}
          <g className="origin-[190px_70px] animate-barracuda-tail-swish">
            <path 
              d="M185,70 L220,40 C215,60 222,70 215,70 C222,70 215,80 220,100 Z" 
              fill="url(#barracuda-fin-grad)"
              stroke="#334155"
              strokeWidth="0.8"
            />
          </g>

          {/* ================= SECONDARY FINS (Dorsal & Anal) ================= */}
          {/* Top small dorsal fin */}
          <path 
            className="animate-barracuda-fin-flutter"
            d="M140,50 L160,35 L170,52 Z" 
            fill="url(#barracuda-fin-grad)" 
            stroke="#1e293b"
            strokeWidth="0.5"
          />
          {/* Lower anal fin */}
          <path 
            className="animate-barracuda-fin-flutter"
            d="M145,86 L162,98 L170,84 Z" 
            fill="url(#barracuda-fin-grad)" 
            stroke="#1e293b"
            strokeWidth="0.5"
          />

          {/* ================= STREAMLINED PREDATORY BODY ================= */}
          {/* Extremely sleek torpode-like silhouette */}
          <path 
            d="M25,70 C55,54 130,48 190,70 C130,90 55,84 25,70 Z" 
            fill="url(#barracuda-body-grad)" 
            stroke="#334155"
            strokeWidth="0.8"
          />

          {/* Silver Lateral stripes (Tiger stripes) typical of Barracudas */}
          <g stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" opacity="0.45">
            <line x1="90" y1="58" x2="94" y2="78" />
            <line x1="105" y1="58" x2="108" y2="78" />
            <line x1="120" y1="59" x2="122" y2="79" />
            <line x1="135" y1="59" x2="137" y2="79" />
            <line x1="150" y1="60" x2="151" y2="78" />
            <line x1="165" y1="61" x2="166" y2="76" />
          </g>

          {/* ================= FEROCIOUS JAW & TEETH ================= */}
          {/* Underbite lower jaw (long and aggressive) */}
          <path d="M22,70 L48,78" fill="none" stroke="#1e293b" strokeWidth="2.5" />
          {/* Upper snout line */}
          <path d="M24,67 L48,64" fill="none" stroke="#1e293b" strokeWidth="2" />

          {/* Needle sharp razor teeth */}
          <polygon points="32,69 31,73 34,69" fill="#ffffff" />
          <polygon points="38,68 36,73 40,68" fill="#ffffff" />
          <polygon points="44,67 42,73 46,67" fill="#ffffff" />

          <polygon points="28,71 29,67 31,71" fill="#ffffff" />
          <polygon points="34,72 35,66 37,72" fill="#ffffff" />
          <polygon points="40,73 41,66 43,73" fill="#ffffff" strokeWidth="0.5" />

          {/* ================= HIGH-ADAPTED HUNTER EYE ================= */}
          {/* Sharp, cold predator eye */}
          <circle cx="58" cy="61" r="5" fill="#475569" stroke="#1e293b" strokeWidth="1" />
          <circle cx="58" cy="61" r="3.2" fill="#e2e8f0" />
          <circle cx="58" cy="61" r="1.8" fill="#111827" />
          <circle cx="57" cy="60" r="0.6" fill="#ffffff" />

          {/* ================= PECTORAL FIN ================= */}
          <path 
            className="origin-[76px_74px] animate-barracuda-pectoral"
            d="M76,74 Q92,80 96,72 Q82,70 76,74" 
            fill="url(#barracuda-fin-grad)" 
            stroke="#1e293b"
            strokeWidth="0.5"
          />

          {/* Gill slit */}
          <path d="M68,58 Q72,70 68,80" fill="none" stroke="#1e293b" strokeWidth="1" opacity="0.6" />

        </g>
      </svg>
    </div>
  );
}
