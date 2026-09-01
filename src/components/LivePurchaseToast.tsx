import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { LIVE_NOTIFICATIONS } from '../data/mockData';

export const LivePurchaseToast: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show after initial 3 seconds
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Cycle every 12 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % LIVE_NOTIFICATIONS.length);
        setIsVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const currentNotif = LIVE_NOTIFICATIONS[currentIdx];

  return (
    <div className="fixed bottom-16 sm:bottom-20 left-3 sm:left-4 z-40 max-w-[280px] sm:max-w-xs bg-white/95 backdrop-blur-md rounded-xl border border-neutral-200/90 shadow-xl p-2.5 flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-300">
      {/* Product Image Thumbnail matching video */}
      <div className="w-11 h-11 rounded-lg bg-neutral-100 p-0.5 border border-neutral-200 shrink-0 overflow-hidden">
        <img
          src={currentNotif.image}
          alt={currentNotif.productName}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 pr-1">
        <p className="text-[11px] font-bold text-neutral-900 truncate leading-tight">
          Purchased • {currentNotif.productName}
        </p>
        <p className="text-[10px] text-neutral-500 mt-0.5">
          {currentNotif.timeAgo} • <span className="text-amber-700 font-semibold">{currentNotif.location}</span>
        </p>
      </div>

      {/* Dismiss */}
      <button
        onClick={() => setIsDismissed(true)}
        className="text-neutral-400 hover:text-neutral-600 p-1 -mr-1"
        title="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
