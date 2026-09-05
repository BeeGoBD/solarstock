import React from 'react';
import { ShieldCheck, Zap, Calendar, RotateCcw, Award, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TrustBar: React.FC = () => {
  const { peaceOfMind } = useStore();

  const getIcon = (index: number) => {
    switch (index % 4) {
      case 0:
        return <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />;
      case 1:
        return <Zap className="w-6 h-6 text-amber-600 shrink-0" />;
      case 2:
        return <Calendar className="w-6 h-6 text-sky-600 shrink-0" />;
      default:
        return <RotateCcw className="w-6 h-6 text-purple-600 shrink-0" />;
    }
  };

  const getTagColor = (index: number) => {
    switch (index % 4) {
      case 0: return 'bg-emerald-100 text-emerald-800';
      case 1: return 'bg-amber-100 text-amber-800';
      case 2: return 'bg-sky-100 text-sky-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  const getBgGlow = (index: number) => {
    switch (index % 4) {
      case 0: return 'hover:border-emerald-300';
      case 1: return 'hover:border-amber-300';
      case 2: return 'hover:border-sky-300';
      default: return 'hover:border-purple-300';
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-2xl border border-neutral-800 shadow-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm sm:text-base font-extrabold font-['Outfit',sans-serif] text-white">
              {peaceOfMind.title || 'Solarstock™ Peace of Mind Guarantee'}
            </h3>
          </div>
          <span className="text-xs text-amber-400 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {peaceOfMind.subtitle || 'Trusted by over 45,000+ Bangladeshi Homes & Businesses'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {(peaceOfMind?.items || []).map((item, idx) => (
            <div
              key={item.id || idx}
              className={`flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 transition-all duration-200 ${getBgGlow(idx)} group`}
            >
              <div className="p-2.5 rounded-xl bg-neutral-800/90 group-hover:scale-105 transition-transform shadow-xs">
                {getIcon(idx)}
              </div>
              <div className="min-w-0">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider inline-block mb-1 ${getTagColor(idx)}`}>
                  {item.tag}
                </span>
                <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-tight">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

