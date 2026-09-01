import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface RecentlyAddedSectionProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onSeeAll: () => void;
}

export const RecentlyAddedSection: React.FC<RecentlyAddedSectionProps> = ({
  products,
  onViewDetails,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onSeeAll
}) => {
  // Take next batch of items
  const recentProducts = products.slice(4, 8);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Header matching video (00:12) */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-xl font-extrabold text-neutral-950 font-['Outfit',sans-serif] tracking-tight">
            Recently Added
          </h2>
          <span className="bg-emerald-100 text-emerald-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full hidden sm:inline-block">
            New Models 2026
          </span>
        </div>
        <button
          onClick={onSeeAll}
          className="text-xs font-bold text-neutral-600 hover:text-amber-600 bg-neutral-100 hover:bg-amber-100 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 uppercase tracking-wider"
        >
          <span>SEE ALL</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {recentProducts.map((product) => (
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
