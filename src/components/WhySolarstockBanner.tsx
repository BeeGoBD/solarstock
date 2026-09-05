import React from 'react';
import { ShieldCheck, Zap, RefreshCw, Award, Headphones } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhySolarstockBanner: React.FC = () => {
  const { solarCare } = useStore();

  const features = (solarCare?.features && solarCare.features.length > 0)
    ? solarCare.features
    : [
        {
          id: 'feat-1',
          title: solarCare?.feature1Title || 'Instant Unit Replacement',
          subtitle: solarCare?.feature1Desc || 'Zero waiting for repair parts'
        },
        {
          id: 'feat-2',
          title: solarCare?.feature2Title || '730 Days Surge Coverage',
          subtitle: solarCare?.feature2Desc || 'Full lightning & grid fluctuation cover'
        }
      ];

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-5">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-neutral-950 via-neutral-900 to-amber-950 text-white p-5 sm:p-8 shadow-md border border-neutral-800">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Title & Info */}
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full mb-3">
              <Award className="w-3.5 h-3.5" />
              {solarCare.tag || 'Official Solar Protection'}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold font-['Outfit',sans-serif] tracking-tight leading-tight text-white mb-2">
              {solarCare.title || 'Why Solarstock Care+?'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              {solarCare.description ||
                'The only dedicated solar & IPS warranty in Bangladesh offering instant doorstep hardware replacement, lightning surge protection, and certified solar engineer dispatch.'}
            </p>
          </div>

          {/* Right Highlights Cards matching video style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto shrink-0">
            {features.map((feature, idx) => (
              <div
                key={feature.id || idx}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-3.5 rounded-xl flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                  {idx % 2 === 0 ? <RefreshCw className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{feature.title}</h4>
                  <p className="text-[10px] text-neutral-400">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
