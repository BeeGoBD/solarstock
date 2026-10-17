import React, { useState, useRef } from 'react';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Category } from '../../types';

export interface CategoryFormPageProps {
  category: Category | null;
  onClose: () => void;
  onSave: (cat: Partial<Category>) => void;
}

export const CategoryFormPage: React.FC<CategoryFormPageProps> = ({
  category,
  onClose,
  onSave
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(category?.name || '');
  const [itemCount, setItemCount] = useState(category?.itemCount || 25);
  const [subCategoriesText, setSubCategoriesText] = useState(
    category?.subCategories?.join(', ') || 'Solar Inverters, Hybrid IPS, Solar Panels, Batteries'
  );
  const [image, setImage] = useState(category?.image || '');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a category name.');
      return;
    }

    const subCategories = subCategoriesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      name: name.trim(),
      itemCount: Number(itemCount),
      subCategories,
      icon: category?.icon || 'Zap',
      image
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden animate-in fade-in duration-200">
      <div className="p-4 sm:p-6 border-b border-neutral-200 bg-neutral-50/70 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-700 font-bold text-xs border border-neutral-300 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Categories</span>
          </button>
          <div>
            <h2 className="text-base sm:text-xl font-black text-neutral-900 font-['Outfit',sans-serif] tracking-tight">
              {category ? `Edit Category: ${category.name}` : 'Add New Category'}
            </h2>
            <p className="text-xs text-neutral-500">
              Manage category title, subcategories, icon, and catalog placement
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs border border-neutral-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{category ? 'Update Category' : 'Create Category'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-3xl">
        <div>
          <label className="font-bold text-neutral-700 block mb-1 text-xs">Category Title *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Hybrid Solar Inverter"
            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-bold"
          />
        </div>

        <div>
          <label className="font-bold text-neutral-700 block mb-1 text-xs">Estimated Item Count</label>
          <input
            type="number"
            value={itemCount}
            onChange={(e) => setItemCount(Number(e.target.value))}
            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-mono"
          />
        </div>

        <div>
          <label className="font-bold text-neutral-700 block mb-1 text-xs">
            Subcategories (Comma-separated)
          </label>
          <textarea
            rows={3}
            value={subCategoriesText}
            onChange={(e) => setSubCategoriesText(e.target.value)}
            placeholder="e.g. Single Phase, Three Phase, On-Grid, Off-Grid, Hybrid"
            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white"
          />
          <p className="text-[11px] text-neutral-500 mt-1">
            Separate tags with commas. These appear on the main storefront category drawer.
          </p>
        </div>

        {/* Category Photo Upload */}
        <div>
          <label className="font-bold text-neutral-700 block mb-1 text-xs">
            Category Cover Image (from Gallery or URL)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste image URL or choose file from gallery"
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-2.5 text-xs text-neutral-900 outline-none focus:border-amber-400 font-mono"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-3.5 py-2.5 rounded-xl font-bold text-xs border border-neutral-300 cursor-pointer"
            >
              Gallery Upload
            </button>
          </div>
          {image && (
            <div className="mt-3 w-32 h-24 rounded-xl overflow-hidden border border-neutral-200 relative">
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs border border-neutral-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs shadow-sm cursor-pointer"
          >
            {category ? 'Save Changes' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  );
};
