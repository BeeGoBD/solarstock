import React from 'react';
import { ShieldCheck, Bike, MapPin } from 'lucide-react';
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
  const { heroBillboard, subBanners, brandConfig } = useStore();

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
      {/* 1. Main Top Hero Card matching screenshot */}
      <div
        onClick={() => handleClick('hybrid-inverters', 'prod-growatt-5000es')}
        className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a0f1d] border border-neutral-800 shadow-xl cursor-pointer group transition-all duration-300 min-h-[360px] sm:min-h-[460px] md:min-h-[500px] flex flex-col items-center justify-between p-4 sm:p-6"
      >
        {/* Honeycomb & Hexagon Radial Mesh Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Radial Blue/Navy Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/60 via-[#070b14] to-[#04060b]" />
          
          {/* Honeycomb Carbon Mesh Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, #38bdf8 1.2px, transparent 1.2px), radial-gradient(circle at 0% 0%, #facc15 1px, transparent 1px)`,
              backgroundSize: '24px 24px, 12px 12px'
            }}
          />

          {/* Glowing Ambient Light */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Top Header Group: Folded "MEGA SALE" Ribbon & Trust Capsule */}
        <div className="relative z-10 w-full flex flex-col items-center text-center mt-1">
          {/* Folded Yellow Ribbon Badge matching screenshot */}
          <div className="relative inline-flex flex-col items-center mb-3">
            <div className="relative bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-neutral-950 font-black px-6 sm:px-10 py-1.5 sm:py-2 text-base sm:text-2xl tracking-tighter uppercase font-['Outfit',sans-serif] shadow-lg shadow-amber-400/20 border-b-2 border-amber-600">
              <span className="block text-xs sm:text-base leading-none tracking-widest text-neutral-900 font-extrabold mb-0.5">
                {heroBillboard.megaSaleRibbon}
              </span>
              <span className="block text-xl sm:text-3xl font-black leading-none tracking-tight">
                {heroBillboard.megaSaleTitle}
              </span>

              {/* Ribbon Cut Left & Right Wings */}
              <div className="absolute -left-3 top-0 bottom-0 w-3 bg-amber-500 clip-ribbon-left" />
              <div className="absolute -right-3 top-0 bottom-0 w-3 bg-amber-500 clip-ribbon-right" />
            </div>
          </div>

          {/* Horizontal Guarantee Capsule Box matching screenshot */}
          <div className="inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-4 bg-black/60 backdrop-blur-md border border-neutral-700/80 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2 shadow-xl max-w-full">
            {/* Left Guarantee item */}
            <div className="flex items-center gap-1.5 px-2 border-r border-neutral-700/80 text-left">
              <div>
                <span className="block text-[9px] sm:text-[10px] text-neutral-400 uppercase font-semibold leading-tight">
                  Guaranteed
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-400 font-serif italic tracking-wide">
                  {heroBillboard.lowestPriceTag}
                </span>
              </div>
            </div>

            {/* Middle SolarCare Replacement Badge */}
            <div className="flex items-center gap-2 px-2 border-r border-neutral-700/80">
              <div className="w-6 h-6 rounded bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 font-black text-xs">
                +
              </div>
              <div className="text-left">
                <span className="block text-[10px] sm:text-xs font-black text-white leading-none">
                  {heroBillboard.guaranteeBadgeTitle}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-amber-300 uppercase tracking-tight">
                  {heroBillboard.guaranteeBadgeSubtitle}
                </span>
              </div>
            </div>

            {/* Right Free Delivery item */}
            <div className="flex items-center gap-1.5 px-2 text-left">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Bike className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block text-xs sm:text-sm font-black text-emerald-400 leading-none">
                  {heroBillboard.freeDeliveryTitle}
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-neutral-300 uppercase tracking-tight">
                  {heroBillboard.freeDeliverySubtitle}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero 3 Product Trio Centerpiece matching screenshot */}
        <div className="relative z-10 w-full flex items-end justify-center gap-2 sm:gap-6 mt-4 sm:mt-6 mb-2 max-w-2xl px-2">
          {/* Left Hero Device: Smart Solar Screen / Hybrid Controller */}
          <div className="relative w-28 sm:w-40 md:w-48 transform -rotate-6 hover:rotate-0 transition-transform duration-500 drop-shadow-2xl">
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-2 sm:p-3 border border-indigo-400/40 shadow-2xl shadow-indigo-500/20">
              <div className="w-full aspect-[4/5] rounded-xl bg-gradient-to-b from-indigo-900/80 to-neutral-950 p-2 flex flex-col justify-between border border-indigo-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black text-indigo-300">SOLAR 48V</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full border-2 border-indigo-300/40 flex items-center justify-center relative bg-indigo-950/60 shadow-inner">
                  <div className="w-1 h-5 bg-amber-400 rounded-full origin-bottom transform rotate-45" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white absolute" />
                </div>
                <div className="text-center">
                  <span className="text-[9px] sm:text-[11px] font-black text-white block">{heroBillboard.leftProductTitle}</span>
                  <span className="text-[7px] sm:text-[8px] text-indigo-300">{heroBillboard.leftProductSubtitle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Main Flagship Product: Felicity / Growatt Orange/Gold Ultra LiFePO4 Inverter */}
          <div className="relative w-36 sm:w-52 md:w-60 z-20 transform scale-105 sm:scale-110 hover:scale-115 transition-transform duration-500 drop-shadow-2xl">
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-amber-500 via-orange-600 to-amber-700 p-2.5 sm:p-3.5 border-2 border-amber-300/80 shadow-2xl shadow-amber-500/40">
              <div className="w-full aspect-[3/4] rounded-xl sm:rounded-2xl bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 p-2.5 sm:p-3 flex flex-col justify-between border border-amber-400/50">
                <div className="flex items-center justify-center gap-2 pt-1">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  </div>
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  </div>
                </div>

                <div className="bg-neutral-900/90 rounded-lg p-2 border border-neutral-700 text-center">
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-amber-400 font-bold mb-1">
                    <span>LOAD: 94%</span>
                    <span>BAT: 51.2V</span>
                  </div>
                  <div className="h-4 w-full flex items-center justify-center gap-0.5">
                    <div className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <div className="w-1 h-4 bg-emerald-400 rounded-full" />
                    <div className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <div className="w-1 h-4 bg-amber-400 rounded-full" />
                    <div className="w-1 h-3 bg-amber-400 rounded-full" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-black text-white mt-1 block">
                    {heroBillboard.centerProductTag}
                  </span>
                </div>

                <div className="text-center pb-1">
                  <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-amber-400 uppercase">
                    {heroBillboard.centerProductTitle}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Device: Bifacial White Inverter Unit */}
          <div className="relative w-28 sm:w-40 md:w-48 transform rotate-6 hover:rotate-0 transition-transform duration-500 drop-shadow-2xl">
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-200 via-neutral-100 to-slate-300 p-2 sm:p-3 border border-white shadow-2xl shadow-sky-500/20">
              <div className="w-full aspect-[4/5] rounded-xl bg-gradient-to-b from-slate-900 to-neutral-950 p-2 flex flex-col justify-between border border-slate-700">
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-sky-400/20 border border-sky-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-sky-400" />
                  </div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-sky-400/20 border border-sky-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-sky-400" />
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[9px] sm:text-[11px] font-black text-white block">{heroBillboard.rightProductTitle}</span>
                  <span className="text-[7px] sm:text-[8px] text-sky-300">{heroBillboard.rightProductSubtitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Small *T&C APPLY Disclaimer */}
        <div className="relative z-10 w-full flex justify-end">
          <span className="text-[9px] text-neutral-500 font-mono tracking-wider">
            {heroBillboard.termsDisclaimer}
          </span>
        </div>
      </div>

      {/* 2. Dual Sub-Banners directly below main hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
        {/* Left Sub-Banner */}
        <div
          onClick={() => handleClick(subBanners.leftBanner.categoryLink || 'hybrid-inverters')}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#1b2333] via-[#101725] to-[#0a0f1d] border border-neutral-800 shadow-md hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 cursor-pointer p-4 sm:p-5 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] group"
        >
          <div className="relative z-10 text-center">
            <span className="text-xs text-neutral-300 block font-medium">
              {subBanners.leftBanner.topTag}
            </span>
            <h3 className="text-base sm:text-xl font-black text-amber-400 uppercase tracking-tight font-['Outfit',sans-serif]">
              {subBanners.leftBanner.title}
            </h3>

            <div className="inline-flex items-center gap-1.5 bg-neutral-900/90 border border-amber-400/40 rounded-md px-2.5 py-0.5 mt-1 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[9px] sm:text-[10px] font-black text-white">
                solarCare+ <span className="text-amber-400 font-bold">{subBanners.leftBanner.guaranteeText}</span>
              </span>
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-center gap-2 sm:gap-4 my-3">
            <div className="w-20 sm:w-28 rounded-lg bg-neutral-900 p-1.5 border border-neutral-700 transform -rotate-3 group-hover:rotate-0 transition-transform">
              <div className="aspect-[4/3] rounded bg-slate-800 flex flex-col items-center justify-center p-1 text-center">
                <span className="text-[9px] font-bold text-amber-400">3.2kW Solar</span>
                <span className="text-[7px] text-neutral-300">Pure Sine Wave</span>
              </div>
            </div>

            <div className="w-24 sm:w-36 rounded-lg bg-neutral-950 p-2 border-2 border-amber-400 transform scale-105 group-hover:scale-110 transition-transform shadow-lg">
              <div className="aspect-[4/3] rounded bg-blue-950/80 p-1 flex flex-col items-center justify-center text-center border border-blue-400/30">
                <span className="text-[10px] sm:text-xs font-black text-white">GROWATT 5kW</span>
                <span className="text-[8px] text-emerald-400 font-bold">● 100A MPPT</span>
              </div>
            </div>

            <div className="w-20 sm:w-28 rounded-lg bg-neutral-900 p-1.5 border border-neutral-700 transform rotate-3 group-hover:rotate-0 transition-transform">
              <div className="aspect-[4/3] rounded bg-slate-800 flex flex-col items-center justify-center p-1 text-center">
                <span className="text-[9px] font-bold text-sky-400">6kW Off-Grid</span>
                <span className="text-[7px] text-neutral-300">Dual Output</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex justify-center">
            <button
              type="button"
              className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-4 py-1 rounded-md text-xs font-black tracking-wider uppercase shadow-xs transition-transform group-hover:scale-105"
            >
              {subBanners.leftBanner.buttonText || 'Buy Now'}
            </button>
          </div>
        </div>

        {/* Right Sub-Banner */}
        <div
          onClick={() => handleClick(subBanners.rightBanner.categoryLink || 'lithium-batteries')}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#091f2c] via-[#081724] to-[#040c14] border border-neutral-800 shadow-md hover:shadow-xl hover:border-cyan-400/60 transition-all duration-300 cursor-pointer p-4 sm:p-5 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] group"
        >
          <div className="relative z-10 text-center">
            <span className="text-xs text-cyan-300 font-serif italic block">
              {subBanners.rightBanner.topScript}
            </span>
            <div className="flex items-center justify-center gap-1 my-0.5">
              <span className="text-base sm:text-lg font-black text-white font-['Outfit',sans-serif]">
                {subBanners.rightBanner.titleMain}<span className="text-amber-400">{subBanners.rightBanner.titleAccent}</span>
              </span>
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">
                {subBanners.rightBanner.titleTag}
              </span>
            </div>

            <div className="inline-block bg-cyan-400 text-neutral-950 font-black px-3 py-0.5 rounded text-[11px] sm:text-xs tracking-wider uppercase shadow-xs">
              {subBanners.rightBanner.discountBadge}
            </div>

            <div className="flex flex-col items-center gap-1 mt-1.5">
              <span className="text-[10px] sm:text-[11px] font-bold text-cyan-200 bg-cyan-950/80 border border-cyan-800/80 px-2 py-0.5 rounded">
                {subBanners.rightBanner.bengaliTag}
              </span>
              <span className="text-[9px] sm:text-[10px] text-neutral-300 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full border border-neutral-700">
                <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                <span>{subBanners.rightBanner.locationText}</span>
              </span>
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-center gap-1.5 sm:gap-2.5 my-2">
            <div className="w-12 sm:w-16 rounded bg-slate-900 p-1 border border-neutral-700 text-center">
              <div className="aspect-[1/2] bg-neutral-800 rounded flex flex-col items-center justify-center p-0.5">
                <div className="w-4 h-4 rounded-full bg-cyan-400/20 border border-cyan-400 mb-1" />
                <span className="text-[6px] text-neutral-300 font-bold">DC Fan</span>
              </div>
            </div>

            <div className="w-16 sm:w-20 rounded bg-neutral-950 p-1 border border-cyan-400 text-center">
              <div className="aspect-[4/3] bg-cyan-950 rounded flex flex-col items-center justify-center p-0.5">
                <span className="text-[8px] font-black text-cyan-300">51.2V 100Ah</span>
                <span className="text-[6px] text-white">Powerwall</span>
              </div>
            </div>

            <div className="w-20 sm:w-28 rounded bg-neutral-900 p-1.5 border border-neutral-700 text-center">
              <div className="aspect-[16/10] bg-slate-900 rounded flex flex-col items-center justify-center p-0.5">
                <span className="text-[8px] sm:text-[9px] font-black text-amber-400">SMART SOLAR</span>
                <span className="text-[6px] text-neutral-400">Hybrid Hub</span>
              </div>
            </div>

            <div className="w-12 sm:w-16 rounded bg-slate-900 p-1 border border-neutral-700 text-center">
              <div className="aspect-[1/2] bg-slate-800 rounded flex flex-col items-center justify-center p-0.5">
                <div className="w-4 h-4 rounded-full bg-white/20 border border-white mb-1" />
                <span className="text-[6px] text-neutral-300 font-bold">Solar UPS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSlider;
