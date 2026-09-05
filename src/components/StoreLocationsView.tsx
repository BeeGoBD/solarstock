import React, { useState } from 'react';
import { ChevronRight, MapPin, Phone, Clock, Navigation, X, ShieldCheck, ExternalLink, Globe } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BranchLocation } from '../types';

interface StoreLocationsViewProps {
  onBackToHome: () => void;
}

export const StoreLocationsView: React.FC<StoreLocationsViewProps> = ({ onBackToHome }) => {
  const { branches } = useStore();
  const [selectedBranch, setSelectedBranch] = useState<BranchLocation | null>(null);
  const [modalMode, setModalMode] = useState<'map' | 'details' | null>(null);

  const handleOpenMap = (branch: BranchLocation) => {
    setSelectedBranch(branch);
    setModalMode('map');
  };

  const handleOpenDetails = (branch: BranchLocation) => {
    setSelectedBranch(branch);
    setModalMode('details');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 animate-in fade-in">
      {/* Breadcrumbs matching video (01:00) */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
        <button onClick={onBackToHome} className="hover:text-amber-600 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-neutral-900">Shop Location</span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-xl sm:text-3xl font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
          Solarstock Outlets & Solar Experience Centers
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Visit any of our nationwide branches for live inverter testing, battery health checkups, and instant warranty replacement.
        </p>
      </div>

      {/* Branches List matching video (01:00 - 01:09) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-md overflow-hidden flex flex-col justify-between transition-all group"
          >
            {/* Branch Image matching video */}
            <div className="relative aspect-[16/9] w-full bg-neutral-100 overflow-hidden">
              <img
                src={branch.image}
                alt={branch.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {branch.badge && (
                <div className="absolute top-3 left-3 bg-neutral-900/90 text-amber-400 text-[10px] font-extrabold px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                  {branch.badge}
                </div>
              )}
            </div>

            {/* Branch Details */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-extrabold text-neutral-950 font-['Outfit',sans-serif] leading-snug">
                  {branch.name}
                </h3>

                <div className="space-y-1.5 text-xs text-neutral-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                    <a href={`tel:${branch.phone.split('/')[0]}`} className="font-semibold text-neutral-900 hover:text-amber-600">
                      {branch.phone}
                    </a>
                  </div>

                  {branch.offDay && (
                    <div className="flex items-center gap-2 text-red-600 font-medium">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>Weekly Off-Day: {branch.offDay} (10:00 AM - 9:30 PM)</span>
                    </div>
                  )}

                  {branch.googleMapUrl && (
                    <div className="pt-1">
                      <a
                        href={branch.googleMapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-600 hover:text-sky-700 hover:underline"
                      >
                        <Globe className="w-3.5 h-3.5 text-sky-600" />
                        <span>View on Google Maps</span>
                        <ExternalLink className="w-3 h-3 text-neutral-400" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: SHOP MAP & SHOW DETAILS matching video (01:00) */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => handleOpenMap(branch)}
                  className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>SHOP MAP</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenDetails(branch)}
                  className="w-full py-2.5 px-3 rounded-xl bg-neutral-100 hover:bg-amber-100 text-neutral-900 hover:text-amber-950 text-xs font-bold transition-colors text-center"
                >
                  SHOW DETAILS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map / Details Popup Modal */}
      {selectedBranch && modalMode && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => {
                setSelectedBranch(null);
                setModalMode(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-amber-500" />
                <div>
                  <h3 className="text-lg font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
                    {selectedBranch.name}
                  </h3>
                  <p className="text-xs text-neutral-500">{selectedBranch.landmark}</p>
                </div>
              </div>

              {modalMode === 'map' ? (
                /* Simulated Google Map View */
                <div className="rounded-xl overflow-hidden border border-neutral-200 aspect-[16/10] bg-neutral-100 flex flex-col items-center justify-center p-4 text-center relative">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
                  <MapPin className="w-10 h-10 text-red-500 animate-bounce relative z-10" />
                  <span className="font-bold text-xs text-neutral-900 relative z-10 mt-2">
                    {selectedBranch.landmark}
                  </span>
                  <p className="text-[11px] text-neutral-500 max-w-xs relative z-10 mt-1">
                    {selectedBranch.address}
                  </p>
                  <a
                    href={selectedBranch.googleMapUrl || `https://maps.google.com/?q=${encodeURIComponent(selectedBranch.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 px-4 py-2 rounded-lg text-xs font-black relative z-10 inline-flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-neutral-950" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-neutral-950" />
                  </a>
                </div>
              ) : (
                /* Detailed Outlet Services */
                <div className="space-y-3 text-xs text-neutral-700 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Official SolarCare+ Service & Warranty Station</span>
                  </div>
                  <p>
                    <strong>Address:</strong> {selectedBranch.address}
                  </p>
                  <p>
                    <strong>Direct Branch Hotline:</strong> {selectedBranch.phone}
                  </p>
                  <p>
                    <strong>Working Hours:</strong> 10:00 AM to 09:30 PM
                  </p>
                  <p>
                    <strong>Weekly Holiday:</strong> {selectedBranch.offDay || 'Open 7 Days'}
                  </p>
                  <p>
                    <strong>Services:</strong> On-spot inverter testing, tubular battery acid gravity check, LiFePO4 firmware updates, trade-in exchange assessment, and technician booking.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
