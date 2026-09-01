import React, { useState } from 'react';
import { X, Heart, Share2, Shield, Zap, Truck, Check, Eye, ChevronRight, ChevronLeft, Award, Sparkles, Phone, CreditCard, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, options?: { capacity?: string; color?: string; carePlanId?: string; includeBundle?: boolean }) => void;
  onBuyNow: (product: Product, options?: { capacity?: string; color?: string; carePlanId?: string; includeBundle?: boolean }) => void;
  allProducts: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  allProducts,
  wishlist,
  onToggleWishlist
}) => {
  if (!product) return null;

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState(product.capacityVariants?.[0] || 'Standard');
  const [selectedVoltage, setSelectedVoltage] = useState(product.voltageVariants?.[0] || 'Hybrid / Off-Grid');
  const [selectedColor, setSelectedColor] = useState(product.colorVariants?.[0]?.name || 'Standard');
  const [includeBundle, setIncludeBundle] = useState(false);
  const [selectedCarePlan, setSelectedCarePlan] = useState<string | null>(null);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [activeTab, setActiveTab] = useState<'spec' | 'desc'>('spec');
  const [copiedLink, setCopiedLink] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  // Dynamic price calculation with care plans & bundle
  let calculatedPrice = product.price;
  if (includeBundle && product.bundleOffer) {
    calculatedPrice += product.bundleOffer.offerPrice;
  }
  if (selectedCarePlan && product.carePlans) {
    const plan = product.carePlans.find(p => p.id === selectedCarePlan);
    if (plan) calculatedPrice += plan.price;
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedProducts = allProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top Close Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 truncate max-w-[80%]">
            <span className="text-neutral-400">Home</span>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-400 capitalize">{product.category.replace('-', ' ')}</span>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="font-semibold text-neutral-800 truncate">{product.name}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body matching video (01:25 - 01:32) */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Product Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left: Gallery matching video */}
            <div className="md:col-span-6 space-y-3">
              {/* Main Image Stage with zoom look & tag */}
              <div className="relative aspect-square w-full rounded-2xl bg-neutral-100/70 border border-neutral-200/80 p-4 sm:p-6 flex items-center justify-center overflow-hidden">
                {product.discountPercent > 0 && (
                  <div className="absolute top-3 left-3 z-10 bg-amber-400 text-neutral-950 font-black text-xs px-2.5 py-1 rounded shadow-xs">
                    {product.discountPercent}% OFF
                  </div>
                )}

                <img
                  src={product.images[selectedImageIdx] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                />

                {/* SolarCare+ Badge on Bottom */}
                <div className="absolute bottom-2.5 left-3 right-3 bg-neutral-900/90 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg flex items-center justify-between backdrop-blur-xs">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Shield className="w-3.5 h-3.5" />
                    SolarCare+ Official 2 Year Guarantee
                  </span>
                  <span className="text-amber-300 font-bold">+</span>
                </div>
              </div>

              {/* Thumbnails list */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-16 h-16 rounded-xl border-2 p-1 bg-white overflow-hidden shrink-0 transition-all ${
                        selectedImageIdx === idx
                          ? 'border-amber-500 ring-2 ring-amber-400/20'
                          : 'border-neutral-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Options matching video */}
            <div className="md:col-span-6 space-y-4">
              {/* Brand & Action icons row */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">
                  Brand: {product.brand}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition-colors relative"
                    title="Share product link"
                  >
                    <Share2 className="w-4 h-4" />
                    {copiedLink && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] py-0.5 px-1.5 rounded whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-2 rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors ${
                      isWishlisted ? 'text-red-500 bg-red-50' : 'text-neutral-600'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-lg sm:text-2xl font-extrabold text-neutral-950 font-['Outfit',sans-serif] leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 sm:p-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs uppercase font-bold text-neutral-500">Offer Price:</span>
                  <span className="text-2xl sm:text-3xl font-black text-neutral-950">
                    ৳ {calculatedPrice.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm sm:text-base text-neutral-400 line-through">
                      ৳ {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-600 mt-1 font-medium">
                  Cash / Card / bKash / EMI Payment Available
                </p>
              </div>

              {/* Live Viewers banner matching video (01:26) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-neutral-100 py-1.5 px-3 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <Eye className="w-4 h-4 text-neutral-600" />
                <span>50+ people viewing this solar product right now</span>
              </div>

              {/* Special Offer Perks List matching video (01:26) */}
              <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200/80 space-y-1.5 text-xs text-neutral-800">
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-emerald-600">✔</span>
                  <span><strong>Free DC Solar Breaker & MC4 Connectors</strong> included in box</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-amber-600">⚡</span>
                  <span>Get an Extra <strong>BDT 4,000 Discount</strong> with SolarCare+ Bundle</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-emerald-600">✔</span>
                  <span><strong>BDT 5,000 Exchange Bonus</strong> with Old IPS / Battery Trade In</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-sky-600">💳</span>
                  <span><strong>12 Month EMI at 0% Interest</strong> | Available with 18+ Banks</span>
                </div>
              </div>

              {/* Variant Selectors matching video (01:27) */}
              {product.capacityVariants && product.capacityVariants.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                    Capacity / Model Variant:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.capacityVariants.map((cap, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedCapacity(cap)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                          selectedCapacity === cap
                            ? 'bg-neutral-900 text-amber-400 border-neutral-900 shadow-xs'
                            : 'bg-white text-neutral-800 border-neutral-300 hover:border-amber-400'
                        }`}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color variant if applicable */}
              {product.colorVariants && product.colorVariants.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                    Finish / Color: <span className="font-semibold text-neutral-900">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colorVariants.map((c, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border transition-all ${
                          selectedColor === c.name
                            ? 'border-amber-500 bg-amber-50 font-bold'
                            : 'border-neutral-200 bg-white'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-neutral-300"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Minimum Booking & Purchase Points matching video (01:28) */}
              <div className="grid grid-cols-3 gap-2 bg-neutral-100/80 p-2.5 rounded-xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Min Booking</span>
                  <strong className="text-neutral-900">৳ {product.minBooking?.toLocaleString() || '2,000'}</strong>
                </div>
                <div className="border-x border-neutral-200">
                  <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Purchase Points</span>
                  <strong className="text-amber-600">{product.purchasePoints || 100} Points</strong>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block font-semibold">EMI Available</span>
                  <strong className="text-emerald-700">0% Interest</strong>
                </div>
              </div>

              {/* Buy More Save More Bundle Checkbox matching video (01:29) */}
              {product.bundleOffer && (
                <div className="bg-neutral-900 text-white rounded-xl p-3.5 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Buy More Save More!
                    </span>
                    <span className="text-[10px] bg-emerald-500 text-neutral-950 font-extrabold px-1.5 py-0.5 rounded">
                      SAVE ৳{product.bundleOffer.saveAmount}
                    </span>
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBundle}
                      onChange={(e) => setIncludeBundle(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-400"
                    />
                    <div className="text-xs">
                      <span className="font-semibold block text-neutral-200">
                        {product.bundleOffer.name}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <strong className="text-amber-400">৳ {product.bundleOffer.offerPrice}</strong>
                        <span className="text-neutral-400 line-through text-[10px]">
                          ৳ {product.bundleOffer.originalPrice}
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              )}

              {/* SolarCare+ Warranty Package Tier Selection matching video (01:29) */}
              {product.carePlans && product.carePlans.length > 0 && (
                <div className="border border-neutral-200 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-amber-500" />
                      SolarCare+ Extended Protection
                    </span>
                    <span className="text-[10px] text-neutral-500 font-semibold">Optional</span>
                  </div>

                  <div className="space-y-2">
                    {product.carePlans.map((plan) => {
                      const isSelected = selectedCarePlan === plan.id;
                      return (
                        <label
                          key={plan.id}
                          className={`flex items-start justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-400'
                              : 'bg-white border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          <div className="flex items-start gap-2 max-w-[75%]">
                            <input
                              type="radio"
                              name="carePlan"
                              checked={isSelected}
                              onChange={() => setSelectedCarePlan(isSelected ? null : plan.id)}
                              onClick={() => {
                                if (isSelected) setSelectedCarePlan(null);
                              }}
                              className="mt-0.5 text-amber-600 focus:ring-amber-500 accent-amber-500"
                            />
                            <div className="text-xs">
                              <strong className="text-neutral-900 block">{plan.name}</strong>
                              <span className="text-[11px] text-neutral-500">{plan.desc}</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-amber-700 whitespace-nowrap">
                            + ৳ {plan.price.toLocaleString()}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Agree Terms Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-600">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400 accent-amber-500"
                />
                <span>I agree to Solarstock's warranty terms & delivery conditions</span>
              </label>

              {/* Big Action Buttons: ADD TO CART & BUY NOW matching video (01:30) */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, {
                      capacity: selectedCapacity,
                      color: selectedColor,
                      carePlanId: selectedCarePlan || undefined,
                      includeBundle
                    });
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                >
                  <span>ADD TO CART</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onBuyNow(product, {
                      capacity: selectedCapacity,
                      color: selectedColor,
                      carePlanId: selectedCarePlan || undefined,
                      includeBundle
                    });
                  }}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-neutral-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-amber-400/30 transition-all active:scale-[0.99]"
                >
                  <span>BUY NOW</span>
                </button>
              </div>

              {/* Badges row: In Stock & Warranty matching video (01:30) */}
              <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-100 text-neutral-800 font-semibold">
                  <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="block text-[11px] font-bold">In Stock</span>
                    <span className="text-[10px] text-neutral-500">Fast 24-48h Delivery</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-100 text-neutral-800 font-semibold">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="block text-[11px] font-bold">{product.warranty.split(' ')[0]} Official</span>
                    <span className="text-[10px] text-neutral-500">Genuine Factory Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Specifications & Descriptions matching video (01:32) */}
          <div className="pt-6 border-t border-neutral-200">
            {/* Tabs Header */}
            <div className="flex items-center gap-4 border-b border-neutral-200 mb-4">
              <button
                onClick={() => setActiveTab('spec')}
                className={`pb-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'spec'
                    ? 'border-amber-500 text-amber-600 font-extrabold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'desc'
                    ? 'border-amber-500 text-amber-600 font-extrabold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Description & Highlights
              </button>
            </div>

            {/* Specification Table */}
            {activeTab === 'spec' && (
              <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden text-xs">
                <table className="w-full text-left divide-y divide-neutral-200">
                  <tbody className="divide-y divide-neutral-100">
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-neutral-50/50' : 'bg-white'}>
                        <td className="py-2.5 px-4 font-bold text-neutral-700 w-1/3 border-r border-neutral-100">
                          {key}
                        </td>
                        <td className="py-2.5 px-4 text-neutral-900 font-medium">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Description Tab */}
            {activeTab === 'desc' && (
              <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed bg-neutral-50/60 p-4 rounded-xl border border-neutral-200/80">
                <p>{product.description}</p>
                {product.highlights && (
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-2 uppercase text-xs tracking-wider">
                      Key Highlights:
                    </h4>
                    <ul className="space-y-1.5">
                      {product.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Related Products matching video (01:31) */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-neutral-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm sm:text-base font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
                  Related Products
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedProducts.map((rel) => (
                  <ProductCard
                    key={rel.id}
                    product={rel}
                    onViewDetails={() => {}}
                    onAddToCart={(p) => onAddToCart(p)}
                    isWishlisted={wishlist.includes(rel.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
