import React from 'react';
import { ArrowRight, SunMedium, Droplet, Sparkles } from 'lucide-react';

interface MiddlePromoBannersProps {
  onSelectCategory: (categoryId: string) => void;
}

export const MiddlePromoBanners: React.FC<MiddlePromoBannersProps> = ({ onSelectCategory }) => {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Banner 1: Net Metering / Commercial Solar */}
        <div
          onClick={() => onSelectCategory('grid-tie-inverters')}
          className="relative rounded-2xl overflow-hidden p-5 sm:p-6 bg-gradient-to-r from-neutral-950 via-neutral-900 to-amber-950 text-white shadow-md hover:shadow-lg transition-all cursor-pointer group border border-neutral-800 flex flex-col justify-between min-h-[170px]"
        >
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 bg-amber-400 text-neutral-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-sm mb-2">
              <SunMedium className="w-3 h-3" />
              NET-METERING READY
            </span>
            <h3 className="text-base sm:text-lg font-extrabold font-['Outfit',sans-serif] text-white leading-tight group-hover:text-amber-400 transition-colors">
              Rooftop Solar & Grid-Tie Systems
            </h3>
            <p className="text-xs text-neutral-300 mt-1 max-w-xs">
              Sell excess solar power back to the national grid and cut monthly electricity bills by up to 85%.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between mt-4">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:underline">
              <span>Explore Systems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] font-semibold text-neutral-400 bg-white/10 px-2 py-0.5 rounded">
              DESCO / DPDC / REB Certified
            </span>
          </div>

          {/* Background art */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-30 group-hover:opacity-40 transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80"
              alt="Solar Panels"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Banner 2: Solar Water Irrigation Pump */}
        <div
          onClick={() => onSelectCategory('solar-pumps')}
          className="relative rounded-2xl overflow-hidden p-5 sm:p-6 bg-gradient-to-r from-neutral-950 via-neutral-900 to-sky-950 text-white shadow-md hover:shadow-lg transition-all cursor-pointer group border border-neutral-800 flex flex-col justify-between min-h-[170px]"
        >
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 bg-sky-400 text-neutral-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-sm mb-2">
              <Droplet className="w-3 h-3" />
              100% FUEL-FREE IRRIGATION
            </span>
            <h3 className="text-base sm:text-lg font-extrabold font-['Outfit',sans-serif] text-white leading-tight group-hover:text-sky-300 transition-colors">
              Solar Deep Well Submersible Pumps
            </h3>
            <p className="text-xs text-neutral-300 mt-1 max-w-xs">
              Brushless DC stainless steel motors for agriculture, fisheries, and remote tubewells.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between mt-4">
            <span className="text-xs font-bold text-sky-400 flex items-center gap-1 group-hover:underline">
              <span>View Pump Models</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] font-semibold text-neutral-400 bg-white/10 px-2 py-0.5 rounded">
              Up to 90m Depth Lift
            </span>
          </div>

          {/* Background art */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-30 group-hover:opacity-40 transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
              alt="Solar Pump"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
