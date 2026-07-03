/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  speciesId?: string;
  className?: string;
}

export default function SafeImage({ src, alt, speciesId, className = "" }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div className={`flex items-center justify-center bg-slate-950 border border-white/10 select-none relative overflow-hidden ${className}`}>
        {/* Glow backdrop based on species */}
        <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 to-transparent" />
        
        {/* Render styled inline vectors representing the species */}
        {speciesId === 'clownfish' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-orange-500 text-white">
            <path d="M10,50 Q40,10 80,50 T10,50 Z" />
            <path d="M35,20 Q40,50 35,80" stroke="white" strokeWidth="8" fill="none" />
            <path d="M55,25 Q58,50 55,75" stroke="white" strokeWidth="8" fill="none" />
            <path d="M80,50 L95,30 L90,50 L95,70 Z" fill="orange" />
            <circle cx="28" cy="42" r="5" fill="black" />
          </svg>
        )}

        {speciesId === 'parrotfish' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-cyan-400 text-teal-300">
            <path d="M15,50 Q45,20 80,50 T15,50 Z" />
            <path d="M75,45 Q82,50 75,55 Z" fill="yellow" />
            <path d="M80,50 L92,38 L88,50 L92,62 Z" />
            <circle cx="30" cy="42" r="4" fill="black" />
          </svg>
        )}

        {speciesId === 'seaturtle' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-emerald-500">
            <ellipse cx="50" cy="50" rx="28" ry="22" />
            <path d="M45,30 Q25,10 15,22 Q30,35 45,36" />
            <path d="M55,30 Q75,10 85,22 Q70,35 55,36" />
            <ellipse cx="50" cy="22" rx="10" ry="12" />
            <circle cx="47" cy="18" r="2" fill="black" />
            <circle cx="53" cy="18" r="2" fill="black" />
          </svg>
        )}

        {speciesId === 'dolphin' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-cyan-400">
            <path d="M15,60 Q35,25 70,30 Q88,35 94,42 Q74,54 54,56 Q34,58 15,60 Z" />
            <path d="M94,42 L99,32 L96,44 L99,50 Z" />
            <path d="M50,31 Q56,18 64,28" />
          </svg>
        )}

        {speciesId === 'jellyfish' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-indigo-400 animate-pulse">
            <path d="M20,50 Q50,15 80,50 Q50,60 20,50 Z" />
            <path d="M30,55 Q35,80 28,100" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M42,57 Q40,85 45,100" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <path d="M50,58 Q55,80 48,100" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <path d="M58,57 Q56,85 62,100" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M70,55 Q65,80 72,100" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        )}

        {speciesId === 'lanternfish' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-blue-500 text-yellow-300">
            <path d="M15,50 Q45,20 80,50 T15,50 Z" />
            <path d="M45,25 Q65,5 78,18" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <circle cx="78" cy="18" r="6" fill="currentColor" className="animate-ping" />
            <circle cx="78" cy="18" r="4" fill="currentColor" />
            <circle cx="30" cy="42" r="4" fill="black" />
          </svg>
        )}

        {speciesId === 'squid' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-purple-400">
            <path d="M35,20 L65,20 L50,75 Z" />
            <line x1="42" y1="75" x2="38" y2="98" stroke="currentColor" strokeWidth="3" />
            <line x1="46" y1="75" x2="44" y2="100" stroke="currentColor" strokeWidth="4" />
            <line x1="54" y1="75" x2="56" y2="100" stroke="currentColor" strokeWidth="4" />
            <line x1="58" y1="75" x2="62" y2="98" stroke="currentColor" strokeWidth="3" />
          </svg>
        )}

        {speciesId === 'combjelly' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-pink-500/80 text-cyan-400 animate-pulse">
            <ellipse cx="50" cy="50" rx="25" ry="32" />
            <path d="M35,30 Q35,50 35,70" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" fill="none" />
            <path d="M45,22 Q45,50 45,78" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" fill="none" />
            <path d="M55,22 Q55,50 55,78" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" fill="none" />
            <path d="M65,30 Q65,50 65,70" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" fill="none" />
          </svg>
        )}

        {speciesId === 'anglerfish' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-slate-800 text-cyan-300">
            <path d="M15,50 Q45,15 85,50 Q45,85 15,50 Z" />
            <path d="M28,50 L32,62 L38,50 L42,65 L48,50 L52,62" stroke="white" strokeWidth="2.5" fill="none" />
            <path d="M50,28 Q70,-2 85,12" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="85" cy="12" r="6" fill="currentColor" className="animate-ping" />
            <circle cx="85" cy="12" r="4" fill="currentColor" />
          </svg>
        )}

        {speciesId === 'vampiresquid' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-red-950 text-red-500">
            <path d="M50,15 C25,15 25,60 50,85 C75,60 75,15 50,15 Z" />
            {/* Blue glowing eyes */}
            <circle cx="40" cy="35" r="5" fill="cyan" />
            <circle cx="60" cy="35" r="5" fill="cyan" />
            <path d="M30,55 Q50,75 70,55" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        )}

        {speciesId === 'giantsquid' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-red-700">
            <path d="M40,20 L60,20 L50,70 Z" />
            <line x1="45" y1="70" x2="35" y2="100" stroke="currentColor" strokeWidth="4" />
            <line x1="50" y1="70" x2="50" y2="100" stroke="currentColor" strokeWidth="5" />
            <line x1="55" y1="70" x2="65" y2="100" stroke="currentColor" strokeWidth="4" />
            <circle cx="50" cy="35" r="8" fill="yellow" />
            <circle cx="50" cy="35" r="4" fill="black" />
          </svg>
        )}

        {speciesId === 'barracuda' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-slate-500 text-slate-300">
            <path d="M10,50 L85,40 L90,50 L85,60 L10,50 Z" />
            <path d="M10,50 L20,40 L18,50 L20,60 Z" />
            <circle cx="78" cy="46" r="3" fill="black" />
          </svg>
        )}

        {speciesId === 'tripodfish' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-indigo-900 text-yellow-400">
            <path d="M15,40 Q45,20 80,40 T15,40 Z" />
            {/* Long thin filaments */}
            <line x1="30" y1="40" x2="30" y2="95" stroke="currentColor" strokeWidth="1.5" />
            <line x1="60" y1="40" x2="60" y2="95" stroke="currentColor" strokeWidth="1.5" />
            <line x1="80" y1="40" x2="90" y2="95" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}

        {speciesId === 'giant_isopod' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-slate-600">
            {/* Pillbug armored segments */}
            <ellipse cx="50" cy="50" rx="32" ry="20" />
            <line x1="30" y1="35" x2="30" y2="65" stroke="black" strokeWidth="1" />
            <line x1="40" y1="31" x2="40" y2="69" stroke="black" strokeWidth="1" />
            <line x1="50" y1="30" x2="50" y2="70" stroke="black" strokeWidth="1" />
            <line x1="60" y1="31" x2="60" y2="69" stroke="black" strokeWidth="1" />
            <line x1="70" y1="35" x2="70" y2="65" stroke="black" strokeWidth="1" />
          </svg>
        )}

        {speciesId === 'dumbo_octopus' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-pink-400">
            <ellipse cx="50" cy="50" rx="25" ry="22" />
            <ellipse cx="28" cy="38" rx="8" ry="12" />
            <ellipse cx="72" cy="38" rx="8" ry="12" />
            <circle cx="42" cy="50" r="4" fill="black" />
            <circle cx="58" cy="50" r="4" fill="black" />
          </svg>
        )}

        {speciesId === 'vent_crab' && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-orange-400">
            <ellipse cx="50" cy="50" rx="20" ry="15" />
            {/* Legs */}
            <path d="M30,45 Q15,35 10,45" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M30,50 Q15,50 12,60" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M30,55 Q15,65 15,75" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M70,45 Q85,35 90,45" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M70,50 Q85,50 88,60" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M70,55 Q85,65 85,75" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* Default generic glowing fish if species not matched */}
        {!speciesId && (
          <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 fill-cyan-500 text-cyan-300">
            <path d="M15,50 Q45,20 80,50 T15,50 Z" />
            <path d="M80,50 L95,35 L90,50 L95,65 Z" />
            <circle cx="30" cy="44" r="4" fill="black" />
          </svg>
        )}

        <span className="absolute bottom-1.5 left-0 right-0 text-center text-[8px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 animate-pulse">
          <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
      />
    </div>
  );
}
