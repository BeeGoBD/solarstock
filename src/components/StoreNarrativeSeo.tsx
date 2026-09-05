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
          <h2 className="text-lg sm:text-2xl font-extrabold text-neutral-950 font-['Outfit',sans-serif] mb-2">
            Solarstock - The Best Solar, IPS & Inverter Shop in Bangladesh
          </h2>
          <p className="text-neutral-600">
            Solarstock offers an extensive selection of solar panels, hybrid inverters, home IPS & UPS, and lithium energy storage systems from leading global Tier-1 brands to suit every power backup and rooftop generation requirement. We feature top brands like <span className="font-semibold text-neutral-900">Growatt, LONGi Solar, Luminous, Deye, Felicity Solar, Jinko Solar, Microtek, Hamko, and Canadian Solar</span>. With each purchase, enjoy the assurance of 100% authenticity, competitive pricing, official warranties, and authorized technician support, making Solarstock the most trusted clean energy retailer in Bangladesh.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2">
            Best Hybrid Solar Inverters & Lithium LiFePO4 Batteries in Dhaka
          </h3>
          <p className="text-neutral-600">
            Whether you are looking for a <span className="font-medium text-neutral-900">5kW Pure Sine Wave Hybrid Inverter, 48V 100Ah LiFePO4 Lithium Wall Battery, or Heavy Duty Solar Tubular Batteries</span>, Solarstock's inventory covers complete off-grid, hybrid, and on-grid net-metering systems. Our certified solar engineers calculate your residential or commercial electrical loads to configure the exact inverter capacity, solar array wattage, and battery backup duration for uninterrupted living.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2">
            Rooftop Solar Panels & Net-Metering Solutions in Bangladesh
          </h3>
          <p className="text-neutral-600">
            Reduce electricity bills by up to 85% with our high-efficiency Mono PERC and N-Type TopCon Bifacial solar modules. We provide complete turnkey Net-Metering consultation, DPDC/DESCO/REB bi-directional meter integration, and structural rooftop aluminum mounting accessories engineered to withstand tropical cyclones.
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
