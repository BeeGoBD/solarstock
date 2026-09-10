import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle, MapPin, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const StoreNarrativeSeo: React.FC = () => {
  const { faqs } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 border-t border-neutral-200">
      {/* Informative Store Narrative Articles matching video (00:25) */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-8 space-y-6 text-neutral-700 text-xs sm:text-sm leading-relaxed shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
              Regional Energy Platform • Since 2012
            </span>
            <span className="text-xs text-neutral-400 font-semibold">• Tagline: "Beat The Clock"</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-neutral-950 font-['Outfit',sans-serif] mb-2">
            SolarStock - Regional Solar Solutions | Infrastructure & Energy Platform
          </h2>
          <p className="text-neutral-600">
            SolarStock connects sourcing, storage, and project execution into a single coordinated regional operating system — helping teams move faster from planning to live deployment across South Asia, the Middle East, and Africa. Operating through <span className="font-semibold text-neutral-900">SolarStock BD Limited</span> (our wholly owned subsidiary in Baridhara, Dhaka), our regional headquarters in Bangkok (KX Building, Klongsan), and China global sourcing hubs, SolarStock has successfully delivered <span className="font-semibold text-neutral-900">over 1,200 MW (1.2 GW)</span> of solar PV, storage, and EV infrastructure projects since 2012.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2">
            Complete Power Solutions: Inverters, BESS, Agricultural Pumping & Electric Material Handling
          </h3>
          <p className="text-neutral-600">
            Under the leadership of Managing Director <span className="font-semibold text-neutral-900">Star Su</span>, our engineering and procurement ecosystem delivers complete turnkey packages tailored for EPC contractors, distributors, shop owners, and industrial building owners:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs sm:text-sm text-neutral-700">
            <li className="flex items-center gap-2">
              <span className="text-amber-500 font-bold">⚡</span>
              <span><strong>Solar Inverters & BESS:</strong> Deye and SAJ hybrid, off-grid, and high-voltage three-phase inverters.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500 font-bold">⚡</span>
              <span><strong>LPS & PPS (Advanced IPS):</strong> Modern LiFePO4 portable power stations replacing noisy fossil fuel IPS.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500 font-bold">☀️</span>
              <span><strong>Solar PV Modules:</strong> Tongwei (TW Solar) and JA Solar high-efficiency N-Type TOPCon bifacial double-glass panels.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500 font-bold">💧</span>
              <span><strong>Solar Water Pumping:</strong> Difful AC/DC hybrid brushless submersible and high-volume surface irrigation pumps.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500 font-bold">🚜</span>
              <span><strong>Electric Handling Equipment:</strong> EP Equipment lithium forklifts, stackers, and electric pallet trucks for zero-emission factories.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500 font-bold">🛡️</span>
              <span><strong>BOS, Accessories & Safety:</strong> Projoy rapid shutdown safety switches, mounting structures, cables, and rechargeable appliances.</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2">
            Official Brand Partners & Regional Hubs
          </h3>
          <p className="text-neutral-600">
            SolarStock is proud to partner with world-renowned clean technology leaders: <span className="font-semibold text-neutral-900">Deye, SAJ, Difful, EP Equipment, JA Solar, Projoy Electric, Solarstock, and TW Solar (Tongwei)</span>. Our pre-allocated warehouse stock in Dhaka and Bangkok ensures immediate dispatch, eliminates lengthy import delays, and guarantees authentic manufacturer-backed warranties.
          </p>
        </div>

        {/* FAQ Section matching video (00:30 - 00:33) */}
        <div className="pt-4 border-t border-neutral-100">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <h3 className="text-base font-extrabold text-neutral-900 font-['Outfit',sans-serif]">
              Frequently Asked Questions (FAQ)
            </h3>
          </div>

          <div className="space-y-3">
            {(faqs || []).map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-200/80 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left font-bold text-neutral-900 hover:bg-neutral-50 transition-colors text-xs sm:text-sm"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 shrink-0 ml-2 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-3.5 sm:p-4 pt-0 text-neutral-600 text-xs sm:text-sm border-t border-neutral-100 bg-neutral-50/50 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
