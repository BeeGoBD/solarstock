import React, { useState } from 'react';
import { ChevronRight, Calendar, Sparkles, Tag, ArrowRight, CheckCircle2, Gift } from 'lucide-react';

interface OffersViewProps {
  onBackToHome: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export const OffersView: React.FC<OffersViewProps> = ({ onBackToHome, onSelectCategory }) => {
  const [claimedCoupon, setClaimedCoupon] = useState<string | null>(null);

  const campaigns = [
    {
      id: 'camp-0',
      dateRange: '01 AUG, 2026 - 31 OCT, 2026',
      title: 'Beat The Clock ⚡ SolarStock LiFePO4 Portable Power Stations (20% Flat Discount!) 🔥',
      branchTag: 'Solarstock BD Online & In-Store Hotline: +8801306-061919',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
      category: 'ips-systems',
      coupon: 'BEATCLOCK20',
      discount: 'Flat 20% OFF on NEOZL 300W, GP 1000, GP 600, YOUYO R100 & NEO 600L'
    },
    {
      id: 'camp-1',
      dateRange: '12 APR, 2026 - 30 SEP, 2026',
      title: 'Now cheaper than ever ⚡ Solar Hybrid Inverters with brand replacement guarantee 🔥',
      branchTag: 'Solarstock Flagship - Bashundhara City & Jamuna Future Park',
      image: 'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80',
      category: 'hybrid-inverters',
      coupon: 'SOLAR2026',
      discount: '5% Extra Off on all Growatt & Deye Inverters'
    },
    {
      id: 'camp-2',
      dateRange: '01 MAY, 2026 - 31 DEC, 2026',
      title: 'Lithium Powerwall Upgrade Mega Fest ~ Exchange Your Old IPS Battery for ৳5,000 Bonus! 🔋',
      branchTag: 'All 8+ Solarstock Experience Centers Nationwide',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      category: 'lithium-batteries',
      coupon: 'POWERWALL',
      discount: 'Up to ৳5,000 Trade-in bonus + Free Installation'
    },
    {
      id: 'camp-3',
      dateRange: '15 JUN, 2026 - 15 NOV, 2026',
      title: 'Bifacial Solar Rooftop Package: Free 50m Solar Cable + MC4 Connectors with 4x 585W Panels ☀️',
      branchTag: 'Nationwide Online & In-Store Corporate',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      category: 'solar-panels',
      coupon: 'FREEFREIGHT',
      discount: 'Free Shipping + Free MC4 & DC Breaker Box'
    }
  ];

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code);
    setClaimedCoupon(code);
    setTimeout(() => setClaimedCoupon(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 animate-in fade-in">
      {/* Breadcrumb matching video (00:39) */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
        <button onClick={onBackToHome} className="hover:text-amber-600 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-neutral-900">Offers</span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
          <Gift className="w-3.5 h-3.5" />
          <span>Active Solar Deals</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
          Promotional Campaigns & Coupons
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Save more with seasonal exchange bonuses, coupon codes, and bundle offers.
        </p>
      </div>

      {/* Campaigns list matching video (00:39) */}
      <div className="space-y-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden hover:shadow-md transition-all group"
          >
            {/* Banner Top Graphic */}
            <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-neutral-900 overflow-hidden">
              <img
                src={camp.image}
                alt={camp.title}
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="bg-amber-400 text-neutral-950 font-black px-2.5 py-0.5 rounded text-[10px] uppercase">
                  ACTIVE CAMPAIGN
                </span>
                <span className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  {camp.dateRange}
                </span>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="p-5 space-y-4">
              <div>
                <h2 className="text-base sm:text-xl font-extrabold text-neutral-950 font-['Outfit',sans-serif] group-hover:text-amber-600 transition-colors">
                  {camp.title}
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  {camp.branchTag}
                </p>
              </div>

              {/* Coupon card */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
                <div className="flex items-center gap-2 text-xs">
                  <Tag className="w-4 h-4 text-amber-500" />
                  <span className="text-neutral-700 font-medium">{camp.discount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black bg-white px-2.5 py-1 border border-neutral-300 rounded text-amber-700">
                    {camp.coupon}
                  </span>
                  <button
                    onClick={() => handleCopyCoupon(camp.coupon)}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white px-3 py-1 rounded text-xs font-bold transition-colors"
                  >
                    {claimedCoupon === camp.coupon ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                <button
                  onClick={() => onSelectCategory(camp.category)}
                  className="text-xs font-extrabold text-neutral-950 hover:text-amber-600 uppercase tracking-wider flex items-center gap-1"
                >
                  <span>SEE DETAILS</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSelectCategory(camp.category)}
                  className="bg-amber-400 hover:bg-amber-500 text-neutral-950 text-xs font-extrabold px-4 py-2 rounded-xl transition-all shadow-xs"
                >
                  Shop Offer Products
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
