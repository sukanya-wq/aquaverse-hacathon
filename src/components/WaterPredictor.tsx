/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, Droplet, CheckCircle, AlertTriangle, ShieldCheck, RefreshCw, Layers, Sparkles, Filter, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnalysisResult {
  contaminationLevel: number; // 0 - 100
  status: string; // e.g., 'Safe / Pristine'
  contaminants: string[];
  remediationSteps: string[];
  summary: string;
}

// Interactive Preset Samples (high-resolution Unsplash images representing water states)
const WATER_PRESETS = [
  {
    id: 'clean',
    name: 'Pristine Spring Water',
    description: 'Clean, clear water with zero apparent contaminants.',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'algae',
    name: 'Algal Bloom Pond',
    description: 'Dense, pea-green standing water with heavy microalgae concentration.',
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'muddy',
    name: 'Turbid River Runoff',
    description: 'Silt-heavy brown river water following intense rain.',
    imageUrl: 'https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'chemical',
    name: 'Discolored Stagnant Pool',
    description: 'Stagnant water showing dark tinting and chemical suspension indicators.',
    imageUrl: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=400&q=80',
  },
];

const SCAN_PHASES = [
  'Initializing multi-spectral optical scanner...',
  'Analyzing particulate light absorption...',
  'Evaluating turbidity & optical density...',
  'Extracting suspended matter characteristics...',
  'Synthesizing chemical & biological indicators...',
  'Generating custom remediation and purification guide...'
];

