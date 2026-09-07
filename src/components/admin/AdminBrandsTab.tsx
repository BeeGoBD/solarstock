import React, { useState } from 'react';
import {
  Award,
  Plus,
  Trash2,
  Edit2,
  Save,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandItem } from '../../types';

export const AdminBrandsTab: React.FC = () => {
  const { brandsList, updateBrandItem, addBrandItem, deleteBrandItem } = useStore();
  const [editingBrand, setEditingBrand] = useState<BrandItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [validationReport, setValidationReport] = useState<{
    fileSizeKb?: number;
    width?: number;
    height?: number;
    isValid?: boolean;
    message?: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleValidateAndUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeKb = Math.round(file.size / 1024);

    if (file.size > 1.5 * 1024 * 1024) {
      setValidationReport({
        fileSizeKb: sizeKb,
        isValid: false,
        message: 'File too large! Brand logos should not exceed 1.5MB.'
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
        const isLandscape = w >= h;

        setValidationReport({
          fileSizeKb: sizeKb,
          width: w,
          height: h,
          isValid: true,
          message: isLandscape
            ? `✓ Valid Brand Logo! ${w}×${h}px • ${sizeKb} KB (Proper rectangular aspect ratio)`
            : `⚠ Uploaded: ${w}×${h}px • ${sizeKb} KB (Landscape 200×80px or 400×160px recommended for brand logos)`
        });

        onSuccess(dataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (brand: BrandItem) => {
    if (isAddingNew) {
      addBrandItem(brand);
      showToast('Brand added successfully!');
    } else {
      updateBrandItem(brand.id, brand);
      showToast('Brand updated successfully!');
    }
    setEditingBrand(null);
    setIsAddingNew(false);
    setValidationReport(null);
  };

  const handleDelete = (id: string) => {
    if (brandsList.length <= 1) {
      alert('You must have at least one brand partner.');
      return;
    }
    if (confirm('Are you sure you want to delete this brand?')) {
      deleteBrandItem(id);
      showToast('Brand deleted.');
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Authorized Brand Partners (Shop By Brands)
            </h3>
            <p className="text-xs text-neutral-500">
              Manage authorized brand logos with integrated size validation (ideal 200×80px or 400×160px transparent PNG or SVG).
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingBrand({
                id: `brand-${Date.now()}`,
                name: 'New Brand Partner',
                logo: 'BRAND',
                image: ''
              });
              setIsAddingNew(true);
              setValidationReport(null);
            }}
            className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 self-start sm:self-auto shadow-2xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Brand</span>
          </button>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {brandsList.map((brand, idx) => (
            <div
              key={brand.id || idx}
              className="bg-neutral-50/70 border border-neutral-200 rounded-xl p-3 flex flex-col justify-between items-center text-center gap-2 group hover:border-amber-400 transition-colors shadow-2xs"
            >
              <div className="w-full h-16 bg-white rounded-lg flex items-center justify-center p-2 overflow-hidden border border-neutral-200">
                {brand.image ? (
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-12 max-w-[100px] object-contain"
                  />
                ) : (
                  <span className="text-xs font-extrabold text-amber-600 font-['Outfit',sans-serif]">
                    {brand.logo || brand.name}
                  </span>
                )}
              </div>

              <div className="w-full">
                <h5 className="text-xs font-bold text-neutral-900 truncate">{brand.name}</h5>
              </div>

              <div className="flex items-center gap-1.5 pt-2 border-t border-neutral-200 w-full justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setEditingBrand(brand);
                    setIsAddingNew(false);
                    setValidationReport(null);
                  }}
                  className="p-1.5 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 rounded-lg transition-colors shadow-2xs"
                  title="Edit Brand"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(brand.id)}
                  className="p-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-neutral-300 hover:border-rose-300 rounded-lg transition-colors shadow-2xs"
                  title="Delete Brand"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT / CREATE BRAND MODAL */}
      {editingBrand && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-2xl max-w-md w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl text-neutral-900">
            <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-amber-500" />
              {isAddingNew ? 'Add Brand Partner' : `Edit Brand: ${editingBrand.name}`}
            </h4>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Brand Name</label>
                <input
                  type="text"
                  value={editingBrand.name}
                  onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 p-2 rounded-lg outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Brand Text Monogram
                </label>
                <input
                  type="text"
                  value={editingBrand.logo}
                  onChange={(e) => setEditingBrand({ ...editingBrand, logo: e.target.value })}
                  placeholder="e.g. GROWATT, LONGI"
                  className="w-full bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 p-2 rounded-lg outline-none focus:border-amber-400 font-mono focus:bg-white"
                />
              </div>

              {/* Image Upload & Size Validation */}
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Brand Logo Image (Recommended 200×80px, Max 1.5MB)
                </label>

                {editingBrand.image && (
                  <div className="h-16 bg-white rounded-lg p-2 flex items-center justify-center border border-neutral-200 mb-2">
                    <img
                      src={editingBrand.image}
                      alt="Brand preview"
                      className="max-h-12 max-w-full object-contain"
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingBrand.image || ''}
                    onChange={(e) => setEditingBrand({ ...editingBrand, image: e.target.value })}
                    placeholder="Image URL or upload"
                    className="flex-1 bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 p-2 rounded-lg outline-none focus:border-amber-400 focus:bg-white"
                  />
                  <label className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-800 border border-neutral-300 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleValidateAndUpload(e, (dataUrl) =>
                          setEditingBrand({ ...editingBrand, image: dataUrl })
                        )
                      }
                    />
                  </label>
                </div>

                {validationReport && (
                  <div
                    className={`mt-2 p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                      validationReport.isValid
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-rose-50 border-rose-300 text-rose-800'
                    }`}
                  >
                    {validationReport.isValid ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                    )}
                    <span>{validationReport.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => {
                  setEditingBrand(null);
                  setIsAddingNew(false);
                }}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl transition-colors border border-neutral-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSave(editingBrand)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Brand</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
