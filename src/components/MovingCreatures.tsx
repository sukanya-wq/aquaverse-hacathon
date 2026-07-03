/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Eye, EyeOff, Radio, Activity, Compass, Target } from 'lucide-react';
import RealisticFish from './RealisticFish';
import RealisticClownfish from './RealisticClownfish';
import RealisticTurtle from './RealisticTurtle';
import RealisticJellyfish from './RealisticJellyfish';
import RealisticSquid from './RealisticSquid';
import RealisticAnglerfish from './RealisticAnglerfish';
import RealisticLanternfish from './RealisticLanternfish';
import RealisticBarracuda from './RealisticBarracuda';
import RealisticSubmarineAndDivers from './RealisticSubmarineAndDivers';

interface MovingCreaturesProps {
  zoneId: string;
}

interface Creature {
  id: number;
  type: string;
  size: number;
  speed: number;
  delay: number;
  startY: number;
  direction: 'left-to-right' | 'right-to-left';
  opacity: number;
}

interface TelemetryData {
  x: number;
  y: number;
  depth: number;
  pulseRate: number;
  energyLevel: number;
}

export default function MovingCreatures({ zoneId }: MovingCreaturesProps) {
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [showTelemetry, setShowTelemetry] = useState<boolean>(true);
  const [liveTelemetry, setLiveTelemetry] = useState<Record<number, TelemetryData>>({});

  useEffect(() => {
    // Generate zone-specific moving background creatures with realistic animations
    const list: Creature[] = [];
    let count = 4;
    let types = ['fish'];

    if (zoneId === 'sunlight') {
      types = ['clownfish', 'turtle', 'fish', 'barracuda', 'clownfish', 'fish'];
      count = 6;
    } else if (zoneId === 'twilight') {
      types = ['jellyfish', 'squid', 'barracuda', 'turtle', 'jellyfish'];
      count = 5;
    } else if (zoneId === 'midnight') {
      types = ['anglerfish', 'lanternfish', 'squid', 'lanternfish'];
      count = 5;
    } else if (zoneId === 'abyss') {
      types = ['sub', 'anglerfish', 'lanternfish'];
      count = 3;
    }

    for (let i = 0; i < count; i++) {
      const direction = Math.random() > 0.5 ? 'left-to-right' : 'right-to-left';
      list.push({
        id: i,
        type: types[i % types.length],
        size: Math.random() * 30 + 75, // 75px to 105px for high visibility
        speed: Math.random() * 12 + 15, // 15s to 27s
        delay: Math.random() * 3, // 0 to 3s delay
        startY: Math.random() * 60 + 20, // 20% to 80% height of section
        direction: direction,
        opacity: Math.random() * 0.25 + 0.60, // fully clear and beautiful
      });
    }

    setCreatures(list);
  }, [zoneId]);

  // Compute live real-time simulation position and biometric coordinates
  useEffect(() => {
    if (creatures.length === 0) return;

    // Set initial baseline statistics
    const initialStats: Record<number, TelemetryData> = {};
    creatures.forEach(c => {
      initialStats[c.id] = {
        x: c.direction === 'left-to-right' ? 0 : 100,
        y: c.startY,
        depth: Math.round(c.startY * 15 + (zoneId === 'twilight' ? 200 : zoneId === 'midnight' ? 1000 : zoneId === 'abyss' ? 4000 : 10)),
        pulseRate: Math.round(Math.random() * 40 + 60),
        energyLevel: Math.round(Math.random() * 20 + 80),
      };
    });
    setLiveTelemetry(initialStats);

    const interval = setInterval(() => {
      setLiveTelemetry((prev) => {
        const next = { ...prev };
        creatures.forEach((c) => {
          if (!next[c.id]) return;
          
          // Calculate realistic swim positions by tracking time
          const totalMs = c.speed * 1000;
          const currentMs = (Date.now() + (c.delay * 1000)) % totalMs;
          const ratio = currentMs / totalMs;

          // Compute horizontal position % based on swim direction
          let computedX = ratio * 130 - 15; // wide range including offscreen offsets
          if (c.direction === 'right-to-left') {
            computedX = 115 - ratio * 130;
          }

          // Gentle vertical undulation
          const undulation = Math.sin((Date.now() / 1000) + c.id) * 1.5;
          const computedY = c.startY + undulation;

          // Zone multipliers for depth
          let depthMultiplier = 5;
          let depthBase = 20;
          if (zoneId === 'twilight') { depthMultiplier = 8; depthBase = 250; }
          else if (zoneId === 'midnight') { depthMultiplier = 12; depthBase = 1100; }
          else if (zoneId === 'abyss') { depthMultiplier = 25; depthBase = 4200; }

          const currentDepth = Math.round(depthBase + (computedY * depthMultiplier));

          next[c.id] = {
            x: parseFloat(computedX.toFixed(1)),
            y: parseFloat(computedY.toFixed(1)),
            depth: currentDepth,
            pulseRate: Math.round(75 + Math.sin(Date.now() * 0.002 + c.id) * 8),
            energyLevel: Math.max(10, Math.round(85 + Math.sin(Date.now() * 0.0005 + c.id) * 10)),
          };
        });
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [creatures, zoneId]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
      
      {/* Dynamic Telemetry Vectors HUD Line Drawer (Simulation Graph Canvas) */}
      {showTelemetry && (
        <svg className="absolute inset-0 w-full h-full opacity-45 pointer-events-none">
          {creatures.map((c) => {
            const data = liveTelemetry[c.id];
            if (!data || data.x < 0 || data.x > 100) return null;

            // Render thin coordinate grid alignment intersecting lines
            return (
              <g key={`vector-${zoneId}-${c.id}`} className="transition-all duration-300 ease-linear">
                {/* Horizontal reference line */}
                <line
                  x1="0"
                  y1={`${data.y}%`}
                  x2="100%"
                  y2={`${data.y}%`}
                  stroke="rgba(6, 182, 212, 0.08)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />
                {/* Vertical reference line */}
                <line
                  x1={`${data.x}%`}
                  y1="0"
                  x2={`${data.x}%`}
                  y2="100%"
                  stroke="rgba(6, 182, 212, 0.08)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />
                
                {/* Visual sonar sweep link to nearest axis anchor */}
                <circle
                  cx={`${data.x}%`}
                  cy={`${data.y}%`}
                  r="6"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.4)"
                  strokeWidth="1.2"
                  className="animate-ping"
                  style={{ animationDuration: '3s' }}
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* Floating Biosphere Control Trigger for this specific zone */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto flex items-center space-x-2 bg-slate-950/80 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
        <Activity className={`w-3.5 h-3.5 ${showTelemetry ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
        <span className="text-[9px] font-mono font-bold tracking-widest text-slate-300 uppercase">
          {zoneId} Simulation Graph
        </span>
        <button
          onClick={() => setShowTelemetry(!showTelemetry)}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[8.5px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
            showTelemetry 
              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20' 
              : 'bg-slate-900 border-white/5 text-slate-500 hover:text-slate-300'
          }`}
        >
          {showTelemetry ? <Eye className="w-2.5 h-2.5 mr-0.5" /> : <EyeOff className="w-2.5 h-2.5 mr-0.5" />}
          <span>{showTelemetry ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {creatures.map((c) => {
        const telemetryData = liveTelemetry[c.id];
        const isCurrentlyOffscreen = telemetryData ? (telemetryData.x < -5 || telemetryData.x > 105) : false;

        return (
          <div
            key={`creature-${zoneId}-${c.id}`}
            className={`absolute transition-all ease-linear`}
            style={{
              top: `${c.startY}%`,
              width: `${c.size}px`,
              height: `${c.size}px`,
              opacity: isCurrentlyOffscreen ? 0 : c.opacity,
              animationName: c.direction === 'left-to-right' ? 'swim-lr' : 'swim-rl',
              animationDuration: `${c.speed}s`,
              animationDelay: `${c.delay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
            }}
          >
            {/* Visual lock-on brackets & telemetry readouts around each fish */}
            {showTelemetry && telemetryData && !isCurrentlyOffscreen && (
              <div className="absolute -inset-4 border border-cyan-500/20 rounded-xl pointer-events-none transition-all duration-300">
                {/* Telemetry frame brackets */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

                {/* Lock-on metadata */}
                <div 
                  className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[7px] text-cyan-400 font-extrabold bg-slate-950/90 px-1.5 py-0.5 rounded border border-cyan-400/30 flex items-center space-x-1 tracking-wider"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                >
                  <Target className="w-2 h-2 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>TRK-{(c.id + 204)} // {c.type.toUpperCase()}</span>
                </div>

                {/* Sub-surface stats readout */}
                <div 
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[6.5px] text-slate-300 bg-slate-950/90 px-1.5 py-1 rounded border border-white/5 flex flex-col space-y-0.5 w-[100px]"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                >
                  <div className="flex justify-between">
                    <span className="text-slate-500">POS-X:</span>
                    <span className="text-white font-bold tabular-nums">{telemetryData.x}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">DEPTH:</span>
                    <span className="text-cyan-300 font-bold tabular-nums">{telemetryData.depth}m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">PULSE:</span>
                    <span className="text-emerald-400 font-bold flex items-center">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 mr-0.5 animate-ping" />
                      {telemetryData.pulseRate}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Group to orient the direction of the component swim correctly */}
            <div 
              className="w-full h-full"
              style={{
                transform: c.direction === 'left-to-right' ? 'scaleX(-1)' : 'scaleX(1)',
              }}
            >
              {c.type === 'fish' && (
                <RealisticFish sizeClass="w-full h-full" />
              )}

              {c.type === 'clownfish' && (
                <RealisticClownfish isLuminescent={true} glowIntensity={100} sizeClass="w-full h-full" />
              )}

              {c.type === 'turtle' && (
                <RealisticTurtle isLuminescent={true} glowIntensity={100} sizeClass="w-full h-full" />
              )}

              {c.type === 'jellyfish' && (
                <RealisticJellyfish sizeClass="w-full h-full" />
              )}

              {c.type === 'squid' && (
                <RealisticSquid isLuminescent={true} glowIntensity={100} sizeClass="w-full h-full" />
              )}

              {c.type === 'anglerfish' && (
                <RealisticAnglerfish isLuminescent={true} glowIntensity={100} sizeClass="w-full h-full" />
              )}

              {c.type === 'lanternfish' && (
                <RealisticLanternfish isLuminescent={true} glowIntensity={100} sizeClass="w-full h-full" />
              )}

              {c.type === 'barracuda' && (
                <RealisticBarracuda isLuminescent={true} glowIntensity={100} sizeClass="w-full h-full" />
              )}

              {c.type === 'sub' && (
                <RealisticSubmarineAndDivers sizeClass="w-full h-full" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
