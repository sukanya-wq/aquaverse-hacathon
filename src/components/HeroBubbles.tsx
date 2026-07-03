/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
  glow: boolean;
}

export default function HeroBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate an array of 28 realistic bubbles for the hero background
    const list: Bubble[] = [];
    for (let i = 0; i < 28; i++) {
      list.push({
        id: i,
        size: Math.random() * 14 + 4, // 4px to 18px
        left: Math.random() * 100, // 0% to 100% width
        duration: Math.random() * 10 + 8, // 8s to 18s rise duration
        delay: Math.random() * 8, // 0s to 8s start delay
        opacity: Math.random() * 0.35 + 0.15, // opacity
        glow: Math.random() > 0.6, // some bubbles have extra inner light reflections
      });
    }
    setBubbles(list);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full border border-white/50 bg-gradient-to-tr from-cyan-500/10 to-white/10 animate-bubble-rise"
          style={{
            bottom: '-40px',
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            opacity: b.opacity,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            boxShadow: b.glow 
              ? 'inset 1px 1px 4px rgba(255, 255, 255, 0.4), 0 0 8px rgba(34, 211, 238, 0.3)' 
              : 'inset 0.5px 0.5px 2px rgba(255, 255, 255, 0.25)',
          }}
        >
          {/* Surface Glossy Highlight Dot */}
          <div className="absolute top-[15%] left-[15%] w-[25%] h-[25%] rounded-full bg-white/70" />
        </div>
      ))}
    </div>
  );
}
