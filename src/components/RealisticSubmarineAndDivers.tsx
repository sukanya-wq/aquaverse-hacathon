/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface RealisticSubmarineAndDiversProps {
  sizeClass?: string; // e.g. "w-72 h-56"
}

export default function RealisticSubmarineAndDivers({ sizeClass = "w-full h-full" }: RealisticSubmarineAndDiversProps) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden pointer-events-none select-none ${sizeClass}`}>
      
      {/* Searchlight Ambient Backdrop Glow */}
      <div 
        className="absolute right-0 top-1/4 w-[220px] h-[150px] pointer-events-none transition-all duration-1000 mix-blend-screen blur-[24px] animate-pulse"
        style={{
          background: 'radial-gradient(ellipse at left, rgba(250, 204, 21, 0.25) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 80%)',
          transformOrigin: 'left center'
        }}
      />

      {/* Diver's local bubbles rising to the top */}
      <div className="absolute left-[15%] bottom-[15%] w-1.5 h-1.5 rounded-full border border-cyan-300/60 bg-white/10 animate-ping duration-[1.8s]" />
      <div className="absolute left-[35%] bottom-[30%] w-2 h-2 rounded-full border border-cyan-300/40 bg-white/20 animate-ping duration-[2.2s] delay-700" />
      <div className="absolute left-[18%] bottom-[45%] w-1 h-1 rounded-full border border-cyan-300/30 bg-white/5 animate-ping duration-[1.2s] delay-300" />

      <svg 
        viewBox="0 0 340 240" 
        className="w-full h-full drop-shadow-[0_8px_24px_rgba(30,58,138,0.5)] animate-sub-hover"
      >
        <defs>
          {/* Glowing Filters for Sub & Diver Helmets */}
          <filter id="sub-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="intense-beam" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Submarine Yellow/Orange Scientific Hull Gradient */}
          <linearGradient id="sub-hull-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f97316" />    {/* Safety Orange */}
            <stop offset="45%" stopColor="#eab308" />   {/* Research Yellow */}
            <stop offset="85%" stopColor="#facc15" />   {/* Bright Yellow */}
            <stop offset="100%" stopColor="#ca8a04" />  {/* Darker Brass/Yellow */}
          </linearGradient>

          {/* Submarine Metal Chassis/Conning Tower */}
          <linearGradient id="sub-metal-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Neon Safety Light Striping */}
          <linearGradient id="neon-cyan-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.95" />
          </linearGradient>

          {/* Volumetric Spotlight Cone Gradient */}
          <linearGradient id="spotlight-cone" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.6" />
            <stop offset="25%" stopColor="#fae8ff" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
          </linearGradient>

          {/* Diver Suit Gradient */}
          <linearGradient id="diver-suit-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="60%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* ================= VOLUMETRIC SEARCHLIGHT BEAM ================= */}
        {/* Swings gently with sub orientation */}
        <g 
          className="origin-[254px_114px] animate-sub-light-sway"
          style={{ transformBox: 'fill-box' }}
        >
          <polygon 
            points="250,114 340,65 340,165" 
            fill="url(#spotlight-cone)" 
            opacity={0.9}
            className="mix-blend-screen"
          />
          {/* Intense dust particles illuminated in searchlight beam */}
          <circle cx="270" cy="112" r="1.5" fill="#ffffff" opacity="0.8" className="animate-pulse duration-[1.2s]" />
          <circle cx="295" cy="98" r="1.2" fill="#ffffff" opacity="0.6" className="animate-pulse duration-[2s]" />
          <circle cx="310" cy="125" r="2" fill="#22d3ee" opacity="0.7" className="animate-pulse duration-[1.6s] delay-200" />
          <circle cx="285" cy="130" r="1" fill="#ffffff" opacity="0.5" />
          <circle cx="325" cy="110" r="1.5" fill="#fef08a" opacity="0.7" className="animate-pulse duration-[1.8s] delay-500" />
        </g>

        {/* ================= SCIENTIFIC SUBMERSIBLE (SUBMARINE) ================= */}
        <g className="origin-[180px_110px]">
          
          {/* 1. Propeller Assembly (Rear Left) */}
          <g className="origin-[104px_114px]">
            {/* Gearbox connection */}
            <rect x="96" y="111" width="12" height="6" fill="url(#sub-metal-grad)" stroke="#0f172a" strokeWidth="0.5" />
            {/* Propeller Hub */}
            <ellipse cx="94" cy="114" rx="4" ry="5" fill="#1e293b" />
            {/* Spinning Blades */}
            <path 
              d="M93,98 C91,105 95,110 94,114 C93,118 91,123 93,130 C94,123 95,118 94,114 C95,110 97,105 93,98 Z"
              fill="#94a3b8"
              className="animate-sub-propeller-spin"
              style={{ transformOrigin: '94px 114px' }}
            />
          </g>

          {/* 2. Stabilizer Tail Fins */}
          <path d="M104,102 L90,92 L96,114 Z" fill="url(#sub-hull-grad)" stroke="#0f172a" strokeWidth="0.5" />
          <path d="M104,126 L90,136 L96,114 Z" fill="url(#sub-hull-grad)" stroke="#0f172a" strokeWidth="0.5" />

          {/* 3. Main Capsule Hull */}
          <path 
            d="M104,114 C104,78 140,70 190,70 C240,70 256,88 256,114 C256,140 240,158 190,158 C140,158 104,150 104,114 Z" 
            fill="url(#sub-hull-grad)" 
            stroke="#0f172a" 
            strokeWidth="0.8" 
          />

          {/* 4. Conning Tower / Sail (Top Deck) */}
          <path 
            d="M152,70 L158,45 C160,42 190,42 192,45 L198,70 Z" 
            fill="url(#sub-metal-grad)" 
            stroke="#0f172a" 
            strokeWidth="0.7" 
          />
          {/* Periscope & Sensor Antennas */}
          <path d="M172,44 L172,28 L178,28" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="184" y1="44" x2="184" y2="32" stroke="#475569" strokeWidth="1" />
          <circle cx="184" cy="31" r="1.5" fill="#f43f5e" className="animate-pulse" /> {/* Warning Flasher */}

          {/* 5. Luminescent Safety Strips (Cyan Glow along the body) */}
          <path 
            d="M116,114 C130,102 180,98 236,108" 
            fill="none" 
            stroke="url(#neon-cyan-grad)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            filter="url(#sub-glow)"
          />
          <path 
            d="M116,114 C130,102 180,98 236,108" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1" 
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* 6. Glowing Circular Viewports */}
          {/* Viewport 1 */}
          <circle cx="148" cy="114" r="14" fill="#0f172a" stroke="#1e293b" strokeWidth="2.5" />
          <circle cx="148" cy="114" r="11" fill="#155e75" />
          <circle cx="148" cy="114" r="11" fill="url(#neon-cyan-grad)" opacity="0.75" filter="url(#sub-glow)" />
          {/* Internal pilot console silhouette detail */}
          <path d="M142,122 C146,118 152,118 154,122" stroke="#0891b2" strokeWidth="1.5" fill="none" />
          <circle cx="145" cy="111" r="2" fill="#ffffff" opacity="0.9" /> {/* Glass glare */}

          {/* Viewport 2 */}
          <circle cx="192" cy="114" r="14" fill="#0f172a" stroke="#1e293b" strokeWidth="2.5" />
          <circle cx="192" cy="114" r="11" fill="#155e75" />
          <circle cx="192" cy="114" r="11" fill="url(#neon-cyan-grad)" opacity="0.75" filter="url(#sub-glow)" />
          <circle cx="189" cy="111" r="2" fill="#ffffff" opacity="0.9" /> {/* Glass glare */}

          {/* 7. Headlight Projector Housing (Front Right) */}
          <path d="M250,104 L256,106 L256,122 L250,124 Z" fill="url(#sub-metal-grad)" stroke="#0f172a" strokeWidth="0.5" />
          <ellipse cx="254" cy="114" rx="3.5" ry="8" fill="#fef08a" filter="url(#intense-beam)" />

          {/* 8. Underbelly Cargo Pod & Skids */}
          <rect x="135" y="158" width="80" height="8" fill="url(#sub-metal-grad)" rx="3" stroke="#0f172a" strokeWidth="0.5" />
          {/* Heavy metal landing skids */}
          <path d="M120,166 L125,176 L220,176 L225,166" fill="none" stroke="#475569" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M145,158 L145,168" stroke="#1e293b" strokeWidth="2" />
          <path d="M195,158 L195,168" stroke="#1e293b" strokeWidth="2" />

          {/* 9. Mechanical Sample Arm (Claw) */}
          <g className="origin-[240px_145px] animate-pulse">
            {/* Shoulder joint */}
            <circle cx="236" cy="144" r="4.5" fill="#334155" />
            {/* Arm segment 1 */}
            <line x1="236" y1="144" x2="252" y2="160" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
            {/* Elbow joint */}
            <circle cx="252" cy="160" r="3" fill="#1e293b" />
            {/* Arm segment 2 */}
            <line x1="252" y1="160" x2="270" y2="155" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
            {/* Glowing active claw */}
            <path d="M270,151 Q275,155 272,160 M270,159 Q275,155 272,150" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" filter="url(#sub-glow)" />
          </g>

          {/* Rivets and panels lines overlay for highly realistic tactile details */}
          <path d="M125,72 L125,156" stroke="#ca8a04" strokeWidth="0.6" opacity="0.45" />
          <path d="M170,70 L170,158" stroke="#ca8a04" strokeWidth="0.6" opacity="0.45" />
          <path d="M218,72 L218,156" stroke="#ca8a04" strokeWidth="0.6" opacity="0.45" />
        </g>

        {/* ================= DEEP SEA DIVERS ================= */}
        
        {/* DIVER 1: Atmospheric exploration diver hovering above the sub */}
        <g 
          className="origin-[50px_70px] animate-diver-float"
          style={{ transformBox: 'fill-box' }}
        >
          {/* Golden/Cyan glowing thin safety umbilical/tether line connecting diver to the submarine sail */}
          <path 
            d="M58,74 Q105,95 156,66" 
            fill="none" 
            stroke="rgba(34, 211, 238, 0.45)" 
            strokeWidth="1.2" 
            strokeDasharray="4 2" 
          />

          {/* Diver Body Structure */}
          {/* Leg Left (Kicking) */}
          <path 
            className="origin-[48px_74px] animate-diver-leg-kick-alt"
            d="M48,74 L32,84 L22,86" 
            fill="none" 
            stroke="url(#diver-suit-grad)" 
            strokeWidth="4" 
            strokeLinecap="round" 
          />
          {/* Fin Left */}
          <polygon points="22,83 12,94 16,97" fill="#f43f5e" opacity="0.95" />

          {/* Leg Right (Kicking) */}
          <path 
            className="origin-[52px_74px] animate-diver-leg-kick"
            d="M52,74 L40,86 L28,92" 
            fill="none" 
            stroke="url(#diver-suit-grad)" 
            strokeWidth="4" 
            strokeLinecap="round" 
          />
          {/* Fin Right */}
          <polygon points="28,89 18,100 22,103" fill="#f43f5e" opacity="0.95" />

          {/* Heavy Torso */}
          <rect x="42" y="50" width="16" height="24" rx="5" fill="url(#diver-suit-grad)" stroke="#0f172a" strokeWidth="0.5" />

          {/* Deep Sea Heavy Life-Support Backpack */}
          <rect x="36" y="52" width="7" height="18" rx="2" fill="#64748b" />
          <circle cx="39" cy="56" r="1.2" fill="#22d3ee" className="animate-pulse" /> {/* Neon status indicator */}

          {/* Left Arm (holding camera/sensor) */}
          <path d="M44,54 L58,54 L64,60" fill="none" stroke="url(#diver-suit-grad)" strokeWidth="3" strokeLinecap="round" />
          {/* Glowing handheld device */}
          <circle cx="64" cy="60" r="1.5" fill="#fef08a" filter="url(#sub-glow)" />

          {/* Right Arm (resting) */}
          <path d="M56,54 L48,66" fill="none" stroke="url(#diver-suit-grad)" strokeWidth="3" strokeLinecap="round" />

          {/* Helmet & Glowing Face Visor */}
          <circle cx="50" cy="46" r="6.5" fill="url(#sub-metal-grad)" stroke="#0f172a" strokeWidth="0.5" />
          <path d="M49,43 C54,43 56,46 56,49" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" filter="url(#sub-glow)" />
          {/* Tiny helmet flashlight beam */}
          <polygon points="56,45 80,35 80,55" fill="rgba(34, 211, 238, 0.2)" />
        </g>

        {/* DIVER 2: Co-explorer swimming lower-left (lead diver) */}
        <g 
          className="origin-[85px_175px] animate-diver-float-delayed"
          style={{ transformBox: 'fill-box' }}
        >
          {/* Leg Left (Kicking) */}
          <path 
            className="origin-[82px_178px] animate-diver-leg-kick"
            d="M82,178 L68,188 L58,190" 
            fill="none" 
            stroke="url(#diver-suit-grad)" 
            strokeWidth="4" 
            strokeLinecap="round" 
          />
          {/* Fin Left */}
          <polygon points="58,187 48,198 52,201" fill="#eab308" opacity="0.95" />

          {/* Leg Right (Kicking) */}
          <path 
            className="origin-[86px_178px] animate-diver-leg-kick-alt"
            d="M86,178 L74,190 L62,196" 
            fill="none" 
            stroke="url(#diver-suit-grad)" 
            strokeWidth="4" 
            strokeLinecap="round" 
          />
          {/* Fin Right */}
          <polygon points="62,193 52,204 56,207" fill="#eab308" opacity="0.95" />

          {/* Torso */}
          <rect x="78" y="154" width="16" height="24" rx="5" fill="url(#diver-suit-grad)" stroke="#0f172a" strokeWidth="0.5" />

          {/* Life-support backpack */}
          <rect x="72" y="156" width="7" height="18" rx="2" fill="#64748b" />
          <circle cx="75" cy="160" r="1.2" fill="#f43f5e" className="animate-pulse" />

          {/* Arms paddling */}
          <path d="M80,158 L94,158 L100,164" fill="none" stroke="url(#diver-suit-grad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M92,158 L84,170" fill="none" stroke="url(#diver-suit-grad)" strokeWidth="3" strokeLinecap="round" />

          {/* Helmet & glowing face shield */}
          <circle cx="86" cy="150" r="6.5" fill="url(#sub-metal-grad)" stroke="#0f172a" strokeWidth="0.5" />
          <path d="M85,147 C90,147 92,150 92,153" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" filter="url(#sub-glow)" />
          {/* Helmet lamp */}
          <polygon points="92,149 116,139 116,159" fill="rgba(250, 204, 21, 0.2)" />
        </g>
      </svg>
    </div>
  );
}
