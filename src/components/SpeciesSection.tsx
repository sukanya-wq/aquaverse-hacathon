/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Search, Eye, Filter, Info, Target, Compass, Heart, HeartOff, SlidersHorizontal, Anchor, Waves, Award } from 'lucide-react';
import SafeImage from './SafeImage';

interface MarineSpecies {
  id: string;
  name: string;
  scientificName: string;
  category: 'Mammal' | 'Reptile' | 'Fish' | 'Cephalopod' | 'Cetacean';
  status: 'Critically Endangered' | 'Endangered' | 'Vulnerable';
  population: string;
  depthRange: string;
  primaryZone: 'sunlight' | 'twilight' | 'midnight' | 'abyss';
  threats: string[];
  description: string;
  funFact: string;
  image: string;
  coordinates: string;
}

const ENDANGERED_SPECIES_DATA: MarineSpecies[] = [
  {
    id: 'vaquita',
    name: 'Vaquita Porpoise',
    scientificName: 'Phocoena sinus',
    category: 'Cetacean',
    status: 'Critically Endangered',
    population: 'Approximately 10 individuals left',
    depthRange: '0 - 50 meters',
    primaryZone: 'sunlight',
    threats: ['Illegal gillnet entanglement (totoaba fishing)', 'Inbreeding depression', 'Habitat degradation'],
    description: 'The world’s rarest marine mammal. Found only in the northernmost tip of California’s Gulf, this tiny, graceful porpoise is on the absolute precipice of extinction due to industrial gillnets.',
    funFact: 'Often called the "panda of the sea" because of the large dark rings around their eyes and dark patches on their lips.',
    image: 'https://images.unsplash.com/photo-1518467166-367ae630dd97?auto=format&fit=crop&w=800&q=80',
    coordinates: '31.0250° N, 114.2833° W'
  },
  {
    id: 'hawksbill-turtle',
    name: 'Hawksbill Sea Turtle',
    scientificName: 'Eretmochelys imbricata',
    category: 'Reptile',
    status: 'Critically Endangered',
    population: 'Estimated 20,000 nesting females',
    depthRange: '0 - 90 meters',
    primaryZone: 'sunlight',
    threats: ['Illegal tortoiseshell trade', 'Nesting habitat destruction', 'Ocean plastics ingestion'],
    description: 'Adorned with a uniquely colored gold-and-brown shell, Hawksbill turtles are vital for marine ecosystems, keeping coral reef sponge populations healthy and balanced.',
    funFact: 'Their shells change colors slightly depending on water temperature, and they are the only reptiles known to consume glass-like glass sponges.',
    image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=800&q=80',
    coordinates: '18.4286° S, 64.7642° W'
  },
  {
    id: 'blue-whale',
    name: 'Blue Whale',
    scientificName: 'Balaenoptera musculus',
    category: 'Mammal',
    status: 'Endangered',
    population: '10,000 - 25,000 individuals',
    depthRange: '0 - 500 meters',
    primaryZone: 'sunlight',
    threats: ['Vessel collisions', 'Deep ocean noise pollution', 'Loss of krill due to warming waters'],
    description: 'The largest animal to ever inhabit the Earth. Their magnificent low-frequency vocalizations travel thousands of miles through the ocean depths to communicate with distant pods.',
    funFact: 'A blue whale’s tongue can weigh as much as an entire adult elephant, and its heartbeat can be detected from over two miles away.',
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=800&q=80',
    coordinates: '44.3120° N, 68.2140° W'
  },
  {
    id: 'chambered-nautilus',
    name: 'Chambered Nautilus',
    scientificName: 'Nautilus pompilius',
    category: 'Cephalopod',
    status: 'Vulnerable',
    population: 'Rapidly declining',
    depthRange: '100 - 600 meters',
    primaryZone: 'twilight',
    threats: ['Targeted harvesting for decorative shells', 'Deep sea trawling', 'Ocean acidification'],
    description: 'Known as a "living fossil," the Chambered Nautilus has survived virtually unchanged for over 500 million years, navigating twilight depths using pressure gas chambers inside its shell.',
    funFact: 'They control their buoyancy by pumping a special heavy fluid or air through the internal micro-chambers of their spiral shell.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    coordinates: '0.7893° S, 113.9213° E'
  },
  {
    id: 'coelacanth',
    name: 'West Indian Coelacanth',
    scientificName: 'Latimeria chalumnae',
    category: 'Fish',
    status: 'Critically Endangered',
    population: 'Fewer than 500 left',
    depthRange: '150 - 700 meters',
    primaryZone: 'twilight',
    threats: ['Deep gillnet accidental bycatch', 'Oil exploration and sound shocks', 'Climate current shifts'],
    description: 'Thought to have gone extinct with the dinosaurs 66 million years ago, this mysterious deep-sea giant was famously rediscovered alive off the coast of South Africa in 1938.',
    funFact: 'They possess a specialized rostral organ in their snout which detects faint electric fields, helping them hunt prey in total pitch blackness.',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80',
    coordinates: '12.2215° S, 43.6823° E'
  },
  {
    id: 'dumbo_octopus',
    name: 'Dumbo Octopus',
    scientificName: 'Grimpoteuthis',
    category: 'Cephalopod',
    status: 'Vulnerable',
    population: 'Undocumented due to extreme depths',
    depthRange: '3,000 - 7,000 meters',
    primaryZone: 'abyss',
    threats: ['Deep ocean plastic sediment pollution', 'Deep-sea mineral mining projects', 'Temperature rising at sea floor'],
    description: 'This adorable deep-sea dweller navigates the vast abyssal plains of the ocean floor, fluttering its prominent ear-like fins that resemble Disney’s flying elephant.',
    funFact: 'They lack ink sacs because they live in perpetual, deep darkness where ink is useless for escape.',
    image: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=800&q=80',
    coordinates: '36.7490° N, 122.0425° W'
  },
  {
    id: 'whale-shark',
    name: 'Whale Shark',
    scientificName: 'Rhincodon typus',
    category: 'Fish',
    status: 'Endangered',
    population: 'Decreased by 50% over last 75 years',
    depthRange: '0 - 1,900 meters',
    primaryZone: 'sunlight',
    threats: ['Commercial fishing & finning', 'Propeller blade strikes', 'Microplastic filters ingestion'],
    description: 'The world’s largest species of fish. Despite their gargantuan size, they are gentle filter feeders that glide near warm thermoclines searching for plankton blooms.',
    funFact: 'Just like human fingerprints, the constellation-like spot pattern on the skin of every single whale shark is completely unique.',
    image: 'https://images.unsplash.com/photo-1560275669-46c5a88d6a4c?auto=format&fit=crop&w=800&q=80',
    coordinates: '22.8905° N, 109.9167° W'
  },
  {
    id: 'right-whale',
    name: 'North Atlantic Right Whale',
    scientificName: 'Eubalaena glacialis',
    category: 'Cetacean',
    status: 'Critically Endangered',
    population: 'Fewer than 340 individuals remain',
    depthRange: '0 - 150 meters',
    primaryZone: 'sunlight',
    threats: ['Commercial gear entanglement', 'Vessel strikes', 'Ocean noise masking calls'],
    description: 'One of the most critically endangered large whale species. They migrate along the highly industrial Eastern Seaboard of North America, making them highly vulnerable to ship strikes and heavy ropes.',
    funFact: 'They are called "right whales" because early whalers considered them the "right" whales to hunt, as they float when killed and are rich in oil.',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80',
    coordinates: '42.3601° N, 71.0589° W'
  },
  {
    id: 'finless-porpoise',
    name: 'Yangtze Finless Porpoise',
    scientificName: 'Neophocaena asiaeorientalis',
    category: 'Cetacean',
    status: 'Critically Endangered',
    population: 'Estimated 1,000 individuals left',
    depthRange: '0 - 30 meters',
    primaryZone: 'sunlight',
    threats: ['Sand mining & river shipping', 'Agricultural chemical runoff', 'Electro-fishing bycatch'],
    description: 'Affectionately known as the "smiling angel" of the Yangtze River due to their mischievous facial expression. They have high intelligence comparable to a chimpanzee.',
    funFact: 'They have no dorsal fin. Instead, they have a narrow ridge covered in small tubercules (scaly bumps) along their back.',
    image: 'https://images.unsplash.com/photo-1570481662006-a3a13746fe4e?auto=format&fit=crop&w=800&q=80',
    coordinates: '30.5728° N, 114.2792° E'
  },
  {
    id: 'kemps-ridley',
    name: "Kemp's Ridley Sea Turtle",
    scientificName: 'Lepidochelys kempii',
    category: 'Reptile',
    status: 'Critically Endangered',
    population: 'Highly depleted, strictly protected nesting females',
    depthRange: '0 - 45 meters',
    primaryZone: 'sunlight',
    threats: ['Shrimp trawl net captures', 'Oil spills (Deepwater Horizon impact)', 'Egg poaching on nesting beaches'],
    description: "The smallest and most critically endangered sea turtle in the world. They participate in synchronized nesting events called 'arribadas' (arrivals) on Mexican shores.",
    funFact: "They are the only sea turtles that nest during the daytime rather than nighttime.",
    image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80',
    coordinates: '23.6345° N, 102.5528° W'
  },
  {
    id: 'angelshark',
    name: 'Sawback Angelshark',
    scientificName: 'Squatina squatina',
    category: 'Fish',
    status: 'Critically Endangered',
    population: 'Near extinct in historical northern ranges',
    depthRange: '10 - 150 meters',
    primaryZone: 'sunlight',
    threats: ['Commercial bottom trawling', 'Coastal tourism developments', 'Recreational fishing pressure'],
    description: 'An ambush predator shark with a flattened body that mimics a ray. They bury themselves under sand or mud to strike unsuspecting crabs and flatfish.',
    funFact: 'They can remain completely motionless under ocean sediment for several days waiting for target prey.',
    image: 'https://images.unsplash.com/photo-1571752726101-44dc4674ff9f?auto=format&fit=crop&w=800&q=80',
    coordinates: '28.2916° N, 16.6291° W'
  }
];

