import React, { useState, useRef } from 'react';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  FolderPlus,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { Product, Category } from '../../types';

export interface ProductFormPageProps {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: (prod: Partial<Product>) => void;
}

const PRESET_GALLERY_PHOTOS = [
  {
    name: 'Growatt Hybrid Inverter 5kW',
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Felicity Lithium Battery 10kWh',
    url: 'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tier-1 Mono Solar Panel 550W',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Solar Power Station Hub',
    url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'MPPT Charge Controller',
    url: 'https://images.unsplash.com/photo-1548611716-ad88915e8555?auto=format&fit=crop&w=800&q=80'
  }
];

export const ProductFormPage: React.FC<ProductFormPageProps> = ({
  product,
  categories,
  onClose,
  onSave
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || categories[0]?.id || 'ips-systems');
  const [subCategory, setSubCategory] = useState(product?.subCategory || '');
  const [brand, setBrand] = useState(product?.brand || 'SolarStock BD');
  const [price, setPrice] = useState(product?.price || 19990);
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice || 24990);
  const [warranty, setWarranty] = useState(
    product?.warranty || '2 Years SolarCare+ Replacement Guarantee'
  );
  const [tag, setTag] = useState(product?.tag || 'Hot Product');
  const [stockCount, setStockCount] = useState(product?.stockCount ?? 20);

  // Gallery Photos: multiple image URLs or base64 DataURLs from gallery
  const [images, setImages] = useState<string[]>(() => {
    if (product?.images && product.images.length > 0) {
      return [...product.images];
    }
    if ((product as any)?.image) {
      return [(product as any).image];
    }
    return [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
    ];
  });

  const [urlInput, setUrlInput] = useState('');
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  const [shortDesc, setShortDesc] = useState(
    product?.shortDesc ||
      'Industrial-grade pure sine wave equipment with smart digital monitoring and factory warranty.'
  );
  const [description, setDescription] = useState(
    product?.description ||
      'Engineered for 24/7 continuous duty in residential, commercial and industrial solar installations.'
  );
  const [isHot, setIsHot] = useState(product?.isHot ?? true);
  const [isOutOfStock, setIsOutOfStock] = useState(product?.isOutOfStock ?? false);

  // Specs Key-Value pairs
  const [specsList, setSpecsList] = useState<Array<{ key: string; value: string }>>(() => {
    if (product?.specs && Object.keys(product.specs).length > 0) {
      return Object.entries(product.specs).map(([k, v]) => ({ key: k, value: String(v) }));
    }
    return [
      { key: 'Rated Power', value: '5000W / 5kVA' },
      { key: 'Battery Nominal Voltage', value: '48VDC' },
      { key: 'Max Solar PV Input', value: '450VDC / 6000W' },
      { key: 'Waveform', value: 'Pure Sine Wave (Factory Calibrated)' },
      { key: 'Efficiency', value: '98% Peak Conversion' },
      { key: 'Warranty Support', value: product?.warranty || '2 Years Replacement Guarantee' }
    ];
  });

  // Highlights list
  const [highlightsList, setHighlightsList] = useState<string[]>(() => {
    if (product?.highlights && product.highlights.length > 0) {
      return [...product.highlights];
    }
    return [
      'Official factory-direct certified solar equipment',
      'SolarCare+ genuine replacement warranty guarantee',
      'Fast doorstep nationwide dispatch within 24 hours'
    ];
  });

  const [newHighlight, setNewHighlight] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');

  // Handle uploading files directly from device photo gallery
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let loadedCount = 0;
    const totalFiles = files.length;

    Array.from(files).forEach((file: File) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const dataUrl = reader.result;
          setImages((prev) => [...prev, dataUrl]);
          loadedCount++;
          if (loadedCount >= totalFiles) {
            setUploadFeedback(`Added ${loadedCount} photo(s) from your gallery!`);
            setTimeout(() => setUploadFeedback(null), 4000);
          }
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleAddUrlImage = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setImages((prev) => [...prev, trimmed]);
    setUrlInput('');
    setUploadFeedback('Added photo from web URL!');
    setTimeout(() => setUploadFeedback(null), 3000);
  };

  const handleMakePrimary = (index: number) => {
    setImages((prev) => {
      const copy = [...prev];
      const [selected] = copy.splice(index, 1);
      return [selected, ...copy];
    });
    setUploadFeedback('Set as primary cover photo!');
    setTimeout(() => setUploadFeedback(null), 2500);
  };

  const handleRemoveImage = (index: number) => {
    if (images.length <= 1) {
      alert('A product must have at least 1 image.');
      return;
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setHighlightsList((prev) => [...prev, newHighlight.trim()]);
    setNewHighlight('');
  };

  const handleRemoveHighlight = (idx: number) => {
    setHighlightsList((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddSpec = () => {
    if (!newSpecKey.trim() || !newSpecVal.trim()) return;
    setSpecsList((prev) => [...prev, { key: newSpecKey.trim(), value: newSpecVal.trim() }]);
    setNewSpecKey('');
    setNewSpecVal('');
  };

  const handleRemoveSpec = (idx: number) => {
    setSpecsList((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a product title.');
      return;
    }

    if (images.length === 0) {
      alert('Please upload or select at least 1 product image from your gallery.');
      return;
    }

    const discountPercent =
      originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    const specsObj: { [key: string]: string } = {};
    specsList.forEach((s) => {
      if (s.key.trim() && s.value.trim()) {
        specsObj[s.key.trim()] = s.value.trim();
      }
    });

    onSave({
      name: name.trim(),
      category,
      subCategory: subCategory.trim(),
      brand: brand.trim(),
      price: Number(price),
      originalPrice: Number(originalPrice),
      discountPercent,
      stockCount: Number(stockCount),
      warranty: warranty.trim(),
      tag,
      images: images,
      shortDesc: shortDesc.trim(),
      description: description.trim(),
      isHot,
      isOutOfStock,
      rating: product?.rating || 4.9,
      reviewsCount: product?.reviewsCount || 1,
      specs: specsObj,
      highlights: highlightsList
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden animate-in fade-in duration-200">
      {/* Top Page Header Bar */}
      <div className="p-4 sm:p-6 border-b border-neutral-200 bg-neutral-50/70 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-700 font-bold text-xs border border-neutral-300 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </button>
          <div>
            <h2 className="text-base sm:text-xl font-black text-neutral-900 font-['Outfit',sans-serif] tracking-tight">
              {product ? `Edit Equipment: ${product.name}` : 'Upload New Product'}
            </h2>
            <p className="text-xs text-neutral-500">
              Upload photos from device gallery, configure pricing, stock status, and technical specifications
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs border border-neutral-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-400/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{product ? 'Save & Update Equipment' : 'Publish Product to Store'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-8">
        {/* SECTION 1: PRODUCT PHOTOS & GALLERY UPLOAD */}
        <div className="bg-amber-50/40 border border-amber-200/80 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                  Product Photos & Device Gallery Upload
                </h3>
              </div>
              <p className="text-xs text-neutral-600 mt-0.5">
                Upload photos directly from your phone or computer photo gallery. First photo is used as primary cover.
              </p>
            </div>

            {/* Hidden native file input for device gallery */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs transition-all shadow-md shadow-amber-400/30 cursor-pointer"
            >
              <FolderPlus className="w-4 h-4 stroke-[2.5]" />
              <span>Choose Photos from Gallery</span>
            </button>
          </div>

          {/* Feedback banner */}
          {uploadFeedback && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadFeedback}</span>
            </div>
          )}

          {/* Gallery Upload Box / Drag & Drop Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-white/90 hover:bg-amber-50/50 rounded-2xl p-6 text-center transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 group-hover:bg-amber-200 text-amber-700 mx-auto flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs mb-3">
              <Upload className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h4 className="text-sm font-bold text-neutral-900">
              Click to browse your phone/computer photo gallery
            </h4>
            <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto">
              Select one or multiple images (JPG, PNG, WEBP). Photos will be uploaded and added to this product's gallery immediately.
            </p>
          </div>

          {/* Alternative URL Adder */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-1">
            <input
              type="text"
              placeholder="Or paste an image web link (https://...)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 outline-none focus:border-amber-400 font-mono"
            />
            <button
              type="button"
              onClick={handleAddUrlImage}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shrink-0 transition-colors cursor-pointer"
            >
              + Add Image URL
            </button>
          </div>

          {/* Preset Solar Equipment Library */}
          <div className="pt-2 border-t border-amber-200/60">
            <span className="text-[11px] font-bold text-neutral-600 block mb-2">
              Or pick sample equipment photos from library:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_GALLERY_PHOTOS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setImages((prev) => [...prev, preset.url]);
                    setUploadFeedback(`Added ${preset.name}!`);
                    setTimeout(() => setUploadFeedback(null), 2500);
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-amber-100 text-neutral-800 text-[11px] font-semibold border border-neutral-300 hover:border-amber-400 transition-colors shadow-2xs cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-amber-600" />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CURRENT GALLERY PREVIEW GRID */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-800">
                Active Photos ({images.length} uploaded)
              </span>
              <span className="text-[11px] text-neutral-500">
                First photo is used as primary product display
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`group relative rounded-xl border overflow-hidden bg-white shadow-2xs flex flex-col justify-between ${
                    idx === 0 ? 'border-amber-500 ring-2 ring-amber-400/40' : 'border-neutral-200'
                  }`}
                >
                  <div className="relative aspect-square w-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={img}
                      alt={`Product photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute top-2 left-2 bg-amber-400 text-neutral-950 font-black text-[10px] px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                        Primary Cover
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="p-2 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-1 text-[11px]">
                    {idx !== 0 ? (
                      <button
                        type="button"
                        onClick={() => handleMakePrimary(idx)}
                        className="text-amber-700 hover:text-amber-800 font-bold hover:underline"
                      >
                        Set Primary
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold">Main Photo</span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="text-neutral-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: BASIC PRODUCT INFORMATION */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2">
            Equipment Details & Classification
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="font-bold text-neutral-700 block mb-1 text-xs">
                Product Title / Model Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Growatt SPF 5000 ES 5kW Hybrid Solar Inverter"
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-neutral-700 block mb-1 text-xs">
                Manufacturer / Brand *
              </label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Growatt, Deye, Felicity, Huawei"
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-neutral-700 block mb-1 text-xs">
                Main Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-semibold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-neutral-700 block mb-1 text-xs">
                Sub-Category
              </label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="e.g. Off-Grid Inverter, LiFePO4 Battery"
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-neutral-700 block mb-1 text-xs">
                Product Ribbon / Badge
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-semibold"
              >
                <option value="Hot Product">Hot Product</option>
                <option value="Top Selling">Top Selling</option>
                <option value="Beat The Clock">Beat The Clock</option>
                <option value="Best Deal">Best Deal</option>
                <option value="New Arrival">New Arrival</option>
                <option value="Limited Time Offer">Limited Time Offer</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: PRICING, STOCK & WARRANTY */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2">
            Pricing, Stock & Warranty
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="font-bold text-neutral-700 block mb-1 text-xs">
                Selling Price (৳ BDT) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-sm text-amber-700 outline-none focus:border-amber-400 focus:bg-white font-mono font-black"
              />
            </div>

            <div>
              <label className="font-bold text-neutral-700 block mb-1 text-xs">
                Original MRP Price (৳ BDT)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-sm text-neutral-600 outline-none focus:border-amber-400 focus:bg-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-neutral-700 block mb-1 text-xs">
                Stock Quantity (Units)
              </label>
              <input
                type="number"
                value={stockCount}
                onChange={(e) => setStockCount(Number(e.target.value))}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-sm text-neutral-800 outline-none focus:border-amber-400 focus:bg-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-neutral-700 block mb-1 text-xs">
                Calculated Discount
              </label>
              <div className="p-3 bg-neutral-100 rounded-xl border border-neutral-200 font-bold text-xs text-neutral-800 flex items-center h-[46px]">
                {originalPrice > price ? (
                  <span className="text-emerald-700 font-black">
                    Save {Math.round(((originalPrice - price) / originalPrice) * 100)}% (৳{' '}
                    {(originalPrice - price).toLocaleString()})
                  </span>
                ) : (
                  <span className="text-neutral-500 font-normal">Regular Price</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-neutral-700 block mb-1 text-xs">
                Official Warranty Guarantee
              </label>
              <input
                type="text"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                placeholder="e.g. 5 Years SolarCare+ Service & Replacement Guarantee"
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-medium"
              />
            </div>

            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isHot}
                  onChange={(e) => setIsHot(e.target.checked)}
                  className="w-4 h-4 accent-amber-500"
                />
                <span className="font-bold text-xs text-neutral-800">
                  Feature on Homepage Hot Deals
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOutOfStock}
                  onChange={(e) => setIsOutOfStock(e.target.checked)}
                  className="w-4 h-4 accent-rose-600"
                />
                <span className="font-bold text-xs text-rose-600">Mark as Out of Stock</span>
              </label>
            </div>
          </div>
        </div>

        {/* SECTION 4: DESCRIPTIONS & KEY HIGHLIGHTS */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2">
            Description & Key Features
          </h3>

          <div>
            <label className="font-bold text-neutral-700 block mb-1 text-xs">
              Short Summary Description (for product cards)
            </label>
            <input
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Short 1-line summary displayed on listings..."
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-neutral-700 block mb-1 text-xs">
              Full Detailed Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of components, applications, efficiency..."
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white"
            />
          </div>

          {/* Key Highlights Bullet Points */}
          <div>
            <label className="font-bold text-neutral-700 block mb-1 text-xs">
              Bullet Highlights (Key Selling Points)
            </label>
            <div className="space-y-2 mb-2">
              {highlightsList.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <input
                    type="text"
                    value={hl}
                    onChange={(e) => {
                      const updated = [...highlightsList];
                      updated[idx] = e.target.value;
                      setHighlightsList(updated);
                    }}
                    className="flex-1 bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-1.5 text-xs text-neutral-900 outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(idx)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a new key feature..."
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHighlight();
                  }
                }}
                className="flex-1 bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs border border-neutral-300 cursor-pointer"
              >
                + Add Feature
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 5: TECHNICAL SPECIFICATIONS TABLE */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2">
            Technical Specifications
          </h3>

          <div className="space-y-2">
            {specsList.map((s, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
                <input
                  type="text"
                  placeholder="Spec Name (e.g. Battery Voltage)"
                  value={s.key}
                  onChange={(e) => {
                    const copy = [...specsList];
                    copy[idx].key = e.target.value;
                    setSpecsList(copy);
                  }}
                  className="sm:col-span-2 bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs font-bold text-neutral-700 outline-none focus:border-amber-400"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. 48VDC / 100Ah)"
                  value={s.value}
                  onChange={(e) => {
                    const copy = [...specsList];
                    copy[idx].value = e.target.value;
                    setSpecsList(copy);
                  }}
                  className="sm:col-span-2 bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 outline-none focus:border-amber-400"
                />
                <div className="sm:col-span-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(idx)}
                    className="p-2 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center pt-2">
            <input
              type="text"
              placeholder="New Spec Parameter..."
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
              className="sm:col-span-2 bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 outline-none focus:border-amber-400"
            />
            <input
              type="text"
              placeholder="Value / Rating..."
              value={newSpecVal}
              onChange={(e) => setNewSpecVal(e.target.value)}
              className="sm:col-span-2 bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 outline-none focus:border-amber-400"
            />
            <button
              type="button"
              onClick={handleAddSpec}
              className="sm:col-span-1 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs cursor-pointer"
            >
              + Add Row
            </button>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs border border-neutral-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs flex items-center gap-2 transition-all shadow-md shadow-amber-400/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{product ? 'Save & Update Equipment' : 'Publish Product to Store'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
