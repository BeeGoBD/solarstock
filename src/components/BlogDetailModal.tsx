import React, { useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Share2,
  Tag,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Quote,
  ChevronRight,
  ExternalLink,
  Building2,
  Sparkles
} from 'lucide-react';
import { BlogPost } from '../types';

interface BlogDetailModalProps {
  blog: BlogPost | null;
  onClose: () => void;
  onSelectAnotherBlog?: (b: BlogPost) => void;
  allBlogs?: BlogPost[];
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  blog,
  onClose,
  onSelectAnotherBlog,
  allBlogs = []
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (blog) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [blog, onClose]);

  if (!blog) return null;

  const otherBlogs = allBlogs.filter((b) => b.id !== blog.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
              {blog.category}
            </span>
            <span className="text-xs text-neutral-400 font-medium">• SolarStock Engineering & Events</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200/80 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Main Title & Metadata */}
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-neutral-950 font-['Outfit',sans-serif] leading-tight mb-3">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-medium pb-4 border-b border-neutral-100">
              <span className="flex items-center gap-1 text-neutral-700 font-semibold">
                <User className="w-3.5 h-3.5 text-amber-600" />
                {blog.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                {blog.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                {blog.readTime}
              </span>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="rounded-xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-neutral-100 border border-neutral-200/80">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details Card (if applicable, e.g. BCGTX 2026 or Power Bangladesh 2026) */}
          {blog.eventDetails && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-900">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>Exhibition / Event Details</span>
                </div>
                <div className="text-sm font-bold text-neutral-900 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {blog.eventDetails.venue && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      {blog.eventDetails.venue}
                    </span>
                  )}
                  {blog.eventDetails.dateRange && (
                    <span>📅 {blog.eventDetails.dateRange}</span>
                  )}
                  {blog.eventDetails.hours && (
                    <span>⏰ {blog.eventDetails.hours}</span>
                  )}
                </div>
              </div>
              {blog.eventDetails.stall && (
                <div className="bg-neutral-900 text-amber-400 font-extrabold text-xs px-3 py-1.5 rounded-lg border border-neutral-800 shrink-0">
                  {blog.eventDetails.stall}
                </div>
              )}
            </div>
          )}

          {/* Quote Block (e.g. Star Su, Managing Director) */}
          {blog.quote && (
            <div className="relative pl-5 border-l-4 border-amber-500 bg-neutral-50 rounded-r-xl p-4 my-2">
              <Quote className="w-6 h-6 text-amber-400/60 absolute top-3 left-2 -translate-x-full" />
              <p className="text-xs sm:text-sm italic font-medium text-neutral-800 leading-relaxed">
                "{blog.quote.text}"
              </p>
              <div className="mt-2 text-xs font-extrabold text-neutral-900">
                — {blog.quote.author},{' '}
                <span className="font-semibold text-amber-700">{blog.quote.role}</span>
              </div>
            </div>
          )}

          {/* Full Content Body with Markdown-like Paragraph Formatting */}
          <div className="prose prose-neutral max-w-none text-neutral-700 text-xs sm:text-sm leading-relaxed space-y-4">
            {(blog.content || blog.excerpt)
              .split('\n\n')
              .map((paragraph, index) => {
                const trimmed = paragraph.trim();

                // Section header if starting with bold or bullet or myth
                if (trimmed.startsWith('5 Myths:') || trimmed.startsWith('5 Critical Myths')) {
                  return (
                    <div key={index} className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 my-4">
                      <h3 className="text-sm sm:text-base font-extrabold text-neutral-950 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        5 Myths Debunked:
                      </h3>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="p-2.5 bg-white rounded-lg border border-neutral-200/80">
                          <strong className="text-neutral-900">1. “Tier 1 solar panels exist”</strong> — False (rates manufacturers, not panels).
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-neutral-200/80">
                          <strong className="text-neutral-900">2. Non-Tier-1 = poor quality</strong> — False (specialized boutique makers may not supply 10MW commercial projects).
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-neutral-200/80">
                          <strong className="text-neutral-900">3. Tier 1 = quality guarantee</strong> — No. BloombergNEF rates bankability history, not durability.
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-neutral-200/80">
                          <strong className="text-neutral-900">4. Once Tier 1 always Tier 1</strong> — No. It is a quarterly snapshot that changes continuously.
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-neutral-200/80">
                          <strong className="text-neutral-900">5. Ads saying “Tier 1 solar panels” = trustworthy</strong> — Often marketing spin.
                        </div>
                      </div>
                    </div>
                  );
                }

                if (trimmed.startsWith('Product lineup shown:') || trimmed.startsWith('• Solar PV')) {
                  return (
                    <div key={index} className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 my-3">
                      <h4 className="font-extrabold text-xs sm:text-sm text-neutral-900 mb-2">
                        Product Lineup Featured at Booth:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Solar PV panels, inverters & BESS</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> LPS, PPS (advanced replacements for traditional IPS)</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Mounting structures, cables and accessories</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Rechargeable fans & lights</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Solar pumping for irrigation/agriculture</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Electric stackers, pallet-movers, forklifts</li>
                      </ul>
                    </div>
                  );
                }

                if (trimmed.startsWith('What actually matters in Bangladesh:')) {
                  return (
                    <div key={index} className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 my-3">
                      <h4 className="font-extrabold text-xs sm:text-sm text-emerald-950 mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        What Actually Matters in Bangladesh:
                      </h4>
                      <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                        Local service network, long-term performance data, installer responsibility for 10–25 years, and equipment resilience in hot, humid, cyclone-prone climates. Choose based on real durability, local support, and installer accountability, not marketing labels.
                      </p>
                    </div>
                  );
                }

                return (
                  <p key={index} className="text-neutral-700 leading-relaxed font-normal">
                    {trimmed}
                  </p>
                );
              })}
          </div>

          {/* Hashtags Section */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-4 border-t border-neutral-100">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-neutral-400" />
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md hover:bg-amber-100 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Official Inquiry Callout */}
          <div className="bg-neutral-900 text-white rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                SolarStock BD Limited • Engineering & Procurement
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white">
                Need turnkey solar, BESS storage, or electric pallet fleet consultation?
              </h4>
              <p className="text-xs text-neutral-300 mt-1">
                Direct access to regional project engineers in Dhaka, Bangkok, and China.
              </p>
            </div>
            <a
              href="mailto:info@solarstock.com"
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <span>Contact info@solarstock.com</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Related Articles Navigation */}
          {otherBlogs.length > 0 && (
            <div className="pt-6 border-t border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                Other Articles & Event Dispatches
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {otherBlogs.slice(0, 2).map((other) => (
                  <button
                    key={other.id}
                    onClick={() => onSelectAnotherBlog && onSelectAnotherBlog(other)}
                    className="text-left p-3 rounded-xl border border-neutral-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex items-center gap-3 group"
                  >
                    <img
                      src={other.image}
                      alt={other.title}
                      className="w-14 h-14 object-cover rounded-lg shrink-0 bg-neutral-100"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-bold text-amber-600 block uppercase">
                        {other.category}
                      </span>
                      <h5 className="text-xs font-bold text-neutral-900 line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {other.title}
                      </h5>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
