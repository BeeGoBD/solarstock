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
import { SolarInverterFlow } from './SolarInverterFlow';
import rooftopSolarHome from '../assets/images/rooftop_solar_home_1788246756735.jpg';
import familySolarLiving from '../assets/images/family_solar_living_1788246770378.jpg';
import travelPortableSolar from '../assets/images/travel_portable_solar_1788246785319.jpg';

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
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F2ECE1] border border-amber-200/90 shadow-lg cursor-pointer transition-all duration-300 min-h-[300px] sm:min-h-[370px] md:min-h-[400px] flex flex-col items-center justify-between p-3 sm:p-5 text-neutral-900"
          >
            {/* Ambient Warm Sun Aura & Micro Dot Grid Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/35 via-amber-100/10 to-transparent" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, #d97706 1.2px, transparent 1.2px), radial-gradient(circle at 0% 0%, #f59e0b 1px, transparent 1px)`,
                  backgroundSize: '22px 22px, 11px 11px'
                }}
              />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-300/25 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Top Header Group: Folded "MEGA SALE" Ribbon & Trust Capsule */}
            <div className="relative z-10 w-full flex flex-col items-center text-center mt-0.5">
              {/* Folded Yellow Ribbon Badge - 20% reduced height and padding */}
              <div className="relative inline-flex flex-col items-center mb-2 sm:mb-2.5">
                <div className="relative bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-neutral-950 font-black px-5 sm:px-8 py-1 sm:py-1.5 text-sm sm:text-xl tracking-tighter uppercase font-['Outfit',sans-serif] shadow-md shadow-amber-400/20 border-b-2 border-amber-600">
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
              <div className="inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-3 bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-xl px-2.5 sm:px-4 py-1.5 shadow-sm max-w-full">
                {/* Left Guarantee item */}
                <div className="flex items-center gap-1 px-1.5 border-r border-amber-200/80 text-left">
                  <div>
                    <span className="block text-[8px] sm:text-[9px] text-neutral-500 uppercase font-bold leading-tight">
                      Guaranteed
                    </span>
                    <span className="text-[11px] sm:text-xs font-black text-amber-600 font-serif italic tracking-wide">
                      {heroBillboard.lowestPriceTag}
                    </span>
                  </div>
                </div>

                {/* Middle SolarCare Replacement Badge */}
                <div className="flex items-center gap-1.5 px-1.5 border-r border-amber-200/80">
                  <div className="w-5 h-5 rounded bg-amber-100 border border-amber-400 flex items-center justify-center text-amber-800 font-black text-[10px]">
                    +
                  </div>
                  <div className="text-left">
                    <span className="block text-[9px] sm:text-[11px] font-black text-neutral-900 leading-none">
                      {heroBillboard.guaranteeBadgeTitle}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-amber-700 uppercase tracking-tight">
                      {heroBillboard.guaranteeBadgeSubtitle}
                    </span>
                  </div>
                </div>

                {/* Right Free Delivery item */}
                <div className="flex items-center gap-1 px-1.5 text-left">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                    <Bike className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="block text-[11px] sm:text-xs font-black text-emerald-700 leading-none">
                      {heroBillboard.freeDeliveryTitle}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-neutral-600 uppercase tracking-tight">
                      {heroBillboard.freeDeliverySubtitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Unit Panoramic Centerpiece with SIDES and 20% Reduced Image Sizes */}
            <div className="relative z-10 w-full flex items-end justify-center gap-1.5 sm:gap-3 md:gap-4 mt-3 sm:mt-4 mb-1 max-w-3xl px-1">
              
              {/* SIDE 1 (Far Left Flank): Portable Solar Generator Power Station */}
              <div className="hidden sm:block relative w-20 sm:w-24 md:w-28 transform -rotate-2 hover:rotate-0 transition-transform duration-200 drop-shadow-md opacity-95 hover:opacity-100">
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-neutral-800 to-neutral-950 p-1.5 border border-amber-400/40 shadow-lg">
                  <div className="w-full aspect-[4/5] rounded-lg bg-neutral-900 p-1.5 flex flex-col justify-between border border-neutral-700/80 shadow-inner">
                    {/* Top Rugged Handle & Status */}
                    <div className="flex items-center justify-between">
                      <div className="w-6 h-1.5 bg-amber-500/80 rounded-full mx-auto" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    {/* Realistic Front Display & Ports Matrix */}
                    <div className="my-0.5 bg-black/90 rounded p-1 border border-neutral-800 flex flex-col items-center">
                      <div className="flex items-center justify-between w-full text-[6px] font-mono text-emerald-400 font-bold">
                        <span>85%</span>
                        <span className="text-amber-400">220V</span>
                      </div>
                      {/* Segmented mini battery gauge */}
                      <div className="w-full h-1 bg-neutral-800 rounded-full flex gap-0.5 my-0.5 p-0.5">
                        <div className="h-full flex-1 bg-emerald-400 rounded-2xs" />
                        <div className="h-full flex-1 bg-emerald-400 rounded-2xs" />
                        <div className="h-full flex-1 bg-emerald-400 rounded-2xs" />
                        <div className="h-full flex-1 bg-neutral-700 rounded-2xs" />
                      </div>
                      {/* Port Sockets Simulation */}
                      <div className="flex items-center justify-center gap-1 mt-0.5">
                        <div className="w-2 h-1 bg-neutral-800 border border-neutral-700 rounded-2xs" />
                        <div className="w-1.5 h-1.5 bg-amber-500/30 border border-amber-400/80 rounded-full flex items-center justify-center">
                          <div className="w-0.5 h-0.5 bg-amber-400 rounded-full" />
                        </div>
                        <div className="w-2 h-1 bg-cyan-900/60 border border-cyan-500/60 rounded-2xs" />
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-amber-300 block leading-tight">NEOZL 300</span>
                      <span className="text-[6px] sm:text-[7px] text-neutral-400 font-mono font-medium">PD 100W • 300W</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDE 2 (Inner Left Flank): Smart Solar Screen / Hybrid Controller */}
              <div className="relative w-22 sm:w-30 md:w-34 transform hover:scale-[1.02] transition-transform duration-200 drop-shadow-md">
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900 via-neutral-900 to-black p-1.5 sm:p-2 border border-sky-400/50 shadow-xl shadow-sky-500/10">
                  <div className="w-full aspect-[4/5] rounded-lg bg-gradient-to-b from-neutral-950 to-neutral-900 p-1.5 flex flex-col justify-between border border-sky-900/60 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] sm:text-[8px] font-black text-sky-400 font-mono">MPPT 60A</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                    </div>

                    {/* Circular High-Tech Digital Flow Dial */}
                    <div className="w-10 h-10 sm:w-13 sm:h-13 mx-auto rounded-full border-2 border-sky-400/60 bg-black/90 flex flex-col items-center justify-center relative shadow-[0_0_8px_rgba(56,189,248,0.25)] p-0.5">
                      <div className="text-[6px] sm:text-[7px] font-black text-emerald-400 font-mono">48V 60A</div>
                      <div className="text-[5px] sm:text-[6px] font-mono text-sky-300">99.4% MPPT</div>
                      <div className="w-full h-0.5 bg-sky-500/30 my-0.5 flex justify-center items-center">
                        <div className="w-2 h-0.5 bg-sky-400 animate-pulse" />
                      </div>
                      {/* Micro glowing terminal indicators */}
                      <div className="flex gap-1 text-[4px] font-mono text-amber-400">
                        <span>PV IN</span>
                        <span>BAT</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-white block leading-tight">{heroBillboard.leftProductTitle}</span>
                      <span className="text-[6px] sm:text-[7px] text-sky-300 font-semibold">{heroBillboard.leftProductSubtitle}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CENTER (Flagship Centerpiece): Felicity / Growatt Orange/Gold LiFePO4 Inverter */}
              <div className="relative w-28 sm:w-40 md:w-46 z-20 transform scale-100 hover:scale-[1.03] transition-transform duration-200 drop-shadow-xl">
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 p-2 sm:p-2.5 border-2 border-amber-300 shadow-xl shadow-amber-500/25">
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
              <div className="relative w-22 sm:w-30 md:w-34 transform hover:scale-[1.02] transition-transform duration-200 drop-shadow-md">
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-1.5 sm:p-2 border border-emerald-400/50 shadow-xl shadow-emerald-500/10">
                  <div className="w-full aspect-[4/5] rounded-lg bg-gradient-to-b from-neutral-950 to-neutral-900 p-1.5 flex flex-col justify-between border border-emerald-900/60 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] sm:text-[8px] font-black text-emerald-400 font-mono">230V AC</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    {/* Sine Wave LCD Screen & Ventilation Grills */}
                    <div className="my-0.5 bg-black/90 rounded p-1 border border-neutral-800 flex flex-col items-center">
                      <div className="flex items-center justify-between w-full text-[6px] font-mono text-cyan-300 font-bold">
                        <span>5.0 kW</span>
                        <span className="text-emerald-400">50 Hz</span>
                      </div>
                      {/* Animated Sine Wave Graphic */}
                      <svg className="w-full h-3 my-0.5 overflow-hidden" viewBox="0 0 60 12">
                        <path
                          d="M 0 6 Q 7.5 0, 15 6 T 30 6 T 45 6 T 60 6"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Industrial cooling vents */}
                      <div className="w-full flex justify-center gap-0.5">
                        <div className="w-2 h-0.5 bg-neutral-700 rounded-full" />
                        <div className="w-2 h-0.5 bg-neutral-700 rounded-full" />
                        <div className="w-2 h-0.5 bg-neutral-700 rounded-full" />
                        <div className="w-2 h-0.5 bg-neutral-700 rounded-full" />
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-white block leading-tight">{heroBillboard.rightProductTitle}</span>
                      <span className="text-[6px] sm:text-[7px] text-emerald-400 font-semibold">{heroBillboard.rightProductSubtitle}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDE 4 (Far Right Flank): Tier-1 Monocrystalline Bifacial Solar Panel */}
              <div className="hidden sm:block relative w-20 sm:w-24 md:w-28 transform rotate-2 hover:rotate-0 transition-transform duration-200 drop-shadow-md opacity-95 hover:opacity-100">
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900 via-neutral-900 to-black p-1.5 border border-sky-400/50 shadow-lg">
                  <div className="w-full aspect-[4/5] rounded-lg bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0284c7]/30 p-1.5 flex flex-col justify-between border border-sky-400/40 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] font-black text-sky-300 font-mono">585W TOPCon</span>
                      <Sun className="w-2.5 h-2.5 text-amber-400 animate-spin" />
                    </div>

                    {/* Realistic Multi-Busbar Solar PV Cell Grid */}
                    <div className="w-full h-9 rounded border border-sky-400/40 bg-gradient-to-br from-[#0c1a30] via-[#0284c7]/20 to-[#0c1a30] relative overflow-hidden p-0.5 flex flex-col justify-between">
                      {/* Horizontal Busbars */}
                      <div className="w-full h-px bg-sky-300/40" />
                      <div className="w-full h-px bg-sky-300/40" />
                      <div className="w-full h-px bg-sky-300/40" />
                      {/* Vertical Silicon Cell Divider Lines */}
                      <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
                        <div className="w-px h-full bg-sky-200/50" />
                        <div className="w-px h-full bg-sky-200/50" />
                        <div className="w-px h-full bg-sky-200/50" />
                        <div className="w-px h-full bg-sky-200/50" />
                      </div>
                      {/* Glass Diagonal Sheen */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                    </div>

                    <div className="text-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-white block leading-tight">LONGi Hi-MO</span>
                      <span className="text-[6px] sm:text-[7px] text-sky-300 font-semibold font-mono">22.8% Eff. • 25Y</span>
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

        {/* SLIDE 1: Photorealistic Rooftop Solar Architecture Lifestyle */}
        {activeSlide === 1 && (
          <div
            onClick={() => handleClick('solar-packages')}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-sky-400/40 shadow-lg cursor-pointer transition-all duration-300 min-h-[300px] sm:min-h-[370px] md:min-h-[400px] sm:h-[370px] md:h-[400px] flex flex-col justify-between p-3 sm:p-5 text-white group"
          >
            {/* Background Ambient Blur Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5 my-auto">
              <div className="space-y-1.5 sm:space-y-2 max-w-md text-center sm:text-left">
                <span className="inline-flex items-center gap-1 bg-sky-500/20 text-sky-300 border border-sky-400/40 font-black px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider backdrop-blur-md">
                  <Sun className="w-3 h-3 text-amber-400 animate-spin" />
                  CLEAN ENERGY ARCHITECTURE
                </span>
                <h2 className="text-base sm:text-xl md:text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight leading-snug">
                  Power Your Home From Your Own Roof
                </h2>
                <p className="text-[11px] sm:text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  High-efficiency monocrystalline solar panels engineered seamlessly onto your rooftop for 25+ years of silent, zero-emission electricity.
                </p>

                {/* Feature Chips */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                  <span className="bg-white/10 backdrop-blur-md border border-white/15 text-neutral-200 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    ✨ 90% Bill Reduction
                  </span>
                  <span className="bg-white/10 backdrop-blur-md border border-white/15 text-neutral-200 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    🛡️ 25Y Warranty
                  </span>
                  <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    🌱 100% Green
                  </span>
                </div>
              </div>

              {/* Compact Matching Proportion AI Image Display */}
              <div className="relative w-48 sm:w-60 md:w-72 shrink-0 rounded-xl overflow-hidden border-2 border-sky-400/50 shadow-xl shadow-sky-500/10 group-hover:border-sky-300 transition-all duration-300">
                <img
                  src={rooftopSolarHome}
                  alt="Modern rooftop solar home under sunny sky"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/10] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 pointer-events-none" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-bold text-sky-200 drop-shadow-sm font-mono">
                      Residential On-Grid
                    </span>
                  </div>
                  <span className="text-[9px] bg-sky-500/80 px-1.5 py-0.5 rounded font-mono font-bold backdrop-blur-xs">
                    5kW - 20kW
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-white/10">
              <span className="text-[10px] sm:text-xs text-neutral-400 font-medium">Engineered for Tropical Weather & Storm Resistance</span>
              <span className="text-amber-400 font-bold text-[10px] sm:text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Rooftop Systems <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}

        {/* SLIDE 2: Photorealistic Family Comfort & 24/7 Silent Power Lifestyle */}
        {activeSlide === 2 && (
          <div
            onClick={() => handleClick('hybrid-inverters')}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c1a2e] via-[#111f38] to-[#0a101f] border border-amber-400/40 shadow-lg cursor-pointer transition-all duration-300 min-h-[300px] sm:min-h-[370px] md:min-h-[400px] sm:h-[370px] md:h-[400px] flex flex-col justify-between p-3 sm:p-5 text-white group"
          >
            {/* Background Ambient Warm Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5 my-auto">
              <div className="space-y-1.5 sm:space-y-2 max-w-md text-center sm:text-left">
                <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-400/40 font-black px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider backdrop-blur-md">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  24/7 FAMILY COMFORT
                </span>
                <h2 className="text-base sm:text-xl md:text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight leading-snug">
                  Uninterrupted Smiles & Comfortable Living
                </h2>
                <p className="text-[11px] sm:text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  Say goodbye to load shedding. Keep your lights, ceiling fans, WiFi, and refrigerator running continuously with zero switchover lag.
                </p>

                {/* Feature Chips */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                  <span className="bg-white/10 backdrop-blur-md border border-white/15 text-neutral-200 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    ⚡ Zero Lag Transfer
                  </span>
                  <span className="bg-white/10 backdrop-blur-md border border-white/15 text-neutral-200 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    🔇 100% Silent
                  </span>
                  <span className="bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    👨‍👩‍👧 Family Safety
                  </span>
                </div>
              </div>

              {/* Compact Matching Proportion AI Image Display */}
              <div className="relative w-48 sm:w-60 md:w-72 shrink-0 rounded-xl overflow-hidden border-2 border-amber-400/50 shadow-xl shadow-amber-500/10 group-hover:border-amber-300 transition-all duration-300">
                <img
                  src={familySolarLiving}
                  alt="Happy family relaxing together in solar powered home"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/10] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 pointer-events-none" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-amber-200 drop-shadow-sm font-mono">
                      LiFePO4 Home Energy
                    </span>
                  </div>
                  <span className="text-[9px] bg-amber-500/80 text-neutral-950 px-1.5 py-0.5 rounded font-mono font-black backdrop-blur-xs">
                    6000+ Cycles
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-white/10">
              <span className="text-[10px] sm:text-xs text-neutral-400 font-medium">Automatic Emergency Power Backup for Lights, Fans & Gadgets</span>
              <span className="text-amber-400 font-bold text-[10px] sm:text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Home Hybrid Solutions <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}

        {/* SLIDE 3: Photorealistic Travel, Camping & Outdoor Solar Freedom Lifestyle */}
        {activeSlide === 3 && (
          <div
            onClick={() => handleClick('ips-systems')}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#1c1917] via-[#292524] to-[#0c0a09] border border-orange-400/40 shadow-lg cursor-pointer transition-all duration-300 min-h-[300px] sm:min-h-[370px] md:min-h-[400px] sm:h-[370px] md:h-[400px] flex flex-col justify-between p-3 sm:p-5 text-white group"
          >
            {/* Background Ambient Sunset Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5 my-auto">
              <div className="space-y-1.5 sm:space-y-2 max-w-md text-center sm:text-left">
                <span className="inline-flex items-center gap-1 bg-orange-500/20 text-orange-300 border border-orange-400/40 font-black px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider backdrop-blur-md">
                  <Zap className="w-3 h-3 text-amber-400" />
                  OFF-GRID FREEDOM
                </span>
                <h2 className="text-base sm:text-xl md:text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight leading-snug">
                  Take Clean Solar Anywhere Under the Sky
                </h2>
                <p className="text-[11px] sm:text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  Camp under the stars, travel in your RV, or work remotely with portable solar power stations and fast-charging folding panels.
                </p>

                {/* Feature Chips */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                  <span className="bg-white/10 backdrop-blur-md border border-white/15 text-neutral-200 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    🏕️ Rugged & Portable
                  </span>
                  <span className="bg-white/10 backdrop-blur-md border border-white/15 text-neutral-200 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    🔌 220V Pure Sine
                  </span>
                  <span className="bg-orange-400/20 border border-orange-300/40 text-orange-300 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    ☀️ Fast Solar Charge
                  </span>
                </div>
              </div>

              {/* Compact Matching Proportion AI Image Display */}
              <div className="relative w-48 sm:w-60 md:w-72 shrink-0 rounded-xl overflow-hidden border-2 border-orange-400/50 shadow-xl shadow-orange-500/10 group-hover:border-orange-300 transition-all duration-300">
                <img
                  src={travelPortableSolar}
                  alt="Friends camping with camper van powered by portable solar generator"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/10] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 pointer-events-none" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-[10px] font-bold text-amber-200 drop-shadow-sm font-mono">
                      Expedition & Field Power
                    </span>
                  </div>
                  <span className="text-[9px] bg-orange-500/80 px-1.5 py-0.5 rounded font-mono font-bold backdrop-blur-xs">
                    300W - 2000W
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-white/10">
              <span className="text-[10px] sm:text-xs text-neutral-400 font-medium">Ideal for Outdoor Camping, Photography, Drones & Road Trips</span>
              <span className="text-amber-400 font-bold text-[10px] sm:text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Portable Stations <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}

        {/* SIDE NAVIGATION: Left & Right Glassmorphic Carousel Buttons */}
        <button
          type="button"
          onClick={handlePrevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-amber-400 hover:text-neutral-950 text-neutral-800 border border-neutral-300/80 backdrop-blur-md flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 shadow-md z-30"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-amber-400 hover:text-neutral-950 text-neutral-800 border border-neutral-300/80 backdrop-blur-md flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 shadow-md z-30"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-neutral-300/80 shadow-xs">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide(idx);
              }}
              className={`h-1.5 rounded-full transition-all ${
                activeSlide === idx ? 'w-5 bg-amber-500' : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. Dual Sub-Banners (2nd Modern Slide & 3rd Modern Slide) - Pure Premium Real-Time Solar Sun-to-Inverter Charging Animation */}
      <div className="mt-3 sm:mt-3.5">
        <SolarInverterFlow />
      </div>
    </section>
  );
};
export default HeroSlider;
