import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  Save,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  Check,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Category, SubCategoryItem } from '../../types';

export const AdminSubCategoriesTab: React.FC = () => {
  const { categories, updateSubcategories } = useStore();
  const [selectedCatId, setSelectedCatId] = useState<string>(
    categories[0]?.id || 'hybrid-inverters'
  );

  const [editingSub, setEditingSub] = useState<SubCategoryItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Validation report state
  const [validationReport, setValidationReport] = useState<{
    fileSizeKb?: number;
    width?: number;
    height?: number;
    isValid?: boolean;
    message?: string;
  } | null>(null);

  const currentCategory =
    categories.find((c) => c.id === selectedCatId) || categories[0];
  const subcategories: SubCategoryItem[] =
    (currentCategory?.subcategories && currentCategory.subcategories.length > 0)
      ? currentCategory.subcategories
      : (currentCategory?.subCategories
          ? currentCategory.subCategories.map((name, i) => ({
              id: `${currentCategory.id}-sub-${i}`,
              categoryId: currentCategory.id,
              name,
              itemCount: 5,
              sdgTag: i % 2 === 0 ? 'SDG 7' : 'SDG 13'
            }))
          : []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Size and dimension validation for sub-category image uploads
  const handleValidateAndUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeKb = Math.round(file.size / 1024);

    if (file.size > 2 * 1024 * 1024) {
      setValidationReport({
        fileSizeKb: sizeKb,
        isValid: false,
        message: 'File is too large! Maximum allowed image size is 2MB.'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const w = img.width;
        const h = img.height;
        const isIdealRatio = Math.abs(w - h) <= 80; // Roughly square

        setValidationReport({
          fileSizeKb: sizeKb,
          width: w,
          height: h,
          isValid: true,
          message: isIdealRatio
            ? `✓ Valid! ${w}×${h}px • ${sizeKb} KB (Optimal square ratio for sub-category)`
            : `⚠ Uploaded: ${w}×${h}px • ${sizeKb} KB (Square 500×500px recommended)`
        });

        onSuccess(dataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSubcategory = (sub: SubCategoryItem) => {
    let updatedList: SubCategoryItem[];
    const exists = subcategories.some((s) => s.id === sub.id);

    if (exists) {
      updatedList = subcategories.map((s) => (s.id === sub.id ? sub : s));
    } else {
      updatedList = [...subcategories, sub];
    }

    updateSubcategories(selectedCatId, updatedList);
    setEditingSub(null);
    setIsAddingNew(false);
    setValidationReport(null);
    showToast('Subcategories updated successfully!');
  };

  const handleDeleteSubcategory = (subId: string) => {
    if (!confirm('Are you sure you want to delete this sub-category?')) return;
    const updatedList = subcategories.filter((s) => s.id !== subId);
    updateSubcategories(selectedCatId, updatedList);
    showToast('Sub-category removed.');
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header & Category Switcher */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              Sub-Category & SDG Icon Management
            </h3>
            <p className="text-xs text-neutral-400">
              Manage subcategories, customize SDG / SVG icons, and upload gallery imagery with automatic size & dimension validation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingSub({
                id: `sub-${Date.now()}`,
                name: 'New Sub-Category',
                slug: 'new-sub',
                productCount: 8,
                icon: 'Zap',
                image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80'
              });
              setIsAddingNew(true);
              setValidationReport(null);
            }}
            className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sub-Category</span>
          </button>
        </div>

        {/* Category Selector Tabs */}
        <div>
          <label className="text-xs font-bold text-neutral-300 block mb-2">
            Select Parent Category to Manage:
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCatId(cat.id);
                  setEditingSub(null);
                  setIsAddingNew(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  selectedCatId === cat.id
                    ? 'bg-amber-400 text-neutral-950'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {cat.name} ({cat.subcategories?.length || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-categories Table / Cards */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6">
        <h4 className="text-sm font-bold text-white mb-4">
          Subcategories for <span className="text-amber-400">{currentCategory?.name}</span>:
        </h4>

        {subcategories.length === 0 ? (
          <div className="p-8 text-center bg-neutral-950 rounded-xl border border-neutral-800 text-neutral-400 text-xs">
            No sub-categories yet for this category. Click "Add Sub-Category" above.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {subcategories.map((sub, idx) => (
              <div
                key={sub.id || idx}
                className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 flex items-center justify-between gap-3 group hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {sub.image ? (
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-12 h-12 object-cover rounded-lg border border-neutral-800 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400 font-mono text-xs font-bold shrink-0">
                      {sub.icon || 'SDG'}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{sub.name}</h5>
                    <span className="text-[11px] text-neutral-400 block font-mono">
                      {sub.productCount || 0} Products • ID: {sub.slug || sub.id}
                    </span>
                    {sub.icon && (
                      <span className="text-[9px] bg-neutral-800 text-amber-300 px-1.5 py-0.5 rounded font-mono mt-0.5 inline-block">
                        Icon: {sub.icon}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSub(sub);
                      setIsAddingNew(false);
                      setValidationReport(null);
                    }}
                    className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors"
                    title="Edit Sub-Category"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSubcategory(sub.id)}
                    className="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors"
                    title="Delete Sub-Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT / CREATE SUB-CATEGORY MODAL */}
      {editingSub && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-amber-400" />
              {isAddingNew ? 'Add New Sub-Category' : `Edit Sub-Category: ${editingSub.name}`}
            </h4>

            <div className="space-y-3">
              {/* Image Upload & Size Validation */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-neutral-300">
                    Sub-Category Image (Recommended 500×500px, Max 2MB)
                  </label>
                </div>

                {editingSub.image && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 mb-2">
                    <img
                      src={editingSub.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingSub.image || ''}
                    onChange={(e) => setEditingSub({ ...editingSub, image: e.target.value })}
                    placeholder="Image URL or upload from gallery"
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
                        handleValidateAndUpload(e, (dataUrl) =>
                          setEditingSub({ ...editingSub, image: dataUrl })
                        )
                      }
                    />
                  </label>
                </div>

                {/* Validation Status Box */}
                {validationReport && (
                  <div
                    className={`mt-2 p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                      validationReport.isValid
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    {validationReport.isValid ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                    )}
                    <span>{validationReport.message}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  Sub-Category Name
                </label>
                <input
                  type="text"
                  value={editingSub.name}
                  onChange={(e) => setEditingSub({ ...editingSub, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    Slug / URL ID
                  </label>
                  <input
                    type="text"
                    value={editingSub.slug || editingSub.id}
                    onChange={(e) =>
                      setEditingSub({
                        ...editingSub,
                        slug: e.target.value,
                        id: e.target.value
                      })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    Estimated Products
                  </label>
                  <input
                    type="number"
                    value={editingSub.productCount || 0}
                    onChange={(e) =>
                      setEditingSub({
                        ...editingSub,
                        productCount: parseInt(e.target.value) || 0
                      })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-400 block mb-1">
                  SDG / Vector Icon Code
                </label>
                <input
                  type="text"
                  value={editingSub.icon || ''}
                  onChange={(e) => setEditingSub({ ...editingSub, icon: e.target.value })}
                  placeholder="e.g. SDG-7, Sun, Zap, BatteryCharging, ShieldCheck"
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setEditingSub(null);
                  setIsAddingNew(false);
                }}
                className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs font-bold rounded-xl hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveSubcategory(editingSub)}
                className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl hover:bg-amber-300 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Sub-Category</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
