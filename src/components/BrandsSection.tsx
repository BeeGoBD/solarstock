import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { BRANDS } from '../data/mockData';

interface BrandsSectionProps {
  onSelectBrand: (brandName: string) => void;
  onSeeAll: () => void;
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ onSelectBrand, onSeeAll }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Section Header matching video (00:18) */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-xl font-extrabold text-neutral-950 font-['Outfit',sans-serif] tracking-tight">
            Shop By Brands
          </h2>
          <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold px-2 py-0.5 rounded-full hidden sm:inline-block">
            Authorized Tier-1 Partners
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded-full bg-white border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center text-neutral-600 shadow-2xs transition-colors"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded-full bg-white border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center text-neutral-600 shadow-2xs transition-colors"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onSeeAll}
            className="text-xs font-bold text-neutral-600 hover:text-amber-600 bg-neutral-100 hover:bg-amber-100 px-3 py-1.5 rounded-md transition-colors uppercase tracking-wider ml-1"
          >
            SEE ALL
          </button>
        </div>
      </div>

      {/* Brands Slider matching video */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1.5 scroll-smooth"
      >
        {BRANDS.map((brand, idx) => (
          <button
            key={idx}
            onClick={() => onSelectBrand(brand.name)}
            className="flex-shrink-0 min-w-[130px] sm:min-w-[160px] h-16 sm:h-20 bg-white hover:bg-amber-50/60 border border-neutral-200 hover:border-amber-400 rounded-xl flex items-center justify-center p-3 shadow-2xs hover:shadow-xs transition-all group"
          >
            <span className="text-xs sm:text-sm font-extrabold tracking-tight text-neutral-800 group-hover:text-amber-600 font-['Outfit',sans-serif] text-center">
              {brand.logo}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
