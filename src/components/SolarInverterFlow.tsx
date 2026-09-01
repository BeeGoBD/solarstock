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
        {/* SLIDE 2: MODERN RESIDENTIAL HOUSE WITH ROOFTOP SOLAR FACING THE SUN       */}
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
            <div className="absolute top-2 left-0 animate-cloud-slow opacity-60">
              <svg width="110" height="42" viewBox="0 0 110 42" fill="none">
                <path
                  d="M18 36h74a14 14 0 0 0 0-28 20 20 0 0 0-38-6 16 16 0 0 0-26 12 12 12 0 0 0-10 22z"
                  fill="#ffffff"
                />
              </svg>
            </div>

            {/* Layer 2: Mid Altitude Puffy Cumulus Cloud (Medium Drift) */}
            <div className="absolute top-8 left-[-40px] animate-cloud-medium opacity-75">
              <svg width="135" height="50" viewBox="0 0 135 50" fill="none">
                <path
                  d="M22 44h90a16 16 0 0 0 0-32 24 24 0 0 0-46-8 18 18 0 0 0-32 14 14 14 0 0 0-12 26z"
                  fill="#ffffff"
                />
              </svg>
            </div>

            {/* Layer 3: Lower Background Fluffy Cloud (Fast Drift) */}
            <div className="absolute top-18 left-[-80px] animate-cloud-fast opacity-45">
              <svg width="95" height="36" viewBox="0 0 95 36" fill="none">
                <path
                  d="M15 32h65a12 12 0 0 0 0-24 18 18 0 0 0-34-6 14 14 0 0 0-22 10 10 10 0 0 0-9 20z"
                  fill="#ffffff"
                />
              </svg>
            </div>

            {/* Layer 4: Distant Subtle Wispy Cloud (Slow Drift Staggered) */}
            <div className="absolute top-4 left-[180px] animate-cloud-slow opacity-40">
              <svg width="85" height="30" viewBox="0 0 85 30" fill="none">
                <path
                  d="M12 26h60a10 10 0 0 0 0-20 15 15 0 0 0-28-4 12 12 0 0 0-20 8 9 9 0 0 0-12 16z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>

          {/* SVG Sun, Photons, House Architecture & Rooftop Solar Stage */}
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
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#fde047" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>

              {/* Day Mode High-Efficiency Monocrystalline Silicon Gradient */}
              <linearGradient id="monoSilCell" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="40%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#172554" />
              </linearGradient>

              {/* House Roof Gradient */}
              <linearGradient id="roofBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              {/* House Facade Gradient */}
              <linearGradient id="houseFacadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>

              {/* House Side Wall Shadow Gradient */}
              <linearGradient id="houseSideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              {/* Lawn Grass Landscape Gradient */}
              <linearGradient id="lawnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>

              {/* Electric Wire Glow Filter */}
              <filter id="electricGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. THE BRILLIANT DAY SUN (Top-Left Position) */}
            <g transform="translate(54, 38)">
              {/* Giant Sun Heat Corona Pulses */}
              <circle cx="0" cy="0" r="44" fill="url(#daySunAura)" className="animate-pulse" />
              <circle cx="0" cy="0" r="30" fill="url(#daySunAura)" />
              
              {/* Rotating Golden Solar Rays */}
              <g className="animate-[spin_16s_linear_infinite]">
                {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
                  <line
                    key={deg}
                    x1="0"
                    y1={-26}
                    x2="0"
                    y2={deg % 45 === 0 ? -42 : -34}
                    stroke="#ffffff"
                    strokeWidth={deg % 45 === 0 ? "3" : "1.8"}
                    strokeLinecap="round"
                    transform={`rotate(${deg})`}
                    opacity="0.9"
                  />
                ))}
              </g>

              {/* Brilliant Glowing Sun Disc */}
              <circle cx="0" cy="0" r="20" fill="url(#daySunCore)" />
              <circle cx="0" cy="0" r="13" fill="#ffffff" opacity="0.95" />
            </g>

            {/* 2. BRIGHT SUNBEAMS & STREAMING LIGHT PHOTON BEAMS TOWARDS THE ROOF */}
            {/* Broad Golden Sunbeam Shroud Spreading to Roof */}
            <polygon
              points="54,38 120,135 285,90 85,30"
              fill="url(#daySunAura)"
              opacity="0.28"
            />

            {/* Active Streaming Photons Beam 1 */}
            <line
              x1="70"
              y1="52"
              x2="155"
              y2="92"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeDasharray="8 10"
              strokeLinecap="round"
              strokeOpacity="0.95"
              className="animate-dash-fast"
            />
            {/* Active Streaming Photons Beam 2 */}
            <line
              x1="82"
              y1="46"
              x2="215"
              y2="88"
              stroke="#fef08a"
              strokeWidth="3"
              strokeDasharray="6 8"
              strokeLinecap="round"
              strokeOpacity="0.9"
              className="animate-dash-fast"
            />
            {/* Active Streaming Photons Beam 3 */}
            <line
              x1="62"
              y1="64"
              x2="135"
              y2="114"
              stroke="#fde047"
              strokeWidth="2.5"
              strokeDasharray="5 7"
              strokeLinecap="round"
              strokeOpacity="0.85"
              className="animate-dash-fast"
            />
            {/* Active Streaming Photons Beam 4 */}
            <line
              x1="90"
              y1="58"
              x2="260"
              y2="95"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeDasharray="7 9"
              strokeLinecap="round"
              strokeOpacity="0.8"
              className="animate-dash-fast"
            />
            {/* Active Streaming Photons Beam 5 */}
            <line
              x1="75"
              y1="60"
              x2="185"
              y2="108"
              stroke="#ffffff"
              strokeWidth="2.8"
              strokeDasharray="6 9"
              strokeLinecap="round"
              strokeOpacity="0.9"
              className="animate-dash-fast"
            />

            {/* 3. GROUND LAWN & LANDSCAPING */}
            <polygon
              points="0,185 420,180 420,220 0,220"
              fill="url(#lawnGrad)"
              opacity="0.9"
            />
            {/* Front walkway / patio */}
            <polygon
              points="140,195 210,194 225,220 125,220"
              fill="#cbd5e1"
              opacity="0.75"
            />
            {/* Garden shrubs around house base */}
            <circle cx="95" cy="192" r="9" fill="#15803d" />
            <circle cx="108" cy="190" r="11" fill="#16a34a" />
            <circle cx="120" cy="193" r="8" fill="#22c55e" />
            <circle cx="270" cy="190" r="9" fill="#15803d" />
            <circle cx="282" cy="188" r="10" fill="#16a34a" />

            {/* 4. MODERN ARCHITECTURAL HOUSE (Isometric Perspective) */}
            <g id="modernResidentialHouse">
              {/* House Shadow on Ground */}
              <polygon
                points="85,198 290,192 330,205 125,215"
                fill="#0f172a"
                opacity="0.25"
                filter="blur(3px)"
              />

              {/* Main Front Wall Facade */}
              <polygon
                points="95,128 268,124 268,194 95,198"
                fill="url(#houseFacadeGrad)"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />

              {/* Right Side Wall (Perspective Depth) */}
              <polygon
                points="268,124 300,108 300,178 268,194"
                fill="url(#houseSideGrad)"
                stroke="#94a3b8"
                strokeWidth="1.2"
              />

              {/* Architectural Feature: Warm Natural Wood Accent Siding */}
              <polygon
                points="98,130 135,129 135,197 98,198"
                fill="#d97706"
                opacity="0.85"
              />
              {/* Vertical wood slat grooves */}
              <line x1="107" y1="130" x2="107" y2="198" stroke="#92400e" strokeWidth="1" />
              <line x1="116" y1="129" x2="116" y2="197" stroke="#92400e" strokeWidth="1" />
              <line x1="125" y1="129" x2="125" y2="197" stroke="#92400e" strokeWidth="1" />

              {/* Modern Floor-to-Ceiling Windows with Interior Warm Glow */}
              <g transform="translate(145, 140)">
                <rect x="0" y="0" width="52" height="42" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                {/* Glowing interior pane */}
                <rect x="2.5" y="2.5" width="47" height="37" rx="2" fill="#fef3c7" opacity="0.9" />
                {/* Window mullion grid */}
                <line x1="26" y1="2.5" x2="26" y2="39.5" stroke="#334155" strokeWidth="1.5" />
                <line x1="2.5" y1="21" x2="49.5" y2="21" stroke="#334155" strokeWidth="1.5" />
                {/* Glass reflection sheen */}
                <polygon points="6,36 30,8 38,8 14,36" fill="#ffffff" opacity="0.6" />
              </g>

              {/* Modern Entryway Door */}
              <g transform="translate(210, 146)">
                <rect x="0" y="0" width="22" height="46" rx="2" fill="#1e293b" stroke="#0f172a" strokeWidth="1.2" />
                {/* Modern vertical door handle */}
                <line x1="4" y1="20" x2="4" y2="30" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                {/* Porch light above door */}
                <circle cx="11" cy="-4" r="3" fill="#fef08a" />
                <circle cx="11" cy="-4" r="6" fill="#fef08a" opacity="0.3" className="animate-pulse" />
              </g>

              {/* Modern Side Window on Right Wall */}
              <polygon
                points="276,134 292,126 292,154 276,162"
                fill="#fef3c7"
                stroke="#334155"
                strokeWidth="1.2"
                opacity="0.8"
              />

              {/* 5. TILTED ROOF SLOPING TOWARDS THE SUN (Facing Top-Left Sunlight) */}
              {/* Roof Sub-Structure / Eaves Trim (Dark Charcoal) */}
              <polygon
                points="88,131 276,126 276,121 88,126"
                fill="#0f172a"
              />

              {/* Main Tilted Roof Plane Surface Facing Sun */}
              <polygon
                points="88,127 274,122 296,62 110,67"
                fill="url(#roofBaseGrad)"
                stroke="#475569"
                strokeWidth="1.5"
              />

              {/* Left Roof Gable Overhang Edge */}
              <polygon
                points="88,127 110,67 98,69 76,129"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />

              {/* Rooftop Solar Aluminum Mounting Rails */}
              {/* Top Rail */}
              <line x1="108" y1="83" x2="280" y2="78" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
              {/* Bottom Rail */}
              <line x1="96" y1="113" x2="268" y2="108" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />

              {/* ================================================================= */}
              {/* 6. SOLAR PV MODULES ARRAY MOUNTED DIRECTLY ON THE HOUSE ROOF     */}
              {/* ================================================================= */}
              {/* PANEL 1 (Top-Left PV Module facing Sun) */}
              <g>
                <polygon
                  points="114,94 190,92 198,72 122,74"
                  fill="#cbd5e1"
                  stroke="#64748b"
                  strokeWidth="1.5"
                />
                <polygon
                  points="116,93 188,91 196,73 124,75"
                  fill="url(#monoSilCell)"
                  stroke="#38bdf8"
                  strokeWidth="1"
                />
                {/* Silicon Grid Busbars */}
                <line x1="120" y1="84" x2="192" y2="82" stroke="#93c5fd" strokeWidth="0.8" opacity="0.75" />
                <line x1="138" y1="92" x2="144" y2="74" stroke="#e2e8f0" strokeWidth="1" opacity="0.8" />
                <line x1="168" y1="91" x2="174" y2="73" stroke="#e2e8f0" strokeWidth="1" opacity="0.8" />
              </g>

              {/* PANEL 2 (Top-Right PV Module) */}
              <g>
                <polygon
                  points="196,92 272,90 280,70 204,72"
                  fill="#cbd5e1"
                  stroke="#64748b"
                  strokeWidth="1.5"
                />
                <polygon
                  points="198,91 270,89 278,71 206,73"
                  fill="url(#monoSilCell)"
                  stroke="#38bdf8"
                  strokeWidth="1"
                />
                {/* Silicon Grid Busbars */}
                <line x1="202" y1="82" x2="274" y2="80" stroke="#93c5fd" strokeWidth="0.8" opacity="0.75" />
                <line x1="220" y1="90" x2="226" y2="72" stroke="#e2e8f0" strokeWidth="1" opacity="0.8" />
                <line x1="250" y1="89" x2="256" y2="71" stroke="#e2e8f0" strokeWidth="1" opacity="0.8" />
              </g>

              {/* PANEL 3 (Bottom-Left PV Module facing Sun) */}
              <g>
                <polygon
                  points="102,120 178,118 186,98 110,100"
                  fill="#cbd5e1"
                  stroke="#64748b"
                  strokeWidth="1.5"
                />
                <polygon
                  points="104,119 176,117 184,99 112,101"
                  fill="url(#monoSilCell)"
                  stroke="#38bdf8"
                  strokeWidth="1"
                />
                {/* Silicon Grid Busbars */}
                <line x1="108" y1="110" x2="180" y2="108" stroke="#93c5fd" strokeWidth="0.8" opacity="0.75" />
                <line x1="126" y1="118" x2="132" y2="100" stroke="#e2e8f0" strokeWidth="1" opacity="0.8" />
                <line x1="156" y1="117" x2="162" y2="99" stroke="#e2e8f0" strokeWidth="1" opacity="0.8" />
              </g>

              {/* PANEL 4 (Bottom-Right PV Module) */}
              <g>
                <polygon
                  points="184,118 260,116 268,96 192,98"
                  fill="#cbd5e1"
                  stroke="#64748b"
                  strokeWidth="1.5"
                />
                <polygon
                  points="186,117 258,115 266,97 194,99"
                  fill="url(#monoSilCell)"
                  stroke="#38bdf8"
                  strokeWidth="1"
                />
                {/* Silicon Grid Busbars */}
                <line x1="190" y1="108" x2="262" y2="106" stroke="#93c5fd" strokeWidth="0.8" opacity="0.75" />
                <line x1="208" y1="116" x2="214" y2="98" stroke="#e2e8f0" strokeWidth="1" opacity="0.8" />
                <line x1="238" y1="115" x2="244" y2="97" stroke="#e2e8f0" strokeWidth="1" opacity="0.8" />
              </g>

              {/* Anti-reflective Tempered Glass Sunlight Sheen */}
              <polygon
                points="115,116 165,110 240,73 190,79"
                fill="#ffffff"
                opacity="0.22"
              />

              {/* Active Photon Energy Absorption Glow across rooftop solar array */}
              <ellipse
                cx="185"
                cy="95"
                rx="68"
                ry="22"
                fill="#38bdf8"
                opacity="0.32"
                className="animate-pulse"
              />
              <ellipse
                cx="175"
                cy="95"
                rx="38"
                ry="12"
                fill="#fde047"
                opacity="0.38"
                className="animate-pulse"
              />

              {/* Rooftop DC Solar Combiner Box (Right edge of roof) */}
              <g transform="translate(268, 105)">
                <rect x="-4" y="-4" width="13" height="13" rx="2.5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.8" />
                {/* Generation Spark at Junction Box */}
                <circle cx="2.5" cy="2.5" r="3.5" fill="#38bdf8" className="animate-spark" />
                <circle cx="2.5" cy="2.5" r="2" fill="#ffffff" />
              </g>

              {/* Conduit dropping down from roof combiner box along the wall */}
              <path
                d="M 271 114 L 271 155 L 305 160"
                fill="none"
                stroke="#0f172a"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 271 114 L 271 155 L 305 160"
                fill="none"
                stroke="#ea580c"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* 7. HIGH-VOLTAGE OUTPUT DC WIRE WITH ELECTRIC LIGHTNING ARCS (Exits to Slide 3) */}
            <g>
              {/* Outer Heavy Armor Conduit */}
              <path
                d="M 305 160 C 335 160, 365 145, 420 145"
                fill="none"
                stroke="#0f172a"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Heavy Orange Solar PV Wire */}
              <path
                d="M 305 160 C 335 160, 365 145, 420 145"
                fill="none"
                stroke="#ea580c"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Rapid Moving Electricity Plasma Flow (Cyan + Gold) */}
              <path
                d="M 305 160 C 335 160, 365 145, 420 145"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.2"
                strokeDasharray="6 8"
                className="animate-dash-fast"
                filter="url(#electricGlow)"
              />
              <path
                d="M 305 160 C 335 160, 365 145, 420 145"
                fill="none"
                stroke="#fef08a"
                strokeWidth="1.8"
                strokeDasharray="4 7"
                className="animate-dash-fast"
              />

              {/* Zigzag Electric Lightning Bolt Arc 1 along the wire */}
              <path
                d="M 306 160 L 320 157 L 330 162 L 345 152 L 358 156 L 372 146 L 388 148 L 404 143 L 420 145"
                fill="none"
                stroke="#67e8f9"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-electric"
              />
              {/* Zigzag Electric Lightning Bolt Arc 2 */}
              <path
                d="M 308 161 L 322 164 L 336 158 L 350 160 L 364 150 L 378 152 L 394 142 L 410 146 L 420 145"
                fill="none"
                stroke="#fde047"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-electric"
              />

              {/* Crackling Electric Sparks along wire */}
              <circle cx="325" cy="159" r="2.5" fill="#ffffff" className="animate-spark" />
              <circle cx="360" cy="152" r="3" fill="#67e8f9" className="animate-spark" />
              <circle cx="395" cy="145" r="2.5" fill="#fde047" className="animate-spark" />
            </g>
          </svg>

          {/* Micro Telemetry Pill: Solar Daytime Irradiance & Rooftop Badge */}
          <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-md border border-amber-300 rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[11px] font-black text-amber-300 font-mono tracking-tight">
              {solarWatts} W
            </span>
          </div>

          {/* Micro Rooftop Tag */}
          <div className="absolute bottom-2.5 left-3 bg-black/60 backdrop-blur-md border border-sky-400/40 text-sky-200 rounded-md px-2 py-0.5 text-[9px] font-bold font-mono">
            🏠 Rooftop Solar Array
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
