import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCircle2, Headphones, Mail, Building2, MapPin, ExternalLink } from 'lucide-react';

type DeskOption = 'Bangladesh Desk (Dhaka)' | 'Thailand Desk (Bangkok)' | 'Headquarter (Global HQ)';

export const MessageDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [desk, setDesk] = useState<DeskOption>('Bangladesh Desk (Dhaka)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const getDeskInfo = (selectedDesk: DeskOption) => {
    switch (selectedDesk) {
      case 'Bangladesh Desk (Dhaka)':
        return {
          email: 'info@solarstock.com',
          location: 'Baridhara, Dhaka, Bangladesh',
          entity: 'SolarStock BD Limited'
        };
      case 'Thailand Desk (Bangkok)':
        return {
          email: 'info@solarstock.com',
          location: 'KX Building, Klongsan, Bangkok, Thailand',
          entity: 'SolarStock Regional HQ'
        };
      case 'Headquarter (Global HQ)':
      default:
        return {
          email: 'info@solarstock.com',
          location: 'China Global Sourcing & Supply Platform',
          entity: 'SolarStock Global Headquarters'
        };
    }
  };

  const currentDesk = getDeskInfo(desk);

  const triggerMailto = (overrideMsg?: string) => {
    const inquiryMsg = overrideMsg || message;
    const subject = encodeURIComponent(`[SolarStock ${desk} Inquiry] from ${name || 'Customer'}`);
    const bodyContent = `Dear SolarStock ${desk} Team,

Contact Name: ${name || 'Prospective Client'}
Contact Email: ${email || 'Not specified'}
Target Regional Desk: ${desk} (${currentDesk.entity} - ${currentDesk.location})

Inquiry Details:
${inquiryMsg || 'Please provide details on product specifications, availability, and container pricing.'}

---
Inquiry generated via SolarStock Regional Energy Platform
Website: https://www.solarstock.com/
Company: SolarStock (1100MW+ projects commissioned)`;

    const mailtoUrl = `mailto:${currentDesk.email}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    window.location.href = mailtoUrl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerMailto();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      setIsOpen(false);
    }, 3000);
  };

  return (
    <>
      {/* Floating Vertical "Message" tab on right edge matching video (00:00 - 02:28) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold py-3 px-2 rounded-l-xl shadow-xl flex flex-col items-center gap-1.5 transition-all group focus:outline-none"
        title="Live Message / Support"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-amber-700" />
        </div>
        <span className="[writing-mode:vertical-rl] tracking-widest uppercase text-[11px] font-black group-hover:scale-105 transition-transform">
          Message
        </span>
      </button>

      {/* Slide-in Message Modal matching video (02:26) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95">
            {/* Close Button matching video */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Email Draft Opened for {desk}!
                </h3>
                <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                  Your default email client has been launched with a pre-filled message to <strong>{currentDesk.email}</strong>.
                </p>
                <div className="p-2.5 bg-neutral-50 rounded-xl text-[11px] text-neutral-500 border border-neutral-200">
                  Direct contact: info@solarstock.com
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Header text matching video (02:26) */}
                <div className="pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Headphones className="w-5 h-5 text-amber-500" />
                    <h3 className="text-base font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
                      SolarStock Regional Desk
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Connect directly with our regional offices. Submitting prepares a pre-filled draft in your default email client.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Desk Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Select Regional Desk:
                    </label>
                    <select
                      value={desk}
                      onChange={(e) => setDesk(e.target.value as DeskOption)}
                      className="w-full text-xs p-2.5 rounded-xl border border-neutral-300 bg-neutral-50/50 font-semibold text-neutral-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none"
                    >
                      <option value="Bangladesh Desk (Dhaka)">Bangladesh Desk (Baridhara, Dhaka)</option>
                      <option value="Thailand Desk (Bangkok)">Thailand Desk (KX Building, Bangkok)</option>
                      <option value="Headquarter (Global HQ)">Headquarter (China Sourcing Platform)</option>
                    </select>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-neutral-500 font-medium">
                      <Building2 className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{currentDesk.entity} • {currentDesk.location}</span>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="* Your Name / Company"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="* Your Business Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      rows={3}
                      placeholder="* Your Inquiry (e.g. Inverter specifications, container volume pricing, rooftop EPC consultation...)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white font-extrabold py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open Pre-filled Email Draft</span>
                  </button>
                </form>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-[11px] text-neutral-400">
                  <span>Routing to {currentDesk.email}</span>
                  <span className="font-semibold text-neutral-600">SolarStock Platform</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

