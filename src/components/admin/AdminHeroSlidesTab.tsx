import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  Image as ImageIcon,
  Zap,
  Sparkles,
  Info,
  Sun,
  CheckCircle2,
  Upload,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { HeroSlideItem, Slide3ShowcaseProduct } from '../../types';

export const AdminHeroSlidesTab: React.FC = () => {
  const {
    heroSlides,
    slide3Products,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    updateSlide3Product,
    addSlide3Product,
    deleteSlide3Product
  } = useStore();

  const [editingSlide, setEditingSlide] = useState<HeroSlideItem | null>(null);
  const [editingSlide3, setEditingSlide3] = useState<Slide3ShowcaseProduct | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Image upload helper converting file to data URL
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 2.5MB)
    if (file.size > 2.5 * 1024 * 1024) {
      alert('File size exceeds 2.5MB limit. Please select a compressed image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      {statusMessage && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* SECTION 1: HERO SLIDER (SLIDE 1) */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Main Hero Slides (Top Carousel & Slide 1)
            </h3>
            <p className="text-xs text-neutral-400">
              Customize hero images, headings, subtext, action buttons, and the{' '}
              <span className="text-emerald-400 font-bold">highlighted green text badge</span>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const newSlide: Omit<HeroSlideItem, 'id'> = {
                image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
                alt: 'Solar Energy System Installation',
                tag: 'TIER-1 SOLAR TECH',
                title: 'New Solar Solution for Bangladesh',
                subtitle: 'Save up to 90% on electricity bills with smart inverters and batteries.',
                badge: '100% Reliable Solar Power',
                category: 'hybrid-inverters',
                buttonText: 'Discover System'
              };
              addHeroSlide(newSlide);
              showToast('Added new hero slide!');
            }}
            className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slide</span>
          </button>
        </div>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between gap-3 group hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-2">
                {/* Slide Preview Banner */}
                <div className="relative aspect-[16/8] rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
                  <img
                    src={slide.image}
                    alt={slide.alt || slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      Slide #{idx + 1}
                    </span>
                    {slide.badge && (
                      <span className="bg-black/75 backdrop-blur-xs border border-emerald-400/50 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                        {slide.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    {slide.tag}
                  </span>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{slide.title}</h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 mt-0.5">{slide.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                <span className="text-[11px] text-neutral-500 font-mono">
                  Category: {slide.category || 'All'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditingSlide(slide)}
                    className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors"
                    title="Edit Slide"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {heroSlides.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this slide?')) {
                          deleteHeroSlide(slide.id);
                          showToast('Slide deleted.');
                        }
                      }}
                      className="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: SLIDE 2 NOTICE (FIXED SOLAR HOUSE ANIMATION) */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Slide 2: Dynamic Solar Inverter Flow Animation</span>
            <span className="text-[10px] bg-neutral-800 text-neutral-300 font-mono px-2 py-0.5 rounded-full">
              Permanent Fixed Engine
            </span>
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Slide 2 displays the automatic sequential solar photon generation and hybrid inverter charging
            schematic inside the home. As instructed, this animation architecture is fixed and maintains
            continuous real-time telemetry and sine wave oscillation.
          </p>
        </div>
      </div>

      {/* SECTION 3: SLIDE 3 (SHOWCASE PRODUCTS) */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" />
              Slide 3: Featured Products Showcase (Auto-cycles every 3s)
            </h3>
            <p className="text-xs text-neutral-400">
              Edit product titles, specs, badges, and images. Automatically cycles through images every 3 seconds.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const newProd: Omit<Slide3ShowcaseProduct, 'id'> = {
                name: 'Solar Generator 3000W',
                tag: 'NEW HYBRID LAUNCH',
                badge: 'Tier-1 Rated',
                spec: '3000W Continuous • 2.5kWh Battery',
                accentColor: '#38bdf8',
                category: 'hybrid-inverters',
                image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80'
              };
              addSlide3Product(newProd);
              showToast('Added new showcase product!');
            }}
            className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Showcase Item</span>
          </button>
        </div>

        {/* Slide 3 Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slide3Products.map((prod, idx) => (
            <div
              key={prod.id || idx}
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 sm:p-4 flex items-center gap-3 group hover:border-neutral-700 transition-colors"
            >
              <img
                src={prod.image}
                alt={prod.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-neutral-800 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-bold text-amber-400 font-mono">
                    {prod.tag}
                  </span>
                  {prod.badge && (
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono font-bold">
                      {prod.badge}
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">{prod.name}</h4>
                <p className="text-[11px] text-neutral-400 truncate mt-0.5">{prod.spec}</p>
              </div>

              <div className="flex flex-col gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingSlide3(prod)}
                  className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors"
                  title="Edit Showcase Item"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                {slide3Products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Delete this showcase product?')) {
                        deleteSlide3Product(prod.id);
                        showToast('Showcase product deleted.');
                      }
                    }}
                    className="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors"
                    title="Delete Showcase Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL FOR HERO SLIDE 1 */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-amber-400" />
              Edit Hero Slide #{editingSlide.id}
            </h4>

            <div className="space-y-3">
              {/* Image Preview & Upload */}
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  Slide Banner Image
                </label>
                <div className="aspect-[16/8] rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 mb-2">
                  <img
                    src={editingSlide.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingSlide.image}
                    onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                    placeholder="Enter Image URL or upload below"
                    className="flex-1 bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                  />
                  <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white rounded-lg flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (url) =>
                          setEditingSlide({ ...editingSlide, image: url })
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">Headline Title</label>
                <input
                  type="text"
                  value={editingSlide.title}
                  onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">Subtitle</label>
                <textarea
                  rows={2}
                  value={editingSlide.subtitle}
                  onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                />
              </div>

              {/* Green Text Badge & Top Tag */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-emerald-400 block mb-1">
                    ★ Green Text Badge (Attractive)
                  </label>
                  <input
                    type="text"
                    value={editingSlide.badge || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                    placeholder="e.g. Up to 90% Bill Savings"
                    className="w-full bg-neutral-950 border border-emerald-500/40 text-xs text-emerald-300 p-2 rounded-lg outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">Top Small Tag</label>
                  <input
                    type="text"
                    value={editingSlide.tag || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, tag: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Button Text & Category Target */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">Button Text</label>
                  <input
                    type="text"
                    value={editingSlide.buttonText || ''}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, buttonText: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    Target Category ID
                  </label>
                  <input
                    type="text"
                    value={editingSlide.category || ''}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, category: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setEditingSlide(null)}
                className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs font-bold rounded-xl hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateHeroSlide(editingSlide.id, editingSlide);
                  setEditingSlide(null);
                  showToast('Hero slide updated successfully!');
                }}
                className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl hover:bg-amber-300 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Slide</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL FOR SLIDE 3 SHOWCASE ITEM */}
      {editingSlide3 && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-amber-400" />
              Edit Slide 3 Showcase Item
            </h4>

            <div className="space-y-3">
              {/* Product Image */}
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">Product Image</label>
                <div className="h-36 rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 mb-2 flex items-center justify-center">
                  <img
                    src={editingSlide3.image}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingSlide3.image}
                    onChange={(e) => setEditingSlide3({ ...editingSlide3, image: e.target.value })}
                    placeholder="Enter Image URL"
                    className="flex-1 bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                  />
                  <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white rounded-lg flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (url) =>
                          setEditingSlide3({ ...editingSlide3, image: url })
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">Product Title</label>
                <input
                  type="text"
                  value={editingSlide3.name}
                  onChange={(e) => setEditingSlide3({ ...editingSlide3, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  Key Specifications / Subtitle
                </label>
                <input
                  type="text"
                  value={editingSlide3.spec}
                  onChange={(e) => setEditingSlide3({ ...editingSlide3, spec: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">Tag Header</label>
                  <input
                    type="text"
                    value={editingSlide3.tag}
                    onChange={(e) => setEditingSlide3({ ...editingSlide3, tag: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-400 block mb-1">Badge</label>
                  <input
                    type="text"
                    value={editingSlide3.badge || ''}
                    onChange={(e) => setEditingSlide3({ ...editingSlide3, badge: e.target.value })}
                    className="w-full bg-neutral-950 border border-emerald-500/40 text-xs text-emerald-300 p-2 rounded-lg outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">Category Slug</label>
                <input
                  type="text"
                  value={editingSlide3.category}
                  onChange={(e) => setEditingSlide3({ ...editingSlide3, category: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setEditingSlide3(null)}
                className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs font-bold rounded-xl hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateSlide3Product(editingSlide3.id, editingSlide3);
                  setEditingSlide3(null);
                  showToast('Slide 3 item updated successfully!');
                }}
                className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl hover:bg-amber-300 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Item</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