export default function SpeciesSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSpeciesId, setActiveSpeciesId] = useState<string>('vaquita');
  const [isScanningActive, setIsScanningActive] = useState(false);
  const [likedSpecies, setLikedSpecies] = useState<Record<string, boolean>>({});

  // Memoized filter results
  const filteredSpecies = useMemo(() => {
    return ENDANGERED_SPECIES_DATA.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            s.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesZone = selectedZone === 'all' || s.primaryZone === selectedZone;
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
      return matchesSearch && matchesZone && matchesCategory;
    });
  }, [searchTerm, selectedZone, selectedCategory]);

  const activeSpecies = useMemo(() => {
    return ENDANGERED_SPECIES_DATA.find((s) => s.id === activeSpeciesId) || ENDANGERED_SPECIES_DATA[0];
  }, [activeSpeciesId]);

  const toggleLike = (id: string) => {
    setLikedSpecies(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        // Trigger bubble effect event
        window.dispatchEvent(new CustomEvent('ocean-dive-bubbles'));
      }
      return next;
    });
  };

  const triggerLocalRadarScan = () => {
    setIsScanningActive(true);
    // Sound/bubble bubble pop effect simulation
    window.dispatchEvent(new CustomEvent('sonar-ping'));
    
    setTimeout(() => {
      setIsScanningActive(false);
    }, 3000);
  };

  return (
    <section 
      id="species" 
      className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-white/5 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Decorative Tech Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[80%] h-0.5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute -left-20 top-1/4 w-72 h-72 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-1/4 w-72 h-72 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-red-950/40 border border-red-500/20 px-3.5 py-1 rounded-full">
            <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-red-300 uppercase">
              IUCN RED LIST ASSESSMENT
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white uppercase">
            ENDANGERED <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">AQUATIC SPECIES</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto font-medium">
            Over 30% of assessed marine life species now face immediate, irreversible extinction. Explore the biosystem taxonomy ledger below.
          </p>
        </div>

        {/* SEARCH AND FILTER CRITERIA */}
        <div className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          {/* Search bar */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search taxonomy catalog (e.g. Whale, Vaquita)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 outline-none transition-all"
            />
          </div>

          {/* Depth Zone Select */}
          <div className="relative">
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-slate-300 focus:border-cyan-500 outline-none transition-all cursor-pointer appearance-none"
            >
              <option value="all">Depth: All Water Columns</option>
              <option value="sunlight">Sunlight Zone (0-200m)</option>
              <option value="twilight">Twilight Zone (200-1000m)</option>
              <option value="midnight">Midnight Zone (1000-4000m)</option>
              <option value="abyss">The Abyss (4000m+)</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <Waves className="w-3.5 h-3.5 text-slate-500" />
            </div>
          </div>

          {/* Category Select */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-slate-300 focus:border-cyan-500 outline-none transition-all cursor-pointer appearance-none"
            >
              <option value="all">Class: All Organisms</option>
              <option value="Mammal">Mammals</option>
              <option value="Cetacean">Cetaceans</option>
              <option value="Reptile">Reptiles</option>
              <option value="Fish">Fishes</option>
              <option value="Cephalopod">Cephalopods</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            </div>
          </div>

        </div>

        {/* INTERACTIVE WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: SPECIES LEDGER CARDS (Span 5) */}
          <div className="lg:col-span-5 space-y-3 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredSpecies.length > 0 ? (
              filteredSpecies.map((s) => {
                const isActive = s.id === activeSpeciesId;
                const isLiked = likedSpecies[s.id];
                return (
                  <div
                    key={s.id}
                    onClick={() => setActiveSpeciesId(s.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      isActive 
                        ? 'bg-gradient-to-r from-slate-900 to-cyan-950/40 border-cyan-500/40 shadow-lg shadow-cyan-950/20 scale-[1.01]' 
                        : 'bg-slate-900/30 border-white/5 hover:border-white/10 hover:bg-slate-900/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      {/* Stylized Thumbnail with Glow */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 relative flex-shrink-0">
                        <SafeImage src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-40`} />
                      </div>

                      {/* Name & scientific */}
                      <div className="space-y-0.5">
                        <h3 className={`text-xs font-sans font-bold transition-colors ${isActive ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'}`}>
                          {s.name}
                        </h3>
                        <p className="text-[10px] font-mono italic text-slate-500">
                          {s.scientificName}
                        </p>
                        <div className="flex items-center space-x-2 pt-1">
                          <span className={`text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded ${
                            s.status === 'Critically Endangered'
                              ? 'bg-red-950/80 text-red-400 border border-red-500/20'
                              : s.status === 'Endangered'
                              ? 'bg-amber-950/80 text-amber-400 border border-amber-500/20'
                              : 'bg-yellow-950/80 text-yellow-400 border border-yellow-500/20'
                          }`}>
                            {s.status}
                          </span>
                          <span className="text-[8.5px] font-mono text-slate-500 uppercase">
                            {s.primaryZone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Like button widget */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(s.id);
                      }}
                      className={`p-2 rounded-lg border transition-all cursor-pointer ${
                        isLiked 
                          ? 'bg-pink-500/10 border-pink-500/30 text-pink-400' 
                          : 'bg-transparent border-white/5 text-slate-600 hover:text-slate-400'
                      }`}
                      title={isLiked ? 'Subscribed to protect' : 'Protect species'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current animate-pulse' : ''}`} />
                    </button>

                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 p-6 bg-slate-900/20 border border-white/5 rounded-2xl space-y-3">
                <HeartOff className="w-8 h-8 text-slate-600 mx-auto animate-bounce" />
                <p className="text-xs font-mono text-slate-500 uppercase">No organisms match current ledger filter</p>
              </div>
            )}
          </div>

          {/* RIGHT PANEL: DYNAMIC BIOPHONIC STATS TERMINAL HUD (Span 7) */}
          <div className="lg:col-span-7 bg-slate-900/25 border border-cyan-500/10 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden space-y-6 min-h-[580px] shadow-2xl shadow-cyan-950/30">
            
            {/* Corner radar sweep vectors decor */}
            <div className="absolute top-0 right-0 w-32 h-32 border-l border-b border-cyan-500/5 rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-cyan-500/5 rounded-tr-full pointer-events-none" />

            {/* Simulated Live Laser Sweep Line on scan */}
            {isScanningActive && (
              <div className="absolute inset-x-0 top-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] z-30 animate-[scan-line_3s_ease-in-out_infinite]" />
            )}

            {/* Card Main Title and Subtitle */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-white/5">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[9px] font-mono font-bold text-cyan-400 tracking-wider bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                    ID: TAXON-{activeSpecies.id.toUpperCase()}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">•</span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center">
                    <Anchor className="w-2.5 h-2.5 text-blue-400 mr-1" /> {activeSpecies.category}
                  </span>
                </div>
                <h3 className="text-2xl font-sans font-extrabold text-white leading-none">
                  {activeSpecies.name}
                </h3>
                <p className="text-xs font-mono italic text-cyan-400/80">
                  {activeSpecies.scientificName}
                </p>
              </div>

              {/* Biophonic Scanner trigger button */}
              <button
                onClick={triggerLocalRadarScan}
                disabled={isScanningActive}
                className="flex items-center space-x-1.5 self-start px-3.5 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 active:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
              >
                <Target className={`w-3.5 h-3.5 ${isScanningActive ? 'animate-spin' : ''}`} />
                <span>{isScanningActive ? 'Scanning Taxonomy...' : 'Sonar Radar Scan'}</span>
              </button>
            </div>

            {/* Large Image Showcase with telemetry overlay */}
            <div className="h-48 md:h-56 rounded-2xl overflow-hidden border border-white/10 relative group shadow-inner shadow-black">
              <SafeImage src={activeSpecies.image} alt={activeSpecies.name} className="w-full h-full object-cover transition-transform duration-700" />
              
              {/* Radar Grid overlay during scan */}
              {isScanningActive && (
                <div className="absolute inset-0 bg-cyan-950/30 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                  {/* Glowing sonar ripples */}
                  <div className="w-24 h-24 border border-cyan-400/40 rounded-full animate-ping" />
                  <div className="absolute w-12 h-12 border-2 border-cyan-400 rounded-full animate-pulse" />
                  <div className="absolute text-[8px] font-mono text-cyan-300 tracking-widest font-extrabold bg-slate-950/90 px-2 py-1 rounded border border-cyan-400/30 uppercase">
                    Analyzing Biometrics
                  </div>
                </div>
              )}

              {/* Live coordinates telemetry banner */}
              <div className="absolute bottom-3 left-3 bg-slate-950/95 border border-white/10 backdrop-blur-md rounded-lg p-2 flex items-center space-x-2 font-mono text-[9px] text-slate-300">
                <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                <div>
                  <span className="text-slate-500">HABITAT LOC: </span>
                  <span className="text-white font-bold tabular-nums">{activeSpecies.coordinates}</span>
                </div>
              </div>

              {/* Status Ribbon Tag */}
              <div className="absolute top-3 right-3">
                <span className={`text-[9px] font-mono font-black tracking-widest uppercase px-3 py-1 rounded-full border shadow-lg ${
                  activeSpecies.status === 'Critically Endangered'
                    ? 'bg-red-500 text-slate-950 border-red-400'
                    : activeSpecies.status === 'Endangered'
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-yellow-500 text-slate-950 border-yellow-400'
                }`}>
                  {activeSpecies.status}
                </span>
              </div>
            </div>

            {/* Taxonomy information parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Parameter 1: Water Column Column */}
              <div className="p-3.5 bg-slate-950/60 border border-white/5 rounded-xl space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-[9px] font-mono text-slate-500 uppercase">DEP-RANGE / WATER COLUMN</span>
                </div>
                <p className="text-xs text-slate-200 font-bold font-mono">
                  {activeSpecies.depthRange}
                </p>
              </div>

              {/* Parameter 2: Population Left */}
              <div className="p-3.5 bg-slate-950/60 border border-white/5 rounded-xl space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span className="text-[9px] font-mono text-slate-500 uppercase">GLOBAL REMAINING POPULATION</span>
                </div>
                <p className="text-xs text-slate-200 font-bold font-mono">
                  {activeSpecies.population}
                </p>
              </div>

            </div>

            {/* Description Text */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">SPECIES OVERVIEW & STATUS</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeSpecies.description}
              </p>
            </div>

            {/* Threats Breakdown */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">PRIMARY ANTHROPOGENIC THREATS</span>
              <div className="flex flex-wrap gap-2">
                {activeSpecies.threats.map((t, idx) => (
                  <span 
                    key={`threat-${activeSpecies.id}-${idx}`}
                    className="text-[10px] font-mono text-slate-300 bg-red-950/20 border border-red-500/15 rounded-lg px-2.5 py-1 flex items-center space-x-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-500 mr-1.5" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Educational Interactive Fun Fact Quote Panel */}
            <div className="p-4 bg-gradient-to-r from-cyan-950/30 to-blue-950/15 border border-cyan-500/10 rounded-2xl flex items-start space-x-3.5 animate-float-delayed shadow-md shadow-slate-950/50">
              <div className="p-2.5 bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 rounded-xl flex-shrink-0 animate-pulse">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-sans font-extrabold text-cyan-300">EDUCATIONAL SCIENTIFIC INSIGHT</h4>
                <p className="text-[11px] text-slate-400 leading-normal italic">
                  "{activeSpecies.funFact}"
                </p>
              </div>
            </div>

            {/* Pledge protection summary */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-slate-500">
              <span className="flex items-center">
                <Award className="w-3.5 h-3.5 text-cyan-400 mr-1 animate-pulse" /> Certified Ecosystem Habitat ledger.
              </span>
              <span className="text-slate-400">
                Data compiled from IUCN Red List 2026.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
