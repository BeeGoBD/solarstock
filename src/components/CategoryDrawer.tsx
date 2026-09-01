import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, Sun, Zap, Cpu, BatteryCharging, Battery, Sliders, Lightbulb, Droplets, Wrench, ShieldAlert, Radio, Layers, Gift, PackageCheck, PhoneCall } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryId: string, subCategory?: string) => void;
  onOpenOrderTracking: () => void;
}

export const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenOrderTracking
}) => {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleExpand = (catId: string) => {
    setExpandedCat(expandedCat === catId ? null : catId);
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'solar-panels': return <Sun className="w-4 h-4 text-amber-500" />;
      case 'hybrid-inverters': return <Cpu className="w-4 h-4 text-amber-500" />;
      case 'ips-systems': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'lithium-batteries': return <BatteryCharging className="w-4 h-4 text-amber-500" />;
      case 'tubular-batteries': return <Battery className="w-4 h-4 text-amber-500" />;
      case 'charge-controllers': return <Sliders className="w-4 h-4 text-amber-500" />;
      case 'solar-street-lights': return <Lightbulb className="w-4 h-4 text-amber-500" />;
      case 'solar-pumps': return <Droplets className="w-4 h-4 text-amber-500" />;
      case 'solar-accessories': return <Wrench className="w-4 h-4 text-amber-500" />;
      case 'portable-power': return <ShieldAlert className="w-4 h-4 text-amber-500" />;
      case 'grid-tie-inverters': return <Radio className="w-4 h-4 text-amber-500" />;
      case 'solar-structures': return <Layers className="w-4 h-4 text-amber-500" />;
      default: return <Sun className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-left duration-200">
        {/* Drawer Header matching video */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-400 rounded-md flex items-center justify-center shadow-xs">
              <Sun className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-neutral-950 font-['Outfit',sans-serif]">
              solar<span className="text-amber-500">stock</span>
              <span className="text-xs font-semibold align-super ml-0.5 text-neutral-500">™</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Categories List matching video */}
        <div className="flex-1 overflow-y-auto px-2 py-3 divide-y divide-neutral-100">
          {/* ALL CATEGORY Top Title */}
          <div className="px-3 py-2.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-neutral-900">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>ALL CATEGORY</span>
          </div>

          {/* Category Accordion Items */}
          <div className="py-1">
            {CATEGORIES.map((cat) => {
              const isExpanded = expandedCat === cat.id;
              return (
                <div key={cat.id} className="border-b border-neutral-100/80 last:border-0">
                  <button
                    type="button"
                    onClick={() => toggleExpand(cat.id)}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-amber-50/70 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-md bg-neutral-100 group-hover:bg-amber-100 transition-colors">
                        {getCategoryIcon(cat.id)}
                      </div>
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-800 group-hover:text-amber-950">
                        {cat.name}
                      </span>
                    </div>
                    {cat.subCategories && cat.subCategories.length > 0 && (
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-amber-600' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Subcategories drawer expanded list */}
                  {isExpanded && cat.subCategories && (
                    <div className="bg-neutral-50/80 rounded-lg px-4 py-2 my-1 space-y-1 border-l-2 border-amber-400 ml-5 animate-in fade-in slide-in-from-top-1">
                      <button
                        onClick={() => {
                          onSelectCategory(cat.id);
                          onClose();
                        }}
                        className="w-full text-left py-1.5 text-xs font-bold text-amber-700 hover:underline flex items-center gap-1.5"
                      >
                        <ChevronRight className="w-3 h-3" />
                        View All {cat.name} ({cat.itemCount})
                      </button>
                      {cat.subCategories.map((sub, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => {
                            onSelectCategory(cat.id, sub);
                            onClose();
                          }}
                          className="w-full text-left py-1.5 text-xs font-medium text-neutral-700 hover:text-amber-600 transition-colors block"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Static Extra Video Menu Items */}
          <div className="py-2 space-y-1">
            <button
              onClick={() => {
                onSelectCategory('online-exclusive');
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-neutral-100 text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-800"
            >
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-amber-500" />
                <span>ONLINE EXCLUSIVE</span>
              </div>
            </button>

            <button
              onClick={() => {
                onSelectCategory('gift-combos');
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-neutral-100 text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-800"
            >
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-amber-500" />
                <span>SOLAR COMBO KITS</span>
              </div>
            </button>

            <button
              onClick={() => {
                onOpenOrderTracking();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-neutral-100 text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-800"
            >
              <div className="flex items-center gap-3">
                <PackageCheck className="w-4 h-4 text-emerald-600" />
                <span>ORDER TRACKING</span>
              </div>
            </button>
          </div>
        </div>

        {/* Drawer Bottom Support Info */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 text-xs">
          <div className="flex items-center gap-2 text-neutral-800 font-semibold mb-1">
            <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
            <span>Solar Engineer Hotline</span>
          </div>
          <p className="text-neutral-500 text-[11px]">
            09638001122 • 10:00 AM - 10:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};
