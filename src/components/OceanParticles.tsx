/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

export default function OceanParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      amplitude: number;
      frequency: number;
      phase: number;
      opacity: number;
      isBubble: boolean;
      pulseSpeed?: number;
      pulsePhase?: number;
    }> = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const density = Math.floor((canvas.width * canvas.height) / 25000); // slightly more particles for bubble simulation
      particles = Array.from({ length: Math.min(density, 80) }, () => {
        const isBubble = Math.random() > 0.4; // 60% bubbles, 40% plankton
        const size = isBubble 
          ? Math.random() * 8 + 3  // Bubbles range from 3px to 11px
          : Math.random() * 2 + 1; // Plankton are tiny glowing spores (1px - 3px)

        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height, // seed throughout screen
          size,
          speedY: isBubble
            ? -(Math.random() * 1.5 + 0.6)  // Bubbles rise relatively faster
            : -(Math.random() * 0.4 + 0.1), // Plankton drift very lazily
          amplitude: Math.random() * 30 + 10,
          frequency: Math.random() * 0.003 + 0.001,
          phase: Math.random() * Math.PI * 2,
          opacity: isBubble ? Math.random() * 0.35 + 0.15 : Math.random() * 0.5 + 0.3,
          isBubble,
          pulseSpeed: isBubble ? undefined : Math.random() * 0.02 + 0.005,
          pulsePhase: isBubble ? undefined : Math.random() * Math.PI,
        };
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }
    handleResize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.y += p.speedY;
        p.phase += p.frequency;
        
        // Sway back and forth using sine drift
        const driftX = Math.sin(p.phase) * (p.isBubble ? 0.35 : 0.15);
        p.x += driftX;

        // Reset particle if it floats past the top
        if (p.y < -30) {
          p.y = canvas.height + 30;
          p.x = Math.random() * canvas.width;
        }

        if (p.isBubble) {
          // --- Draw Realistic Floating Bubbles ---
          // 1. Draw thin, high-contrast white outer ring with refraction tint
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.85})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // 2. Translucent blue/teal inner fill
          ctx.fillStyle = `rgba(165, 243, 252, ${p.opacity * 0.12})`;
          ctx.fill();

          // 3. Bright white surface reflection curve (top-left gloss)
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.18, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.9})`;
          ctx.fill();

          // 4. Subtle bottom-right counter glow representing light bouncing in water
          ctx.beginPath();
          ctx.arc(p.x + p.size * 0.3, p.y + p.size * 0.3, p.size * 0.15, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity * 0.4})`;
          ctx.fill();
        } else {
          // --- Draw Bioluminescent Glowing Plankton Spores ---
          if (p.pulsePhase !== undefined && p.pulseSpeed !== undefined) {
            p.pulsePhase += p.pulseSpeed;
          }
          const pulseGlow = p.pulsePhase !== undefined ? Math.abs(Math.sin(p.pulsePhase)) : 1.0;
          const currentOpacity = p.opacity * (0.6 + pulseGlow * 0.4);

          // Render optimized dual-layer glowing core and halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${currentOpacity * 0.4})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.95})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      id="ocean-particles-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none mix-blend-screen z-20"
    />
  );
}
