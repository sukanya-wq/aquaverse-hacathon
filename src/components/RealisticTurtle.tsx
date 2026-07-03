/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface RealisticTurtleProps {
  glowIntensity?: number; // 0 to 100
  isLuminescent?: boolean;
  sonarActive?: boolean;
  sizeClass?: string; // e.g. "w-48 h-48"
}

export default function RealisticTurtle({
  glowIntensity = 80,
  isLuminescent = false,
  sonarActive = false,
  sizeClass = "w-full h-full"
}: RealisticTurtleProps) {
  const shellColor = sonarActive ? '#10b981' : '#047857'; // Emerald or dark forest green

  return (
    <div className={`relative flex items-center justify-center overflow-hidden pointer-events-none select-none ${sizeClass}`}>
      
      {/* Bioluminescent halo around turtle carapace when glowing under scan */}
      {isLuminescent && (
        <div 
          className="absolute transition-all duration-1000 blur-[25px] mix-blend-screen opacity-15 animate-pulse"
          style={{
            width: '130px',
            height: '110px',
            background: `radial-gradient(ellipse, rgba(16,185,129,0.5) 0%, transparent 75%)`,
          }}
        />
      )}

      <svg 
        viewBox="0 0 220 200" 
        className="w-full h-full drop-shadow-[0_6px_12px_rgba(4,120,87,0.3)] animate-turtle-glide"
      >
        <defs>
          {/* Shell scale/scute gradient */}
          <linearGradient id="turtle-shell-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor={shellColor} />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          {/* Flipper scale skin gradient */}
          <linearGradient id="flipper-skin-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
        </defs>

        <g className="origin-[110px_100px]">
          
          {/* ================= BACK REAR FLIPPERS ================= */}
          <g className="animate-turtle-rear-flap">
            {/* Left Rear */}
            <path d="M78,128 C64,142 56,155 64,162 C74,168 84,152 86,134 Z" fill="url(#flipper-skin-grad)" stroke="#064e3b" strokeWidth="1" />
            {/* Right Rear */}
            <path d="M142,128 C156,142 164,155 156,162 C146,168 136,152 134,134 Z" fill="url(#flipper-skin-grad)" stroke="#064e3b" strokeWidth="1" />
          </g>

          {/* Small Tail */}
          <path d="M110,138 L106,156 L114,156 Z" fill="url(#flipper-skin-grad)" stroke="#064e3b" strokeWidth="1" />

          {/* ================= HEAVY MAJESTIC FRONT FLIPPERS ================= */}
          {/* Left Large Wing Flipper */}
          <g className="origin-[82px_75px] animate-turtle-left-wing">
            <path 
              d="M82,75 C50,68 15,40 10,50 C5,60 42,94 76,86 Z" 
              fill="url(#flipper-skin-grad)" 
              stroke="#064e3b" 
              strokeWidth="1.2" 
            />
            {/* Texture spots */}
            <ellipse cx="45" cy="65" rx="3" ry="1.5" fill="#047857" opacity="0.6" />
            <ellipse cx="32" cy="58" rx="2" ry="1" fill="#047857" opacity="0.6" />
          </g>

          {/* Right Large Wing Flipper */}
          <g className="origin-[138px_75px] animate-turtle-right-wing">
            <path 
              d="M138,75 C170,68 205,40 210,50 C215,60 178,94 144,86 Z" 
              fill="url(#flipper-skin-grad)" 
              stroke="#064e3b" 
              strokeWidth="1.2" 
            />
            {/* Texture spots */}
            <ellipse cx="175" cy="65" rx="3" ry="1.5" fill="#047857" opacity="0.6" />
            <ellipse cx="188" cy="58" rx="2" ry="1" fill="#047857" opacity="0.6" />
          </g>

          {/* ================= TURTLE NECK & HEAD ================= */}
          <g className="origin-[110px_60px] animate-turtle-head-bob">
            {/* Neck */}
            <path d="M102,64 L102,40 L118,40 L118,64 Z" fill="url(#flipper-skin-grad)" />
            {/* Head */}
            <ellipse cx="110" cy="34" rx="11" ry="14" fill="url(#flipper-skin-grad)" stroke="#064e3b" strokeWidth="1.2" />
            {/* Eye (Expressive and calm) */}
            <circle cx="104" cy="30" r="1.8" fill="#111827" />
            <circle cx="116" cy="30" r="1.8" fill="#111827" />
            <path d="M107,40 Q110,43 113,40" fill="none" stroke="#064e3b" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* ================= GORGEOUS BULGING CARAPACE (SHELL) ================= */}
          <ellipse 
            cx="110" 
            cy="100" 
            rx="38" 
            ry="44" 
            fill="url(#turtle-shell-grad)" 
            stroke="#022c22" 
            strokeWidth="2" 
          />

          {/* Elegant Scute (Shell Plate) Linework */}
          {/* Center Column Scutes */}
          <polygon points="110,64 100,75 110,88 120,75" fill="none" stroke="#064e3b" strokeWidth="1.5" opacity="0.7" />
          <polygon points="110,88 98,102 110,118 122,102" fill="none" stroke="#064e3b" strokeWidth="1.5" opacity="0.7" />
          <polygon points="110,118 102,130 110,140 118,130" fill="none" stroke="#064e3b" strokeWidth="1.5" opacity="0.7" />

          {/* Outer Ring Linework */}
          <path d="M72,100 C72,70 148,70 148,100" fill="none" stroke="#064e3b" strokeWidth="1.5" opacity="0.6" />
          <path d="M72,100 C72,130 148,130 148,100" fill="none" stroke="#064e3b" strokeWidth="1.5" opacity="0.6" />

          {/* Lateral connective lines */}
          <line x1="72" y1="100" x2="98" y2="102" stroke="#064e3b" strokeWidth="1.5" opacity="0.6" />
          <line x1="148" y1="100" x2="122" y2="102" stroke="#064e3b" strokeWidth="1.5" opacity="0.6" />
          <line x1="82" y1="78" x2="100" y2="75" stroke="#064e3b" strokeWidth="1.5" opacity="0.6" />
          <line x1="138" y1="78" x2="120" y2="75" stroke="#064e3b" strokeWidth="1.5" opacity="0.6" />
          <line x1="82" y1="122" x2="102" y2="130" stroke="#064e3b" strokeWidth="1.5" opacity="0.6" />
          <line x1="138" y1="122" x2="118" y2="130" stroke="#064e3b" strokeWidth="1.5" opacity="0.6" />

        </g>
      </svg>
    </div>
  );
}
