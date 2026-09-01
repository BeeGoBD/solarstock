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

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Flash Sale Header Bar matching video (00:09) */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 rounded-xl p-3 sm:p-4 mb-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-2.5 text-neutral-950">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-950 text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
            <Flame className="w-4 h-4 fill-amber-400" />
          </div>
          <div>
            <h2 className="text-xs sm:text-base font-extrabold tracking-tight font-['Outfit',sans-serif]">
              {flashSaleConfig.title}
            </h2>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] sm:text-xs font-semibold text-neutral-900">
              <Clock className="w-3.5 h-3.5" />
              <span>{flashSaleConfig.subtitle}</span>
            </div>
          </div>
        </div>

        {/* Countdown Timer Display */}
        <div className="flex items-center gap-1.5 bg-neutral-950 text-white px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold shadow-xs">
          <span className="text-[10px] text-amber-400 uppercase mr-1">Ends in:</span>
          <span className="bg-neutral-800 px-1.5 py-0.5 rounded text-amber-300">
            {String(timeLeft.hours).padStart(2, '0')}h
          </span>
          <span>:</span>
          <span className="bg-neutral-800 px-1.5 py-0.5 rounded text-amber-300">
            {String(timeLeft.minutes).padStart(2, '0')}m
          </span>
          <span>:</span>
          <span className="bg-neutral-800 px-1.5 py-0.5 rounded text-amber-400 animate-pulse">
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
