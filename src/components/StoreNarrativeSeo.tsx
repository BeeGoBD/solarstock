import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle, MapPin, Phone } from 'lucide-react';

export const StoreNarrativeSeo: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "7. Can I exchange my old IPS device or battery for a new one at Solarstock?",
      a: "Yes! Solarstock offers an exclusive Solar Trade-In Exchange facility with up to 25% extra bonus value. Simply bring your old tubular battery or dead inverter to any of our 8+ branches, and our engineering team will evaluate its exchange value toward your brand-new pure sine wave hybrid inverter or LiFePO4 battery pack."
    },
    {
      q: "8. Where are Solarstock's store locations in Bangladesh?",
      a: "Solarstock operates premier flagship experience centers across Dhaka (Bashundhara City Level 7, Jamuna Future Park Level 4, Uttara Centre Point), Chittagong (Finlay Square & Meridian Kohinoor City), Bogura (Nawab Bari Road), Sylhet (Zindabazar), and Khulna (KDA Avenue) with nationwide delivery to all 64 districts."
    },
    {
      q: "9. What customer support does Solarstock provide?",
      a: "Solarstock offers 24/7 technical solar engineering hotline support to assist with rooftop solar load calculations, system design, inverter setup, warranty registrations, and net metering liaison. You can reach our engineers via hotline 09638001122 (10 AM - 10 PM) or our on-site technician dispatch desk."
    },
    {
      q: "10. How can I be sure I'm getting a genuine product from Solarstock?",
      a: "Solarstock guarantees 100% authenticity. We import directly from verified Tier-1 manufacturers (Growatt, LONGi, Luminous, Deye, Felicity Solar, Jinko) as authorized distributors. Every product is sealed with official brand barcodes and verified under our SolarCare+ registration portal."
    },
    {
      q: "11. Does Solarstock accept pre-orders for specialized industrial solar equipment?",
      a: "Yes! Use our interactive Pre-Order portal in the app to request specialized 3-phase commercial inverters (10kW to 100kW), custom high-voltage rack batteries, or agricultural solar irrigation systems. We source and deliver custom units within 10 to 15 business days."
    },
    {
      q: "12. Can I return or exchange a product if I'm not satisfied?",
      a: "Solarstock offers a 7-day hassle-free replacement policy and official manufacturer warranty up to 25 years. If your inverter, panel, or battery has any manufacturing discrepancy, our SolarCare+ team will exchange it with a brand-new unit immediately."
    }
  ];

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
            {faqs.map((faq, idx) => {
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
