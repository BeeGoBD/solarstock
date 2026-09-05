import React from 'react';
import { Gift, ShoppingCart, User, Clock, MapPin, ShieldAlert } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface BottomNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeView,
  setActiveView,
  cartCount,
  onOpenCart,
  onOpenAuth
}) => {
  const { adminRole, openAdmin } = useStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-lg px-2 py-1.5 flex items-center justify-around md:hidden">
      {/* OFFER */}
      <button
        onClick={() => setActiveView('offers')}
        className={`flex flex-col items-center justify-center p-1 rounded-lg transition-colors flex-1 ${
          activeView === 'offers' ? 'text-amber-700 font-black' : 'text-neutral-600 hover:text-neutral-900'
        }`}
      >
        <div className="relative">
          <Gift className="w-5 h-5 stroke-[2]" />
          {activeView === 'offers' && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-600" />
          )}
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
          OFFER
        </span>
      </button>

      {/* CART */}
      <button
        onClick={onOpenCart}
        className={`flex flex-col items-center justify-center p-1 rounded-lg transition-colors flex-1 ${
          activeView === 'cart' ? 'text-amber-700 font-black' : 'text-neutral-600 hover:text-neutral-900'
        }`}
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5 stroke-[2]" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-amber-400 text-neutral-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
          CART
        </span>
      </button>

      {/* PROFILE / ADMIN */}
      <button
        onClick={() => {
          if (adminRole) {
            openAdmin();
          } else {
            onOpenAuth();
          }
        }}
        className={`flex flex-col items-center justify-center p-1 rounded-lg transition-colors flex-1 ${
          adminRole ? 'text-amber-600 font-black' : activeView === 'profile' ? 'text-amber-700 font-black' : 'text-neutral-600 hover:text-neutral-900'
        }`}
      >
        <div className="relative">
          {adminRole ? (
            <ShieldAlert className="w-5 h-5 stroke-[2.2] text-amber-600" />
          ) : (
            <User className="w-5 h-5 stroke-[2]" />
          )}
          {adminRole && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
          {adminRole ? 'ADMIN' : 'PROFILE'}
        </span>
      </button>

      {/* PRE-ORDER */}
      <button
        onClick={() => setActiveView('pre-order')}
        className={`flex flex-col items-center justify-center p-1 rounded-lg transition-colors flex-1 ${
          activeView === 'pre-order' ? 'text-amber-700 font-black' : 'text-neutral-600 hover:text-neutral-900'
        }`}
      >
        <div className="relative">
          <Clock className="w-5 h-5 stroke-[2]" />
          {activeView === 'pre-order' && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-600" />
          )}
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
          PRE-ORDER
        </span>
      </button>

      {/* LOCATION */}
      <button
        onClick={() => setActiveView('locations')}
        className={`flex flex-col items-center justify-center p-1 rounded-lg transition-colors flex-1 ${
          activeView === 'locations' ? 'text-amber-700 font-black' : 'text-neutral-600 hover:text-neutral-900'
        }`}
      >
        <div className="relative">
          <MapPin className="w-5 h-5 stroke-[2]" />
          {activeView === 'locations' && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-600" />
          )}
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
          LOCATION
        </span>
      </button>
    </div>
  );
};
