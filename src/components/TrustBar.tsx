import React from 'react';
import { ShieldCheck, Zap, Calendar, RotateCcw, Award, CheckCircle2 } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />,
      tag: '100% AUTHENTIC',
      tagColor: 'bg-emerald-100 text-emerald-800',
      title: '100% Genuine Products',
      subtitle: 'Direct Factory Sealed with Serial Verification',
      bgGlow: 'hover:border-emerald-300'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-600 shrink-0" />,
      tag: 'EXPRESS DISPATCH',
      tagColor: 'bg-amber-100 text-amber-800',
      title: 'Super Fast Delivery',
      subtitle: '24-48 Hours Delivery Across All 64 Districts',
      bgGlow: 'hover:border-amber-300'
    },
    {
      icon: <Calendar className="w-6 h-6 text-sky-600 shrink-0" />,
      tag: 'FLEXIBLE PAYMENT',
      tagColor: 'bg-sky-100 text-sky-800',
      title: '36 Months 0% EMI',
      subtitle: 'Available with 18+ Leading Partner Banks',
      bgGlow: 'hover:border-sky-300'
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-purple-600 shrink-0" />,
      tag: 'OFFICIAL GUARANTEE',
      tagColor: 'bg-purple-100 text-purple-800',
      title: 'Up to 25 Yrs Warranty',
      subtitle: 'SolarCare+ Instant Replacement Guarantee',
      bgGlow: 'hover:border-purple-300'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-2xl border border-neutral-800 shadow-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm sm:text-base font-extrabold font-['Outfit',sans-serif] text-white">
              Solarstock™ Peace of Mind Guarantee
            </h3>
          </div>
          <span className="text-xs text-amber-400 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Trusted by over 45,000+ Bangladeshi Homes & Businesses
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 transition-all duration-200 ${item.bgGlow} group`}
            >
              <div className="p-2.5 rounded-xl bg-neutral-800/90 group-hover:scale-105 transition-transform shadow-xs">
                {item.icon}
              </div>
              <div className="min-w-0">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider inline-block mb-1 ${item.tagColor}`}>
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

