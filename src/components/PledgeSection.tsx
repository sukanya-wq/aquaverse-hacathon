/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { Mail, User, ShieldCheck, Award, Heart, CheckCircle2, Phone, Coins, Sparkles, Copy, Check, Waves, AlertCircle, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PledgeSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  const [recentSignees, setRecentSignees] = useState<string[]>([]);
  const [totalProtectors, setTotalProtectors] = useState(12842);
  const [showCertificate, setShowCertificate] = useState(false);

  // New interactive UI/UX states for pond cleanup and marine life donations
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(35);
  const [customDonationInput, setCustomDonationInput] = useState<string>('');
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [cleanupJoined, setCleanupJoined] = useState<boolean>(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleDonateSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalAmount = customDonationInput ? parseFloat(customDonationInput) : donationAmount;
    if (isNaN(finalAmount) || finalAmount <= 0) return;
    
    setIsTransmitting(true);
    // Sound/bubble bubble pop effect simulation
    window.dispatchEvent(new CustomEvent('ocean-dive-bubbles'));
    
    setTimeout(() => {
      setIsTransmitting(false);
      setDonationSuccess(true);
    }, 1500);
  };

  useEffect(() => {
    // Load signed status and protectors count from localStorage
    const savedSigned = localStorage.getItem('ocean_pledge_signed');
    const savedName = localStorage.getItem('ocean_pledge_name') || '';
    
    if (savedSigned === 'true') {
      setIsSigned(true);
      setName(savedName);
    }

    const savedProtectors = localStorage.getItem('ocean_pledge_count');
    if (savedProtectors) {
      setTotalProtectors(parseInt(savedProtectors, 10));
    }

    // Set some initial random recent protectors names
    setRecentSignees(['Sarah K.', 'Michael D.', 'Kai Jenkins', 'Elena Rostova', 'Amina Al-Farsi']);
  }, []);

  const handleSubmitPledge = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    // Simulate signing
    setIsSigned(true);
    const newCount = totalProtectors + 1;
    setTotalProtectors(newCount);

    localStorage.setItem('ocean_pledge_signed', 'true');
    localStorage.setItem('ocean_pledge_name', name);
    localStorage.setItem('ocean_pledge_count', newCount.toString());

    // Add to recent signees list
    setRecentSignees((prev) => [name, ...prev.slice(0, 4)]);
    setShowCertificate(true);
  };

  const handleResetPledge = () => {
    setIsSigned(false);
    setName('');
    setEmail('');
    localStorage.removeItem('ocean_pledge_signed');
    localStorage.removeItem('ocean_pledge_name');
  };

  const stats = [
    {
      num: '8M+',
      label: 'Tons of plastic enter oceans every year',
      icon: 'Trash2',
    },
    {
      num: '25%',
      label: 'of marine life depends on coral reefs',
      icon: 'Shrimp',
    },
    {
      num: '100+',
      label: 'Species saved through global conservation',
      icon: 'HeartHandshake',
    },
    {
      num: '1',
      label: 'Ocean. One Planet. One Chance.',
      icon: 'Globe',
    },
  ];

  return (
    <section
      id="pledge"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#041a2c] via-[#020b14] to-slate-950 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Whale Silhouette or Wave styling via SVG */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-5 flex justify-center">
        <svg className="w-full max-w-7xl h-96 fill-cyan-400" viewBox="0 0 1440 320">
          <path d="M0,192L48,197.3C96,203,192,213,288,218.7C384,224,480,224,576,202.7C672,181,768,139,864,138.7C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column (Span 6): Hope Stats and Sylvia Earle Quote */}
        <div className="lg:col-span-6 space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase bg-cyan-950/40 border border-cyan-800/30 px-3 py-1 rounded-full w-max inline-block">
              Hope & Impact
            </span>
            <h2 id="pledge-heading" className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
              HOPE FOR THE OCEAN
            </h2>
            <p id="pledge-desc" className="text-slate-300 text-sm md:text-base leading-relaxed">
              The ocean gives life to our planet. It provides over 50% of our oxygen and regulates our climate. 
              Its future is not a product of fate—it depends entirely on us.
            </p>
          </div>

          {/* Infographics Grid */}
          <div id="pledge-stats-grid" className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={`stat-${idx}`}
                className="p-4 bg-slate-900/30 border border-white/5 rounded-2xl backdrop-blur-sm space-y-2 hover:border-cyan-500/20 hover:bg-slate-900/50 transition-all duration-300"
              >
                <span className="text-3xl font-mono font-extrabold text-cyan-400 block leading-none">
                  {stat.num}
                </span>
                <p className="text-xs text-slate-400 leading-normal">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Sylvia Earle Quote card */}
          <blockquote className="p-6 bg-gradient-to-r from-cyan-950/20 to-slate-950 border-l-4 border-cyan-500 rounded-r-xl">
            <p className="text-slate-300 text-sm italic leading-relaxed">
              "The ocean is not a resource. It is a responsibility."
            </p>
            <footer className="text-xs text-cyan-400 font-mono mt-2 uppercase tracking-wider">
              — Sylvia Earle, Marine Biologist & Explorer
            </footer>
          </blockquote>
        </div>

        {/* Right Column (Span 6): Interactive Pledge Form & Eco-Action Hub */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* TAKE THE OCEAN PLEDGE Card */}
          <div className="p-8 bg-slate-900/40 border border-cyan-500/10 rounded-3xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full filter blur-xl" />

            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-sans font-bold text-white flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-cyan-400 fill-current" />
                  <span>TAKE THE OCEAN PLEDGE</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  I pledge to protect our ocean and all the marine life it holds.
                </p>
              </div>

              {!isSigned ? (
                <form id="pledge-form" onSubmit={handleSubmitPledge} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="pledge-name" className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        id="pledge-name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="pledge-email" className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        id="pledge-email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <button
                    id="pledge-submit-btn"
                    type="submit"
                    className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-slate-950 font-extrabold text-sm rounded-xl uppercase tracking-wider shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    I PLEDGE TO PROTECT
                  </button>
                </form>
              ) : (
                <div id="pledge-signed-success" className="space-y-6 text-center py-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 rounded-full flex items-center justify-center animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-sans font-extrabold text-white">Thank you, {name}!</h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                      Your commitment has been added. You are officially certified as a Guardian of the Blue Planet.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      id="view-certificate-btn"
                      onClick={() => setShowCertificate(true)}
                      className="px-5 py-2.5 bg-cyan-950 border border-cyan-800 text-cyan-300 hover:bg-cyan-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      View Certificate
                    </button>
                    <button
                      id="reset-pledge-btn"
                      onClick={handleResetPledge}
                      className="px-5 py-2.5 bg-slate-950 text-slate-500 hover:text-white rounded-xl text-xs font-mono transition-colors cursor-pointer"
                    >
                      Pledge another email
                    </button>
                  </div>
                </div>
              )}

              {/* Verified protectors list */}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {/* Tiny user avatars stack */}
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-white">SK</div>
                      <div className="w-6 h-6 rounded-full bg-slate-600 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-white">MD</div>
                      <div className="w-6 h-6 rounded-full bg-slate-500 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-white">KJ</div>
                      <div className="w-6 h-6 rounded-full bg-slate-400 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-white">ER</div>
                    </div>
                    <span id="protector-count-label" className="text-xs font-semibold text-slate-300">
                      +{totalProtectors.toLocaleString()} protectors
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 border border-cyan-800/30 rounded">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Live stream ticker of signees */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                    Recent Guardians
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {recentSignees.map((signee, idx) => (
                      <span
                        key={`signee-${signee}-${idx}`}
                        className="text-[10px] font-mono bg-slate-950/60 text-slate-400 border border-white/5 px-2 py-0.5 rounded-full"
                      >
                        {signee}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* LOCAL WATERWAYS & MARINE DONATION GATEWAY */}
          <div className="p-8 bg-gradient-to-br from-slate-900/60 to-blue-950/40 border border-cyan-500/15 rounded-3xl backdrop-blur-md relative overflow-hidden space-y-6 shadow-xl shadow-cyan-950/20">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-full filter blur-xl" />
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-extrabold text-cyan-400 tracking-widest uppercase bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-0.5 rounded-full inline-block">
                Direct Local Action
              </span>
              <h3 className="text-xl font-sans font-bold text-white flex items-center space-x-2">
                <Waves className="w-5 h-5 text-cyan-400" />
                <span>ECO-ACTION & DONATION HUB</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect with community cleanup organizers or support certified aquatic rescue efforts directly.
              </p>
            </div>

            {/* Grid structure inside card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Option A: Clean a Local Pond */}
              <div className="p-4 bg-slate-950/50 border border-white/5 rounded-2xl flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-cyan-400 font-extrabold tracking-wider uppercase bg-cyan-950/60 px-2 py-0.5 rounded">
                      Pond Cleanup
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-sans font-extrabold text-white">Local Waterway Care</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Want to clean a local pond or lake near your area? Join near-me community cleanups or request tools.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between bg-slate-900/80 p-2 rounded-lg border border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-slate-500 uppercase">TELEPHONE COORDINATOR</span>
                      <span className="text-xs font-mono font-bold text-slate-200">+1 (800) 555-POND</span>
                    </div>
                    <button
                      onClick={() => handleCopy('+1 (800) 555-POND', 'pond')}
                      className="p-1.5 hover:bg-white/5 rounded transition-all cursor-pointer text-slate-400 hover:text-cyan-400"
                      title="Copy Number"
                    >
                      {copiedText === 'pond' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setCleanupJoined(!cleanupJoined);
                      window.dispatchEvent(new CustomEvent('ocean-dive-bubbles'));
                    }}
                    className={`w-full py-2 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition-all duration-200 ${
                      cleanupJoined 
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' 
                        : 'bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 text-cyan-300 cursor-pointer'
                    }`}
                  >
                    {cleanupJoined ? '✓ Coordinator Contacted' : 'Schedule Cleanup'}
                  </button>
                </div>
              </div>

              {/* Option B: Donate for Marine Life */}
              <div className="p-4 bg-slate-950/50 border border-white/5 rounded-2xl flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-cyan-400 font-extrabold tracking-wider uppercase bg-cyan-950/60 px-2 py-0.5 rounded">
                      Marine Rescue
                    </span>
                    <Gift className="w-3.5 h-3.5 text-pink-400" />
                  </div>
                  <h4 className="text-sm font-sans font-extrabold text-white">Save Deep Blue Life</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Donate to support direct rescue teams, coral seeding, or ocean trash vacuum sweepers.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between bg-slate-900/80 p-2 rounded-lg border border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-slate-500 uppercase">RESCUE DISPATCH</span>
                      <span className="text-xs font-mono font-bold text-slate-200">+1 (800) 555-BLUE</span>
                    </div>
                    <button
                      onClick={() => handleCopy('+1 (800) 555-BLUE', 'rescue')}
                      className="p-1.5 hover:bg-white/5 rounded transition-all cursor-pointer text-slate-400 hover:text-cyan-400"
                      title="Copy Number"
                    >
                      {copiedText === 'rescue' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <a 
                    href="#donation-form-anchor"
                    className="w-full block text-center py-2 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase text-pink-300 transition-all cursor-pointer"
                  >
                    Send Money Direct
                  </a>
                </div>
              </div>

            </div>

            {/* Expanded Micro-Donation Terminal Widget */}
            <div id="donation-form-anchor" className="p-5 bg-slate-950/80 border border-white/5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-sans font-bold text-white">SECURE TRANSMISSION GATEWAY</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500">SSL 256-BIT</span>
              </div>

              {!donationSuccess ? (
                <form onSubmit={handleDonateSubmit} className="space-y-4">
                  {/* Donation quick selector */}
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 35, 75, 150].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setDonationAmount(amt);
                          setCustomDonationInput('');
                        }}
                        className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                          donationAmount === amt && !customDonationInput
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10'
                            : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-850'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>

                  {/* Custom Donation Entry */}
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 font-bold">$</span>
                    <input
                      type="number"
                      min="5"
                      placeholder="Or enter custom amount (USD)"
                      value={customDonationInput}
                      onChange={(e) => {
                        setCustomDonationInput(e.target.value);
                      }}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl py-2.5 pl-8 pr-4 text-xs text-white placeholder-slate-600 focus:border-cyan-500 transition-all outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isTransmitting}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:from-amber-700 disabled:opacity-50 text-slate-950 font-extrabold text-[11px] rounded-xl uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {isTransmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Funds...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        <span>Transmit ${customDonationInput || donationAmount} Marine Support</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="w-10 h-10 bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5 animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase">TRANSMISSION SECURED</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                      Thank you! Your simulated contribution of <strong className="text-white">${customDonationInput || donationAmount}</strong> was successfully transmitted to Marine Seeding projects.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setDonationSuccess(false);
                      setCustomDonationInput('');
                    }}
                    className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 border border-white/5 rounded-lg text-[9px] font-mono text-slate-300 uppercase transition-colors cursor-pointer"
                  >
                    Send another pledge
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Elegant Ocean Protection Pledge Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <div
            id="certificate-overlay"
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowCertificate(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              id="certificate-card"
              className="bg-[#030d1a] border-4 border-double border-cyan-500/40 max-w-2xl w-full rounded-2xl p-8 shadow-2xl shadow-cyan-500/20 text-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Certificate design lines */}
              <div className="absolute inset-4 border border-cyan-500/10 pointer-events-none" />

              <div className="space-y-8 relative z-10 py-6">
                <div className="flex justify-center">
                  <div className="p-4 bg-cyan-950/60 text-cyan-400 border border-cyan-500/20 rounded-full">
                    <Award className="w-12 h-12 stroke-[1.5]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">
                    Ocean Guard Global Alliance
                  </span>
                  <h3 className="text-3xl font-sans font-extrabold text-white tracking-tight">
                    GUARDIAN OF THE BLUE PLANET
                  </h3>
                  <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-4" />
                </div>

                <div className="space-y-4 max-w-lg mx-auto">
                  <p className="text-xs font-mono text-slate-400 uppercase">
                    This certifies that
                  </p>
                  <p id="certified-name" className="text-2xl font-serif italic font-extrabold text-white tracking-wide border-b border-cyan-500/20 pb-2 w-max mx-auto px-8">
                    {name || 'Global Protector'}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    has officially taken the Ocean Pledge, committing to support sea protection, 
                    reduce household single-use plastics, promote marine diversity, and spread awareness 
                    for our world’s fragile oceans.
                  </p>
                </div>

                <div className="pt-8 grid grid-cols-2 gap-8 max-w-md mx-auto items-end">
                  <div className="text-center space-y-1">
                    <div className="h-0.5 bg-cyan-500/20" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Date signed</span>
                    <span className="text-xs font-semibold text-white">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="flex justify-center mb-1">
                      <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Authorized ID</span>
                    <span className="text-xs font-mono text-cyan-400 font-bold">#OG-{Math.floor(Math.random() * 900000 + 100000)}</span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    id="close-certificate-btn"
                    onClick={() => setShowCertificate(false)}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-extrabold text-xs rounded-xl uppercase tracking-wider transition-all duration-200 cursor-pointer"
                  >
                    Thank You, Guardian
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
