/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { solutions } from '../data/oceanData';
import * as LucideIcons from 'lucide-react';

export default function SolutionsSection() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [totalPoints, setTotalPoints] = useState(0);

  const getDifficultyColor = (diff: 'Easy' | 'Medium' | 'Involved') => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Involved':
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getSolutionIcon = (iconName: string) => {
    if (iconName === 'ShoppingBag') return LucideIcons.ShoppingBag;
    if (iconName === 'Trees') return LucideIcons.Sparkles;
    if (iconName === 'Shield') return LucideIcons.ShieldCheck;
    if (iconName === 'Flame') return LucideIcons.Fish;
    if (iconName === 'Zap') return LucideIcons.Zap;
    if (iconName === 'MessageSquare') return LucideIcons.MessageSquare;
    return LucideIcons.Leaf;
  };

  const handleToggleCheck = (id: string, difficulty: 'Easy' | 'Medium' | 'Involved') => {
    const isNowChecked = !checkedItems[id];
    setCheckedItems((prev) => ({ ...prev, [id]: isNowChecked }));

    let pointVal = 10;
    if (difficulty === 'Medium') pointVal = 25;
    if (difficulty === 'Involved') pointVal = 50;

    setTotalPoints((prev) => (isNowChecked ? prev + pointVal : prev - pointVal));
  };

  return (
    <section
      id="solutions"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#010a12] via-[#021321] to-[#041a2c] flex flex-col justify-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-cyan-600 rounded-full filter blur-[140px] animate-pulse duration-[10s]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500 rounded-full filter blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column (Span 7) - Heading and Solutions Cards */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase bg-emerald-950/40 border border-emerald-800/30 px-3 py-1 rounded-full w-max inline-block">
              Conservation Blueprint
            </span>
            <h2 id="solutions-heading" className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
              SOLUTIONS
            </h2>
            <p id="solutions-desc" className="text-slate-300 text-sm md:text-base leading-relaxed">
              Small actions today create a better tomorrow. Together, we can heal our ocean. 
              Review the action points below, and see what changes you can build into your daily life.
            </p>
          </div>

          {/* Solutions Cards Grid */}
          <div id="solutions-cards-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {solutions.map((sol) => {
              const Icon = getSolutionIcon(sol.icon);
              const isChecked = checkedItems[sol.id] || false;

              return (
                <div
                  key={sol.id}
                  id={`solution-card-${sol.id}`}
                  className={`p-5 rounded-2xl border transition-all duration-300 backdrop-blur-sm ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                      : 'bg-slate-900/40 border-white/5 hover:border-emerald-500/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`p-2.5 rounded-xl border ${isChecked ? 'bg-emerald-950 text-emerald-400 border-emerald-500/20' : 'bg-slate-950 text-cyan-400 border-white/5'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <button
                      id={`solution-toggle-${sol.id}`}
                      onClick={() => handleToggleCheck(sol.id, sol.difficulty)}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 hover:bg-emerald-400'
                          : 'bg-slate-950 text-slate-400 border-white/5 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {isChecked ? (
                        <>
                          <LucideIcons.Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Pledged</span>
                        </>
                      ) : (
                        <span>Try it</span>
                      )}
                    </button>
                  </div>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-sans font-extrabold text-white">{sol.title}</h3>
                      <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 border rounded ${getDifficultyColor(sol.difficulty)}`}>
                        {sol.difficulty}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{sol.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column (Span 5) - Interactive Tracker Widget */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="p-6 bg-slate-900/40 border border-emerald-500/10 rounded-2xl backdrop-blur-md space-y-6 animate-float shadow-lg shadow-emerald-950/40">
            <div className="space-y-1">
              <h3 className="text-lg font-sans font-bold text-white flex items-center space-x-2">
                <LucideIcons.CalendarHeart className="w-5 h-5 text-emerald-400" />
                <span>My Active Impact Plan</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Commit to these changes and watch your Ocean Protection score rise!
              </p>
            </div>

            {/* Score Wheel visual */}
            <div className="flex flex-col items-center justify-center py-6 border-y border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500 rounded-full filter blur-2xl" />
              </div>
              <div className="relative w-36 h-36 rounded-full border-4 border-slate-800 flex flex-col items-center justify-center bg-slate-950/60 z-10 shadow-inner">
                <span id="impact-score-num" className="text-4xl font-mono font-extrabold text-emerald-400 leading-none">
                  {totalPoints}
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                  Health points
                </span>
                {/* SVG dynamic status indicator */}
                <svg className="absolute inset-0 -rotate-90 w-full h-full pointer-events-none">
                  <circle
                    cx="72"
                    cy="72"
                    r="68"
                    fill="none"
                    stroke="rgba(16, 185, 129, 0.3)"
                    strokeWidth="4"
                    strokeDasharray="427"
                    strokeDashoffset={Math.max(427 - (totalPoints / 250) * 427, 0)}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
              </div>

              {/* Pledge message feedback */}
              <div className="mt-4 text-center">
                <span className="text-xs font-mono font-bold text-slate-300">
                  {totalPoints === 0 && 'Select changes to start your plan.'}
                  {totalPoints > 0 && totalPoints < 50 && 'Great start! You are helping protect local coasts.'}
                  {totalPoints >= 50 && totalPoints < 100 && 'Eco Warrior! Your habits make a real oceanic impact.'}
                  {totalPoints >= 100 && 'Ocean Savior! Marine species thank your dedication.'}
                </span>
              </div>
            </div>

            {/* List of committed items */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                Pledged Habits Checklist
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {solutions.map((sol) => {
                  const isChecked = checkedItems[sol.id] || false;
                  return (
                    <div
                      key={sol.id}
                      className={`flex items-center space-x-3 p-2 border rounded-xl text-xs transition-colors ${
                        isChecked
                          ? 'bg-emerald-950/10 border-emerald-500/20 text-slate-200'
                          : 'bg-slate-950/20 border-white/5 text-slate-500'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'}`}>
                        {isChecked && <LucideIcons.Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="truncate flex-1">{sol.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
