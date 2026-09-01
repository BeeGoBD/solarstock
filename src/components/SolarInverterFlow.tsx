import React, { useState, useEffect } from 'react';

export const SolarInverterFlow: React.FC = () => {
  // Live dynamic charging telemetry state
  const [batteryPercent, setBatteryPercent] = useState(78.4);
  const [solarWatts, setSolarWatts] = useState(4180);
  const [solarAmps, setSolarAmps] = useState(81.6);
  const [sineOffset, setSineOffset] = useState(0);

  // Real-time dynamic simulation loop for smooth LCD readout
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
      const y = midY + Math.sin((x / 9) + sineOffset) * 6;
      path += ` L ${x} ${y.toFixed(2)}`;
    }
    return path;
  };

  return (
    <div className="relative w-full">
      {/* Visual Inter-Slide Connecting Energy Cable (Desktop Bridge with Electric Lightning) */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-6 z-30 pointer-events-none">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 40 24">
          {/* Outer conduit shadow */}
          <path d="M 0 12 L 40 12" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
          {/* Main heavy DC solar wire */}
          <path d="M 0 12 L 40 12" stroke="#ea580c" strokeWidth="5" strokeLinecap="round" />
          {/* Intense electric current core */}
          <path
            d="M 0 12 L 40 12"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="5 7"
            className="animate-dash-fast"
          />
          {/* Supercharged golden spark line */}
          <path
            d="M 0 12 L 40 12"
            stroke="#fef08a"
            strokeWidth="1.8"
            strokeDasharray="3 9"
            className="animate-dash-fast"
          />
          {/* Crackling Electric Lightning Arcs Across Bridge */}
          <path
            d="M 2 12 Q 10 7, 20 12 T 38 12"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-electric"
          />
          <path
            d="M 4 12 Q 15 16, 26 12 T 36 12"
            fill="none"
            stroke="#facc15"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="animate-electric"
          />
          {/* Central plasma energy spark */}
          <circle cx="20" cy="12" r="3" fill="#ffffff" className="animate-spark" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        
        {/* ========================================================================= */}
        {/* SLIDE 2: FULL BLUE WEATHER — VIBRANT SKY WITH MOVING CLOUDS & SOLAR PV     */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] border-2 border-sky-300 shadow-xl min-h-[195px] sm:min-h-[220px] h-[195px] sm:h-[220px] w-full flex items-center justify-center select-none group">
          
          {/* Ambient Sunny Sky Atmospheric Glow */}
          <div className="absolute -top-12 -left-12 w-80 h-80 bg-amber-300/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-sky-200/30 to-transparent pointer-events-none" />

          {/* ======================================================================= */}
          {/* ANIMATED MOVING CLOUDS (Multiple Depth Layers & Speeds)                 */}
          {/* ======================================================================= */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Layer 1: High Altitude Soft Cloud (Slow Drift) */}
            <div className="absolute top-3 left-0 animate-cloud-slow opacity-60">
              <svg width="110" height="42" viewBox="0 0 110 42" fill="none">
                <path
                  d="M18 36h74a14 14 0 0 0 0-28 20 20 0 0 0-38-6 16 16 0 0 0-26 12 12 12 0 0 0-10 22z"
                  fill="#ffffff"
                />
              </svg>
            </div>

            {/* Layer 2: Mid Altitude Puffy Cumulus Cloud (Medium Drift) */}
            <div className="absolute top-10 left-[-40px] animate-cloud-medium opacity-75">
              <svg width="135" height="50" viewBox="0 0 135 50" fill="none">
                <path
                  d="M22 44h90a16 16 0 0 0 0-32 24 24 0 0 0-46-8 18 18 0 0 0-32 14 14 14 0 0 0-12 26z"
                  fill="#ffffff"
                />
              </svg>
            </div>

            {/* Layer 3: Lower Background Fluffy Cloud (Fast Drift) */}
            <div className="absolute top-24 left-[-80px] animate-cloud-fast opacity-45">
              <svg width="95" height="36" viewBox="0 0 95 36" fill="none">
                <path
                  d="M15 32h65a12 12 0 0 0 0-24 18 18 0 0 0-34-6 14 14 0 0 0-22 10 10 10 0 0 0-9 20z"
                  fill="#ffffff"
                />
              </svg>
            </div>

            {/* Layer 4: Distant Subtle Wispy Cloud (Slow Drift Staggered) */}
            <div className="absolute top-5 left-[160px] animate-cloud-slow opacity-40">
              <svg width="85" height="30" viewBox="0 0 85 30" fill="none">
                <path
                  d="M12 26h60a10 10 0 0 0 0-20 15 15 0 0 0-28-4 12 12 0 0 0-20 8 9 9 0 0 0-12 16z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>

          {/* SVG Sun, Photons & Solar Panel Isometric Stage */}
          <svg className="relative z-10 w-full h-full p-2" viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Day Mode Brilliant Sun Gradients */}
              <radialGradient id="daySunCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#fffbeb" />
                <stop offset="55%" stopColor="#fde047" />
                <stop offset="85%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
              
              <radialGradient id="daySunAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#fde047" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>

              {/* Day Mode High-Efficiency Monocrystalline Silicon Gradient */}
              <linearGradient id="monoSilCell" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="45%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#172554" />
              </linearGradient>

              {/* Electric Wire Glow Filter */}
              <filter id="electricGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. THE BRILLIANT DAY SUN (Top-Left Position) */}
            <g transform="translate(58, 42)">
              {/* Giant Sun Heat Corona Pulses */}
              <circle cx="0" cy="0" r="46" fill="url(#daySunAura)" className="animate-pulse" />
              <circle cx="0" cy="0" r="32" fill="url(#daySunAura)" />
              
              {/* Rotating Golden Solar Rays */}
              <g className="animate-[spin_16s_linear_infinite]">
                {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
                  <line
                    key={deg}
                    x1="0"
                    y1={-28}
                    x2="0"
                    y2={deg % 45 === 0 ? -44 : -36}
                    stroke="#ffffff"
                    strokeWidth={deg % 45 === 0 ? "3" : "1.8"}
                    strokeLinecap="round"
                    transform={`rotate(${deg})`}
                    opacity="0.9"
                  />
                ))}
              </g>

              {/* Brilliant Glowing Sun Disc */}
              <circle cx="0" cy="0" r="22" fill="url(#daySunCore)" />
              <circle cx="0" cy="0" r="14" fill="#ffffff" opacity="0.95" />
            </g>

            {/* 2. BRIGHT SUNBEAMS & ENERGETIC LIGHT PHOTON BEAMS */}
            {/* Broad Golden Sunbeam Shroud */}
            <polygon
              points="60,45 130,190 270,110 90,40"
              fill="url(#daySunAura)"
              opacity="0.25"
            />

            {/* Active Streaming Photons Beam 1 */}
            <line
              x1="76"
              y1="58"
              x2="175"
              y2="120"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeDasharray="8 10"
              strokeLinecap="round"
              strokeOpacity="0.95"
              className="animate-dash-fast"
            />
            {/* Active Streaming Photons Beam 2 */}
            <line
              x1="90"
              y1="52"
              x2="235"
              y2="120"
              stroke="#fef08a"
              strokeWidth="3"
              strokeDasharray="6 8"
              strokeLinecap="round"
              strokeOpacity="0.9"
              className="animate-dash-fast"
            />
            {/* Active Streaming Photons Beam 3 */}
            <line
              x1="66"
              y1="72"
              x2="140"
              y2="148"
              stroke="#fde047"
              strokeWidth="2.5"
              strokeDasharray="5 7"
              strokeLinecap="round"
              strokeOpacity="0.85"
              className="animate-dash-fast"
            />
            {/* Active Streaming Photons Beam 4 */}
            <line
              x1="96"
              y1="66"
              x2="280"
              y2="135"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeDasharray="7 9"
              strokeLinecap="round"
              strokeOpacity="0.8"
              className="animate-dash-fast"
            />

            {/* 3. MONOCRYSTALLINE PHOTOVOLTAIC SOLAR PANEL (Tilted 3D Isometric View) */}
            <g transform="translate(130, 85)">
              
              {/* Crisp Ground Shadow */}
              <polygon points="12,108 192,88 238,28 58,48" fill="#0f172a" opacity="0.35" filter="blur(3px)" />

              {/* Panel Aluminum Alloy Beveled Outer Frame */}
              <polygon
                points="0,100 180,80 225,20 45,40"
                fill="#cbd5e1"
                stroke="#64748b"
                strokeWidth="2"
              />

              {/* Solar High-Transmission Tempered Glass PV Surface */}
              <polygon
                points="4,97 176,78 221,23 49,42"
                fill="url(#monoSilCell)"
                stroke="#38bdf8"
                strokeWidth="1.2"
              />

              {/* Photovoltaic Cells & Anti-Reflective Grid Layout */}
              {/* Horizontal Busbars */}
              <line x1="16" y1="83" x2="187" y2="64" stroke="#93c5fd" strokeWidth="0.9" opacity="0.75" />
              <line x1="27" y1="69" x2="198" y2="50" stroke="#93c5fd" strokeWidth="0.9" opacity="0.75" />
              <line x1="38" y1="55" x2="209" y2="36" stroke="#93c5fd" strokeWidth="0.9" opacity="0.75" />

              {/* Vertical Multi-Busbar (MBB) Ribbons */}
              <line x1="50" y1="92" x2="90" y2="35" stroke="#e2e8f0" strokeWidth="1.2" opacity="0.85" />
              <line x1="92" y1="88" x2="132" y2="31" stroke="#e2e8f0" strokeWidth="1.2" opacity="0.85" />
              <line x1="135" y1="83" x2="175" y2="26" stroke="#e2e8f0" strokeWidth="1.2" opacity="0.85" />

              {/* Sunlight Glint & Glass Reflection Sheen */}
              <polygon
                points="18,80 80,72 160,28 98,36"
                fill="#ffffff"
                opacity="0.18"
              />

              {/* Active Photon Energy Absorption Glow across solar cells */}
              <ellipse
                cx="115"
                cy="60"
                rx="65"
                ry="24"
                fill="#38bdf8"
                opacity="0.3"
                className="animate-pulse"
              />
              <ellipse
                cx="120"
                cy="60"
                rx="35"
                ry="12"
                fill="#fde047"
                opacity="0.35"
                className="animate-pulse"
              />

              {/* DC Junction Box & MC4 Solar Connector (Lower Right Corner) */}
              <g transform="translate(180, 80)">
                <rect x="-6" y="-6" width="15" height="15" rx="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                {/* Generation Spark at Junction Box */}
                <circle cx="1.5" cy="1.5" r="4" fill="#38bdf8" className="animate-spark" />
                <circle cx="1.5" cy="1.5" r="2.5" fill="#ffffff" />
              </g>
            </g>

            {/* 4. HIGH-VOLTAGE OUTPUT DC WIRE WITH ELECTRIC LIGHTNING ARCS (Exits to Slide 3) */}
            <g>
              {/* Outer Heavy Armor Conduit */}
              <path
                d="M 311 161 C 340 161, 370 145, 420 145"
                fill="none"
                stroke="#0f172a"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Heavy Orange Solar PV Wire */}
              <path
                d="M 311 161 C 340 161, 370 145, 420 145"
                fill="none"
                stroke="#ea580c"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Rapid Moving Electricity Plasma Flow (Cyan + Gold) */}
              <path
                d="M 311 161 C 340 161, 370 145, 420 145"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.2"
                strokeDasharray="6 8"
                className="animate-dash-fast"
                filter="url(#electricGlow)"
              />
              <path
                d="M 311 161 C 340 161, 370 145, 420 145"
                fill="none"
                stroke="#fef08a"
                strokeWidth="1.8"
                strokeDasharray="4 7"
                className="animate-dash-fast"
              />

              {/* Zigzag Electric Lightning Bolt Arc 1 along the wire */}
              <path
                d="M 312 161 L 325 158 L 332 163 L 348 153 L 360 157 L 375 147 L 390 149 L 405 144 L 420 145"
                fill="none"
                stroke="#67e8f9"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-electric"
              />
              {/* Zigzag Electric Lightning Bolt Arc 2 */}
              <path
                d="M 315 162 L 328 165 L 340 159 L 355 161 L 368 151 L 382 153 L 398 143 L 412 147 L 420 145"
                fill="none"
                stroke="#fde047"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-electric"
              />

              {/* Crackling Electric Sparks along wire */}
              <circle cx="330" cy="160" r="2.5" fill="#ffffff" className="animate-spark" />
              <circle cx="365" cy="153" r="3" fill="#67e8f9" className="animate-spark" />
              <circle cx="400" cy="146" r="2.5" fill="#fde047" className="animate-spark" />
            </g>
          </svg>

          {/* Micro Telemetry Pill: Solar Daytime Irradiance */}
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md border border-amber-300 rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[11px] font-black text-amber-300 font-mono tracking-tight">
              {solarWatts} W
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SLIDE 3: SMART INVERTER & ESS UNIT ACTIVELY CHARGING WITH ELECTRIC SPARK  */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1424] via-[#090e1a] to-[#05070d] border border-cyan-500/30 shadow-xl min-h-[195px] sm:min-h-[220px] h-[195px] sm:h-[220px] w-full flex items-center justify-center select-none group">
          
          {/* Ambient Inverter Glow Aura */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Incoming High-Voltage Wire from Left Edge with Electric Lightning Arcs */}
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" viewBox="0 0 420 220" fill="none">
            {/* Outer Armor Conduit */}
            <path
              d="M 0 145 C 38 145, 68 160, 98 160"
              fill="none"
              stroke="#0f172a"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Heavy Orange Solar Wire */}
            <path
              d="M 0 145 C 38 145, 68 160, 98 160"
              fill="none"
              stroke="#ea580c"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Rapid Electricity Pulse Stream */}
            <path
              d="M 0 145 C 38 145, 68 160, 98 160"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.2"
              strokeDasharray="6 8"
              className="animate-dash-fast"
            />
            <path
              d="M 0 145 C 38 145, 68 160, 98 160"
              fill="none"
              stroke="#fef08a"
              strokeWidth="1.8"
              strokeDasharray="4 7"
              className="animate-dash-fast"
            />

            {/* Zigzag Electric Lightning Bolt entering inverter terminal */}
            <path
              d="M 0 145 L 14 143 L 26 148 L 42 149 L 56 156 L 70 155 L 85 162 L 98 160"
              fill="none"
              stroke="#67e8f9"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-electric"
            />
            <path
              d="M 0 146 L 18 148 L 32 144 L 48 152 L 64 158 L 78 157 L 92 163 L 98 160"
              fill="none"
              stroke="#fde047"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-electric"
            />

            {/* Electric Sparks at Entry Port */}
            <circle cx="28" cy="146" r="2.5" fill="#ffffff" className="animate-spark" />
            <circle cx="68" cy="156" r="2.5" fill="#67e8f9" className="animate-spark" />

            {/* High-Voltage Inverter Input Port Terminal Flash */}
            <circle cx="98" cy="160" r="7" fill="#f59e0b" opacity="0.8" />
            <circle cx="98" cy="160" r="5" fill="#38bdf8" className="animate-pulse" />
            <circle cx="98" cy="160" r="3.5" fill="#ffffff" className="animate-spark" />
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
