import React, { useState, useEffect } from 'react';

export const SolarInverterFlow: React.FC = () => {
  // Live dynamic charging telemetry state
  const [batteryPercent, setBatteryPercent] = useState(76.4);
  const [solarWatts, setSolarWatts] = useState(3840);
  const [solarAmps, setSolarAmps] = useState(74.8);
  const [sineOffset, setSineOffset] = useState(0);

  // Real-time dynamic simulation loop for smooth LCD readout
  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      setBatteryPercent((prev) => {
        if (prev >= 99.8) return 68.0;
        return Number((prev + 0.15).toFixed(1));
      });

      // Realistic minor PV irradiance fluctuations
      setSolarWatts(Math.floor(3800 + Math.sin(Date.now() / 1500) * 120 + Math.random() * 40));
      setSolarAmps(Number((73.5 + Math.sin(Date.now() / 2000) * 2.2).toFixed(1)));
    }, 400);

    // High frequency sine wave oscilloscope animation
    let animationFrameId: number;
    const animateSine = () => {
      setSineOffset((prev) => (prev + 0.12) % (Math.PI * 2));
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
      const y = midY + Math.sin((x / 10) + sineOffset) * 6;
      path += ` L ${x} ${y.toFixed(2)}`;
    }
    return path;
  };

  return (
    <div className="relative w-full">
      {/* Visual Inter-Slide Connecting Energy Cable (Desktop Bridge) */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-4 z-30 pointer-events-none">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 32 16">
          {/* Outer conduit shadow */}
          <path d="M 0 8 L 32 8" stroke="#171717" strokeWidth="6" strokeLinecap="round" />
          {/* Main orange high-voltage cable */}
          <path d="M 0 8 L 32 8" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
          {/* Glowing pulse core */}
          <path
            d="M 0 8 L 32 8"
            stroke="#fef08a"
            strokeWidth="2"
            strokeDasharray="4 6"
            className="animate-[dash_0.6s_linear_infinite]"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        
        {/* ========================================================================= */}
        {/* SLIDE 2: SUN HARVESTING & PHOTOVOLTAIC SOLAR PANEL ANIMATION               */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1424] via-[#090e1a] to-[#05070d] border border-amber-500/30 shadow-xl min-h-[195px] sm:min-h-[220px] h-[195px] sm:h-[220px] w-full flex items-center justify-center select-none group">
          
          {/* Ambient Solar Sky Aura */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

          {/* SVG Sun, Photons & Solar Panel Isometric Stage */}
          <svg className="w-full h-full p-2" viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Sun Flare Gradients */}
              <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#fef08a" />
                <stop offset="70%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
              </radialGradient>
              <radialGradient id="sunAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>

              {/* Solar Cell Gradient */}
              <linearGradient id="solarCellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="40%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
              </linearGradient>

              {/* Energy Glow Filter */}
              <filter id="solarGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. THE SUN (Top-Left Position) */}
            <g transform="translate(60, 45)">
              {/* Outer Corona Pulse */}
              <circle cx="0" cy="0" r="38" fill="url(#sunAura)" className="animate-pulse" />
              <circle cx="0" cy="0" r="28" fill="url(#sunAura)" />
              
              {/* Rotating Solar Flare Corona Rays */}
              <g className="animate-[spin_12s_linear_infinite]">
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <line
                    key={deg}
                    x1="0"
                    y1={-30}
                    x2="0"
                    y2={-38}
                    stroke="#fde047"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    transform={`rotate(${deg})`}
                    opacity="0.85"
                  />
                ))}
              </g>

              {/* Sun Brilliant Core */}
              <circle cx="0" cy="0" r="20" fill="url(#sunCore)" filter="url(#solarGlow)" />
              <circle cx="0" cy="0" r="12" fill="#ffffff" opacity="0.9" />
            </g>

            {/* 2. PHOTON BEAMS & SOLAR LIGHT STREAMS */}
            {/* Beam 1 */}
            <line
              x1="80"
              y1="60"
              x2="175"
              y2="120"
              stroke="#fef08a"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              strokeOpacity="0.9"
              className="animate-[dash_0.8s_linear_infinite]"
            />
            {/* Beam 2 */}
            <line
              x1="95"
              y1="55"
              x2="235"
              y2="120"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="5 7"
              strokeOpacity="0.8"
              className="animate-[dash_1s_linear_infinite]"
            />
            {/* Beam 3 */}
            <line
              x1="70"
              y1="75"
              x2="140"
              y2="145"
              stroke="#fef08a"
              strokeWidth="2"
              strokeDasharray="4 6"
              strokeOpacity="0.75"
              className="animate-[dash_0.6s_linear_infinite]"
            />
            {/* Beam 4 */}
            <line
              x1="100"
              y1="70"
              x2="280"
              y2="135"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="6 8"
              strokeOpacity="0.7"
              className="animate-[dash_0.9s_linear_infinite]"
            />

            {/* 3. PHOTOVOLTAIC SOLAR PANEL (Tilted Perspective Frame) */}
            <g transform="translate(130, 85)">
              
              {/* Panel Shadow */}
              <polygon points="12,108 192,88 238,28 58,48" fill="#000000" opacity="0.5" filter="blur(4px)" />

              {/* Panel Aluminum Exterior Bevel Frame */}
              <polygon
                points="0,100 180,80 225,20 45,40"
                fill="#334155"
                stroke="#64748b"
                strokeWidth="2.5"
              />

              {/* Solar Glass PV Surface */}
              <polygon
                points="5,97 176,78 220,23 49,42"
                fill="url(#solarCellGrad)"
                stroke="#0284c7"
                strokeWidth="1"
              />

              {/* Photovoltaic Cells & Anti-Reflective Grid (4x3 Grid) */}
              {/* Cell Busbars Horizontal */}
              <line x1="16" y1="83" x2="187" y2="64" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
              <line x1="27" y1="69" x2="198" y2="50" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
              <line x1="38" y1="55" x2="209" y2="36" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />

              {/* Cell Busbars Vertical */}
              <line x1="50" y1="92" x2="90" y2="35" stroke="#94a3b8" strokeWidth="1" opacity="0.7" />
              <line x1="92" y1="88" x2="132" y2="31" stroke="#94a3b8" strokeWidth="1" opacity="0.7" />
              <line x1="135" y1="83" x2="175" y2="26" stroke="#94a3b8" strokeWidth="1" opacity="0.7" />

              {/* Active Photon Energy Absorption Glow across cells */}
              <ellipse
                cx="115"
                cy="60"
                rx="65"
                ry="24"
                fill="#38bdf8"
                opacity="0.25"
                className="animate-pulse"
              />
              <ellipse
                cx="120"
                cy="60"
                rx="35"
                ry="12"
                fill="#facc15"
                opacity="0.3"
                className="animate-pulse"
              />

              {/* DC Junction Box & MC4 Solar Connector (Lower Right Corner) */}
              <g transform="translate(180, 80)">
                <rect x="-6" y="-6" width="14" height="14" rx="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="1" cy="1" r="3" fill="#10b981" className="animate-ping" />
                <circle cx="1" cy="1" r="2.5" fill="#34d399" />
              </g>
            </g>

            {/* 4. HIGH-VOLTAGE OUTPUT DC ENERGY CABLE (Exits right edge to Slide 3) */}
            <g>
              {/* Outer Cable Armor Tube */}
              <path
                d="M 311 161 C 340 161, 370 145, 420 145"
                fill="none"
                stroke="#0f172a"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Solar Conduit Orange Wire */}
              <path
                d="M 311 161 C 340 161, 370 145, 420 145"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Moving Electric Energy Flow Particles */}
              <path
                d="M 311 161 C 340 161, 370 145, 420 145"
                fill="none"
                stroke="#fef08a"
                strokeWidth="2.5"
                strokeDasharray="6 8"
                className="animate-[dash_0.6s_linear_infinite]"
              />
            </g>
          </svg>

          {/* Micro Telemetry Pill: Solar Irradiance */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-amber-400/40 rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[11px] font-black text-amber-300 font-mono tracking-tight">
              {solarWatts} W
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SLIDE 3: SMART INVERTER & ESS UNIT ACTIVELY CHARGING ANIMATION            */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1424] via-[#090e1a] to-[#05070d] border border-cyan-500/30 shadow-xl min-h-[195px] sm:min-h-[220px] h-[195px] sm:h-[220px] w-full flex items-center justify-center select-none group">
          
          {/* Ambient Inverter Glow Aura */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Incoming High-Voltage Wire from Left Edge */}
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" viewBox="0 0 420 220" fill="none">
            <path
              d="M 0 145 C 40 145, 70 160, 100 160"
              fill="none"
              stroke="#0f172a"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M 0 145 C 40 145, 70 160, 100 160"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 0 145 C 40 145, 70 160, 100 160"
              fill="none"
              stroke="#fef08a"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              className="animate-[dash_0.6s_linear_infinite]"
            />
            {/* Input Port Spark & Connection Node */}
            <circle cx="100" cy="160" r="5" fill="#f59e0b" />
            <circle cx="100" cy="160" r="3" fill="#ffffff" className="animate-ping" />
          </svg>

          {/* Inverter Hardware Chassis (Centerpiece) */}
          <div className="relative z-10 w-full max-w-[340px] sm:max-w-[370px] bg-gradient-to-b from-neutral-900 via-[#111827] to-neutral-950 rounded-2xl border-2 border-cyan-500/50 shadow-2xl p-2.5 sm:p-3 flex flex-col justify-between">
            
            {/* Top Bar: Model Badge & Live System Status LEDs */}
            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-[10px] font-black text-cyan-400 font-mono tracking-wider">
                  HYBRID MPPT • 48V ESS
                </span>
              </div>

              {/* Status Indicator LED Lights */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md border border-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-[8px] font-mono text-amber-300 font-bold">PV CHARGING</span>
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
                        } ${batteryPercent < threshold && batteryPercent >= threshold - 20 ? 'animate-pulse bg-emerald-300' : ''}`}
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
                    <span className="text-[7px] text-neutral-400 block font-mono">INPUT POWER</span>
                    <span className="text-[10px] sm:text-[11px] font-black text-amber-300 font-mono">
                      {solarWatts} W
                    </span>
                  </div>
                  <div className="bg-black/60 px-1.5 py-0.5 rounded border border-neutral-800/80">
                    <span className="text-[7px] text-neutral-400 block font-mono">CHARGE CURR</span>
                    <span className="text-[10px] sm:text-[11px] font-black text-emerald-400 font-mono">
                      {solarAmps} A
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Enclosure Accent: Glowing Cyber Ventilation Slits */}
            <div className="flex items-center justify-between px-1 pt-0.5">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-3 h-1 rounded-full bg-cyan-500/40" />
                ))}
              </div>
              <span className="text-[8px] font-mono text-neutral-500 font-semibold">
                PURE SINE INVERTER
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-3 h-1 rounded-full bg-cyan-500/40" />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
export default SolarInverterFlow;
