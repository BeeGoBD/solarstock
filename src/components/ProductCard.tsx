import React from 'react';
import { Heart, Maximize2, ShoppingBag, Check, Shield } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist
}) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs hover:shadow-md hover:border-amber-400/80 transition-all flex flex-col justify-between overflow-hidden group">
      {/* Top Image Container matching video */}
      <div className="relative aspect-square w-full bg-neutral-900/5 p-2 sm:p-2.5 flex items-center justify-center overflow-hidden">
        {/* Discount Badge (Top-Left) */}
        {product.discountPercent > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-amber-400 text-neutral-950 font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-sm shadow-xs">
            {product.discountPercent}% OFF
          </div>
        )}

        {/* Hot / Selling Tag (Top-Right) */}
        {product.tag && (
          <div className="absolute top-2 right-2 z-10 bg-neutral-900 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-xs">
            {product.tag === 'Hot Product' && <span>🔥</span>}
            {product.tag === 'Top Selling' && <span>🏆</span>}
            {product.tag === 'Beat The Clock' && <span>⚡</span>}
            <span>{product.tag}</span>
          </div>
        )}

        {/* Wishlist & Quick Zoom buttons on Right Edge */}
        <div className="absolute right-2 top-8 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleWishlist) onToggleWishlist(product.id);
            }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-xs border border-neutral-200 flex items-center justify-center shadow-xs transition-colors ${
              isWishlisted ? 'text-red-500 bg-red-50' : 'text-neutral-600 hover:text-red-500'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-xs border border-neutral-200 text-neutral-600 hover:text-amber-600 flex items-center justify-center shadow-xs transition-colors"
            title="Quick View"
          >
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          onClick={() => onViewDetails(product)}
          className="w-full h-full object-contain rounded-lg cursor-pointer group-hover:scale-105 transition-transform duration-300 shadow-2xs gpu-accelerated"
          loading="lazy"
          decoding="async"
        />

        {/* SolarCare+ Warranty Badge at Bottom of Image */}
        <div className="absolute bottom-1 left-2 right-2 bg-neutral-950/85 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-semibold py-0.5 px-2 rounded flex items-center justify-between pointer-events-none">
          <span className="flex items-center gap-1 text-amber-400">
            <Shield className="w-2.5 h-2.5" />
            SolarCare+
          </span>
          <span className="text-neutral-300">2 Year Guarantee</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand Name */}
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            {product.brand}
          </span>

          {/* Product Title */}
          <h3
            onClick={() => onViewDetails(product)}
            className="text-xs sm:text-sm font-bold text-neutral-900 hover:text-amber-600 cursor-pointer line-clamp-2 leading-snug mb-2 transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        <div>
          {/* Price Block matching video */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-sm sm:text-base font-extrabold text-neutral-950">
              ৳ {product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through">
                ৳ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Two Buttons: VIEW and ADD TO CART matching video */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => onViewDetails(product)}
              className="w-full py-2 px-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-100 text-neutral-900 text-[11px] sm:text-xs font-bold transition-colors text-center"
            >
              VIEW
            </button>
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="w-full py-2 px-1.5 rounded-lg bg-neutral-900 hover:bg-amber-500 text-white hover:text-neutral-950 text-[11px] sm:text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-xs"
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>ADD TO CART</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
