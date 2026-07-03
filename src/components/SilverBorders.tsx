/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

export default function SilverBorders() {
  return (
    <div id="silver-glowing-frame" className="fixed inset-0 pointer-events-none z-50 select-none animate-silver-glow">
      
      {/* Outer Neon Glow Borders */}
      {/* Top Border */}
      <div 
        className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-zinc-600 via-zinc-100 to-zinc-600 bg-[length:200%_100%] animate-sheen-x"
        style={{
          boxShadow: '0 2px 14px rgba(255, 255, 255, 0.8), 0 4px 22px rgba(161, 161, 170, 0.5)'
        }}
      />

      {/* Bottom Border */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-zinc-600 via-zinc-100 to-zinc-600 bg-[length:200%_100%] animate-sheen-x"
        style={{
          boxShadow: '0 -2px 14px rgba(255, 255, 255, 0.8), 0 -4px 22px rgba(161, 161, 170, 0.5)'
        }}
      />

      {/* Left Border */}
      <div 
        className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-zinc-600 via-zinc-100 to-zinc-600 bg-[length:100%_200%] animate-sheen-y"
        style={{
          boxShadow: '2px 0 14px rgba(255, 255, 255, 0.8), 4px 0 22px rgba(161, 161, 170, 0.5)'
        }}
      />

      {/* Right Border */}
      <div 
        className="absolute top-0 bottom-0 right-0 w-[4px] bg-gradient-to-b from-zinc-600 via-zinc-100 to-zinc-600 bg-[length:100%_200%] animate-sheen-y"
        style={{
          boxShadow: '-2px 0 14px rgba(255, 255, 255, 0.8), -4px 0 22px rgba(161, 161, 170, 0.5)'
        }}
      />

      {/* Tactile Metallic Corner Brackets */}
      {/* Top-Left Bracket */}
      <div className="absolute top-1 left-1 w-6 h-6 border-t-[3px] border-l-[3px] border-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-zinc-200/50" />

      {/* Top-Right Bracket */}
      <div className="absolute top-1 right-1 w-6 h-6 border-t-[3px] border-r-[3px] border-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-zinc-200/50" />

      {/* Bottom-Left Bracket */}
      <div className="absolute bottom-1 left-1 w-6 h-6 border-b-[3px] border-l-[3px] border-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-zinc-200/50" />

      {/* Bottom-Right Bracket */}
      <div className="absolute bottom-1 right-1 w-6 h-6 border-b-[3px] border-r-[3px] border-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-zinc-200/50" />

      {/* Ambient Inner Corner Glows */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1),transparent)]" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)]" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1),transparent)]" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.1),transparent)]" />
    </div>
  );
}
