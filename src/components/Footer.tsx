import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Mail, Phone, Sun, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onOpenLocations: () => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLocations,
  onSelectCategory,
  onOpenCalculator
}) => {
  const { branches, footerConfig, brandConfig } = useStore();

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-10 pb-20 md:pb-10 border-t border-neutral-800 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Brand & Social Row matching video (00:34) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
          <div className="space-y-3">
            {/* Standard Brand Logo */}
            <div className="flex items-center gap-2 select-none">
              <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center shadow-md">
                <Sun className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-['Outfit',sans-serif]">
                {brandConfig.logoMain}
                <span className="text-amber-400">{brandConfig.logoAccent}</span>
                <span className="text-xs font-semibold align-super ml-0.5 text-neutral-400">
                  {brandConfig.logoSymbol}
                </span>
              </span>
            </div>

            {/* Store Location Button matching video (00:34) */}
            <div>
              <button
                onClick={onOpenLocations}
                className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl border border-neutral-700 font-bold transition-colors shadow-xs"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Store Location ({branches.length} Outlets)</span>
              </button>
            </div>
          </div>

          {/* Social Icons matching video (00:34) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <a
                href={footerConfig.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-amber-400 hover:text-neutral-950 flex items-center justify-center text-white border border-neutral-800 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a
                href={footerConfig.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-amber-400 hover:text-neutral-950 flex items-center justify-center text-white border border-neutral-800 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={footerConfig.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-amber-400 hover:text-neutral-950 flex items-center justify-center text-white border border-neutral-800 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 fill-current" />
              </a>
              <a
                href={footerConfig.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-amber-400 hover:text-neutral-950 flex items-center justify-center text-white border border-neutral-800 transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="text-neutral-400 text-xs space-y-0.5">
              <p>Email: <a href={`mailto:${footerConfig.email}`} className="text-amber-400 hover:underline">{footerConfig.email}</a></p>
              <p>Phone: <a href={`tel:${footerConfig.hotline}`} className="text-white font-bold hover:underline">{footerConfig.hotline}</a></p>
            </div>
          </div>
        </div>

        {/* Link Columns matching video (00:34 - 00:35) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 pb-6 border-b border-neutral-800">
          {/* COMPANY */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-400 mb-3 font-['Outfit',sans-serif]">
              COMPANY
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#career" className="hover:text-white transition-colors">Career</a></li>
              <li><a href="#brands" className="hover:text-white transition-colors">Our Brands</a></li>
              <li><a href="#blogs" className="hover:text-white transition-colors">Solar Engineering Blogs</a></li>
              <li>
                <button onClick={onOpenCalculator} className="hover:text-amber-400 font-semibold transition-colors text-left">
                  Solar Load Calculator
                </button>
              </li>
              <li><a href="#tracking" className="hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="#tradein" className="hover:text-white transition-colors">IPS Battery Trade In</a></li>
            </ul>
          </div>

          {/* HELP CENTER */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-400 mb-3 font-['Outfit',sans-serif]">
              HELP CENTER
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#support" className="hover:text-white transition-colors">Support Center</a></li>
              <li><a href="#announcements" className="hover:text-white transition-colors">Announcements</a></li>
              <li><a href="#corporate" className="hover:text-white transition-colors">Corporate & Net Metering</a></li>
              <li><a href="#feedback" className="hover:text-white transition-colors">Feedback</a></li>
              <li><a href="#sitemap" className="hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>

          {/* TERMS & CONDITIONS */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-400 mb-3 font-['Outfit',sans-serif]">
              TERMS & CONDITIONS
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#refund" className="hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#warranty" className="hover:text-white transition-colors">SolarCare+ Warranty Policy</a></li>
              <li><a href="#exchange" className="hover:text-white transition-colors">Battery Exchange Policy</a></li>
              <li><a href="#emi" className="hover:text-white transition-colors">0% EMI Policy</a></li>
              <li><a href="#others" className="hover:text-white transition-colors">Others Policy</a></li>
            </ul>
          </div>
        </div>

        {/* STAY CONNECTED - Branches List matching video (00:35 - 00:37) */}
        <div className="space-y-3 pb-6 border-b border-neutral-800">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-400 font-['Outfit',sans-serif]">
              STAY CONNECTED - EXPERIENCE CENTERS ({branches.length})
            </h4>
            <button
              onClick={onOpenLocations}
              className="text-[11px] text-amber-400 hover:underline font-semibold"
            >
              View Full Map & Directions →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-[11px] text-neutral-400">
            {branches.map((b, idx) => (
              <div key={b.id} className="p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80 space-y-0.5">
                <div className="flex items-center justify-between">
                  <strong className="text-neutral-200 block text-xs">
                    {idx + 1}. {b.name}
                  </strong>
                  {b.badge && (
                    <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">
                      {b.badge}
                    </span>
                  )}
                </div>
                <p className="line-clamp-2 text-neutral-400">{b.address}</p>
                <p className="text-amber-400/90 font-mono text-[10px]">Hotline: {b.phone}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright & Credit Notice with crisp White text */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white text-xs pt-4 border-t border-neutral-800/80 font-medium">
          <p className="text-white">
            {footerConfig.copyrightText}
          </p>
          <div className="flex items-center gap-4 text-white">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {footerConfig.isoText}
            </span>
            <span className="text-white">
              Powered by <span className="text-amber-400 font-bold">{footerConfig.poweredBy}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
