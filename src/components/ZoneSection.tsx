/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { OceanZone, Species } from '../types';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MovingCreatures from './MovingCreatures';
import SafeImage from './SafeImage';
import LightRays from './LightRays';
import RealisticJellyfish from './RealisticJellyfish';
import RealisticFish from './RealisticFish';
import RealisticSubmarineAndDivers from './RealisticSubmarineAndDivers';

import RealisticAnglerfish from './RealisticAnglerfish';
import RealisticLanternfish from './RealisticLanternfish';
import RealisticClownfish from './RealisticClownfish';
import RealisticSquid from './RealisticSquid';
import RealisticTurtle from './RealisticTurtle';
import RealisticBarracuda from './RealisticBarracuda';



interface ZoneSectionProps {
  zone: OceanZone;
  key?: string;
}

// Helper to resolve icon components dynamically
const getIconComponent = (iconName: string) => {
  // Safe lookup with fallbacks
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.HelpCircle;
};

export default function ZoneSection({ zone }: ZoneSectionProps) {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [glowIntensity, setGlowIntensity] = useState<number>(85);
  const [isLuminescent, setIsLuminescent] = useState<boolean>(true);
  const [sonarActive, setSonarActive] = useState<boolean>(false);

  // Listen to global sonar pings to activate local high-intensity bioluminescent glow
  useEffect(() => {
    let timer: any;
    const handleSonarPing = () => {
      setSonarActive(true);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setSonarActive(false);
      }, 3000);
    };

    window.addEventListener('sonar-ping', handleSonarPing);
    return () => {
      window.removeEventListener('sonar-ping', handleSonarPing);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Background style based on the zone
  const getBackgroundStyle = (id: string) => {
    switch (id) {
      case 'sunlight':
        return 'bg-gradient-to-b from-[#0a1e3f] via-[#052b5e] to-[#01142e]';
      case 'twilight':
        return 'bg-gradient-to-b from-[#01142e] via-[#01091a] to-[#01050f]';
      case 'midnight':
        return 'bg-gradient-to-b from-[#01050f] via-[#000208] to-slate-950';
      case 'abyss':
        return 'bg-gradient-to-b from-slate-950 via-[#010103] to-[#030712]';
      default:
        return 'bg-slate-950';
    }
  };

  return (
    <section
      id={zone.id}
      className={`relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden transition-colors duration-1000 ${getBackgroundStyle(
        zone.id
      )}`}
    >
      {/* Animated background creatures representing the zone's wildlife */}
      <MovingCreatures zoneId={zone.id} />

      {/* Underwater volumetric God Rays filtering from top */}
      {zone.id === 'sunlight' && <LightRays />}

      {/* Visual background lights representing ocean depths */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {zone.id === 'sunlight' && (
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-400 rounded-full filter blur-[150px]" />
        )}
        {zone.id === 'twilight' && (
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500 rounded-full filter blur-[130px] animate-pulse duration-[8s]" />
        )}
        {zone.id === 'midnight' && (
          <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-blue-600 rounded-full filter blur-[120px] animate-pulse duration-[10s]" />
        )}
        {zone.id === 'abyss' && (
          <div className="absolute top-1/2 right-10 w-[250px] h-[250px] bg-teal-500 rounded-full filter blur-[140px]" />
        )}
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20 items-center">
        
        {/* Left Column: Zone Metadata and Badges (Span 5) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase bg-cyan-950/40 border border-cyan-800/30 px-3 py-1 rounded-full w-max inline-block">
              {zone.depthRange}
            </span>
            <h2 id={`title-${zone.id}`} className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
              {zone.name}
            </h2>
          </div>

          <p id={`desc-${zone.id}`} className="text-slate-300 text-base leading-relaxed">
            {zone.description}
          </p>

          {/* Badges Grid (2x2) */}
          <div id={`badges-grid-${zone.id}`} className="grid grid-cols-2 gap-4">
            {zone.badges.map((badge, idx) => {
              const BadgeIcon = getIconComponent(badge.icon);
              return (
                <div
                  key={`badge-${zone.id}-${idx}`}
                  className="flex items-center space-x-3 p-3 bg-slate-900/40 border border-white/5 rounded-xl backdrop-blur-sm hover:border-cyan-500/20 hover:bg-slate-900/60 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-cyan-950/50 text-cyan-400">
                    <BadgeIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 tracking-wide">{badge.label}</span>
                </div>
              );
            })}
          </div>

          {/* Core CSS Animation Illustration Overlay */}
          <div className="mt-6 flex justify-center lg:justify-start">
            {zone.id === 'sunlight' && (
              <div className="relative w-full h-56 flex items-center justify-start overflow-visible">
                {/* Real-life animated tropical Fish */}
                <div className="relative w-36 h-48 flex items-center justify-center bg-cyan-950/20 border border-cyan-500/10 rounded-2xl p-2 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-sm">
                  <RealisticFish sizeClass="w-32 h-32" />
                </div>
                <div className="ml-6 flex flex-col justify-center">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/30 w-max mb-1.5 animate-pulse">
                    ACTIVE NEKTON
                  </span>
                  <div className="text-sm text-cyan-200 font-mono font-medium leading-none">
                    Acanthurus Coeruleus
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans mt-1.5 max-w-[180px] leading-relaxed">
                    A brilliant tropical tang riding the warm, sunlit epipelagic currents of the coral reef.
                  </div>
                </div>
              </div>
            )}

            {zone.id === 'twilight' && (
              <div className="relative w-full h-56 flex items-center justify-start overflow-visible">
                {/* Real-life animated glowing Jellyfish */}
                <div className="relative w-36 h-48 flex items-center justify-center bg-indigo-950/20 border border-indigo-500/10 rounded-2xl p-2 shadow-[inset_0_0_20px_rgba(168,85,247,0.15)] backdrop-blur-sm">
                  <RealisticJellyfish glowIntensity={85} isLuminescent={true} />
                </div>
                <div className="ml-6 flex flex-col justify-center">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-800/30 w-max mb-1.5">
                    BIOLUMINESCENT
                  </span>
                  <div className="text-sm text-indigo-200 font-mono font-medium leading-none">
                    Deep Sea Medusozoa
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans mt-1.5 max-w-[180px] leading-relaxed">
                    Emits soft lavender light via glowing chemical photoproteins to blend in twilight depths.
                  </div>
                </div>
              </div>
            )}

            {zone.id === 'midnight' && (
              <div className="relative w-full h-56 flex items-center justify-start overflow-visible">
                {/* Real-life animated Submarine and deep sea Divers */}
                <div className="relative w-40 h-48 flex items-center justify-center bg-blue-950/20 border border-blue-500/10 rounded-2xl p-2 shadow-[inset_0_0_20px_rgba(30,58,138,0.25)] backdrop-blur-sm">
                  <RealisticSubmarineAndDivers sizeClass="w-36 h-40" />
                </div>
                <div className="ml-6 flex flex-col justify-center">
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-950/50 px-2 py-0.5 rounded border border-blue-800/30 w-max mb-1.5 animate-pulse">
                    CREWED DIVE
                  </span>
                  <div className="text-sm text-blue-200 font-mono font-medium leading-none">
                    DSV Alvin & Explorers
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans mt-1.5 max-w-[180px] leading-relaxed">
                    Manned deep ocean submersibles and heavy atmospheric divers scanning the lightless bathypelagic plains.
                  </div>
                </div>
              </div>
            )}

            {zone.id === 'abyss' && (
              <div className="relative w-full h-48 flex items-center justify-start overflow-visible">
                {/* Advanced Submarine CSS animation */}
                <div className="relative w-40 h-24 animate-bounce duration-[6s] flex flex-col justify-center">
                  <div className="w-24 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full relative shadow-lg shadow-teal-500/20">
                    {/* Submarine sail/conning tower */}
                    <div className="absolute -top-3 left-8 w-6 h-4 bg-teal-600 rounded-t-lg" />
                    <div className="absolute -top-4 left-12 w-1 h-3 bg-slate-400" />
                    {/* Propeller */}
                    <div className="absolute -left-2 top-4 w-2 h-4 bg-slate-600 rounded animate-spin duration-[0.5s]" />
                    {/* Headlights and spotlight cones */}
                    <div className="absolute -right-1 top-4 w-3 h-4 bg-yellow-300 rounded-r-lg" />
                    {/* Spotlight Cone */}
                    <div className="absolute left-24 top-0 w-32 h-16 bg-gradient-to-r from-yellow-300/30 to-transparent clip-path-spotlight transform rotate-3" />
                  </div>
                </div>
                <div className="ml-16 text-xs text-teal-400/70 font-mono italic">
                  * Submersible mapping bathymetry *
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Species Grid Component (Span 7) */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          
          {/* Species Interactive Card */}
          <div className="p-6 bg-slate-900/35 border border-white/5 rounded-2xl backdrop-blur-md relative overflow-hidden">
            {/* Top row with Title and Filter tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
              <h3 className="text-lg font-sans font-extrabold text-white flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Interact with deep-sea specimens</span>
              </h3>
              
              {/* Filter tabs */}
              <div className="flex space-x-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setSelectedSpecies(null)}
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    !selectedSpecies
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Grid view
                </button>
                {zone.species.slice(0, 3).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSpecies(s)}
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      selectedSpecies?.id === s.id
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* If no species is selected, show the full Grid with hover cards */}
            <AnimatePresence mode="wait">
              {!selectedSpecies ? (
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  {zone.species.map((s, idx) => (
                    <motion.div
                      key={s.id}
                      id={`species-card-${s.id}`}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSpecies(s)}
                      className="flex flex-col items-center p-4 bg-slate-950/60 hover:bg-cyan-950/20 border border-white/5 hover:border-cyan-400/50 rounded-xl transition-all duration-300 cursor-pointer text-center group relative overflow-hidden"
                    >
                      {/* Interactive shine overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      {/* Image Frame */}
                      <div className="relative w-18 h-18 rounded-full overflow-hidden border-2 border-slate-800 group-hover:border-cyan-400 transition-all duration-300 mb-3 shadow-lg shadow-black/40">
                        <SafeImage
                          src={s.image}
                          alt={s.name}
                          speciesId={s.id}
                          className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                        />
                      </div>
                      
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {s.name}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 group-hover:text-cyan-400/70 italic mt-0.5 leading-none">
                        {s.scientificName}
                      </span>

                      {/* Click indicator pill */}
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cyan-500/10 border border-cyan-400/20 px-2 py-0.5 rounded text-[8px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                        Interrogate
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                /* Interactive Spotlight Specimen Viewer */
                <motion.div
                  key="spotlight-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950/50 p-4 rounded-xl border border-white/5"
                >
                  {/* Left Column of Spotlight - Image & Glow controls */}
                  <div className="md:col-span-5 flex flex-col items-center space-y-4">
                    <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/10 group shadow-2xl">
                      {selectedSpecies.id === 'jellyfish' ? (
                        <div className="w-full h-full bg-[#020617] flex items-center justify-center p-2 relative overflow-hidden">
                          <RealisticJellyfish 
                            glowIntensity={glowIntensity} 
                            isLuminescent={isLuminescent} 
                            sonarActive={sonarActive}
                            sizeClass="w-[140px] h-[170px]"
                          />
                        </div>
                      ) : selectedSpecies.id === 'anglerfish' ? (
                        <div className="w-full h-full bg-[#020617] flex items-center justify-center p-2 relative overflow-hidden">
                          <RealisticAnglerfish 
                            glowIntensity={glowIntensity} 
                            isLuminescent={isLuminescent} 
                            sonarActive={sonarActive}
                            sizeClass="w-[140px] h-[170px]"
                          />
                        </div>
                      ) : selectedSpecies.id === 'lanternfish' ? (
                        <div className="w-full h-full bg-[#020617] flex items-center justify-center p-2 relative overflow-hidden">
                          <RealisticLanternfish 
                            glowIntensity={glowIntensity} 
                            isLuminescent={isLuminescent} 
                            sonarActive={sonarActive}
                            sizeClass="w-[140px] h-[170px]"
                          />
                        </div>
                      ) : selectedSpecies.id === 'clownfish' ? (
                        <div className="w-full h-full bg-[#020617] flex items-center justify-center p-2 relative overflow-hidden">
                          <RealisticClownfish 
                            glowIntensity={glowIntensity} 
                            isLuminescent={isLuminescent} 
                            sonarActive={sonarActive}
                            sizeClass="w-[140px] h-[170px]"
                          />
                        </div>
                      ) : selectedSpecies.id === 'squid' ? (
                        <div className="w-full h-full bg-[#020617] flex items-center justify-center p-2 relative overflow-hidden">
                          <RealisticSquid 
                            glowIntensity={glowIntensity} 
                            isLuminescent={isLuminescent} 
                            sonarActive={sonarActive}
                            sizeClass="w-[140px] h-[170px]"
                          />
                        </div>
                      ) : selectedSpecies.id === 'seaturtle' ? (
                        <div className="w-full h-full bg-[#020617] flex items-center justify-center p-2 relative overflow-hidden">
                          <RealisticTurtle 
                            glowIntensity={glowIntensity} 
                            isLuminescent={isLuminescent} 
                            sonarActive={sonarActive}
                            sizeClass="w-[140px] h-[170px]"
                          />
                        </div>
                      ) : selectedSpecies.id === 'barracuda' ? (
                        <div className="w-full h-full bg-[#020617] flex items-center justify-center p-2 relative overflow-hidden">
                          <RealisticBarracuda 
                            glowIntensity={glowIntensity} 
                            isLuminescent={isLuminescent} 
                            sonarActive={sonarActive}
                            sizeClass="w-[140px] h-[170px]"
                          />
                        </div>
                      ) : (
                        <SafeImage
                          src={selectedSpecies.image}
                          alt={selectedSpecies.name}
                          speciesId={selectedSpecies.id}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      
                      {/* Scanning visual overlay */}
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400 animate-scanner" />
                      
                      {/* Dynamic Live Bioluminescence Overlay */}
                      {isLuminescent && (
                        <div 
                          className="absolute inset-0 bg-cyan-400/20 mix-blend-color-dodge pointer-events-none transition-all duration-300"
                          style={{ 
                            opacity: glowIntensity / 100,
                            boxShadow: `inset 0 0 ${glowIntensity / 2}px rgba(34, 211, 238, 0.5)`
                          }}
                        />
                      )}

                      {/* Interactive Sonar Sweep Ping Wave */}
                      {sonarActive && (
                        <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none flex items-center justify-center">
                          <div className="absolute w-20 h-20 border-2 border-cyan-400 rounded-full animate-ping" />
                          <div className="absolute w-40 h-40 border border-cyan-500/40 rounded-full animate-ping duration-1500" />
                        </div>
                      )}

                      <span className="absolute bottom-3 left-3 bg-slate-900/90 text-[9px] font-mono text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30 font-bold uppercase tracking-widest">
                        LIVE SPECIMEN FEED
                      </span>
                    </div>

                    {/* Interactive Simulator: Bioluminescence Trigger */}
                    <div className="w-full p-3 bg-slate-900/60 border border-white/5 rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                          Glow simulation
                        </span>
                        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isLuminescent ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`} />
                      </div>
                      
                      {/* Interactive slide controls to simulate glowing */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono text-slate-400">
                          <span>Intensity</span>
                          <span className="text-cyan-400 font-bold">{glowIntensity}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={glowIntensity}
                          onChange={(e) => setGlowIntensity(Number(e.target.value))}
                          disabled={!isLuminescent}
                          className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => setIsLuminescent(!isLuminescent)}
                          className={`px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded border transition-all cursor-pointer ${
                            isLuminescent 
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' 
                              : 'bg-slate-950 text-slate-500 border-white/5'
                          }`}
                        >
                          {isLuminescent ? 'Deactivate Glow' : 'Power Glow'}
                        </button>

                        <button
                          onClick={() => {
                            setSonarActive(true);
                            setTimeout(() => setSonarActive(false), 2000);
                          }}
                          disabled={sonarActive}
                          className="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded border border-white/10 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white transition-all cursor-pointer disabled:opacity-40"
                        >
                          {sonarActive ? 'Sonar Pinging...' : 'Sonar Sweep'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column of Spotlight - Stats & Descriptions */}
                  <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xl font-sans font-black text-white leading-none">
                            {selectedSpecies.name}
                          </h4>
                          <p className="text-xs font-mono text-cyan-400/80 italic mt-1">
                            {selectedSpecies.scientificName}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedSpecies(null)}
                          className="p-1 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                          title="Back to grid"
                        >
                          <LucideIcons.Grid className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-slate-300 text-xs leading-relaxed">
                        {selectedSpecies.description}
                      </p>

                      {/* Custom Simulated Stats Bar */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-2.5 bg-slate-900/40 rounded-lg border border-white/5">
                          <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">Ecosystem Status</span>
                          <span className="text-xs font-bold text-white flex items-center space-x-1.5 mt-1">
                            <LucideIcons.ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Protected</span>
                          </span>
                        </div>

                        <div className="p-2.5 bg-slate-900/40 rounded-lg border border-white/5">
                          <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">Estimated Lifespan</span>
                          <span className="text-xs font-bold text-white flex items-center space-x-1.5 mt-1">
                            <LucideIcons.Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
                            <span>
                              {selectedSpecies.id === 'clownfish' && '6 - 10 years'}
                              {selectedSpecies.id === 'parrotfish' && '5 - 7 years'}
                              {selectedSpecies.id === 'seaturtle' && '80+ years'}
                              {selectedSpecies.id === 'dolphin' && '40 - 50 years'}
                              {selectedSpecies.id === 'jellyfish' && '1 - 3 years'}
                              {selectedSpecies.id === 'lanternfish' && '1 year'}
                              {selectedSpecies.id === 'squid' && '3 - 5 years'}
                              {selectedSpecies.id === 'combjelly' && '1 year'}
                              {selectedSpecies.id === 'anglerfish' && '15 - 20 years'}
                              {selectedSpecies.id === 'vampiresquid' && '8 - 12 years'}
                              {selectedSpecies.id === 'giantsquid' && '5 years'}
                              {selectedSpecies.id === 'barracuda' && '14 years'}
                              {!['clownfish','parrotfish','seaturtle','dolphin','jellyfish','lanternfish','squid','combjelly','anglerfish','vampiresquid','giantsquid','barracuda'].includes(selectedSpecies.id) && 'Varies'}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-3 border-t border-white/5">
                      <button
                        onClick={() => setSelectedSpecies(null)}
                        className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                      >
                        Return to grid
                      </button>
                      <button
                        onClick={() => {
                          const el = document.getElementById('pledge');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                      >
                        Pledge Support
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Did You Know? / Fact Card */}
          <div className="p-6 bg-gradient-to-r from-slate-900/60 to-cyan-950/20 border border-cyan-500/10 rounded-2xl backdrop-blur-md flex items-start space-x-4 animate-float-delayed shadow-lg shadow-cyan-950/40">
            <div className="p-3 bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 rounded-xl">
              <LucideIcons.Info className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase mb-1">
                {zone.factTitle}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {zone.factText}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Species Detail Modal */}
      <AnimatePresence>
        {selectedSpecies && (
          <div
            id="species-detail-overlay"
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSpecies(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              id="species-detail-modal"
              className="bg-slate-900 border border-cyan-500/30 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Image */}
              <div className="relative h-56 w-full">
                <SafeImage
                  src={selectedSpecies.image}
                  alt={selectedSpecies.name}
                  speciesId={selectedSpecies.id}
                  className="w-full h-full object-cover"
                />
                <button
                  id="close-modal-btn"
                  onClick={() => setSelectedSpecies(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-950/80 hover:bg-slate-950 text-white rounded-full border border-white/10 hover:border-cyan-400 transition-all"
                >
                  <LucideIcons.X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    {zone.name} Specimen
                  </span>
                  <h3 id="modal-species-name" className="text-2xl font-sans font-extrabold text-white mt-1">
                    {selectedSpecies.name}
                  </h3>
                  <p id="modal-species-sci" className="text-xs font-mono text-slate-400 italic">
                    {selectedSpecies.scientificName}
                  </p>
                </div>

                <p id="modal-species-desc" className="text-slate-300 text-sm leading-relaxed">
                  {selectedSpecies.description}
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <LucideIcons.Shield className="w-4 h-4 text-cyan-400" />
                    <span>Protected under Ocean Guard initiatives</span>
                  </div>
                  <button
                    id="modal-acknowledge-btn"
                    onClick={() => setSelectedSpecies(null)}
                    className="px-4 py-2 bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-800 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