export default function WaterPredictor() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPresetUrl, setSelectedPresetUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [scanMessageIndex, setScanMessageIndex] = useState<number>(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [displayLevel, setDisplayLevel] = useState(0);

  useEffect(() => {
    if (result) {
      let start = 0;
      const end = result.contaminationLevel;
      if (start === end) {
        setDisplayLevel(end);
        return;
      }
      const duration = 1200; // ms
      const increment = end > start ? 1 : -1;
      const stepTime = Math.abs(Math.floor(duration / (end - start)));
      const timer = setInterval(() => {
        start += increment;
        setDisplayLevel(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, Math.max(stepTime, 10));
      return () => clearInterval(timer);
    } else {
      setDisplayLevel(0);
    }
  }, [result]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<any>(null);

  const startScanMessages = () => {
    setScanMessageIndex(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setScanMessageIndex((prev) => (prev < SCAN_PHASES.length - 1 ? prev + 1 : prev));
    }, 1800);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Unsupported file format. Please upload a PNG, JPEG, or WEBP image.');
      return;
    }
    setError(null);
    setResult(null);
    setSelectedPresetUrl(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const selectPreset = (imageUrl: string) => {
    setError(null);
    setResult(null);
    setSelectedImage(imageUrl); // Preview directly
    setSelectedPresetUrl(imageUrl); // Save reference to fetch on server
  };

  const triggerAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);
    startScanMessages();

    try {
      let body: any = {};
      if (selectedPresetUrl) {
        body = { imageUrl: selectedPresetUrl };
      } else {
        body = { 
          image: selectedImage,
          mimeType: selectedImage.split(';')[0].split(':')[1] || 'image/jpeg'
        };
      }

      const response = await fetch('/api/analyze-water', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let errMsg = 'The water quality scanner is temporarily busy.';
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json();
            errMsg = errorData.error || errMsg;
          } catch (e) {
            // Ignore parse failure on error body
          }
        } else {
          try {
            const text = await response.text();
            if (text.includes('experiencing high demand') || text.includes('overloaded') || response.status === 503) {
              errMsg = 'The Gemini AI service is currently overloaded with high demand. Please try again in a few seconds.';
            } else {
              errMsg = `Server encountered an issue (Status ${response.status}). Please try again shortly.`;
            }
          } catch (e) {
            errMsg = `Communication error (Status ${response.status}).`;
          }
        }
        throw new Error(errMsg);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received an unexpected response format from the server. Please try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'The water analysis server is temporarily busy or your API key is invalid.');
    } finally {
      setIsAnalyzing(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setSelectedPresetUrl(null);
    setResult(null);
    setError(null);
    setIsAnalyzing(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Get color scale matching contamination percentage
  const getIndexColor = (level: number) => {
    if (level < 15) return { text: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', fill: 'bg-cyan-400', icon: ShieldCheck };
    if (level < 45) return { text: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10', fill: 'bg-yellow-400', icon: HelpCircle };
    return { text: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/10', fill: 'bg-red-400', icon: AlertTriangle };
  };

  const colorStyles = result ? getIndexColor(result.contaminationLevel) : { text: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', fill: 'bg-cyan-400', icon: Droplet };
  const IndicatorIcon = colorStyles.icon;

  return (
    <motion.section 
      id="water-contamination-predictor" 
      className="relative py-24 px-4 md:px-8 border-t border-white/5 bg-slate-950 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
          }
        }
      }}
    >
      {/* Visual background atmospheric effects */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -15, 0],
          y: [0, 15, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Title Grid */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
          className="text-center md:text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8"
        >
          <div className="max-w-xl">
            <span id="scanner-subtitle" className="text-xs md:text-sm font-semibold text-cyan-400 tracking-widest uppercase flex items-center justify-center md:justify-start gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              Environmental Diagnostics
            </span>
            <h2 id="scanner-main-title" className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              AI Water Quality Scanner
            </h2>
            <p id="scanner-desc" className="text-slate-400 text-sm md:text-base mt-2">
              Upload an image of a freshwater or marine sample. Our deep learning model will estimate contamination indices, identify visible pollutants, and generate a step-by-step remediation protocol.
            </p>
          </div>

          <div className="flex justify-center">
            {result && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                id="re-scan-btn"
                onClick={resetScanner}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer hover:border-cyan-500/40"
              >
                <RefreshCw className="w-4.5 h-4.5 text-cyan-400" />
                Scan New Sample
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Main interactive scanning workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Image source pane & presets */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* Input pane */}
            <div 
              id="upload-panel-card"
              className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md p-6 relative"
            >
              <h3 id="input-source-header" className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                Select Water Sample
              </h3>

              {/* Upload Dropzone */}
              <AnimatePresence mode="wait">
                {!selectedImage ? (
                  <motion.div
                    key="dropzone"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    id="dropzone-area"
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[260px] ${
                      dragActive
                        ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_20px_rgba(34,211,238,0.1)] scale-[0.98]'
                        : 'border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.01]'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handleFileChange}
                      id="water-image-file-input"
                    />
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-4 bg-slate-950/80 rounded-full border border-white/5 mb-4 shadow-md"
                    >
                      <Upload className="w-6 h-6 text-cyan-400" />
                    </motion.div>
                    <p className="text-slate-200 font-semibold text-sm">
                      Drag and drop your water image here
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      Supports PNG, JPG, or WEBP up to 8MB
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Or select a file
                    </div>
                  </motion.div>
                ) : (
                  /* Live Preview Pane */
                  <motion.div 
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    id="image-preview-frame" 
                    className="relative rounded-xl overflow-hidden border border-white/10 min-h-[260px] flex items-center justify-center bg-slate-950"
                  >
                    <img
                      src={selectedImage}
                      alt="Active Water Sample Preview"
                      referrerPolicy="no-referrer"
                      className={`w-full max-h-[350px] object-contain transition-all duration-700 ${
                        isAnalyzing ? 'brightness-50 saturate-50' : ''
                      }`}
                    />
                    
                    {/* Neon scan scanning bar (shows up during analysis) */}
                    <AnimatePresence>
                      {isAnalyzing && (
                        <motion.div 
                          initial={{ top: '0%' }}
                          animate={{ top: '100%' }}
                          transition={{ 
                            repeat: Infinity, 
                            repeatType: "reverse", 
                            duration: 2.5, 
                            ease: "easeInOut" 
                          }}
                          className="absolute left-0 right-0 h-1.5 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] pointer-events-none z-10" 
                        />
                      )}
                    </AnimatePresence>

                    {/* Laser grid effect overlay during scan */}
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,187,222,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(18,187,222,0.07)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                    )}

                    {/* Top-right floating controls */}
                    {!isAnalyzing && !result && (
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                        whileTap={{ scale: 0.9 }}
                        id="remove-sample-btn"
                        onClick={() => { setSelectedImage(null); setSelectedPresetUrl(null); }}
                        className="absolute top-3 right-3 bg-slate-950/80 hover:text-red-400 text-slate-300 hover:border-red-500/40 border border-white/10 p-2 rounded-full transition-all duration-200 cursor-pointer"
                        title="Clear Selection"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              {selectedImage && !result && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5"
                >
                  <motion.button
                    whileHover={!isAnalyzing ? { scale: 1.02, boxShadow: "0px 0px 25px rgba(6, 182, 212, 0.4)" } : {}}
                    whileTap={!isAnalyzing ? { scale: 0.98 } : {}}
                    id="analyze-submit-btn"
                    onClick={triggerAnalyze}
                    disabled={isAnalyzing}
                    className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[size:200%_auto] hover:bg-right text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/10 font-sans tracking-wide text-sm uppercase"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                        <span>Analyzing Sample...</span>
                      </>
                    ) : (
                      <>
                        <Droplet className="w-5 h-5 fill-current text-slate-950" />
                        <span>Launch Optical Analysis</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Presets List */}
            {!isAnalyzing && !result && (
              <div 
                id="preset-water-samples-box"
                className="bg-slate-900/20 border border-white/5 rounded-2xl p-6"
              >
                <h4 id="presets-section-title" className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Interactive Water Presets
                </h4>
                <motion.div 
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.08 }
                    }
                  }}
                  className="grid grid-cols-2 gap-3"
                >
                  {WATER_PRESETS.map((preset) => {
                    const isSelected = selectedPresetUrl === preset.imageUrl;
                    return (
                      <motion.button
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        key={preset.id}
                        id={`preset-card-${preset.id}`}
                        onClick={() => selectPreset(preset.imageUrl)}
                        className={`group text-left border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer relative ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-[1.02]'
                            : 'border-white/5 bg-slate-900/30 hover:border-white/15'
                        }`}
                      >
                        {isSelected && (
                          <motion.div 
                            layoutId="activePresetIndicator"
                            className="absolute inset-0 border border-cyan-400 rounded-xl pointer-events-none z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <div className="h-16 w-full overflow-hidden relative">
                          <img
                            src={preset.imageUrl}
                            alt={preset.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-2.5">
                          <h5 className={`text-xs font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-200'}`}>
                            {preset.name}
                          </h5>
                          <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1 leading-tight">
                            {preset.description}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* RIGHT: Scanning progress or Result board */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.15 } }
            }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {/* 1. INITIAL EMPTY STATE */}
              {!isAnalyzing && !result && !error && (
                <motion.div 
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  id="empty-scanner-state"
                  className="bg-slate-900/20 border border-dashed border-white/5 rounded-2xl p-12 text-center min-h-[440px] flex flex-col items-center justify-center"
                >
                  <motion.div 
                    animate={{ 
                      y: [0, -8, 0],
                      boxShadow: ["0px 0px 0px rgba(6,182,212,0)", "0px 0px 20px rgba(6,182,212,0.15)", "0px 0px 0px rgba(6,182,212,0)"]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 bg-slate-950 rounded-full border border-white/5 flex items-center justify-center text-slate-600 mb-6 shadow-inner"
                  >
                    <Droplet className="w-8 h-8 text-cyan-500" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-slate-300">Awaiting Water Sample</h3>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
                    Provide an image of any ocean bay, reservoir, river, or water container. Click "Launch Optical Analysis" to reveal visual metrics.
                  </p>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-start gap-3 text-left mt-8 max-w-md border border-white/5 bg-slate-900/10 p-4 rounded-xl"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
                      <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                      How the Analysis Works
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Gemini processes raw visual textures, discoloration spectrums, organic suspensions, and floating bio-matter to reconstruct probable contamination level indicators, risk indexes, and purify remediations.
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {/* 2. ERROR DISPLAY */}
              {error && (
                <motion.div 
                  key="error-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  id="scanner-error-card"
                  className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 text-center min-h-[440px] flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-red-950/20 rounded-full border border-red-500/20 flex items-center justify-center text-red-400 mb-6 shadow-inner">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-red-400">Analysis Aborted</h3>
                  <p className="text-red-200/70 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
                    {error}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    id="error-retry-btn"
                    onClick={resetScanner}
                    className="mt-6 inline-flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset and Retry
                  </motion.button>
                </motion.div>
              )}

              {/* 3. ACTIVE ANALYZING / LOADING SCREEN */}
              {isAnalyzing && (
                <motion.div 
                  key="analyzing-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  id="scanner-loading-card"
                  className="bg-slate-900/40 border border-white/5 rounded-2xl p-12 text-center min-h-[440px] flex flex-col items-center justify-center backdrop-blur-md shadow-2xl relative overflow-hidden"
                >
                  {/* Microscopic particles floating overlay inside the diagnostic loader */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.02)_0,transparent_100%)] animate-pulse" />

                  {/* Animated diagnostic scanning rings */}
                  <div className="relative w-24 h-24 mb-8">
                    <motion.div 
                      animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full border-4 border-slate-800" 
                    />
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-cyan-500" 
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-3 rounded-full border-2 border-dashed border-cyan-400/30" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Droplet className="w-8 h-8 text-cyan-400" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-3 relative z-10 w-full">
                    <h3 className="text-xl font-bold text-white tracking-wide">Optical Inspection in Progress</h3>
                    <div className="h-6 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.p 
                          key={scanMessageIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="text-cyan-400 text-xs font-mono tracking-wider"
                        >
                          {SCAN_PHASES[scanMessageIndex]}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    
                    {/* Fake glowing console trace readout */}
                    <div className="max-w-md mx-auto bg-slate-950 border border-white/5 rounded-lg p-3 text-left font-mono text-[9px] text-slate-500 h-28 overflow-y-hidden space-y-1 shadow-inner relative">
                      <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold border-b border-white/5 pb-1.5 mb-2">
                        <span>CONSOLE FEED</span>
                        <span className="text-cyan-500/80 animate-pulse flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          FEED_ONLINE
                        </span>
                      </div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        &gt; CONNECTED TO DEEP WATER DATA SYSTEM...
                      </motion.div>
                      <AnimatePresence>
                        {scanMessageIndex >= 1 && (
                          <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-cyan-500/60">
                            &gt; WAVELENGTH BIREFRINGENCE ANALYSIS: PASS
                          </motion.div>
                        )}
                        {scanMessageIndex >= 2 && (
                          <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-cyan-500/60">
                            &gt; SPECTROMETRIC PARTICULATE RATIO CALIBRATED
                          </motion.div>
                        )}
                        {scanMessageIndex >= 3 && (
                          <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-blue-400/60">
                            &gt; COMPILING COLOR MATRIX SUSPENSIONS...
                          </motion.div>
                        )}
                        {scanMessageIndex >= 4 && (
                          <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-cyan-300/80">
                            &gt; GEMINI NEURAL PATTERN CLASSIFIER COMMITTED
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline">
                        &gt;_
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 4. ANALYSIS RESULTS SCREEN */}
              {result && !isAnalyzing && (
                <motion.div 
                  key="results-state"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  id="scanner-results-card"
                  className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative"
                >
                  
                  {/* Header Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-white/5 pb-6 mb-6">
                    
                    {/* Gauge/Percentage Column */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center md:border-r border-white/5 md:pr-6">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        
                        {/* SVG Circle Gauge */}
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="54"
                            className="stroke-slate-800"
                            strokeWidth="8"
                            fill="transparent"
                          />
                          <motion.circle
                            cx="64"
                            cy="64"
                            r="54"
                            className={`transition-all duration-1000 ease-out ${
                              result.contaminationLevel < 15
                                ? 'stroke-cyan-400'
                                : result.contaminationLevel < 45
                                ? 'stroke-yellow-400'
                                : 'stroke-red-500'
                            }`}
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 54}
                            initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - result.contaminationLevel / 100) }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            strokeLinecap="round"
                          />
                        </svg>

                        {/* Centered Value with real-time count up animation */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-extrabold text-white tabular-nums tracking-tight">
                            {displayLevel}%
                          </span>
                          <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase mt-0.5">
                            Polluted
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Classification Info Column */}
                    <div className="md:col-span-7 space-y-3 text-center md:text-left">
                      <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase font-bold">
                        Optical Classification
                      </span>
                      <div className="flex flex-col md:flex-row items-center gap-2">
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border ${colorStyles.border} ${colorStyles.bg} ${colorStyles.text}`}
                        >
                          <IndicatorIcon className="w-4 h-4" />
                          <span>{result.status}</span>
                        </motion.div>
                      </div>
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                        This sample exhibits an estimated contamination factor of <strong className="text-white">{result.contaminationLevel}%</strong>. Visual metrics indicate suspended materials associated with {result.status.toLowerCase()} hazards.
                      </p>
                    </div>
                  </div>

                  {/* Educational Summary Box */}
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        Visual Diagnosis
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-white/5 shadow-inner">
                        {result.summary}
                      </p>
                    </motion.div>

                    {/* Contaminants identified pills */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-3"
                    >
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Droplet className="w-4 h-4 text-cyan-400" />
                        Key Detected Constituents
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.contaminants.map((contaminant, idx) => (
                          <motion.div
                            key={idx}
                            id={`contaminant-badge-${idx}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + idx * 0.05 }}
                            whileHover={{ scale: 1.05, borderColor: 'rgba(34,211,238,0.3)' }}
                            className="bg-slate-950 border border-white/5 text-slate-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-default"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                            <span>{contaminant}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* How to Clean - Detailed purification plan */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Filter className="w-4 h-4 text-cyan-400" />
                        Purification & Remediation Steps
                      </h4>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {result.remediationSteps.map((step, idx) => (
                          <motion.div
                            key={idx}
                            id={`remediation-step-row-${idx}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.08 }}
                            whileHover={{ x: 4, borderColor: 'rgba(34,211,238,0.15)', backgroundColor: 'rgba(255,255,255,0.01)' }}
                            className="flex items-start gap-3 bg-slate-950/20 border border-white/5 p-4 rounded-xl transition-all"
                          >
                            <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                              {idx + 1}
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-slate-200 text-sm leading-relaxed font-medium">
                                {step}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Educational note footer */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex items-center gap-2 text-[10px] text-slate-500 italic mt-4 bg-slate-950/30 p-3 rounded-lg border border-white/[0.02]"
                      >
                        <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
                        <span>Note: This assessment is based on advanced visual diagnostics. Always utilize standard laboratory assays for drinking water safety validation.</span>
                      </motion.div>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
}
