/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';

interface UnderwaterTransitionProps {
  activeSection: string;
}

interface TransitionBubble {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

export default function UnderwaterTransition({ activeSection }: UnderwaterTransitionProps) {
  const [bubbles, setBubbles] = useState<TransitionBubble[]>([]);
  const [showWipe, setShowWipe] = useState(false);
  const prevSectionRef = useRef(activeSection);

  useEffect(() => {
    if (prevSectionRef.current !== activeSection) {
      // Trigger the custom bubble pops sound effect event
      window.dispatchEvent(new CustomEvent('ocean-dive-bubbles'));

      // Spawn a massive beautiful bubble splash (45 bubbles) rising rapidly
      const list = Array.from({ length: 45 }, (_, i) => ({
        id: Date.now() + i + Math.random(),
        left: Math.random() * 100, // random horizontal spawn percent
        size: Math.random() * 16 + 8, // sizes range from 8px to 24px
        delay: Math.random() * 0.35, // fast staggered offsets
        duration: Math.random() * 0.7 + 0.7, // rise speeds between 0.7s and 1.4s
      }));
      setBubbles(list);

      // Trigger the ocean wave screen color wipe overlay
      setShowWipe(true);

      const timer = setTimeout(() => {
        setBubbles([]);
        setShowWipe(false);
      }, 1600);

      prevSectionRef.current = activeSection;
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  return (
    <>
      {/* 1. Cinematic Screen Color Wipe (Plunge transition effect) */}
      <div 
        id="cinema-wipe-overlay"
        className={`fixed inset-0 z-40 pointer-events-none transition-all duration-1000 ease-in-out ${
          showWipe 
            ? 'opacity-85 bg-gradient-to-b from-cyan-950 via-blue-900 to-slate-950 scale-y-100' 
            : 'opacity-0 bg-transparent scale-y-0'
        }`}
        style={{ transformOrigin: 'top center' }}
      />

      {/* 2. Rapid Rising Bubbles Layer */}
      <div id="cinema-wipe-bubbles-container" className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="absolute bottom-0 rounded-full border border-white/40 bg-cyan-400/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),0_4px_12px_rgba(6,182,212,0.25)]"
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animation: `dive-bubble-rise ${b.duration}s cubic-bezier(0.21, 0.85, 0.45, 1) ${b.delay}s forwards`,
            }}
          >
            {/* Shiny glare reflection */}
            <div className="absolute top-[15%] left-[15%] w-1.5 h-1.5 rounded-full bg-white/70" />
          </div>
        ))}
      </div>
    </>
  );
}
