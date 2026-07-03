/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { threats } from '../data/oceanData';
import * as LucideIcons from 'lucide-react';

// Helper to resolve icon components dynamically
const getIconComponent = (iconName: string) => {
  if (iconName === 'ShoppingBag') return LucideIcons.Trash2;
  if (iconName === 'Compass') return LucideIcons.Anchor;
  if (iconName === 'Droplets') return LucideIcons.Droplet;
  if (iconName === 'Thermometer') return LucideIcons.Flame;
  if (iconName === 'Globe') return LucideIcons.Globe;
  if (iconName === 'Flame') return LucideIcons.Trees;
  return LucideIcons.AlertTriangle;
};

export default function ImpactSection() {
  const [activeThreatId, setActiveThreatId] = useState<string | null>(null);

  const getImpactColor = (level: 'Critical' | 'Severe' | 'Moderate') => {
    switch (level) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Severe':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Moderate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <section
      id="impact"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#030712] via-[#091515] to-[#010a12] flex flex-col justify-center overflow-hidden"
    >
      {/* Background glow resembling toxic or dark murky waters */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-700 rounded-full filter blur-[150px] animate-pulse duration-[12s]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-red-900 rounded-full filter blur-[120px] animate-pulse duration-[15s]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-20 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase bg-red-950/40 border border-red-800/30 px-3 py-1 rounded-full w-max inline-block">
            Crisis & Threats
          </span>
          <h2 id="impact-heading" className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
            HUMAN IMPACT
          </h2>
          <p id="impact-description" className="text-slate-300 text-base md:text-lg leading-relaxed">
            Our activities are breaking marine food webs. Plastic waste, unchecked industrial overharvesting, 
            and carbon warming are pushing marine ecosystems past their tipping points.
          </p>
        </div>

        {/* Threats Grid (3x2 or vertical) */}
        <div id="threats-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {threats.map((threat) => {
            const ThreatIcon = getIconComponent(threat.icon);
            const isExpanded = activeThreatId === threat.id;

            return (
              <div
                key={threat.id}
                id={`threat-card-${threat.id}`}
                onClick={() => setActiveThreatId(isExpanded ? null : threat.id)}
                className={`group p-6 bg-slate-900/40 border rounded-2xl backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isExpanded
                    ? 'border-red-500/40 shadow-xl shadow-red-500/5'
                    : 'border-white/5 hover:border-red-500/20'
                }`}
              >
                <div className="space-y-4">
                  {/* Top line with Icon and severity */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-slate-950 text-red-400 border border-red-500/10 group-hover:border-red-500/30 transition-colors">
                      <ThreatIcon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border rounded-full ${getImpactColor(
                        threat.impactLevel
                      )}`}
                    >
                      {threat.impactLevel} Impact
                    </span>
                  </div>

                  {/* Title and Stats */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-sans font-bold text-white group-hover:text-red-400 transition-colors">
                      {threat.title}
                    </h3>
                    <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-red-400">
                      <span>Rate:</span>
                      <span>{threat.stat}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-300 transition-colors">
                    {threat.description}
                  </p>
                </div>

                {/* Mitigation Helper Reveal */}
                <div
                  className={`mt-4 pt-4 border-t border-white/5 overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-xs font-mono font-semibold text-cyan-400 mb-1">
                    HOW WE PREVENT THIS:
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {threat.id === 'plastic' &&
                      'Transition to local plastic bans, fund harbor sea-bins, and promote cradle-to-grave circular materials.'}
                    {threat.id === 'overfishing' &&
                      'Establish strict global quotas, track satellite commercial transshipments, and eliminate fishing subsidies.'}
                    {threat.id === 'oilspills' &&
                      'Mandate double-hull shipping containers, accelerate offshore drilling shutdowns, and penalize negligence.'}
                    {threat.id === 'bleaching' &&
                      'Scale solar radiation management over key bays and cultivate high-heat resilient super corals.'}
                    {threat.id === 'climatechange' &&
                      'Dramatically curb greenhouse emissions, electrify regional grids, and protect blue-carbon kelp basins.'}
                    {threat.id === 'habitat' &&
                      'Ban bottom trawling, restore coastal mangrove marshes, and regulate deep-sea mining exploration.'}
                  </p>
                </div>

                {/* Learn More Toggle indicator */}
                <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                  <span>Click to {isExpanded ? 'collapse' : 'view solution focus'}</span>
                  <LucideIcons.ArrowUpRight
                    className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-red-400' : ''}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating warning fact box */}
        <div className="p-6 bg-red-950/20 border border-red-500/10 rounded-2xl backdrop-blur-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6 animate-float-delayed shadow-lg shadow-red-950/30">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-950 border border-red-800/40 rounded-xl text-red-400 animate-pulse">
              <LucideIcons.AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-sans font-bold text-white">The Clock is Ticking</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every hour we wait, another 1,000 tons of plastic is dumped, and another coral reef colony faces bleaching.
              </p>
            </div>
          </div>
          <button
            id="emergency-pledge-btn"
            onClick={() => {
              const el = document.getElementById('pledge');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-red-500 hover:bg-red-400 active:bg-red-600 text-slate-950 font-bold text-xs rounded-xl uppercase tracking-wider transition-all duration-200 cursor-pointer"
          >
            Acknowledge & Protect
          </button>
        </div>

      </div>
    </section>
  );
}
