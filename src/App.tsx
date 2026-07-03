/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { oceanZones } from './data/oceanData';
import Header from './components/Header';
import SidebarTracker from './components/SidebarTracker';
import ZoneSection from './components/ZoneSection';
import ImpactSection from './components/ImpactSection';
import SolutionsSection from './components/SolutionsSection';
import PledgeSection from './components/PledgeSection';
import SpeciesSection from './components/SpeciesSection';
import WaterPredictor from './components/WaterPredictor';
import OceanParticles from './components/OceanParticles';
import SafeImage from './components/SafeImage';
import LightRays from './components/LightRays';
import SilverBorders from './components/SilverBorders';
import HeroBubbles from './components/HeroBubbles';
import AudioHydrophone from './components/AudioHydrophone';
import CinematicMovieCam from './components/CinematicMovieCam';
import UnderwaterTransition from './components/UnderwaterTransition';


export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScanning, setIsScanning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Elegant minor delay on mount to allow CSS and images to initialize smoothly
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Listen to global sonar-ping events to trigger fullscreen laser sweep
  useEffect(() => {
    let timer: any;
    const handleSonarPing = () => {
      setIsScanning(false); // reset if active
      // Trigger a microscopic reflow to restart animation if clicked twice
      setTimeout(() => {
        setIsScanning(true);
      }, 50);

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setIsScanning(false);
      }, 3000);
    };

    window.addEventListener('sonar-ping', handleSonarPing);
    return () => {
      window.removeEventListener('sonar-ping', handleSonarPing);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (sectionId: string) => {
    // Treat 'species-nav' specially (scrolls to the top sunlight zone)
    const targetId = sectionId === 'species-nav' ? 'sunlight' : sectionId;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Intersection Observer to detect current active section in viewport
  useEffect(() => {
    const sections = ['hero', 'sunlight', 'twilight', 'midnight', 'abyss', 'species', 'impact', 'water-scanner', 'solutions', 'pledge'];
    
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          // Trigger when 40% of the section is visible
          threshold: 0.35,
          rootMargin: '-10% 0px -40% 0px',
        }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  return (
    <div id="app-root" className="bg-slate-950 text-white min-h-screen relative selection:bg-cyan-500 selection:text-slate-950 font-sans">
      
      {/* Fullscreen Laser Sonar Scan Line Sweep */}
      {isScanning && (
        <div className="fixed left-0 right-0 h-14 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent blur-md border-y border-cyan-400/60 z-50 pointer-events-none animate-scan-line shadow-[0_0_35px_rgba(6,182,212,0.6)]" />
      )}

      {/* Procedural Audio Synthesizer and Hydrophone Panel */}
      <AudioHydrophone />

      {/* Cinematic Movie Mode Scope and Submersible HUD Overlays */}
      <CinematicMovieCam />

      {/* Cinematic Fullscreen Ocean Depth Transition Wipe & Bubbles */}
      <UnderwaterTransition activeSection={activeSection} />

      {/* Global Silver Glowing Border Frame around all pages */}
      <SilverBorders />

      {/* Floating Canvas Ocean Particles / Bubbles */}
      {/* Slightly more visible during scans for high tech scattering look */}
      <div className={`transition-opacity duration-500 ${isScanning ? 'opacity-100 scale-[1.01]' : 'opacity-85'}`}>
        <OceanParticles />
      </div>

      {/* Glassmorphism Header */}
      <Header onScrollTo={handleScrollTo} activeSection={activeSection} />

      {/* Left Sidebar Depth Progress Tracker (Desktop only) */}
      <SidebarTracker activeSection={activeSection} onScrollTo={handleScrollTo} />

      {/* Main Sections */}
      <main className="xl:pl-[200px]">
        
        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-slate-950"
        >
          {/* Stunning High-Resolution Hero Background */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src="https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1920&q=80"
              alt="Majestic green sea turtle swimming in light-pierced deep ocean water"
              speciesId="seaturtle"
              className="w-full h-full object-cover opacity-60 mix-blend-lighten scale-105 animate-pulse duration-[8s]"
            />
            {/* Direct gradient overlays for rich deep blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3f] via-transparent to-slate-950/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1e3f]" />
            
            {/* Shimmering God Rays */}
            <LightRays />

            {/* Glowing, floating bubbles overlay */}
            <HeroBubbles />
          </div>

          {/* Copy and CTA */}
          <div className="relative z-10 max-w-4xl space-y-6">
            <p 
              id="hero-tagline" 
              className={`text-sm md:text-base font-serif italic text-cyan-300 tracking-wider transition-all duration-1000 ease-out delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              Dive Into Wonder
            </p>
            <h1 
              id="hero-title" 
              className={`text-5xl md:text-8xl font-sans font-extrabold tracking-tight text-white leading-none transition-all duration-[1200ms] ease-out delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              UNDERWATER
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                WORLD
              </span>
            </h1>
            <p 
              id="hero-subtitle" 
              className={`text-slate-300 text-sm md:text-lg tracking-wide max-w-lg mx-auto font-medium transition-all duration-1000 ease-out delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Scroll down and explore the hidden beauty of our ocean
            </p>

            {/* Bouncing down indicator */}
            <div 
              className={`pt-10 transition-all duration-1000 ease-out delay-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                id="hero-scroll-btn"
                onClick={() => handleScrollTo('sunlight')}
                className="inline-flex items-center justify-center p-3 rounded-full border border-white/15 bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all duration-300 animate-bounce cursor-pointer"
                aria-label="Scroll to Sunlight Zone"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* OCEAN ZONES */}
        {oceanZones.map((zone) => (
          <ZoneSection key={zone.id} zone={zone} />
        ))}

        {/* ENDANGERED MARINE SPECIES SECTION */}
        <SpeciesSection />

        {/* HUMAN IMPACT SECTION */}
        <ImpactSection />

        {/* WATER PREDICTOR SECTION */}
        <div id="water-scanner">
          <WaterPredictor />
        </div>

        {/* CONSERVATION SOLUTIONS SECTION */}
        <SolutionsSection />

        {/* PLEDGE SECTION */}
        <PledgeSection />

        {/* CONCLUDING FOOTER */}
        <footer id="app-footer" className="bg-slate-950 border-t border-white/5 py-12 px-6 text-center text-xs text-slate-500 relative z-20 space-y-4">
          <div className="flex justify-center space-x-6 text-slate-400 mb-2">
            <button onClick={() => handleScrollTo('hero')} className="hover:text-cyan-400 cursor-pointer">Surface</button>
            <button onClick={() => handleScrollTo('sunlight')} className="hover:text-cyan-400 cursor-pointer">Sunlight Zone</button>
            <button onClick={() => handleScrollTo('twilight')} className="hover:text-cyan-400 cursor-pointer">Twilight Zone</button>
            <button onClick={() => handleScrollTo('midnight')} className="hover:text-cyan-400 cursor-pointer">Midnight Zone</button>
            <button onClick={() => handleScrollTo('abyss')} className="hover:text-cyan-400 cursor-pointer">The Abyss</button>
            <button onClick={() => handleScrollTo('water-scanner')} className="hover:text-cyan-400 cursor-pointer">Water Scanner</button>
          </div>
          <p id="footer-copyright">
            © {new Date().getFullYear()} Ocean Guard Alliance. All rights reserved. Registered Marine Sanctuary Initiative.
          </p>
          <p id="footer-citation" className="text-[10px] text-slate-600 italic">
            "We are tied to the ocean. And when we go back to the sea, whether it is to sail or to watch - we are going back from whence we came."
          </p>
        </footer>

      </main>
    </div>
  );
}
