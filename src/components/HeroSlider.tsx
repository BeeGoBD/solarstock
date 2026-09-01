import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Bike,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Zap,
  BatteryCharging,
  Sun,
  Sparkles,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowRight,
  Flame,
  Play,
  VolumeX,
  Radio,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroSliderProps {
  onBannerClick?: (category?: string) => void;
  onSelectProduct?: (productId: string) => void;
  onExploreCategory?: (categoryId: string) => void;
  onOpenChat?: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onBannerClick,
  onSelectProduct,
  onExploreCategory
}) => {
  const { heroBillboard, subBanners, products } = useStore();

  // 1. Top Main Hero Slider State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = 4;
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 2. Automated Morphing Animation State for 2nd Image (Left Sub-Banner)
  const [banner2ActiveIndex, setBanner2ActiveIndex] = useState(0);
  const [banner2Hovered, setBanner2Hovered] = useState(false);
  const banner2TimerRef = useRef<NodeJS.Timeout | null>(null);

  // Top Hero Carousel timer (faster 4.2 seconds)
  useEffect(() => {
    if (isPaused) return;

    slideTimerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 4200);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isPaused, totalSlides]);

  // 2nd Image (Left Sub-Banner) automatic morphing animation cycle (faster 2.3 seconds)
  useEffect(() => {
    banner2TimerRef.current = setInterval(() => {
      setBanner2ActiveIndex((prev) => (prev + 1) % 3);
    }, 2300);

    return () => {
      if (banner2TimerRef.current) clearInterval(banner2TimerRef.current);
    };
  }, []);

  const handlePrevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const handleClick = (category: string, productId?: string) => {
    if (productId && onSelectProduct) {
      onSelectProduct(productId);
    } else if (onExploreCategory) {
      onExploreCategory(category);
    } else if (onBannerClick) {
      onBannerClick(category);
    }
  };

  // Curated product morph items for 2nd Image (Left Sub-Banner)
  const banner2Items = [
    {
      id: 'prod-growatt-5000es',
      name: 'Growatt SPF 5000ES',
      badge: '5kW Pure Sine Wave',
      specs: '100A MPPT • 450V PV',
      tag: '🔥 Best Seller Inverter',
      accentColor: 'from-amber-500 to-orange-600',
      glowColor: 'rgba(245, 158, 11, 0.4)',
      category: 'hybrid-inverters',
      visualType: 'growatt'
    },
    {
      id: 'prod-solarstock-neozl-300w',
      name: 'SolarStock NEOZL 300W',
      badge: '192Wh LiFePO4 Station',
      specs: '45W Type-C PD • 3000+ Cycles',
      tag: '⚡ Ultra-Portable IPS',
      accentColor: 'from-yellow-400 to-amber-500',
      glowColor: 'rgba(234, 179, 8, 0.4)',
      category: 'ips-systems',
      visualType: 'neozl'
    },
    {
      id: 'prod-srne-6kw-hybrid',
      name: 'SRNE 6.2kW Dual-PV',
      badge: '6200W Dual Output',
      specs: 'Dual AC Output • 120A MPPT',
      tag: '⭐ Heavy-Duty Hybrid',
      accentColor: 'from-blue-500 to-indigo-600',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      category: 'hybrid-inverters',
      visualType: 'srne'
    }
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-3 sm:px-4 pt-2 sm:pt-3">
      {/* 1. Main Top Hero Slider Container with Sides and 20% Reduced Height & Image Sizes */}
      <div
        className="relative w-full group select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* SLIDE 0: Main Top Hero 5-Unit Panoramic Billboard */}
        {activeSlide === 0 && (
          <div
            onClick={() => handleClick('hybrid-inverters', 'prod-growatt-5000es')}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#090e1b] border border-neutral-800/90 shadow-xl cursor-pointer transition-all duration-300 min-h-[300px] sm:min-h-[370px] md:min-h-[400px] flex flex-col items-center justify-between p-3 sm:p-5"
          >
            {/* Honeycomb & Hexagon Radial Mesh Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/50 via-[#070b14] to-[#04060b]" />
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, #38bdf8 1.2px, transparent 1.2px), radial-gradient(circle at 0% 0%, #facc15 1px, transparent 1px)`,
                  backgroundSize: '20px 20px, 10px 10px'
                }}
              />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Top Header Group: Folded "MEGA SALE" Ribbon & Trust Capsule */}
            <div className="relative z-10 w-full flex flex-col items-center text-center mt-0.5">
              {/* Folded Yellow Ribbon Badge - 20% reduced height and padding */}
              <div className="relative inline-flex flex-col items-center mb-2 sm:mb-2.5">
                <div className="relative bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-neutral-950 font-black px-5 sm:px-8 py-1 sm:py-1.5 text-sm sm:text-xl tracking-tighter uppercase font-['Outfit',sans-serif] shadow-md shadow-amber-400/15 border-b-2 border-amber-600">
                  <span className="block text-[10px] sm:text-xs leading-none tracking-widest text-neutral-900 font-extrabold mb-0.5">
                    {heroBillboard.megaSaleRibbon}
                  </span>
                  <span className="block text-base sm:text-2xl font-black leading-none tracking-tight">
                    {heroBillboard.megaSaleTitle}
                  </span>

                  {/* Ribbon Cut Wings */}
                  <div className="absolute -left-2.5 top-0 bottom-0 w-2.5 bg-amber-500 clip-ribbon-left" />
                  <div className="absolute -right-2.5 top-0 bottom-0 w-2.5 bg-amber-500 clip-ribbon-right" />
                </div>
              </div>

              {/* Horizontal Guarantee Capsule Box */}
              <div className="inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-3 bg-black/65 backdrop-blur-md border border-neutral-700/80 rounded-xl px-2.5 sm:px-4 py-1.5 shadow-lg max-w-full">
                {/* Left Guarantee item */}
                <div className="flex items-center gap-1 px-1.5 border-r border-neutral-700/80 text-left">
                  <div>
                    <span className="block text-[8px] sm:text-[9px] text-neutral-400 uppercase font-semibold leading-tight">
                      Guaranteed
                    </span>
                    <span className="text-[11px] sm:text-xs font-black text-amber-400 font-serif italic tracking-wide">
                      {heroBillboard.lowestPriceTag}
                    </span>
                  </div>
                </div>

                {/* Middle SolarCare Replacement Badge */}
                <div className="flex items-center gap-1.5 px-1.5 border-r border-neutral-700/80">
                  <div className="w-5 h-5 rounded bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 font-black text-[10px]">
                    +
                  </div>
                  <div className="text-left">
                    <span className="block text-[9px] sm:text-[11px] font-black text-white leading-none">
                      {heroBillboard.guaranteeBadgeTitle}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-amber-300 uppercase tracking-tight">
                      {heroBillboard.guaranteeBadgeSubtitle}
                    </span>
                  </div>
                </div>

                {/* Right Free Delivery item */}
                <div className="flex items-center gap-1 px-1.5 text-left">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Bike className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="block text-[11px] sm:text-xs font-black text-emerald-400 leading-none">
                      {heroBillboard.freeDeliveryTitle}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-semibold text-neutral-300 uppercase tracking-tight">
                      {heroBillboard.freeDeliverySubtitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Unit Panoramic Centerpiece with SIDES and 20% Reduced Image Sizes */}
            <div className="relative z-10 w-full flex items-end justify-center gap-1.5 sm:gap-3 md:gap-4 mt-3 sm:mt-4 mb-1 max-w-3xl px-1">
              
              {/* SIDE 1 (Far Left Flank): Portable Solar Generator Power Station */}
              <div className="hidden sm:block relative w-20 sm:w-24 md:w-28 transform -rotate-2 hover:rotate-0 transition-transform duration-200 drop-shadow-lg opacity-90 hover:opacity-100">
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-neutral-900 via-slate-900 to-neutral-950 p-1.5 border border-amber-500/30 shadow-lg">
                  <div className="w-full aspect-[4/5] rounded-lg bg-gradient-to-b from-neutral-800 to-neutral-950 p-1.5 flex flex-col justify-between border border-neutral-700">
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] font-black text-amber-400">NEOZL 300</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    {/* Portable Station Handle & LED battery bar */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg border border-amber-400/40 bg-neutral-900 flex flex-col items-center justify-center p-1">
                      <div className="w-4 h-1 bg-neutral-700 rounded-full mb-1" />
                      <div className="flex gap-0.5">
                        <div className="w-1 h-2 bg-emerald-400 rounded-2xs" />
                        <div className="w-1 h-2 bg-emerald-400 rounded-2xs" />
                        <div className="w-1 h-2 bg-amber-400 rounded-2xs" />
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-white block">Portable IPS</span>
                      <span className="text-[6px] sm:text-[7px] text-amber-300">Fast PD 100W</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDE 2 (Inner Left Flank): Smart Solar Screen / Hybrid Controller */}
              <div className="relative w-22 sm:w-30 md:w-34 transform hover:scale-[1.02] transition-transform duration-200 drop-shadow-lg">
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-1.5 sm:p-2 border border-indigo-400/40 shadow-xl shadow-indigo-500/15">
                  <div className="w-full aspect-[4/5] rounded-lg bg-gradient-to-b from-indigo-900/80 to-neutral-950 p-1.5 flex flex-col justify-between border border-indigo-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] sm:text-[8px] font-black text-indigo-300">SOLAR 48V</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <div className="w-9 h-9 sm:w-12 sm:h-12 mx-auto rounded-full border border-indigo-300/40 flex items-center justify-center relative bg-indigo-950/60 shadow-inner">
                      <div className="w-0.5 h-4 bg-amber-400 rounded-full origin-bottom transform rotate-45" />
                      <div className="w-1 h-1 rounded-full bg-white absolute" />
                    </div>
                    <div className="text-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-white block">{heroBillboard.leftProductTitle}</span>
                      <span className="text-[6px] sm:text-[7px] text-indigo-300">{heroBillboard.leftProductSubtitle}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CENTER (Flagship Centerpiece): Felicity / Growatt Orange/Gold LiFePO4 Inverter */}
              <div className="relative w-28 sm:w-40 md:w-46 z-20 transform scale-100 hover:scale-[1.03] transition-transform duration-200 drop-shadow-xl">
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-amber-500 via-orange-600 to-amber-700 p-2 sm:p-2.5 border-2 border-amber-300/80 shadow-xl shadow-amber-500/30">
                  <div className="w-full aspect-[3/4] rounded-lg sm:rounded-xl bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 p-2 flex flex-col justify-between border border-amber-400/50">
                    <div className="flex items-center justify-center gap-1.5 pt-0.5">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                      </div>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                      </div>
                    </div>

                    <div className="bg-neutral-900/90 rounded-md p-1.5 border border-neutral-700 text-center">
                      <div className="flex items-center justify-between text-[7px] sm:text-[8px] text-amber-400 font-bold mb-0.5">
                        <span>LOAD: 94%</span>
                        <span>BAT: 51.2V</span>
                      </div>
                      <div className="h-3 w-full flex items-center justify-center gap-0.5">
                        <div className="w-1 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                        <div className="w-1 h-3 bg-emerald-400 rounded-full" />
                        <div className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <div className="w-1 h-3 bg-amber-400 rounded-full" />
                        <div className="w-1 h-2 bg-amber-400 rounded-full" />
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-black text-white mt-0.5 block leading-tight">
                        {heroBillboard.centerProductTag}
                      </span>
                    </div>

                    <div className="text-center pb-0.5">
                      <span className="text-[8px] sm:text-[9px] font-black tracking-wider text-amber-400 uppercase">
                        {heroBillboard.centerProductTitle}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDE 3 (Inner Right Flank): Bifacial Pure Sine Wave Inverter */}
              <div className="relative w-22 sm:w-30 md:w-34 transform hover:scale-[1.02] transition-transform duration-200 drop-shadow-lg">
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-200 via-neutral-100 to-slate-300 p-1.5 sm:p-2 border border-white shadow-xl shadow-sky-500/15">
                  <div className="w-full aspect-[4/5] rounded-lg bg-gradient-to-b from-slate-900 to-neutral-950 p-1.5 flex flex-col justify-between border border-slate-700">
                    <div className="flex flex-col items-center gap-0.5 pt-0.5">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-sky-400/20 border border-sky-400 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-white block">{heroBillboard.rightProductTitle}</span>
                      <span className="text-[6px] sm:text-[7px] text-sky-300">{heroBillboard.rightProductSubtitle}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDE 4 (Far Right Flank): Tier-1 Monocrystalline Bifacial Solar Panel */}
              <div className="hidden sm:block relative w-20 sm:w-24 md:w-28 transform rotate-2 hover:rotate-0 transition-transform duration-200 drop-shadow-lg opacity-90 hover:opacity-100">
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800 via-neutral-900 to-slate-950 p-1.5 border border-sky-400/40 shadow-lg">
                  <div className="w-full aspect-[4/5] rounded-lg bg-gradient-to-b from-blue-950 to-neutral-950 p-1.5 flex flex-col justify-between border border-sky-600/50">
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] font-black text-sky-300">585W TOPCon</span>
                      <Sun className="w-2.5 h-2.5 text-amber-400" />
                    </div>
                    {/* Solar PV Grid Pattern */}
                    <div className="w-full h-8 rounded border border-sky-400/30 bg-blue-950/60 grid grid-cols-3 grid-rows-2 gap-0.5 p-0.5">
                      <div className="bg-sky-800/40 rounded-2xs" />
                      <div className="bg-sky-800/40 rounded-2xs" />
                      <div className="bg-sky-800/40 rounded-2xs" />
                      <div className="bg-sky-800/40 rounded-2xs" />
                      <div className="bg-sky-800/40 rounded-2xs" />
                      <div className="bg-sky-800/40 rounded-2xs" />
                    </div>
                    <div className="text-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-white block">LONGi Hi-MO</span>
                      <span className="text-[6px] sm:text-[7px] text-sky-300">25 Yrs Warranty</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Disclaimer */}
            <div className="relative z-10 w-full flex justify-end">
              <span className="text-[8px] text-neutral-500 font-mono tracking-wider">
                {heroBillboard.termsDisclaimer}
              </span>
            </div>
          </div>
        )}

        {/* SLIDE 1: Growatt Hybrid Inverter Showcase Slide */}
        {activeSlide === 1 && (
          <div
            onClick={() => handleClick('hybrid-inverters', 'prod-growatt-5000es')}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d1b2a] via-[#1b263b] to-[#0a1128] border border-blue-800/60 shadow-xl cursor-pointer transition-all duration-300 min-h-[300px] sm:min-h-[370px] md:min-h-[400px] flex flex-col justify-between p-4 sm:p-6 text-white"
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2 max-w-md text-center sm:text-left">
                <span className="inline-block bg-amber-400 text-neutral-950 font-black px-3 py-0.5 rounded text-[10px] sm:text-xs uppercase tracking-wider">
                  ⚡ TOP RATED HYBRID INVERTER
                </span>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black font-['Outfit',sans-serif] text-white">
                  Growatt SPF 5000ES 5kW Pure Sine Wave
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2">
                  Zero switchover lag • Integrated 100A MPPT Charge Controller • Works with or without battery.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                  <span className="text-base sm:text-xl font-black text-amber-400">
                    BDT ৳ 74,990
                  </span>
                  <span className="text-xs text-neutral-400 line-through">
                    BDT ৳ 98,500
                  </span>
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    24% OFF
                  </span>
                </div>
              </div>

              {/* Scaled-down realistic equipment visual */}
              <div className="w-36 sm:w-48 md:w-56 p-2 rounded-2xl bg-neutral-950/80 border border-blue-500/40 shadow-2xl">
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-b from-blue-950 to-neutral-950 flex flex-col items-center justify-center p-3 text-center border border-blue-400/30">
                  <Zap className="w-8 h-8 text-amber-400 mb-1" />
                  <span className="text-xs sm:text-sm font-black text-white">GROWATT 5kW</span>
                  <span className="text-[10px] text-emerald-400 font-bold">5 Years Full Warranty</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-blue-900/60">
              <span className="text-xs text-neutral-300 font-semibold">Factory Certified & Ready to Ship</span>
              <button className="bg-amber-400 text-neutral-950 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors">
                Order Online Now →
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 2: Felicity LiFePO4 Lithium Battery Wall Slide */}
        {activeSlide === 2 && (
          <div
            onClick={() => handleClick('lithium-batteries', 'prod-felicity-10kwh')}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#0a192f] via-[#172a45] to-[#0d1b2a] border border-cyan-800/60 shadow-xl cursor-pointer transition-all duration-300 min-h-[300px] sm:min-h-[370px] md:min-h-[400px] flex flex-col justify-between p-4 sm:p-6 text-white"
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2 max-w-md text-center sm:text-left">
                <span className="inline-block bg-cyan-400 text-neutral-950 font-black px-3 py-0.5 rounded text-[10px] sm:text-xs uppercase tracking-wider">
                  🔋 NEXT-GEN ENERGY STORAGE
                </span>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black font-['Outfit',sans-serif] text-white">
                  Felicity 51.2V 100Ah LiFePO4 Powerwall
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2">
                  6,000+ Deep Cycles • Smart LCD BMS with RS485 / CAN • 15 Years Operating Life.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                  <span className="text-base sm:text-xl font-black text-amber-400">
                    BDT ৳ 118,000
                  </span>
                  <span className="text-xs text-neutral-400 line-through">
                    BDT ৳ 145,000
                  </span>
                  <span className="bg-emerald-500 text-neutral-950 text-[10px] font-black px-2 py-0.5 rounded">
                    ৳27,000 OFF
                  </span>
                </div>
              </div>

              {/* Scaled-down lithium powerwall visual */}
              <div className="w-36 sm:w-48 md:w-56 p-2 rounded-2xl bg-neutral-950/80 border border-cyan-500/40 shadow-2xl">
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-b from-cyan-950 to-neutral-950 flex flex-col items-center justify-center p-3 text-center border border-cyan-400/30">
                  <BatteryCharging className="w-8 h-8 text-cyan-400 mb-1" />
                  <span className="text-xs sm:text-sm font-black text-white">51.2V 100Ah Powerwall</span>
                  <span className="text-[10px] text-cyan-300 font-bold">10 Years Official Warranty</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-cyan-900/60">
              <span className="text-xs text-neutral-300 font-semibold">Zero Maintenance • Instant Switch</span>
              <button className="bg-cyan-400 text-neutral-950 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors">
                Explore Lithium Batteries →
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 3: SolarStock Portable Power Stations Slide */}
        {activeSlide === 3 && (
          <div
            onClick={() => handleClick('ips-systems', 'prod-solarstock-neozl-300w')}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#1c1917] via-[#292524] to-[#0c0a09] border border-amber-800/60 shadow-xl cursor-pointer transition-all duration-300 min-h-[300px] sm:min-h-[370px] md:min-h-[400px] flex flex-col justify-between p-4 sm:p-6 text-white"
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2 max-w-md text-center sm:text-left">
                <span className="inline-block bg-amber-400 text-neutral-950 font-black px-3 py-0.5 rounded text-[10px] sm:text-xs uppercase tracking-wider">
                  ☀️ PORTABLE SOLAR GENERATORS
                </span>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black font-['Outfit',sans-serif] text-white">
                  SolarStock NEOZL 300W & GP 1000 Series
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2">
                  Portable LiFePO4 Power Station with 220V AC Pure Sine Output, Solar Fast Charging & Smart LED.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                  <span className="text-base sm:text-xl font-black text-amber-400">
                    Starting from BDT ৳ 14,990
                  </span>
                  <span className="bg-amber-400 text-neutral-950 text-[10px] font-black px-2 py-0.5 rounded">
                    FLAT 20% OFF
                  </span>
                </div>
              </div>

              {/* Scaled-down visual */}
              <div className="w-36 sm:w-48 md:w-56 p-2 rounded-2xl bg-neutral-950/80 border border-amber-500/40 shadow-2xl">
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-b from-amber-950 to-neutral-950 flex flex-col items-center justify-center p-3 text-center border border-amber-400/30">
                  <Sparkles className="w-8 h-8 text-amber-400 mb-1" />
                  <span className="text-xs sm:text-sm font-black text-white">Solar Generator Hub</span>
                  <span className="text-[10px] text-amber-300 font-bold">2 Years Replacement</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-amber-900/60">
              <span className="text-xs text-neutral-300 font-semibold">Ideal for Camping, Field Work & Load Shedding</span>
              <button className="bg-amber-400 text-neutral-950 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors">
                View Power Stations →
              </button>
            </div>
          </div>
        )}

        {/* SIDE NAVIGATION: Left & Right Glassmorphic Carousel Buttons */}
        <button
          type="button"
          onClick={handlePrevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-amber-400 hover:text-neutral-950 text-white border border-neutral-700/80 backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-lg z-30"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-amber-400 hover:text-neutral-950 text-white border border-neutral-700/80 backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-lg z-30"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-neutral-700/60">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide(idx);
              }}
              className={`h-1.5 rounded-full transition-all ${
                activeSlide === idx ? 'w-5 bg-amber-400' : 'w-1.5 bg-neutral-500 hover:bg-neutral-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. Dual Sub-Banners (2nd Image & 3rd Image) with Automatic "Appears From Inside" Hover & Cycling Morph Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-3.5">
        
        {/* ========================================================================= */}
        {/* 2ND IMAGE (Left Sub-Banner): Automated Inner Morph & Hover Animation      */}
        {/* ========================================================================= */}
        <div
          onMouseEnter={() => setBanner2Hovered(true)}
          onMouseLeave={() => setBanner2Hovered(false)}
          onClick={() => {
            const currentItem = banner2Items[banner2ActiveIndex];
            handleClick(currentItem.category, currentItem.id);
          }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#1b2333] via-[#101725] to-[#0a0f1d] border border-neutral-800 shadow-md hover:shadow-2xl hover:border-amber-400/80 transition-all duration-500 cursor-pointer p-3.5 sm:p-4 flex flex-col justify-between min-h-[190px] sm:min-h-[210px] group"
        >
          {/* Ambient Glow Aura */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none"
            style={{
              background: banner2Items[banner2ActiveIndex].glowColor,
              opacity: banner2Hovered ? 0.35 : 0.15
            }}
          />

          {/* Top Header & Guarantee */}
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400 animate-pulse" />
                {banner2Items[banner2ActiveIndex].tag}
              </span>
              
              {/* Micro Cycle Dots for Automatic Animation */}
              <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full border border-neutral-700">
                <span className="text-[8px] text-neutral-400 font-mono">LIVE PREVIEW</span>
                {banner2Items.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setBanner2ActiveIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      banner2ActiveIndex === i ? 'w-3.5 bg-amber-400' : 'w-1.5 bg-neutral-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-sm sm:text-lg font-black text-white uppercase tracking-tight font-['Outfit',sans-serif] group-hover:text-amber-400 transition-colors">
              {subBanners.leftBanner.title}
            </h3>

            <div className="inline-flex items-center gap-1 bg-neutral-900/90 border border-amber-400/40 rounded-md px-2 py-0.5 mt-0.5 shadow-xs">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span className="text-[8px] sm:text-[9px] font-black text-white">
                solarCare+ <span className="text-amber-400 font-bold">{subBanners.leftBanner.guaranteeText}</span>
              </span>
            </div>
          </div>

          {/* THE AUTOMATIC INNER MORPH / APPEARS-FROM-INSIDE STAGE */}
          <div className="relative z-10 w-full my-2 h-24 sm:h-28 flex items-center justify-center overflow-hidden">
            {banner2Items.map((item, index) => {
              const isActive = banner2ActiveIndex === index;
              
              return (
                <div
                  key={item.id}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out pointer-events-none ${
                    isActive
                      ? 'opacity-100 scale-100 translate-y-0 z-20'
                      : 'opacity-0 scale-[0.97] translate-y-1 z-0'
                  }`}
                >
                  {/* Outer Orbiting Visual Container */}
                  <div className="w-full max-w-sm flex items-center justify-center gap-2 sm:gap-3 px-2">
                    
                    {/* Left Mini Companion Satellite */}
                    <div className="w-14 sm:w-18 aspect-square rounded-lg bg-neutral-900/90 border border-neutral-700/80 p-1 flex flex-col items-center justify-center text-center shadow-md">
                      <Zap className="w-3.5 h-3.5 text-amber-400 mb-0.5" />
                      <span className="text-[7px] text-neutral-300 font-bold leading-tight line-clamp-1">Pure Sine</span>
                      <span className="text-[6px] text-amber-400 font-mono">0ms Sync</span>
                    </div>

                    {/* Main Morphing Centerpiece Hero */}
                    <div className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r ${item.accentColor} p-[1.5px] shadow-xl shadow-black/60 transform transition-transform duration-200 ${banner2Hovered ? 'scale-[1.02]' : 'scale-100'}`}>
                      <div className="bg-neutral-950/95 rounded-[10px] sm:rounded-[14px] px-3 py-1.5 flex items-center gap-2.5 border border-neutral-800">
                        {/* Equipment Visual Icon / Indicator */}
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-neutral-900 border border-amber-400/40 flex items-center justify-center relative shadow-inner">
                          {item.visualType === 'growatt' && <Zap className="w-5 h-5 text-amber-400" />}
                          {item.visualType === 'neozl' && <Sparkles className="w-5 h-5 text-yellow-400" />}
                          {item.visualType === 'srne' && <Cpu className="w-5 h-5 text-blue-400" />}
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-neutral-950 animate-ping" />
                        </div>

                        {/* Model Specs & Dynamic Text */}
                        <div className="text-left">
                          <span className="text-[10px] sm:text-xs font-black text-white block leading-tight">
                            {item.name}
                          </span>
                          <span className="text-[8px] sm:text-[9px] text-amber-300 font-semibold block leading-tight">
                            {item.badge}
                          </span>
                          <span className="text-[7px] text-neutral-400 font-mono block">
                            {item.specs}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Mini Companion Satellite */}
                    <div className="w-14 sm:w-18 aspect-square rounded-lg bg-neutral-900/90 border border-neutral-700/80 p-1 flex flex-col items-center justify-center text-center shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mb-0.5" />
                      <span className="text-[7px] text-neutral-300 font-bold leading-tight line-clamp-1">SolarCare+</span>
                      <span className="text-[6px] text-emerald-400 font-mono">5Y Warranty</span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer Bar */}
          <div className="relative z-10 flex items-center justify-between pt-1 border-t border-neutral-800/80">
            <span className="text-[9px] text-neutral-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Click to view model & specs</span>
            </span>

            <button
              type="button"
              className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-3.5 py-1 rounded-lg text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-xs transition-all duration-200 hover:scale-105 flex items-center gap-1"
            >
              <span>{subBanners.leftBanner.buttonText || 'Buy Now'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3RD IMAGE / 3RD SECTION: Pure Video Player (Autoplay, Muted, Loop, No UI/Title) */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-md hover:shadow-2xl hover:border-cyan-500/60 transition-all duration-300 min-h-[190px] sm:min-h-[210px] h-[190px] sm:h-[210px] w-full flex items-center justify-center group">
          <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
            <iframe
              src="https://www.youtube.com/embed/aJyEyZ3uZsU?autoplay=1&mute=1&loop=1&playlist=aJyEyZ3uZsU&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1&fs=0"
              title="Solar System IPS Setup Video Demo"
              className="w-[125%] h-[135%] min-w-[120%] min-h-[130%] object-cover border-0 scale-125 sm:scale-130 pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {/* Transparent protective shield to ensure pure ambient video playback without click pauses */}
          <div className="absolute inset-0 z-10 pointer-events-auto bg-transparent" />
        </div>

      </div>
    </section>
  );
};
export default HeroSlider;
