/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface RealisticFishProps {
  sizeClass?: string; // e.g. "w-48 h-48"
}

export default function RealisticFish({ sizeClass = "w-full h-full" }: RealisticFishProps) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden pointer-events-none select-none ${sizeClass}`}>
      
      {/* Sunlight rays refraction halo behind the fish */}
      <div 
        className="absolute w-4/5 h-4/5 rounded-full transition-all duration-1000 blur-[30px] mix-blend-screen opacity-30 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.35) 0%, rgba(234,179,8,0.15) 50%, transparent 80%)',
        }}
      />

      {/* Tiny local bubble emitter for the fish mouth */}
      <div className="absolute left-[20%] top-[45%] w-1.5 h-1.5 rounded-full border border-cyan-200/50 bg-white/20 animate-ping duration-1000" />
      <div className="absolute left-[18%] top-[42%] w-1 h-1 rounded-full border border-cyan-200/40 bg-white/10 animate-ping duration-1500 delay-300" />

      <svg 
        viewBox="0 0 220 160" 
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(6,182,212,0.3)] animate-fish-glide"
      >
        <defs>
          {/* Neon/Bioluminescent glowing highlights */}
          <filter id="fish-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Golden Yellow / Turquoise Tropical Tang Gradient */}
          <linearGradient id="fish-body-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0ea5e9" />    {/* Sky Blue */}
            <stop offset="45%" stopColor="#06b6d4" />   {/* Cyan */}
            <stop offset="75%" stopColor="#eab308" />   {/* Gold */}
            <stop offset="100%" stopColor="#f59e0b" />  {/* Warm Amber */}
          </linearGradient>

          {/* Back Fin / Belly highlights */}
          <linearGradient id="fin-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eab308" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.85" /> {/* Rose accent */}
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.9" />
          </linearGradient>

          {/* Ventral Fin translucent look */}
          <linearGradient id="ventral-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Group to align the fish swimming posture */}
        <g className="origin-[110px_80px]">
          
          {/* ================= DORSAL FIN (Top Fin) ================= */}
          <path 
            className="animate-fish-fin-flutter"
            d="M60,62 C65,30 115,22 145,35 C130,50 110,55 90,56 Z" 
            fill="url(#fin-grad)" 
            opacity="0.95"
            stroke="#ffffff"
            strokeWidth="0.5"
          />

          {/* ================= VENTRAL FIN (Bottom Fin) ================= */}
          <path 
            className="animate-fish-fin-flutter"
            d="M80,98 C100,122 125,122 140,105 C125,102 110,100 95,99 Z" 
            fill="url(#ventral-grad)" 
            opacity="0.9"
            stroke="#ffffff"
            strokeWidth="0.5"
          />

          {/* ================= TAIL FLUKES (Back Fin - Swishing) ================= */}
          <g className="origin-[155px_80px] animate-fish-tail-swish">
            {/* Elegant transparent webbed tail */}
            <path 
              d="M150,80 L195,45 C190,70 200,80 190,80 C200,80 190,90 195,115 Z" 
              fill="url(#fin-grad)"
              stroke="#ffffff"
              strokeWidth="0.8"
              opacity="0.95"
            />
            {/* Tail skeletal lines */}
            <path d="M152,80 L190,55" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M154,80 L188,80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M152,80 L190,105" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          </g>

          {/* ================= MAIN FISH BODY ================= */}
          {/* Sleek, hydrodynamic teardrop body */}
          <path 
            d="M40,80 C60,52 110,50 155,80 C110,110 60,108 40,80 Z" 
            fill="url(#fish-body-grad)" 
            stroke="#ffffff"
            strokeWidth="0.5"
          />

          {/* Elegant horizontal neon stripes */}
          <path 
            d="M62,72 C80,63 115,64 142,75" 
            fill="none" 
            stroke="#22d3ee" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            filter="url(#fish-glow)"
            opacity="0.9"
          />
          <path 
            d="M62,72 C80,63 115,64 142,75" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1" 
            strokeLinecap="round"
            opacity="0.7"
          />

          <path 
            d="M65,88 C85,95 115,92 135,84" 
            fill="none" 
            stroke="#22d3ee" 
            strokeWidth="2.5" 
            strokeLinecap="round"
            filter="url(#fish-glow)"
            opacity="0.85"
          />

          {/* ================= EYE ================= */}
          {/* Large, beautiful reflective marine eye */}
          <circle cx="62" cy="74" r="7.5" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
          <circle cx="60" cy="72" r="3.2" fill="#ffffff" />
          <circle cx="64" cy="76" r="1.2" fill="#22d3ee" opacity="0.8" />

          {/* ================= GILL COVER (Operculum) ================= */}
          <path 
            d="M78,68 C74,75 74,83 78,90" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* ================= PECTORAL FIN (Fluttering) ================= */}
          <path 
            className="origin-[82px_84px] animate-fish-pectoral"
            d="M82,84 Q105,92 112,81 Q95,78 82,84" 
            fill="url(#ventral-grad)" 
            stroke="#ffffff"
            strokeWidth="0.6"
            opacity="0.9"
          />

          {/* Realistic body shading details */}
          <path 
            d="M48,78 Q50,71 58,74" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="0.8" 
            opacity="0.4"
          />
        </g>
      </svg>
    </div>
  );
}
