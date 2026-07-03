/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio, Anchor, Play, Pause, Activity, RefreshCw } from 'lucide-react';

export default function AudioHydrophone() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSoundMode, setActiveSoundMode] = useState<'murmur' | 'whale' | 'vents'>('murmur');
  const [volume, setVolume] = useState(60);
  const [panelOpen, setPanelOpen] = useState(false);

  // Audio nodes and context refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Generator nodes
  const murmurOscRef = useRef<OscillatorNode | null>(null);
  const murmurGainRef = useRef<GainNode | null>(null);
  const ventsNodeRef = useRef<AudioWorkletNode | ScriptProcessorNode | null>(null);
  const ventsGainRef = useRef<GainNode | null>(null);
  const whaleTimerRef = useRef<any>(null);

  // Canvas visual feedback
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Audio Context on gesture
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume / 100 * 0.4, ctx.currentTime);
      mainGainRef.current = masterGain;

      // Deep ocean low-pass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, ctx.currentTime);
      filterNodeRef.current = filter;

      // Analyser for real-time canvas feedback
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;

      // Chain: Sources -> Filter -> Analyser -> Master Gain -> Destination
      filter.connect(analyser);
      analyser.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Start the deep ocean murmur oscillator
      startOceanMurmur();
      
      // Start scheduling periodic whale resonances
      scheduleWhales();

      // Start bubble vent pink noise generator
      startVentsNoise();

      // Mute the modes initially except murmur
      updateSoundMix('murmur');

    } catch (err) {
      console.warn('Web Audio API not supported in this environment', err);
    }
  };

  // Generate low frequency ocean rumble
  const startOceanMurmur = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || !filterNodeRef.current) return;

    // Sub-bass sine wave
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(32.7, ctx.currentTime); // C1 sub note

    // Slightly detuned oscillator for heavy oceanic chorus beating
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(33.1, ctx.currentTime);

    const murmurGain = ctx.createGain();
    murmurGain.gain.setValueAtTime(0.8, ctx.currentTime);

    // LFO to slowly modulate ocean sway
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // very slow 12s cycle

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.3, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(murmurGain.gain);
    lfo.start();

    osc1.connect(murmurGain);
    osc2.connect(murmurGain);
    murmurGain.connect(filterNodeRef.current);

    osc1.start();
    osc2.start();

    murmurOscRef.current = osc1; // store ref to keep tracking
    murmurGainRef.current = murmurGain;
  };

  // Generate beautiful distant synthetic whale cries using modulated oscillators
  const playWhaleCry = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || !filterNodeRef.current || !isPlaying || activeSoundMode !== 'whale') return;

    const time = ctx.currentTime;
    
    // Smooth high sweep oscillator
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, time);
    
    // Beautiful frequency slide upwards & downwards
    osc.frequency.exponentialRampToValueAtTime(380, time + 1.2);
    osc.frequency.exponentialRampToValueAtTime(180, time + 2.5);
    osc.frequency.exponentialRampToValueAtTime(290, time + 3.8);
    osc.frequency.exponentialRampToValueAtTime(80, time + 5.0);

    const cryGain = ctx.createGain();
    cryGain.gain.setValueAtTime(0, time);
    cryGain.gain.linearRampToValueAtTime(0.15, time + 1.0);
    cryGain.gain.linearRampToValueAtTime(0.15, time + 3.5);
    cryGain.gain.linearRampToValueAtTime(0, time + 5.0);

    // Vibrato effect
    const vibrato = ctx.createOscillator();
    vibrato.type = 'sine';
    vibrato.frequency.setValueAtTime(5.5, time); // 5Hz wobble
    const vibratoGain = ctx.createGain();
    vibratoGain.gain.setValueAtTime(8, time);

    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    vibrato.start();

    // Reverb / delay approximation using a bandpass sweep
    const cryFilter = ctx.createBiquadFilter();
    cryFilter.type = 'bandpass';
    cryFilter.Q.setValueAtTime(2.0, time);
    cryFilter.frequency.setValueAtTime(150, time);
    cryFilter.frequency.exponentialRampToValueAtTime(450, time + 2.0);
    cryFilter.frequency.exponentialRampToValueAtTime(180, time + 5.0);

    osc.connect(cryFilter);
    cryFilter.connect(cryGain);
    cryGain.connect(ctx.destination); // Bypass heavy lowpass so we can hear details

    osc.start();
    osc.stop(time + 5.1);
    vibrato.stop(time + 5.1);
  };

  // Periodically schedule whale songs
  const scheduleWhales = () => {
    if (whaleTimerRef.current) clearInterval(whaleTimerRef.current);
    whaleTimerRef.current = setInterval(() => {
      if (Math.random() > 0.4) {
        playWhaleCry();
      }
    }, 8000);
  };

  // Generate bubbling thermal vents using bandpass-filtered noise synthesis
  const startVentsNoise = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || !filterNodeRef.current) return;

    // Buffer creation for pink/white noise
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Populate with white noise
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate bubbly gushing steam
    const ventFilter = ctx.createBiquadFilter();
    ventFilter.type = 'bandpass';
    ventFilter.Q.setValueAtTime(6.0, ctx.currentTime);
    ventFilter.frequency.setValueAtTime(120, ctx.currentTime);

    // Dynamic vent frequency modulator (bubbles bursting)
    const bubbleLfo = ctx.createOscillator();
    bubbleLfo.type = 'sine';
    bubbleLfo.frequency.setValueAtTime(1.8, ctx.currentTime); // fast bubbling rate
    
    const bubbleLfoGain = ctx.createGain();
    bubbleLfoGain.gain.setValueAtTime(40, ctx.currentTime); // bubble sweep width

    bubbleLfo.connect(bubbleLfoGain);
    bubbleLfoGain.connect(ventFilter.frequency);
    bubbleLfo.start();

    const ventGain = ctx.createGain();
    ventGain.gain.setValueAtTime(0.4, ctx.currentTime);

    whiteNoise.connect(ventFilter);
    ventFilter.connect(ventGain);
    ventGain.connect(filterNodeRef.current);

    whiteNoise.start();
    
    ventsGainRef.current = ventGain;
  };

  // Adjust levels based on selected active soundmode
  const updateSoundMix = (mode: 'murmur' | 'whale' | 'vents') => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const t = ctx.currentTime;
    
    // Murmur gain adjustment
    if (murmurGainRef.current) {
      if (mode === 'murmur') {
        murmurGainRef.current.gain.linearRampToValueAtTime(0.8, t + 1.5);
      } else {
        murmurGainRef.current.gain.linearRampToValueAtTime(0.2, t + 1.5);
      }
    }

    // Vents noise gain adjustment
    if (ventsGainRef.current) {
      if (mode === 'vents') {
        ventsGainRef.current.gain.linearRampToValueAtTime(0.65, t + 1.5);
      } else {
        ventsGainRef.current.gain.linearRampToValueAtTime(0.01, t + 1.5);
      }
    }

    // Trigger one whale song instantly if switching to whale mode
    if (mode === 'whale') {
      setTimeout(() => playWhaleCry(), 300);
    }
  };

  // Handle Play / Stop toggling
  const togglePlay = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (isPlaying) {
      // Fade out
      mainGainRef.current?.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      setTimeout(() => {
        if (ctx.state === 'running') ctx.suspend();
      }, 350);
    } else {
      // Fade in
      if (ctx.state === 'suspended') ctx.resume();
      mainGainRef.current?.gain.exponentialRampToValueAtTime(volume / 100 * 0.4, ctx.currentTime + 0.3);
    }
    setIsPlaying(!isPlaying);
  };

  // Trigger Sonar Ping Sound Effect (Global Dispatch)
  const triggerSonarPing = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
      setIsPlaying(true);
    }

    const time = ctx.currentTime;

    // High frequency acoustic ping
    const pingOsc = ctx.createOscillator();
    pingOsc.type = 'sine';
    pingOsc.frequency.setValueAtTime(840, time); // classic sonar note
    pingOsc.frequency.exponentialRampToValueAtTime(800, time + 0.15);
    pingOsc.frequency.exponentialRampToValueAtTime(100, time + 4.5); // heavy reverb trailing slide

    const pingGain = ctx.createGain();
    pingGain.gain.setValueAtTime(0, time);
    pingGain.gain.linearRampToValueAtTime(0.35, time + 0.05);
    pingGain.gain.exponentialRampToValueAtTime(0.0001, time + 4.5);

    pingOsc.connect(pingGain);
    pingGain.connect(ctx.destination);

    pingOsc.start();
    pingOsc.stop(time + 4.6);

    // Dispatch global Event to animate other components (e.g. Sonar Ripples!)
    const sonarEvent = new CustomEvent('sonar-ping', { 
      detail: { time: Date.now() } 
    });
    window.dispatchEvent(sonarEvent);
  };

  // Trigger a cinematic IMAX-style deep dive sweep
  const triggerCinematicSweep = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
      setIsPlaying(true);
    }

    const time = ctx.currentTime;

    // Deep sub drop oscillator
    const subOsc = ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(90, time);
    subOsc.frequency.exponentialRampToValueAtTime(30, time + 2.5);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0, time);
    subGain.gain.linearRampToValueAtTime(0.5, time + 0.1);
    subGain.gain.exponentialRampToValueAtTime(0.0001, time + 2.5);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    // High shimmer sweeps (glass sound)
    const shimmerOsc = ctx.createOscillator();
    shimmerOsc.type = 'sine';
    shimmerOsc.frequency.setValueAtTime(600, time);
    shimmerOsc.frequency.exponentialRampToValueAtTime(1200, time + 0.8);
    shimmerOsc.frequency.exponentialRampToValueAtTime(200, time + 2.0);

    const shimmerGain = ctx.createGain();
    shimmerGain.gain.setValueAtTime(0, time);
    shimmerGain.gain.linearRampToValueAtTime(0.15, time + 0.05);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, time + 2.0);

    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);

    subOsc.start();
    subOsc.stop(time + 2.6);
    shimmerOsc.start();
    shimmerOsc.stop(time + 2.1);
  };

  // Trigger procedural bubble pops
  const triggerBubblePops = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
      setIsPlaying(true);
    }

    const now = ctx.currentTime;
    
    // Play 12 rapid little bubble pops with staggered timing
    for (let i = 0; i < 12; i++) {
      const stagger = Math.random() * 0.8;
      const duration = 0.08 + Math.random() * 0.08;
      const startFreq = 220 + Math.random() * 200;
      const endFreq = 800 + Math.random() * 400;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, now + stagger);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + stagger + duration);

      gain.gain.setValueAtTime(0, now + stagger);
      gain.gain.linearRampToValueAtTime(0.12, now + stagger + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + stagger + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + stagger);
      osc.stop(now + stagger + duration + 0.05);
    }
  };

  // Listen for global theatrical movie camera triggers and bubble transitions
  useEffect(() => {
    const handleGlobalSonarEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.isTheatrical) {
        triggerCinematicSweep();
      }
    };
    const handleGlobalBubbleEvent = () => {
      triggerBubblePops();
    };
    window.addEventListener('sonar-ping', handleGlobalSonarEvent);
    window.addEventListener('ocean-dive-bubbles', handleGlobalBubbleEvent);
    return () => {
      window.removeEventListener('sonar-ping', handleGlobalSonarEvent);
      window.removeEventListener('ocean-dive-bubbles', handleGlobalBubbleEvent);
    };
  }, []);

  // Update volume level
  useEffect(() => {
    if (mainGainRef.current && audioCtxRef.current) {
      mainGainRef.current.gain.setValueAtTime(volume / 100 * 0.4, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Handle active track change
  const handleModeChange = (mode: 'murmur' | 'whale' | 'vents') => {
    setActiveSoundMode(mode);
    if (audioCtxRef.current) {
      updateSoundMix(mode);
    }
  };

  // Canvas Oscilloscope Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localFrame: number;
    const bufferLength = 64;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteTimeDomainData(dataArray);
      } else {
        // Render dummy smooth wave when silent
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = 128 + Math.sin(i * 0.2 + Date.now() * 0.005) * 8;
        }
      }

      ctx.lineWidth = 2.2;
      ctx.strokeStyle = isPlaying ? '#22d3ee' : '#475569';
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Render glowing floating dots in background
      if (isPlaying) {
        ctx.fillStyle = 'rgba(34, 211, 238, 0.15)';
        for (let j = 0; j < 4; j++) {
          const px = (Date.now() * 0.03 + j * 50) % canvas.width;
          const py = canvas.height / 2 + Math.sin(Date.now() * 0.002 + j) * 15;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      localFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(localFrame);
    };
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (whaleTimerRef.current) clearInterval(whaleTimerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      
      {/* Retractable Dashboard Panel */}
      {panelOpen && (
        <div 
          className="bg-slate-950/90 border border-cyan-500/30 rounded-2xl p-4 w-72 mb-3 shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-xl flex flex-col space-y-4 animate-fade-in text-left select-none"
          style={{ boxShadow: 'inset 0 0 20px rgba(6,182,212,0.05), 0 10px 40px rgba(0,0,0,0.8)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Radio className="w-4 h-4 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest">Acoustic Hydrophone</span>
            </div>
            <button 
              onClick={() => setPanelOpen(false)}
              className="text-slate-500 hover:text-white font-sans text-xs cursor-pointer"
            >
              Minimize
            </button>
          </div>

          {/* Real-time frequency monitor visualizer */}
          <div className="bg-slate-900/60 rounded-xl p-2.5 border border-white/5 relative overflow-hidden">
            <canvas 
              ref={canvasRef} 
              width={240} 
              height={50} 
              className="w-full h-[50px] opacity-80"
            />
            <div className="absolute top-1.5 right-2 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[7.5px] font-mono text-cyan-400 tracking-wider">LIVE FEED</span>
            </div>
          </div>

          {/* Audio controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={togglePlay}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                isPlaying 
                  ? 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30' 
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/10'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Mute' : 'Listen'}</span>
            </button>

            {/* Sonar Ping Button */}
            <button
              onClick={triggerSonarPing}
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 border border-white/10 text-cyan-400 hover:border-cyan-400/50 cursor-pointer transition-all duration-200"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Ping Sonar</span>
            </button>
          </div>

          {/* Soundscapes Select list */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Feed Select</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => handleModeChange('murmur')}
                className={`text-[9px] py-1.5 rounded-lg font-mono font-bold uppercase cursor-pointer transition-colors ${
                  activeSoundMode === 'murmur' 
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Rumble
              </button>
              <button
                onClick={() => handleModeChange('whale')}
                className={`text-[9px] py-1.5 rounded-lg font-mono font-bold uppercase cursor-pointer transition-colors ${
                  activeSoundMode === 'whale' 
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Whales
              </button>
              <button
                onClick={() => handleModeChange('vents')}
                className={`text-[9px] py-1.5 rounded-lg font-mono font-bold uppercase cursor-pointer transition-colors ${
                  activeSoundMode === 'vents' 
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Vents
              </button>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center space-x-3 pt-1">
            {volume === 0 ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-[10px] font-mono text-slate-400 w-6 text-right">{volume}%</span>
          </div>
        </div>
      )}

      {/* Floating launcher trigger */}
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative shadow-2xl cursor-pointer ${
          panelOpen 
            ? 'bg-slate-900 border border-cyan-500/30 text-cyan-400 rotate-90 scale-95' 
            : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 scale-100 hover:scale-110 shadow-cyan-500/20'
        }`}
      >
        {isPlaying ? (
          <span className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping duration-[2.5s]" />
        ) : null}
        <Radio className="w-5 h-5" />
      </button>

    </div>
  );
}
