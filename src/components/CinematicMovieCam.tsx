/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Film, Video, Eye, EyeOff, Subtitles, Compass, Maximize2, Sparkles, Activity } from 'lucide-react';

interface Quote {
  text: string;
  author: string;
}

const CINEMATIC_QUOTES: Quote[] = [
  { text: "The sea, once it casts its spell, holds one in its net of wonder forever.", author: "Jacques Cousteau" },
  { text: "With every drop of water you drink, every breath you take, you are connected to the sea.", author: "Sylvia Earle" },
  { text: "The deep ocean is like another planet, but it is our planet.", author: "James Cameron" },
  { text: "We need to respect the oceans and take care of them as if our lives depended on it. Because they do.", author: "Sylvia Earle" },
  { text: "Man carries that mysterious oceanic rhythm deep within his very blood.", author: "Loren Eiseley" },
  { text: "The sea is as near as we come to another world.", author: "Anne Stevenson" },
  { text: "In the deep, life is not just surviving—it is writing a glowing language of light.", author: "Abyssal Biologist" }
];

export default function CinematicMovieCam() {
  const [isCinematic, setIsCinematic] = useState(false);
  const [showHUD, setShowHUD] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const [recordTime, setRecordTime] = useState("00:00:00");
  const [currentCoordinates, setCurrentCoordinates] = useState({ lat: "20.4820", lng: "-157.8492" });

  // Update recording timestamp
  useEffect(() => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
      const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      setRecordTime(`${hrs}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Slowly shuffle coordinates to mimic drifting submarine
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCoordinates(prev => {
        const latNum = parseFloat(prev.lat) + (Math.random() - 0.5) * 0.0005;
        const lngNum = parseFloat(prev.lng) + (Math.random() - 0.5) * 0.0005;
        return {
          lat: latNum.toFixed(4),
          lng: lngNum.toFixed(4)
        };
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle subtitle cycling
  useEffect(() => {
    if (!isCinematic || !showSubtitles) return;

    const interval = setInterval(() => {
      // Fade out
      setFadeState('out');
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % CINEMATIC_QUOTES.length);
        setFadeState('in');
      }, 1000); // Wait for fade-out to finish
    }, 7000); // Cycle every 7 seconds

    return () => clearInterval(interval);
  }, [isCinematic, showSubtitles]);

  // Toggle global class on root container for styles to adapt
  useEffect(() => {
    const root = document.getElementById('app-root');
    if (!root) return;
    if (isCinematic) {
      root.classList.add('cinematic-active');
    } else {
      root.classList.remove('cinematic-active');
    }
    return () => {
      root.classList.remove('cinematic-active');
    };
  }, [isCinematic]);

  // Helper to trigger deep theatrical rumble sound if active
  const toggleCinematic = () => {
    const nextState = !isCinematic;
    setIsCinematic(nextState);

    // Trigger a high-tech click sound / deep rumble trigger via custom event
    const sonarEvent = new CustomEvent('sonar-ping', { 
      detail: { time: Date.now(), isTheatrical: true } 
    });
    window.dispatchEvent(sonarEvent);
  };

  return (
    <>
      {/* 1. Cinematic Widescreen Letterbox Bars */}
      <div 
        id="cinema-bar-top"
        className={`fixed top-0 left-0 right-0 bg-slate-950 z-40 transition-all duration-1000 ease-in-out pointer-events-none ${
          isCinematic ? 'h-[9vh] border-b border-white/5 shadow-2xl' : 'h-0'
        }`}
      />
      <div 
        id="cinema-bar-bottom"
        className={`fixed bottom-0 left-0 right-0 bg-slate-950 z-40 transition-all duration-1000 ease-in-out pointer-events-none ${
          isCinematic ? 'h-[9vh] border-t border-white/5 shadow-2xl' : 'h-0'
        }`}
      />

      {/* 2. Panoramic Cinema Camera Viewfinder Overlays (HUD) */}
      {isCinematic && showHUD && (
        <div 
          id="cinema-hud-container" 
          className="fixed inset-0 z-30 pointer-events-none font-mono text-[10px] text-cyan-400/60 select-none flex flex-col justify-between p-6 sm:p-12 transition-all duration-700"
        >
          {/* Top Row Indicators */}
          <div className="flex justify-between items-start mt-[8vh]">
            {/* Recording Indicator */}
            <div className="flex items-center space-x-2 bg-slate-950/40 px-3 py-1.5 rounded-md border border-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold tracking-widest text-slate-200">● REC</span>
              <span className="text-slate-400">24FPS</span>
              <span className="text-slate-500">|</span>
              <span className="text-cyan-300 tracking-wider font-sans tabular-nums">{recordTime}</span>
            </div>

            {/* Submarine Sensor Status */}
            <div className="flex flex-col items-end text-right space-y-1 bg-slate-950/40 px-3 py-1.5 rounded-md border border-white/5 backdrop-blur-sm">
              <div className="flex items-center space-x-1.5 font-bold tracking-wider text-cyan-300">
                <Compass className="w-3.5 h-3.5 animate-spin duration-[15s]" />
                <span>CHALLENGER-IV COUSTEAU CAM</span>
              </div>
              <div className="text-[9px] text-slate-400">
                LAT: <span className="text-white tabular-nums">{currentCoordinates.lat}° N</span> | LNG: <span className="text-white tabular-nums">{currentCoordinates.lng}° W</span>
              </div>
            </div>
          </div>

          {/* Center Crosshair Viewfinder */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-40">
            {/* Center Focus Crosshair */}
            <div className="w-10 h-10 border border-cyan-400/40 rounded-full relative flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-cyan-400/70 rounded-full" />
              <div className="absolute w-4 h-0.5 bg-cyan-400/40" />
              <div className="absolute h-4 w-0.5 bg-cyan-400/40" />
            </div>

            {/* Corner Bracket Frame indicators */}
            <div className="absolute w-[280px] h-[180px] sm:w-[450px] sm:h-[280px] flex justify-between flex-col">
              <div className="flex justify-between w-full">
                <div className="w-6 h-6 border-t border-l border-cyan-400/30" />
                <div className="w-6 h-6 border-t border-r border-cyan-400/30" />
              </div>
              <div className="flex justify-between w-full">
                <div className="w-6 h-6 border-b border-l border-cyan-400/30" />
                <div className="w-6 h-6 border-b border-r border-cyan-400/30" />
              </div>
            </div>
          </div>

          {/* Bottom Row Information */}
          <div className="flex justify-between items-end mb-[8vh]">
            <div className="flex space-x-4 text-[9px] text-slate-400 bg-slate-950/40 px-3 py-1.5 rounded-md border border-white/5 backdrop-blur-sm">
              <div>
                APERTURE: <span className="text-white font-bold">f/2.8 L</span>
              </div>
              <div>
                ISO: <span className="text-white font-bold">3200 (LOW NOISE)</span>
              </div>
              <div>
                SHUTTER: <span className="text-white font-bold">1/48s</span>
              </div>
              <div>
                LENS: <span className="text-cyan-300 font-bold">18mm ANAMORPHIC</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[9px] bg-slate-950/40 px-3 py-1.5 rounded-md border border-white/5 backdrop-blur-sm">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-slate-400">IMAX 4K BROADCAST</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">ONLINE</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Captions and Ocean Quotes (Subtitles Overlay) */}
      {isCinematic && showSubtitles && (
        <div 
          id="cinema-subtitles-bar"
          className="fixed bottom-[11vh] left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none text-center max-w-xl sm:max-w-2xl px-6"
        >
          <div 
            className={`transition-all duration-1000 ease-in-out ${
              fadeState === 'in' ? 'opacity-90 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-2 scale-[0.98]'
            }`}
          >
            <p className="font-sans font-medium text-white text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-wide italic">
              "{CINEMATIC_QUOTES[quoteIndex].text}"
            </p>
            <p className="font-mono text-[9px] sm:text-[10px] text-cyan-400 mt-1.5 uppercase tracking-widest font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
              — {CINEMATIC_QUOTES[quoteIndex].author}
            </p>
          </div>
        </div>
      )}

      {/* 4. Film Grain / Underwater Chromatic Distortion overlay */}
      <div 
        id="cinema-grain-vignette"
        className={`fixed inset-0 pointer-events-none transition-all duration-1000 z-30 ${
          isCinematic 
            ? 'opacity-85 mix-blend-overlay shadow-[inset_0_0_120px_rgba(0,0,0,0.95)]' 
            : 'opacity-0 shadow-none'
        }`}
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(2,6,23,0.85) 100%)`,
        }}
      />

      {/* 5. Cinematic Director HUD Toggle Floating Console */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center pointer-events-auto select-none">
        <div className="flex items-center bg-slate-950/90 border border-white/10 rounded-full p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          
          {/* Main Cinematic Mode Toggle Button */}
          <button
            onClick={toggleCinematic}
            id="director-cinematic-btn"
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-widest cursor-pointer transition-all duration-300 ${
              isCinematic 
                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/20' 
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:scale-105'
            }`}
          >
            <Film className={`w-3.5 h-3.5 ${isCinematic ? 'animate-spin duration-[10s]' : ''}`} />
            <span>{isCinematic ? 'Cinema ON' : 'IMAX Theater'}</span>
          </button>

          {/* Quick HUD & Subtitle controllers inside the Director Console */}
          {isCinematic && (
            <div className="flex items-center space-x-1 px-1.5 border-l border-white/10 ml-1.5 animate-fade-in">
              {/* Toggle HUD indicators */}
              <button
                onClick={() => setShowHUD(!showHUD)}
                title="Toggle Telemetry HUD"
                className={`p-1.5 rounded-full cursor-pointer transition-colors ${
                  showHUD ? 'text-cyan-400 hover:bg-white/5' : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                {showHUD ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>

              {/* Toggle Subtitles */}
              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                title="Toggle Subtitles / Quotes"
                className={`p-1.5 rounded-full cursor-pointer transition-colors ${
                  showSubtitles ? 'text-cyan-400 hover:bg-white/5' : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                <Subtitles className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
