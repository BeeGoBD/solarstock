import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Zap,
  BatteryCharging,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface SolarInverterFlowProps {
  onSelectProduct?: (productId: string) => void;
  onExploreCategory?: (categoryId: string) => void;
  onBannerClick?: (category?: string) => void;
}

export const SolarInverterFlow: React.FC<SolarInverterFlowProps> = ({
  onSelectProduct,
  onExploreCategory,
  onBannerClick
}) => {
  const { slide3Products } = useStore();

  // ---------------------------------------------------------------------------
  // SLIDE 2 STATE: AUTOMATIC SEQUENTIAL ANIMATION (Phase 1: Solar -> Phase 2: Inverter)
  // ---------------------------------------------------------------------------
  const [animationPhase, setAnimationPhase] = useState<'solar' | 'inverter'>('solar');

  // Live dynamic telemetry values
  const [batteryPercent, setBatteryPercent] = useState(78.4);
  const [solarWatts, setSolarWatts] = useState(4180);
  const [solarAmps, setSolarAmps] = useState(81.6);
  const [sineOffset, setSineOffset] = useState(0);

  // ---------------------------------------------------------------------------
  // SLIDE 3 STATE: BRIGHT PREMIUM PRODUCT SHOWCASE SELECTION
  // ---------------------------------------------------------------------------
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  const getProdTagIcon = (idx: number) => {
    switch (idx % 4) {
      case 0: return Zap;
      case 1: return BatteryCharging;
      case 2: return Sun;
      default: return Sparkles;
    }
  };

  const featuredProducts = (slide3Products || []).map((prod, idx) => ({
    ...prod,
    tagIcon: getProdTagIcon(idx)
  }));

  // ---------------------------------------------------------------------------
  // SLIDE 2: AUTOMATIC SEQUENTIAL 2.5-SECOND PHASE FLIPPER (Solar -> Inverter -> Solar...)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationPhase((prev) => (prev === 'solar' ? 'inverter' : 'solar'));
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  // ---------------------------------------------------------------------------
  // SLIDE 3: Auto-cycle Featured Products automatically every 3 seconds (3000ms)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedProductIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  // ---------------------------------------------------------------------------
  // Real-time dynamic simulation loop for smooth LCD readout & sine wave
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      setBatteryPercent((prev) => {
        if (prev >= 99.9) return 72.0;
        return Number((prev + 0.12).toFixed(1));
      });

      // Realistic minor PV irradiance fluctuations under direct bright daytime sun
      setSolarWatts(Math.floor(4150 + Math.sin(Date.now() / 1200) * 160 + Math.random() * 50));
      setSolarAmps(Number((81.0 + Math.sin(Date.now() / 1600) * 3.2).toFixed(1)));
    }, 350);

    // High frequency sine wave oscilloscope animation
    let animationFrameId: number;
    const animateSine = () => {
      setSineOffset((prev) => (prev + 0.14) % (Math.PI * 2));
      animationFrameId = requestAnimationFrame(animateSine);
    };
    animationFrameId = requestAnimationFrame(animateSine);

    return () => {
      clearInterval(telemetryInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Generate dynamic SVG sine wave path
  const generateSinePath = () => {
    const width = 80;
    const height = 18;
    const midY = height / 2;
    let path = `M 0 ${midY}`;
    for (let x = 0; x <= width; x += 2) {
      const y = midY + Math.sin(x / 9 + sineOffset) * 6;
      path += ` L ${x} ${y.toFixed(2)}`;
    }
    return path;
  };

  const handleAction = (category?: string, productId?: string) => {
    if (productId && onSelectProduct) {
      onSelectProduct(productId);
    } else if (category && onExploreCategory) {
      onExploreCategory(category);
    } else if (onBannerClick) {
      onBannerClick(category);
    }
  };

  const currentProduct = featuredProducts[selectedProductIndex] || featuredProducts[0] || {
    id: 'hybrid-10kw',
    category: 'hybrid-inverters',
    name: '10kW Hybrid MPPT Inverter',
    tag: 'FLAGSHIP INVERTER',
    tagIcon: Zap,
    spec: '98.4% Efficiency • 0ms UPS Switch',
    badge: 'Tier-1 Pure Sine',
    accentColor: '#38bdf8',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80'
  };
  const ProductTagIcon = currentProduct.tagIcon || Zap;

  return (
    <div className="relative w-full">
      {/* 50/50 Sub-Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        
        {/* ========================================================================= */}
        {/* SLIDE 2 (50% LEFT): AUTOMATIC 2.5S SEQUENTIAL SOLAR & INVERTER ANIMATION   */}
        {/* ========================================================================= */}
        <div
          className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/80 shadow-xl min-h-[220px] sm:min-h-[240px] h-[220px] sm:h-[240px] w-full flex flex-col justify-between select-none group"
        >
          {/* Top Subtle Status Indicators (Automatic 2.5s Phase Cycle) */}
          <div className="relative z-30 flex items-center justify-between px-3 pt-2.5 pb-1 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
            {/* Automatic 2-Step Phase Progress Bars */}
            <div className="flex items-center gap-1.5">
              {/* Step 1 Indicator */}
              <div className="w-10 h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10 backdrop-blur-md">
                <div
                  className={`h-full transition-all duration-500 ${
                    animationPhase === 'solar'
                      ? 'w-full bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                      : 'w-full bg-neutral-600 opacity-40'
                  }`}
                />
              </div>

              {/* Step 2 Indicator */}
              <div className="w-10 h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10 backdrop-blur-md">
                <div
                  className={`h-full transition-all duration-500 ${
                    animationPhase === 'inverter'
                      ? 'w-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]'
                      : 'w-0 bg-neutral-600 opacity-40'
                  }`}
                />
              </div>
            </div>

            {/* Micro Live Signal Dot */}
            <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 px-2 py-0.5 rounded-full backdrop-blur-md">
              <span className={`w-1.5 h-1.5 rounded-full ${animationPhase === 'solar' ? 'bg-amber-400' : 'bg-cyan-400'} animate-ping`} />
              <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-300 uppercase">
                {animationPhase === 'solar' ? '1/2 SOLAR HARVEST' : '2/2 INVERTER CHARGE'}
              </span>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* STEP 1: SUN SHINING ON HOUSE ROOFTOP & WIRE GOING INSIDE HOUSE          */}
          {/* ======================================================================= */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              animationPhase === 'solar'
                ? 'opacity-100 z-10 pointer-events-auto'
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Sky Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0284c7] via-[#0ea5e9] to-[#38bdf8]" />
            <div className="absolute -top-12 -left-12 w-80 h-80 bg-amber-300/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-sky-200/30 to-transparent pointer-events-none" />

            {/* Moving Clouds */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div className="absolute top-2 left-0 animate-cloud-slow opacity-60">
                <svg width="110" height="42" viewBox="0 0 110 42" fill="none">
                  <path
                    d="M18 36h74a14 14 0 0 0 0-28 20 20 0 0 0-38-6 16 16 0 0 0-26 12 12 12 0 0 0-10 22z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
              <div className="absolute top-8 left-[-40px] animate-cloud-medium opacity-75">
                <svg width="135" height="50" viewBox="0 0 135 50" fill="none">
                  <path
                    d="M22 44h90a16 16 0 0 0 0-32 24 24 0 0 0-46-8 18 18 0 0 0-32 14 14 14 0 0 0-12 26z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </div>

            {/* SVG Rooftop House & Sun Photons (Wire goes directly INSIDE house) */}
            <svg
              className="relative z-10 w-full h-full p-1"
              viewBox="0 0 420 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="sunCoreDay" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#fef08a" />
                  <stop offset="65%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </radialGradient>
                <radialGradient id="sunAuraDay" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop offset="40%" stopColor="#fde047" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="monoCellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="40%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#172554" />
                </linearGradient>
                <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
                <linearGradient id="houseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <linearGradient id="lawnFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>

              {/* Sun in Top-Left */}
              <g transform="translate(54, 40)">
                <circle cx="0" cy="0" r="40" fill="url(#sunAuraDay)" className="animate-pulse" />
                <g className="animate-[spin_16s_linear_infinite]">
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <line
                      key={deg}
                      x1="0"
                      y1={-24}
                      x2="0"
                      y2={deg % 60 === 0 ? -38 : -30}
                      stroke="#ffffff"
                      strokeWidth={deg % 60 === 0 ? '3' : '1.8'}
                      strokeLinecap="round"
                      transform={`rotate(${deg})`}
                      opacity="0.9"
                    />
                  ))}
                </g>
                <circle cx="0" cy="0" r="18" fill="url(#sunCoreDay)" />
                <circle cx="0" cy="0" r="11" fill="#ffffff" opacity="0.95" />
              </g>

              {/* Active Golden Photon Beams Stream to Roof */}
              <polygon points="54,40 120,135 285,90 85,30" fill="url(#sunAuraDay)" opacity="0.25" />
              <line
                x1="70"
                y1="52"
                x2="155"
                y2="92"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeDasharray="8 10"
                strokeLinecap="round"
                className="animate-dash-fast"
              />
              <line
                x1="82"
                y1="46"
                x2="215"
                y2="88"
                stroke="#fef08a"
                strokeWidth="3"
                strokeDasharray="6 8"
                strokeLinecap="round"
                className="animate-dash-fast"
              />
              <line
                x1="62"
                y1="64"
                x2="135"
                y2="114"
                stroke="#fde047"
                strokeWidth="2.5"
                strokeDasharray="5 7"
                strokeLinecap="round"
                className="animate-dash-fast"
              />
              <line
                x1="90"
                y1="58"
                x2="260"
                y2="95"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="7 9"
                strokeLinecap="round"
                className="animate-dash-fast"
              />

              {/* Lawn */}
              <polygon points="0,185 420,180 420,220 0,220" fill="url(#lawnFill)" opacity="0.9" />

              {/* House Architecture */}
              <polygon
                points="95,128 268,124 268,194 95,198"
                fill="url(#houseGrad)"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              <polygon
                points="268,124 300,108 300,178 268,194"
                fill="#cbd5e1"
                stroke="#94a3b8"
                strokeWidth="1.2"
              />

              {/* Front Door */}
              <g transform="translate(108, 148)">
                <rect x="0" y="0" width="24" height="48" rx="2" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
                <circle cx="20" cy="24" r="1.5" fill="#f59e0b" />
              </g>

              {/* Floor to Ceiling Windows with Warm Room Glow */}
              <g transform="translate(145, 140)">
                <rect x="0" y="0" width="52" height="42" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <rect x="2.5" y="2.5" width="47" height="37" rx="2" fill="#fef3c7" opacity="0.9" />
                <line x1="26" y1="2.5" x2="26" y2="39.5" stroke="#334155" strokeWidth="1.5" />
                <line x1="2.5" y1="21" x2="49.5" y2="21" stroke="#334155" strokeWidth="1.5" />
              </g>

              {/* Tilted Roof Sloping towards the Sun */}
              <polygon points="88,127 274,122 296,62 110,67" fill="url(#roofGrad)" stroke="#475569" strokeWidth="1.5" />

              {/* Solar Array on Roof */}
              {/* Panel 1 */}
              <polygon points="114,94 190,92 198,72 122,74" fill="url(#monoCellGrad)" stroke="#38bdf8" strokeWidth="1" />
              {/* Panel 2 */}
              <polygon points="196,92 272,90 280,70 204,72" fill="url(#monoCellGrad)" stroke="#38bdf8" strokeWidth="1" />
              {/* Panel 3 */}
              <polygon points="102,120 178,118 186,98 110,100" fill="url(#monoCellGrad)" stroke="#38bdf8" strokeWidth="1" />
              {/* Panel 4 */}
              <polygon points="184,118 260,116 268,96 192,98" fill="url(#monoCellGrad)" stroke="#38bdf8" strokeWidth="1" />

              {/* Active Energy Pulse Glow on Panels */}
              <ellipse cx="185" cy="95" rx="68" ry="22" fill="#38bdf8" opacity="0.35" className="animate-pulse" />

              {/* Rooftop DC Combiner Box */}
              <g transform="translate(252, 102)">
                <rect x="-4" y="-4" width="12" height="12" rx="2" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.8" />
                <circle cx="2" cy="2" r="3" fill="#38bdf8" className="animate-spark" />
              </g>

              {/* Indoor Wall-Mounted ESS Unit Inside House */}
              <g transform="translate(216, 142)">
                <rect x="0" y="0" width="38" height="42" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="4" y="5" width="30" height="12" rx="1.5" fill="#0284c7" opacity="0.8" />
                <circle cx="10" cy="11" r="2" fill="#4ade80" className="animate-pulse" />
                <circle cx="16" cy="11" r="2" fill="#38bdf8" />
                <circle cx="22" cy="11" r="2" fill="#f59e0b" />
                <rect x="4" y="22" width="30" height="14" rx="1" fill="#1e293b" />
                <line x1="8" y1="29" x2="28" y2="29" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
              </g>

              {/* HEAVY DC CONDUIT WIRE GOING DIRECTLY INSIDE THE HOUSE (Not Outside!) */}
              {/* Conduit enters roof seal and drops down into the indoor unit */}
              <path
                d="M 252 110 L 252 130 L 235 130 L 235 142"
                fill="none"
                stroke="#ea580c"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 252 110 L 252 130 L 235 130 L 235 142"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="4 5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-dash-fast"
              />
            </svg>
          </div>

          {/* ======================================================================= */}
          {/* STEP 2: SMART HYBRID INVERTER & ESS ACTIVELY CHARGING                   */}
          {/* ======================================================================= */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out flex items-center justify-center p-3 sm:p-4 ${
              animationPhase === 'inverter'
                ? 'opacity-100 z-10 pointer-events-auto'
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c1424] via-[#090e1a] to-[#05070d]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/12 rounded-full blur-2xl pointer-events-none" />

            {/* Inverter Hardware Chassis (Centerpiece) */}
            <div className="relative z-10 w-full max-w-[360px] sm:max-w-[390px] bg-gradient-to-b from-neutral-900 via-[#111827] to-neutral-950 rounded-2xl border-2 border-cyan-500/50 shadow-2xl p-2.5 sm:p-3 flex flex-col justify-between mt-5">
              {/* Top Bar: Model Badge & Live System Status LEDs */}
              <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span className="text-[10px] font-black text-cyan-400 font-mono tracking-wider">
                    HYBRID MPPT • 48V ESS
                  </span>
                </div>

                {/* Status Indicator LED Lights */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md border border-neutral-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-[8px] font-mono text-amber-300 font-bold">PV CHARGE</span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md border border-neutral-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[8px] font-mono text-emerald-400 font-bold">INV ON</span>
                  </div>
                </div>
              </div>

              {/* Middle Stage: Digital OLED Interactive Display HUD */}
              <div className="my-1.5 bg-[#030712] rounded-xl p-2 sm:p-2.5 border border-cyan-900/80 shadow-inner grid grid-cols-12 gap-2 items-center">
                {/* Left Column (5 Cols): Main Battery Capacity & Gauge */}
                <div className="col-span-5 flex flex-col items-center justify-center p-1 bg-neutral-950/80 rounded-lg border border-neutral-800/80">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400 tracking-tight">
                      {batteryPercent.toFixed(0)}
                    </span>
                    <span className="text-xs font-black text-emerald-400 font-mono">%</span>
                  </div>

                  {/* 5-Bar Animated LiFePO4 Battery Meter */}
                  <div className="w-full flex items-center justify-center gap-1 mt-1 px-1">
                    {[20, 40, 60, 80, 100].map((threshold, index) => {
                      const isFilled = batteryPercent >= threshold - 10;
                      return (
                        <div
                          key={index}
                          className={`h-3.5 flex-1 rounded-2xs transition-all duration-300 ${
                            isFilled
                              ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_0_6px_#10b981]'
                              : 'bg-neutral-800'
                          } ${
                            batteryPercent < threshold && batteryPercent >= threshold - 20
                              ? 'animate-pulse bg-emerald-300'
                              : ''
                          }`}
                        />
                      );
                    })}
                  </div>

                  <span className="text-[8px] font-mono text-neutral-400 mt-1 font-semibold">
                    51.2V LiFePO4
                  </span>
                </div>

                {/* Right Column (7 Cols): Telemetry Matrix & Sine Wave Oscilloscope */}
                <div className="col-span-7 flex flex-col justify-between gap-1 pl-1">
                  {/* Sine Wave AC Oscillation */}
                  <div className="flex items-center justify-between bg-black/70 px-2 py-1 rounded border border-neutral-800">
                    <span className="text-[8px] font-mono text-cyan-300 font-bold">AC 230V</span>
                    <svg className="w-20 h-4 overflow-hidden" viewBox="0 0 80 18">
                      <path
                        d={generateSinePath()}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-[8px] font-mono text-cyan-400">50Hz</span>
                  </div>

                  {/* Live Current & Power Readout Matrix */}
                  <div className="grid grid-cols-2 gap-1 text-left">
                    <div className="bg-black/60 px-1.5 py-0.5 rounded border border-neutral-800/80">
                      <span className="text-[7px] text-neutral-400 block font-mono">SOLAR IN</span>
                      <span className="text-[10px] sm:text-[11px] font-black text-amber-300 font-mono">
                        {solarWatts} W
                      </span>
                    </div>
                    <div className="bg-black/60 px-1.5 py-0.5 rounded border border-neutral-800/80">
                      <span className="text-[7px] text-neutral-400 block font-mono">CHARGE</span>
                      <span className="text-[10px] sm:text-[11px] font-black text-emerald-400 font-mono">
                        {solarAmps} A
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Enclosure Accent */}
              <div className="flex items-center justify-between px-1 pt-0.5">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-2.5 h-1 rounded-full bg-cyan-500/40" />
                  ))}
                </div>
                <span className="text-[8px] font-mono text-neutral-400 font-semibold">
                  PURE SINE WAVE ESS
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-2.5 h-1 rounded-full bg-cyan-500/40" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SLIDE 3 (50% RIGHT): BRIGHT COMMERCIAL SOLAR PRODUCTS SHOWCASE             */}
        {/* ========================================================================= */}
        <div
          className="relative rounded-2xl overflow-hidden bg-slate-900 border border-amber-500/30 shadow-xl min-h-[220px] sm:min-h-[240px] h-[220px] sm:h-[240px] w-full flex flex-col justify-between select-none group cursor-pointer"
          onClick={() => handleAction(currentProduct.category, currentProduct.id)}
        >
          {/* Background Bright Product Photography Graphic */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center brightness-[1.12] contrast-[1.03] transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Soft, Transparent Readability Gradient (Keeps products completely bright & visible) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Top Bar: Interactive Product Category Tabs (Quick Switcher) */}
          <div className="relative z-20 flex items-center justify-between px-3 pt-2.5 pb-1">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {featuredProducts.map((prod, idx) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProductIndex(idx);
                  }}
                  className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-tight transition-all duration-200 ${
                    selectedProductIndex === idx
                      ? 'bg-amber-400 text-neutral-950 shadow-sm shadow-amber-400/40'
                      : 'bg-black/60 text-neutral-200 border border-white/15 hover:bg-black/80 hover:text-white'
                  }`}
                >
                  {prod.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Premium Guarantee Chip */}
            <span className="inline-flex items-center gap-1 bg-black/70 border border-amber-400/40 text-amber-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              {currentProduct.badge}
            </span>
          </div>

          {/* Bottom Floating Card: Clean Minimalist Product Info & CTA */}
          <div className="relative z-20 p-3 sm:p-4 flex items-end justify-between">
            <div className="max-w-[70%]">
              {/* Product Tag */}
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-amber-400 font-mono drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  <ProductTagIcon className="w-3 h-3" />
                  {currentProduct.tag}
                </span>
              </div>

              {/* Product Name */}
              <h3 className="text-base sm:text-lg font-black text-white font-['Outfit',sans-serif] tracking-tight leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {currentProduct.name}
              </h3>

              {/* Spec Highlight */}
              <p className="text-[11px] sm:text-xs text-neutral-100 font-medium line-clamp-1 mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                {currentProduct.spec}
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-[11px] sm:text-xs px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all duration-200 shadow-lg shadow-amber-400/30 group-hover:translate-x-1">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SolarInverterFlow;
