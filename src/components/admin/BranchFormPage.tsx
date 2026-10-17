import React, { useState, useRef } from 'react';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { BranchLocation } from '../../types';

export interface BranchFormPageProps {
  branch: BranchLocation | null;
  onClose: () => void;
  onSave: (branch: Partial<BranchLocation>) => void;
}

export const BranchFormPage: React.FC<BranchFormPageProps> = ({
  branch,
  onClose,
  onSave
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(branch?.name || '');
  const [badge, setBadge] = useState(branch?.badge || 'Flagship Showroom');
  const [address, setAddress] = useState(branch?.address || '');
  const [landmark, setLandmark] = useState(branch?.landmark || '');
  const [phone, setPhone] = useState(branch?.phone || '+880 1712-345678');
  const [offDay, setOffDay] = useState(branch?.offDay || 'Friday');
  const [googleMapUrl, setGoogleMapUrl] = useState(branch?.googleMapUrl || '');
  const [image, setImage] = useState(
    branch?.image ||
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
  );

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
    if (!name.trim() || !address.trim()) {
      alert('Please fill in the branch name and address.');
      return;
    }

    const finalMapUrl =
      googleMapUrl.trim() ||
      `https://maps.google.com/?q=${encodeURIComponent(
        address + (landmark ? ' ' + landmark : '')
      )}`;

    onSave({
      name: name.trim(),
      badge: badge.trim(),
      address: address.trim(),
      landmark: landmark.trim(),
      phone: phone.trim(),
      offDay: offDay.trim(),
      googleMapUrl: finalMapUrl,
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
            <span>Back to Branches</span>
          </button>
          <div>
            <h2 className="text-base sm:text-xl font-black text-neutral-900 font-['Outfit',sans-serif] tracking-tight">
              {branch ? `Edit Outlet: ${branch.name}` : 'Add New Store Branch'}
            </h2>
            <p className="text-xs text-neutral-500">
              Configure showroom address, hotline, off-day schedule, and Google Maps pin
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
            <span>{branch ? 'Update Branch' : 'Save Branch'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-neutral-700 block mb-1 text-xs">Branch Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Motijheel Solar Flagship Hub"
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-neutral-700 block mb-1 text-xs">Outlet Badge</label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="e.g. Flagship Showroom, Service Center"
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-medium"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-neutral-700 block mb-1 text-xs">Full Address *</label>
          <textarea
            rows={2}
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. 42 Motijheel Commercial Area, Dhaka-1000"
            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-bold text-neutral-700 block mb-1 text-xs">Landmark</label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="e.g. Opposite to City Bank"
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white"
            />
          </div>

          <div>
            <label className="font-bold text-neutral-700 block mb-1 text-xs">Hotline Phone *</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 1712-345678"
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-neutral-700 block mb-1 text-xs">Weekly Off-Day</label>
            <input
              type="text"
              value={offDay}
              onChange={(e) => setOffDay(e.target.value)}
              placeholder="e.g. Friday"
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-neutral-700 block mb-1 text-xs">
            Google Maps Location URL
          </label>
          <input
            type="url"
            value={googleMapUrl}
            onChange={(e) => setGoogleMapUrl(e.target.value)}
            placeholder="https://maps.google.com/?q=..."
            className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 outline-none focus:border-amber-400 font-mono"
          />
        </div>

        {/* Showroom Photo with Gallery upload */}
        <div>
          <label className="font-bold text-neutral-700 block mb-1 text-xs">
            Storefront / Showroom Photo
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL or upload from device gallery"
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
            <div className="mt-3 w-48 h-28 rounded-xl overflow-hidden border border-neutral-200 relative">
              <img src={image} alt="Storefront preview" className="w-full h-full object-cover" />
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
            {branch ? 'Update Branch' : 'Save Branch'}
          </button>
        </div>
      </form>
    </div>
  );
};
