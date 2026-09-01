import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, X, ShoppingBag, Sun, Zap, Phone, ShieldCheck, Heart, SlidersHorizontal, Calculator, LayoutGrid, Layers, ChevronDown } from 'lucide-react';
import { Product } from '../types';
import { SEARCH_SUGGESTIONS } from '../data/mockData';

interface HeaderProps {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenCategoryDrawer: () => void;
  onOpenAuth: () => void;
  onOpenCalculator: () => void;
  onSelectProduct?: (product: Product) => void;
  onSearch: (query: string) => void;
  activeView: string;
  setActiveView: (view: any) => void;
  allProducts?: Product[];
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenCategoryDrawer,
  onOpenAuth,
  onOpenCalculator,
  onSelectProduct,
  onSearch,
  activeView,
  setActiveView,
  allProducts = [],
  searchQuery = '',
  setSearchQuery
}) => {
  const [internalQuery, setInternalQuery] = useState(searchQuery);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'Growatt 5kW Hybrid Inverter',
    'LONGi 585W Bifacial Solar Panel',
    'Felicity 48V Lithium Battery',
    'Luminous 1500VA IPS'
  ]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalQuery(searchQuery);
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSearchModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (internalQuery.trim()) {
      if (!searchHistory.includes(internalQuery.trim())) {
        setSearchHistory([internalQuery.trim(), ...searchHistory.slice(0, 5)]);
      }
      if (setSearchQuery) setSearchQuery(internalQuery.trim());
      onSearch(internalQuery.trim());
      setShowSearchModal(false);
      setActiveView('home');
    }
  };

  const handleSuggestionClick = (query: string) => {
    setInternalQuery(query);
    if (setSearchQuery) setSearchQuery(query);
    onSearch(query);
    setShowSearchModal(false);
    setActiveView('home');
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const filteredQuickProducts = internalQuery.trim()
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(internalQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(internalQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(internalQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-xs transition-all">
      {/* Top Notification Bar */}
      <div className="bg-neutral-950 text-neutral-200 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              Direct Factory Authorized Solar & IPS Megastore in Bangladesh
            </span>
            <span className="text-neutral-600">|</span>
            <span className="flex items-center gap-1 text-neutral-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Up to 25 Years Official Warranty Support
            </span>
          </div>
          <div className="flex items-center gap-5 text-neutral-300">
            <button
              onClick={onOpenCalculator}
              className="hover:text-amber-400 flex items-center gap-1 transition-colors text-amber-300 font-bold"
            >
              <Calculator className="w-3.5 h-3.5" />
              Solar Load Calculator
            </button>
            <a href="tel:09638001122" className="hover:text-amber-400 flex items-center gap-1 transition-colors font-medium">
              <Phone className="w-3 h-3 text-amber-400" />
              Hotline: <strong className="text-white font-bold">09638001122</strong> (10AM - 10PM)
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo & Category Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              setActiveView('home');
              if (setSearchQuery) setSearchQuery('');
              onSearch('');
              setInternalQuery('');
            }}
            className="flex items-center gap-2 group text-left focus:outline-none shrink-0"
          >
            <div className="relative flex items-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-amber-400 rounded-lg flex items-center justify-center shadow-md shadow-amber-400/30 group-hover:scale-105 transition-transform">
                <Sun className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
              </div>
              <div className="ml-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-950 font-['Outfit',sans-serif]">
                  solar<span className="text-amber-500">stock</span>
                  <span className="text-xs font-semibold align-super ml-0.5 text-neutral-500">™</span>
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-neutral-500 -mt-1 font-semibold">
                  Solar • IPS • Inverter
                </span>
              </div>
            </div>
          </button>

          {/* Prominent Category Button in Desktop Header */}
          <button
            onClick={onOpenCategoryDrawer}
            className="hidden md:flex items-center gap-2 bg-neutral-900 hover:bg-amber-400 text-white hover:text-neutral-950 px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-xs group"
            title="Browse All Categories & Subcategories"
          >
            <LayoutGrid className="w-4 h-4 text-amber-400 group-hover:text-neutral-950 stroke-[2.5]" />
            <span>Categories</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950" />
          </button>
        </div>

        {/* Search Bar matching video */}
        <div className="flex-1 max-w-xl relative mx-1 sm:mx-2">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              value={internalQuery}
              onChange={(e) => {
                setInternalQuery(e.target.value);
                if (setSearchQuery) setSearchQuery(e.target.value);
                setShowSearchModal(true);
              }}
              onFocus={() => setShowSearchModal(true)}
              className="w-full bg-neutral-100/90 hover:bg-neutral-100 focus:bg-white text-neutral-900 text-xs sm:text-sm pl-3 sm:pl-4 pr-12 py-2 sm:py-2.5 rounded-lg border border-neutral-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all placeholder:text-neutral-500 font-medium"
            />
            {internalQuery && (
              <button
                type="button"
                onClick={() => {
                  setInternalQuery('');
                  if (setSearchQuery) setSearchQuery('');
                  onSearch('');
                }}
                className="absolute right-12 text-neutral-400 hover:text-neutral-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-amber-400 hover:bg-amber-500 text-neutral-950 rounded-md flex items-center justify-center transition-colors shadow-xs"
              title="Search"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Search Dropdown / Recommendations Popup */}
          {showSearchModal && (
            <div
              ref={searchDropdownRef}
              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-neutral-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              {/* If user typed, show instant matching products */}
              {internalQuery.trim() && filteredQuickProducts.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Matching Products
                  </div>
                  <div className="space-y-1.5">
                    {filteredQuickProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          if (onSelectProduct) onSelectProduct(product);
                          setShowSearchModal(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-md border border-neutral-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-neutral-900 truncate">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-600">
                              ৳ {product.price.toLocaleString()}
                            </span>
                            <span className="text-[10px] line-through text-neutral-400">
                              ৳ {product.originalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended For You Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Recommended Searches
                  </span>
                  {searchHistory.length > 0 && (
                    <button
                      type="button"
                      onClick={clearHistory}
                      className="text-[11px] text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                    >
                      Reset History
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  {(searchHistory.length > 0 ? searchHistory : SEARCH_SUGGESTIONS.slice(0, 5)).map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSuggestionClick(item)}
                      className="w-full text-left flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-neutral-100 text-xs text-neutral-700 hover:text-neutral-950 transition-colors"
                    >
                      <Search className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="truncate">{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular categories quick tags */}
              <div className="mt-3 pt-3 border-t border-neutral-100">
                <span className="text-[11px] font-semibold text-neutral-400 block mb-2">
                  Popular Categories:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Hybrid Inverter', 'Solar Panels', 'IPS & UPS', 'Lithium Battery', 'Charge Controller'].map((cat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSuggestionClick(cat)}
                      className="text-[11px] bg-neutral-100 hover:bg-amber-100 hover:text-amber-900 text-neutral-700 px-2.5 py-1 rounded-full font-medium transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Action Buttons, Offers, Calculator, Cart & Category Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 mr-1 text-xs font-bold text-neutral-700">
            <button
              onClick={() => setActiveView('offers')}
              className={`px-2.5 py-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-colors ${
                activeView === 'offers' ? 'bg-amber-100 text-amber-900' : ''
              }`}
            >
              🎁 Offers
            </button>
            <button
              onClick={() => setActiveView('pre-order')}
              className={`px-2.5 py-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-colors ${
                activeView === 'pre-order' ? 'bg-amber-100 text-amber-900' : ''
              }`}
            >
              ⏱️ Pre-Order
            </button>
            <button
              onClick={() => setActiveView('locations')}
              className={`px-2.5 py-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-colors ${
                activeView === 'locations' ? 'bg-amber-100 text-amber-900' : ''
              }`}
            >
              📍 Outlets
            </button>
          </nav>

          {/* Solar Load Calculator shortcut button */}
          <button
            onClick={onOpenCalculator}
            className="hidden sm:flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 px-2.5 py-2 rounded-lg text-xs font-bold transition-colors"
            title="Solar Load & IPS Calculator"
          >
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>Calculator</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 sm:p-2.5 rounded-lg bg-neutral-100 hover:bg-amber-400 text-neutral-800 hover:text-neutral-950 transition-colors"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-neutral-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Category Drawer Menu Button (Top Right) matching screenshot */}
          <button
            onClick={onOpenCategoryDrawer}
            className="p-2 sm:p-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-900 transition-all flex items-center gap-1.5 shadow-2xs group"
            title="Open Category Menu"
          >
            <Menu className="w-5 h-5 stroke-[2.2] text-neutral-900 group-hover:text-amber-600" />
            <span className="text-xs font-extrabold uppercase hidden sm:inline-block tracking-wider text-neutral-800">
              Menu
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

