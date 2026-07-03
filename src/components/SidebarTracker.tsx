/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sun, Sparkles, Moon, HelpCircle, AlertTriangle, ShieldCheck, Heart, Instagram, Twitter, Facebook, Activity, Compass, Thermometer, ShieldAlert, Droplet } from 'lucide-react';

interface SidebarTrackerProps {
  activeSection: string;
  onScrollTo: (sectionId: string) => void;
}

export default function SidebarTracker({ activeSection, onScrollTo }: SidebarTrackerProps) {
  const [scrollDepth, setScrollDepth] = useState(0);
  const [pressure, setPressure] = useState(1);
  const [temperature, setTemperature] = useState(24.5);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight <= 0) return;

      const percentage = scrollY / totalScrollHeight;
      
      // Calculate realistic deep sea scale from 0m to 10,994m (Challenger Deep)
      const calculatedDepth = Math.round(percentage * 10994);
      setScrollDepth(calculatedDepth);

      // Hydrostatic pressure increases by ~1 atm for every 10 meters of water depth
      const calculatedPressure = Math.max(1, Math.round(1 + calculatedDepth / 10));
      setPressure(calculatedPressure);

      // Temperature drops from warm surface waters down to 1.2°C near the bottom
      const calculatedTemp = calculatedDepth === 0
        ? 24.5
        : Math.max(1.2, parseFloat((24.5 - (percentage * 23.3)).toFixed(1)));
      setTemperature(calculatedTemp);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      id: 'hero',
      label: 'SURFACE',
      depth: '0 m',
      icon: Sun,
    },
    {
      id: 'sunlight',
      label: 'SUNLIGHT ZONE',
      depth: '0 - 200 m',
      icon: Sun,
    },
    {
      id: 'twilight',
      label: 'TWILIGHT ZONE',
      depth: '200 - 1000 m',
      icon: Sparkles,
    },
    {
      id: 'midnight',
      label: 'MIDNIGHT ZONE',
      depth: '1000 - 4000 m',
      icon: Moon,
    },
    {
      id: 'abyss',
      label: 'THE ABYSS',
      depth: '4000 - 6000+ m',
      icon: HelpCircle,
    },
    {
      id: 'species',
      label: 'SPECIES',
      depth: 'Red List',
      icon: ShieldAlert,
    },
    {
      id: 'impact',
      label: 'IMPACT',
      depth: 'Human Threats',
      icon: AlertTriangle,
    },
    {
      id: 'water-scanner',
      label: 'WATER SCANNER',
      depth: 'AI Diagnostics',
      icon: Droplet,
    },
    {
      id: 'solutions',
      label: 'SOLUTIONS',
      depth: 'Action Plan',
      icon: ShieldCheck,
    },
    {
      id: 'pledge',
      label: 'HOPE',
      depth: 'Ocean Pledge',
      icon: Heart,
    },
  ];

  return (
    <aside
      id="depth-sidebar-tracker"
      className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col justify-between h-[85vh] w-[200px] z-30 py-4 px-2 select-none border-r border-white/5"
    >
      {/* Telemetry Indicator Card - Highly Premium instrument readout */}
      <div className="pl-4 pr-2 pt-2 pb-3 bg-slate-950/60 rounded-xl border border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)] backdrop-blur-sm space-y-2 font-mono">
        <div className="flex items-center space-x-1.5 text-slate-500 text-[8px] tracking-wider uppercase font-bold">
          <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>Vessel Telemetry</span>
        </div>
        
        {/* Depth Readout */}
        <div className="space-y-0.5">
          <div className="flex justify-between items-center text-[8px] text-slate-500 font-bold">
            <span>DEPTH</span>
            <span className="text-cyan-400">MAX 10,994m</span>
          </div>
          <div className="text-sm font-bold text-white tracking-wide flex items-baseline space-x-1">
            <span className="text-cyan-300 font-sans tabular-nums text-base">{scrollDepth.toLocaleString()}</span>
            <span className="text-[9px] text-cyan-500/70">m</span>
          </div>
        </div>

        {/* Mini progress line representing water column column */}
        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
            style={{ width: `${Math.min(100, (scrollDepth / 10994) * 100)}%` }}
          />
        </div>

        {/* Pressure & Temp stats */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
          <div>
            <div className="flex items-center space-x-1 text-[7.5px] text-slate-500">
              <Compass className="w-2.5 h-2.5 text-blue-400" />
              <span>PRESSURE</span>
            </div>
            <div className="text-[10px] font-bold text-slate-200 tabular-nums">
              {pressure} <span className="text-[8px] text-slate-500 font-medium">atm</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1 text-[7.5px] text-slate-500">
              <Thermometer className="w-2.5 h-2.5 text-red-400" />
              <span>TEMP</span>
            </div>
            <div className="text-[10px] font-bold text-slate-200 tabular-nums">
              {temperature} <span className="text-[8px] text-slate-500 font-medium">°C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tracker timeline */}
      <div className="flex flex-col flex-1 relative pl-4 mt-4">
        {/* Dynamic vertical line */}
        <div className="absolute left-[30px] top-4 bottom-4 w-0.5 bg-slate-800" />

        {/* List of steps */}
        <div className="flex flex-col justify-between h-full relative z-10 py-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeSection === step.id;

            return (
              <div
                key={step.id}
                id={`sidebar-step-${step.id}`}
                onClick={() => onScrollTo(step.id)}
                className="flex items-center group cursor-pointer py-0.5"
              >
                {/* Visual marker */}
                <div className="flex items-center justify-center w-8 h-8 mr-3">
                  <div
                    className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 scale-110 shadow-lg shadow-cyan-500/30'
                        : 'w-4 h-4 bg-slate-700 group-hover:scale-125 group-hover:bg-slate-500'
                    }`}
                  >
                    {isActive && <Icon className="w-4 h-4 text-slate-950" />}
                  </div>
                </div>

                {/* Text labels */}
                <div className="flex flex-col">
                  <span
                    className={`text-[9px] font-mono leading-none tracking-widest ${
                      isActive ? 'text-cyan-400 font-bold' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  >
                    {step.depth}
                  </span>
                  <span
                    className={`text-[10px] font-sans font-semibold tracking-wide leading-tight ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar bottom signature */}
      <div id="sidebar-footer-info" className="pl-4 pt-3 border-t border-white/5 flex flex-col space-y-2">
        <p className="text-[9px] text-slate-500 leading-relaxed italic pr-2">
          "You are not just a visitor. You are a protector."
        </p>
        <div className="flex space-x-3 text-slate-500">
          <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="Instagram">
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="Twitter">
            <Twitter className="w-3.5 h-3.5" />
          </a>
          <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="Facebook">
            <Facebook className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </aside>
  );
}
