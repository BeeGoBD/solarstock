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
                <div className="rounded-xl sm:rounded-2xl bg-white p-1.5 border border-amber-200 shadow-md">
                  <div className="w-full aspect-[4/5] rounded-lg bg-gradient-to-b from-amber-50/50 to-neutral-50 p-1.5 flex flex-col justify-between border border-amber-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] font-black text-amber-700">NEOZL 300</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    {/* Portable Station Handle & LED battery bar */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg border border-amber-300 bg-white flex flex-col items-center justify-center p-1 shadow-inner">
                      <div className="w-4 h-1 bg-neutral-300 rounded-full mb-1" />
                      <div className="flex gap-0.5">
                        <div className="w-1 h-2 bg-emerald-500 rounded-2xs" />
                        <div className="w-1 h-2 bg-emerald-500 rounded-2xs" />
                        <div className="w-1 h-2 bg-amber-500 rounded-2xs" />
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-neutral-900 block">Portable IPS</span>
                      <span className="text-[6px] sm:text-[7px] text-amber-700 font-semibold">Fast PD 100W</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDE 2 (Inner Left Flank): Smart Solar Screen / Hybrid Controller */}
              <div className="relative w-22 sm:w-30 md:w-34 transform hover:scale-[1.02] transition-transform duration-200 drop-shadow-md">
                <div className="rounded-xl sm:rounded-2xl bg-white p-1.5 sm:p-2 border border-amber-200 shadow-md">
                  <div className="w-full aspect-[4/5] rounded-lg bg-gradient-to-b from-amber-50/40 to-neutral-50 p-1.5 flex flex-col justify-between border border-amber-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] sm:text-[8px] font-black text-neutral-800">SOLAR 48V</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <div className="w-9 h-9 sm:w-12 sm:h-12 mx-auto rounded-full border border-amber-300 flex items-center justify-center relative bg-white shadow-inner">
                      <div className="w-0.5 h-4 bg-amber-500 rounded-full origin-bottom transform rotate-45" />
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 absolute" />
                    </div>
                    <div className="text-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-neutral-900 block">{heroBillboard.leftProductTitle}</span>
                      <span className="text-[6px] sm:text-[7px] text-amber-700 font-semibold">{heroBillboard.leftProductSubtitle}</span>
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
                <div className="rounded-xl sm:rounded-2xl bg-white p-1.5 sm:p-2 border border-neutral-200 shadow-md">
                  <div className="w-full aspect-[4/5] rounded-lg bg-gradient-to-b from-neutral-50 to-amber-50/30 p-1.5 flex flex-col justify-between border border-neutral-200">
                    <div className="flex flex-col items-center gap-0.5 pt-0.5">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-neutral-900 block">{heroBillboard.rightProductTitle}</span>
                      <span className="text-[6px] sm:text-[7px] text-neutral-600 font-semibold">{heroBillboard.rightProductSubtitle}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDE 4 (Far Right Flank): Tier-1 Monocrystalline Bifacial Solar Panel */}
              <div className="hidden sm:block relative w-20 sm:w-24 md:w-28 transform rotate-2 hover:rotate-0 transition-transform duration-200 drop-shadow-md opacity-95 hover:opacity-100">
                <div className="rounded-xl sm:rounded-2xl bg-white p-1.5 border border-amber-200 shadow-md">
                  <div className="w-full aspect-[4/5] rounded-lg bg-gradient-to-b from-neutral-50 to-amber-50/30 p-1.5 flex flex-col justify-between border border-amber-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] font-black text-amber-700">585W TOPCon</span>
                      <Sun className="w-2.5 h-2.5 text-amber-500" />
                    </div>
                    {/* Solar PV Grid Pattern */}
                    <div className="w-full h-8 rounded border border-amber-200 bg-amber-50/50 grid grid-cols-3 grid-rows-2 gap-0.5 p-0.5">
                      <div className="bg-neutral-200 rounded-2xs" />
                      <div className="bg-neutral-200 rounded-2xs" />
                      <div className="bg-neutral-200 rounded-2xs" />
                      <div className="bg-neutral-200 rounded-2xs" />
                      <div className="bg-neutral-200 rounded-2xs" />
                      <div className="bg-neutral-200 rounded-2xs" />
                    </div>
                    <div className="text-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-neutral-900 block">LONGi Hi-MO</span>
                      <span className="text-[6px] sm:text-[7px] text-amber-700 font-semibold">25 Yrs Warranty</span>
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
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFFDF9] via-[#FAF6EE] to-[#F3EDE0] border border-amber-200/90 shadow-lg cursor-pointer transition-all duration-300 min-h-[300px] sm:min-h-[370px] md:min-h-[400px] flex flex-col justify-between p-4 sm:p-6 text-neutral-900"
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2 max-w-md text-center sm:text-left">
                <span className="inline-block bg-amber-400 text-neutral-950 font-black px-3 py-0.5 rounded text-[10px] sm:text-xs uppercase tracking-wider shadow-xs">
                  ⚡ TOP RATED HYBRID INVERTER
                </span>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black font-['Outfit',sans-serif] text-neutral-950">
                  Growatt SPF 5000ES 5kW Pure Sine Wave
                </h2>
                <p className="text-xs sm:text-sm text-neutral-700 line-clamp-2">
                  Zero switchover lag • Integrated 100A MPPT Charge Controller • Works with or without battery.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                  <span className="text-base sm:text-xl font-black text-amber-600">
                    BDT ৳ 74,990
                  </span>
                  <span className="text-xs text-neutral-400 line-through">
                    BDT ৳ 98,500
                  </span>
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                    24% OFF
                  </span>
                </div>
              </div>

              {/* Scaled-down equipment visual */}
              <div className="w-36 sm:w-48 md:w-56 p-2 rounded-2xl bg-white border border-amber-200 shadow-md">
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-b from-amber-50/60 to-neutral-50 flex flex-col items-center justify-center p-3 text-center border border-amber-100">
                  <Zap className="w-8 h-8 text-amber-500 mb-1" />
                  <span className="text-xs sm:text-sm font-black text-neutral-900">GROWATT 5kW</span>
                  <span className="text-[10px] text-emerald-700 font-bold">5 Years Full Warranty</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-amber-200/80">
              <span className="text-xs text-neutral-600 font-semibold">Factory Certified & Ready to Ship</span>
              <button className="bg-amber-400 text-neutral-950 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-xs">
                Order Online Now →
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 2: Felicity LiFePO4 Lithium Battery Wall Slide */}
        {activeSlide === 2 && (
          <div
            onClick={() => handleClick('lithium-batteries', 'prod-felicity-10kwh')}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#FAFAF7] via-[#F4F4EE] to-[#EAE8DE] border border-amber-200/90 shadow-lg cursor-pointer transition-all duration-300 min-h-[300px] sm:min-h-[370px] md:min-h-[400px] flex flex-col justify-between p-4 sm:p-6 text-neutral-900"
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2 max-w-md text-center sm:text-left">
                <span className="inline-block bg-emerald-600 text-white font-black px-3 py-0.5 rounded text-[10px] sm:text-xs uppercase tracking-wider shadow-xs">
                  🔋 NEXT-GEN ENERGY STORAGE
                </span>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black font-['Outfit',sans-serif] text-neutral-950">
                  Felicity 51.2V 100Ah LiFePO4 Powerwall
                </h2>
                <p className="text-xs sm:text-sm text-neutral-700 line-clamp-2">
                  6,000+ Deep Cycles • Smart LCD BMS with RS485 / CAN • 15 Years Operating Life.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                  <span className="text-base sm:text-xl font-black text-amber-600">
                    BDT ৳ 118,000
                  </span>
                  <span className="text-xs text-neutral-400 line-through">
                    BDT ৳ 145,000
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-2 py-0.5 rounded">
                    ৳27,000 OFF
                  </span>
                </div>
              </div>

              {/* Scaled-down lithium powerwall visual */}
              <div className="w-36 sm:w-48 md:w-56 p-2 rounded-2xl bg-white border border-neutral-200 shadow-md">
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-b from-emerald-50/40 to-neutral-50 flex flex-col items-center justify-center p-3 text-center border border-emerald-200/60">
                  <BatteryCharging className="w-8 h-8 text-emerald-600 mb-1" />
                  <span className="text-xs sm:text-sm font-black text-neutral-900">51.2V 100Ah Powerwall</span>
                  <span className="text-[10px] text-emerald-700 font-bold">10 Years Official Warranty</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-neutral-200">
              <span className="text-xs text-neutral-600 font-semibold">Zero Maintenance • Instant Switch</span>
              <button className="bg-amber-400 text-neutral-950 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-xs">
                Explore Lithium Batteries →
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 3: SolarStock Portable Power Stations Slide */}
        {activeSlide === 3 && (
          <div
            onClick={() => handleClick('ips-systems', 'prod-solarstock-neozl-300w')}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFFDF8] via-[#F7F3EA] to-[#EFE8D8] border border-amber-200/90 shadow-lg cursor-pointer transition-all duration-300 min-h-[300px] sm:min-h-[370px] md:min-h-[400px] flex flex-col justify-between p-4 sm:p-6 text-neutral-900"
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2 max-w-md text-center sm:text-left">
                <span className="inline-block bg-amber-400 text-neutral-950 font-black px-3 py-0.5 rounded text-[10px] sm:text-xs uppercase tracking-wider shadow-xs">
                  ☀️ PORTABLE SOLAR GENERATORS
                </span>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black font-['Outfit',sans-serif] text-neutral-950">
                  SolarStock NEOZL 300W & GP 1000 Series
                </h2>
                <p className="text-xs sm:text-sm text-neutral-700 line-clamp-2">
                  Portable LiFePO4 Power Station with 220V AC Pure Sine Output, Solar Fast Charging & Smart LED.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                  <span className="text-base sm:text-xl font-black text-amber-600">
                    Starting from BDT ৳ 14,990
                  </span>
                  <span className="bg-amber-400 text-neutral-950 text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
                    FLAT 20% OFF
                  </span>
                </div>
              </div>

              {/* Scaled-down visual */}
              <div className="w-36 sm:w-48 md:w-56 p-2 rounded-2xl bg-white border border-amber-200 shadow-md">
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-b from-amber-50 to-neutral-50 flex flex-col items-center justify-center p-3 text-center border border-amber-100">
                  <Sparkles className="w-8 h-8 text-amber-500 mb-1" />
                  <span className="text-xs sm:text-sm font-black text-neutral-900">Solar Generator Hub</span>
                  <span className="text-[10px] text-amber-800 font-bold">2 Years Replacement</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-amber-200/80">
              <span className="text-xs text-neutral-600 font-semibold">Ideal for Camping, Field Work & Load Shedding</span>
              <button className="bg-amber-400 text-neutral-950 px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-xs">
                View Power Stations →
              </button>
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
