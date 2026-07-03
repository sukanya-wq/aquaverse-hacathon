/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShieldAlert, Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  onScrollTo: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onScrollTo, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Journey', id: 'sunlight' },
    { label: 'Species', id: 'species' },
    { label: 'Threats', id: 'impact' },
    { label: 'Water Scanner', id: 'water-scanner' },
    { label: 'Solutions', id: 'solutions' },
    { label: 'Take Action', id: 'pledge' },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/70 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo and Brand Name */}
        <div
          id="header-brand"
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => handleNavClick('hero')}
        >
          <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg text-white group-hover:scale-105 transition-transform duration-300">
            <ShieldAlert id="brand-logo-icon" className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center">
              <span id="brand-title" className="font-sans font-extrabold text-lg text-white tracking-wider">
                OCEAN GUARD
              </span>
            </div>
            <p id="brand-tagline" className="text-[10px] text-cyan-300/80 tracking-widest font-medium uppercase">
              Protect What Sustains Us
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                activeSection === item.id ||
                (item.id === 'sunlight' && ['sunlight', 'twilight', 'midnight', 'abyss'].includes(activeSection))
                  ? 'text-cyan-400 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <button
            id="nav-pledge-btn"
            onClick={() => handleNavClick('pledge')}
            className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-full uppercase tracking-wider shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Take the Pledge</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-slate-950/95 backdrop-blur-xl border-t border-white/5 flex flex-col p-6 space-y-6 z-40 transition-all duration-300"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-lg font-medium py-2 border-b border-white/5 transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-cyan-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            id="mobile-pledge-btn"
            onClick={() => handleNavClick('pledge')}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold py-4 rounded-xl uppercase tracking-wider transition-all duration-200 cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-current" />
            <span>Take the Pledge</span>
          </button>
        </div>
      )}
    </header>
  );
}
