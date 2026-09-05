import React, { useState, useEffect } from 'react';
import { Flame, Clock } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

interface FlashSaleSectionProps {
  products?: Product[];
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({
  onViewDetails,
  onAddToCart,
  wishlist,
  onToggleWishlist
}) => {
  const { flashSaleConfig, products } = useStore();

  // Color cycling state every 2 seconds (Yellow and Black themes)
  const [colorThemeIndex, setColorThemeIndex] = useState(0);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setColorThemeIndex((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(cycleInterval);
  }, []);

  // Initialize countdown from store configuration
  const [timeLeft, setTimeLeft] = useState({
    hours: flashSaleConfig.countdownHours || 14,
    minutes: flashSaleConfig.countdownMinutes || 32,
    seconds: flashSaleConfig.countdownSeconds || 48
  });

  useEffect(() => {
    setTimeLeft({
      hours: flashSaleConfig.countdownHours || 14,
      minutes: flashSaleConfig.countdownMinutes || 32,
      seconds: flashSaleConfig.countdownSeconds || 48
    });
  }, [flashSaleConfig.countdownHours, flashSaleConfig.countdownMinutes, flashSaleConfig.countdownSeconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products that are in activeProductIds
  const flashSaleProducts = products.filter((p) =>
    flashSaleConfig.activeProductIds.includes(p.id)
  );

  // Fallback if none selected
  const displayProducts = flashSaleProducts.length > 0
    ? flashSaleProducts
    : products.filter((p) => p.isHot || p.discountPercent >= 20).slice(0, 5);

  // Dynamic style sets for yellow & black 2-second automatic color cycling
  const colorThemes = [
    // Theme 0: Vivid Yellow Primary with Deep Black Accents
    {
      banner: 'bg-amber-400 text-neutral-950 border-amber-300 shadow-md shadow-amber-400/20',
      flameBg: 'bg-neutral-950 text-amber-400',
      flameIcon: 'fill-amber-400 text-amber-400',
      title: 'text-neutral-950',
      subtitle: 'text-neutral-900',
      countdownBox: 'bg-neutral-950 text-amber-400 border border-neutral-800 shadow-xs',
      countdownDigits: 'bg-neutral-900 text-amber-300',
      tag: 'bg-neutral-950 text-amber-400'
    },
    // Theme 1: Deep Black Onyx Primary with Neon Yellow Glow
    {
      banner: 'bg-neutral-950 text-amber-400 border-2 border-amber-400 shadow-lg shadow-amber-400/20',
      flameBg: 'bg-amber-400 text-neutral-950',
      flameIcon: 'fill-neutral-950 text-neutral-950',
      title: 'text-amber-400',
      subtitle: 'text-amber-200/90',
      countdownBox: 'bg-amber-400 text-neutral-950 shadow-md',
      countdownDigits: 'bg-neutral-950 text-amber-400',
      tag: 'bg-amber-400 text-neutral-950'
    },
    // Theme 2: Gold-Yellow Metallic Gradient with Black Contours
    {
      banner: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 text-neutral-950 shadow-md shadow-yellow-500/25',
      flameBg: 'bg-black text-amber-300',
      flameIcon: 'fill-amber-400 text-amber-400',
      title: 'text-neutral-950',
      subtitle: 'text-neutral-800',
      countdownBox: 'bg-neutral-900 text-white border border-neutral-700 shadow-xs',
      countdownDigits: 'bg-neutral-800 text-amber-300',
      tag: 'bg-black text-amber-400'
    },
    // Theme 3: High-contrast Obsidian Black with Bold Gold Highlights
    {
      banner: 'bg-neutral-900 text-white border border-amber-400/60 shadow-lg shadow-black/40',
      flameBg: 'bg-amber-400 text-neutral-950',
      flameIcon: 'fill-neutral-950 text-neutral-950',
      title: 'text-white',
      subtitle: 'text-amber-400',
      countdownBox: 'bg-amber-400 text-neutral-950 shadow-xs',
      countdownDigits: 'bg-neutral-900 text-amber-300',
      tag: 'bg-amber-400 text-neutral-950'
    }
  ];

  const currentTheme = colorThemes[colorThemeIndex];

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Flash Sale Header Bar with 2-second automatic Yellow/Black cycling */}
      <div
        className={`rounded-xl p-3 sm:p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 transition-all duration-700 ease-in-out ${currentTheme.banner}`}
      >
        <div className="flex items-center gap-2 text-center sm:text-left">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-colors duration-700 ${currentTheme.flameBg}`}
          >
            <Flame className={`w-4 h-4 transition-colors duration-700 ${currentTheme.flameIcon}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h2
                className={`text-xs sm:text-base font-extrabold tracking-tight font-['Outfit',sans-serif] transition-colors duration-700 ${currentTheme.title}`}
              >
                {flashSaleConfig.title}
              </h2>
              <span
                className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full transition-colors duration-700 ${currentTheme.tag}`}
              >
                ⚡ Live Deals
              </span>
            </div>
            <div
              className={`flex items-center justify-center sm:justify-start gap-1.5 text-[11px] sm:text-xs font-semibold transition-colors duration-700 ${currentTheme.subtitle}`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{flashSaleConfig.subtitle}</span>
            </div>
          </div>
        </div>

        {/* Countdown Timer Display */}
        <div
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-700 ${currentTheme.countdownBox}`}
        >
          <span className="text-[10px] uppercase mr-1">Ends in:</span>
          <span
            className={`px-1.5 py-0.5 rounded transition-colors duration-700 ${currentTheme.countdownDigits}`}
          >
            {String(timeLeft.hours).padStart(2, '0')}h
          </span>
          <span>:</span>
          <span
            className={`px-1.5 py-0.5 rounded transition-colors duration-700 ${currentTheme.countdownDigits}`}
          >
            {String(timeLeft.minutes).padStart(2, '0')}m
          </span>
          <span>:</span>
          <span
            className={`px-1.5 py-0.5 rounded animate-pulse transition-colors duration-700 ${currentTheme.countdownDigits}`}
          >
            {String(timeLeft.seconds).padStart(2, '0')}s
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {displayProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
            onAddToCart={onAddToCart}
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </section>
  );
};
export default FlashSaleSection;
