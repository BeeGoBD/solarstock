import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sun,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { SolarInverterFlow } from './SolarInverterFlow';
import flagshipSolarArray from '../assets/images/flagship_solar_array_1788247199655.jpg';
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
  // 1. Top Main Hero Slider State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = 4;
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      id: 0,
      image: flagshipSolarArray,
      alt: 'Next-Generation Smart Solar Energy Showroom',
      tag: 'SMART SOLAR ARCHITECTURE',
      tagIcon: Zap,
      title: 'Next-Generation Solar Energy Systems',
      subtitle: 'Pure Sine Wave Hybrid Inverters & LiFePO4 Battery Storage for 24/7 Power Freedom.',
      badge: 'Up to 90% Bill Savings',
      category: 'hybrid-inverters',
      buttonText: 'Explore Solar Systems'
    },
    {
      id: 1,
      image: rooftopSolarHome,
      alt: 'Modern Rooftop Solar Home under Sunny Sky',
      tag: 'RESIDENTIAL ROOFTOP',
      tagIcon: Sun,
      title: 'Power Your Home From Your Own Roof',
      subtitle: 'Sleek monocrystalline rooftop installations engineered for 25+ years of silent, zero-emission electricity.',
      badge: '25-Year Linear Warranty',
      category: 'solar-packages',
      buttonText: 'View Rooftop Packages'
    },
    {
      id: 2,
      image: familySolarLiving,
      alt: 'Family Relaxing in Solar Powered Living Room',
      tag: '24/7 UNINTERRUPTED LIVING',
      tagIcon: Sparkles,
      title: 'Zero Load Shedding, Pure Family Comfort',
      subtitle: 'Instant zero-millisecond power transfer keeps lights, fans, WiFi, and refrigerators running continuously.',
      badge: '100% Silent & Safe LiFePO4',
      category: 'lithium-batteries',
      buttonText: 'Discover Home Backup'
    },
    {
      id: 3,
      image: travelPortableSolar,
      alt: 'Friends Camping Powered by Portable Solar Generator',
      tag: 'OFF-GRID & ADVENTURE',
      tagIcon: Compass,
      title: 'Take Limitless Solar Anywhere Under the Sky',
      subtitle: 'Lightweight LiFePO4 portable power stations and folding solar panels for travel, camping & field work.',
      badge: '220V Pure Sine Output',
      category: 'ips-systems',
      buttonText: 'Explore Portable Power'
    }
  ];

  // Top Hero Carousel timer (5.0 seconds per slide)
  useEffect(() => {
    if (isPaused) return;

    slideTimerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

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
      {/* 1. Main Top Hero Slider Container - Full-Bleed Picture Canvas */}
      <div
        className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-neutral-800/40 select-none group h-[320px] sm:h-[380px] md:h-[420px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, idx) => {
          const TagIcon = slide.tagIcon;
          const isActive = activeSlide === idx;

          return (
            <div
              key={slide.id}
              onClick={() => handleClick(slide.category)}
              className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Full-Bleed Photographic Background */}
              <img
                src={slide.image}
                alt={slide.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Multilayered Gradient Overlay for Text Legibility & Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

              {/* Minimalist Floating Text Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-8 md:p-10 max-w-2xl">
                {/* Floating Tag & Badge */}
                <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-amber-400 text-neutral-950 font-black px-3 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider backdrop-blur-md shadow-sm">
                    <TagIcon className="w-3.5 h-3.5" />
                    {slide.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-black/60 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold backdrop-blur-md">
                    <ShieldCheck className="w-3 h-3" />
                    {slide.badge}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-xl sm:text-3xl md:text-4xl font-black font-['Outfit',sans-serif] text-white tracking-tight leading-tight drop-shadow-md mb-1.5 sm:mb-2">
                  {slide.title}
                </h2>

                {/* Subtitle / Short Description */}
                <p className="text-xs sm:text-sm md:text-base text-neutral-200 line-clamp-2 leading-relaxed drop-shadow-sm mb-4 max-w-xl font-medium">
                  {slide.subtitle}
                </p>

                {/* Floating Action Button */}
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-amber-400/20 group-hover:translate-x-1">
                    {slide.buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* SIDE NAVIGATION: Left & Right Glassmorphic Carousel Buttons */}
        <button
          type="button"
          onClick={handlePrevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-amber-400 hover:text-neutral-950 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-lg z-30"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onClick={handleNextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-amber-400 hover:text-neutral-950 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-lg z-30"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-3 right-4 sm:right-8 flex items-center gap-2 z-30 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-md">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. Dual Sub-Banners (2nd Modern Slide & 3rd Modern Slide) - Solar Inverter Flow */}
      <div className="mt-3 sm:mt-3.5">
        <SolarInverterFlow />
      </div>
    </section>
  );
};
export default HeroSlider;
