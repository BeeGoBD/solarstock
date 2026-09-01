import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { TrustBar } from './components/TrustBar';
import { HeroSlider } from './components/HeroSlider';
import { CategoryGrid } from './components/CategoryGrid';
import { FlashSaleSection } from './components/FlashSaleSection';
import { MiddlePromoBanners } from './components/MiddlePromoBanners';
import { BestDealsSection } from './components/BestDealsSection';
import { WhySolarstockBanner } from './components/WhySolarstockBanner';
import { RecentlyAddedSection } from './components/RecentlyAddedSection';
import { TrendingProductsSection } from './components/TrendingProductsSection';
import { BrandsSection } from './components/BrandsSection';
import { BlogSection } from './components/BlogSection';
import { StoreNarrativeSeo } from './components/StoreNarrativeSeo';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { CategoryDrawer } from './components/CategoryDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { PreOrderView } from './components/PreOrderView';
import { StoreLocationsView } from './components/StoreLocationsView';
import { OffersView } from './components/OffersView';
import { MessageDrawer } from './components/MessageDrawer';
import { LivePurchaseToast } from './components/LivePurchaseToast';
import { SolarCalculatorModal } from './components/SolarCalculatorModal';
import { ProductCard } from './components/ProductCard';
import { AdminDashboardModal } from './components/AdminDashboardModal';

import { Product, CartItem } from './types';
import { ArrowLeft, Filter, Sparkles, Sun, ShieldCheck } from 'lucide-react';

function StoreMainApp() {
  const {
    products,
    categories,
    branches,
    isAdminOpen,
    closeAdmin,
    brandConfig
  } = useStore();

  // Navigation View State
  const [activeView, setActiveView] = useState<'home' | 'offers' | 'pre-order' | 'locations'>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers State
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart State (stored in memory & initialized with sample item)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (products.length > 0) {
      return [
        {
          product: products[0],
          quantity: 1,
          selectedCapacity: '5kW (48V)',
          selectedColor: 'Solar White'
        }
      ];
    }
    return [];
  });

  // Wishlist State (persisted in localStorage)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('solarstock_wishlist');
      return saved ? JSON.parse(saved) : ['prod-growatt-5000es', 'prod-felicity-10kwh'];
    } catch {
      return ['prod-growatt-5000es'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('solarstock_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToCart = (
    product: Product,
    options?: {
      capacity?: string;
      color?: string;
      carePlanId?: string;
      includeBundle?: boolean;
    }
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedCapacity === options?.capacity &&
          item.selectedColor === options?.color &&
          item.selectedCarePlanId === options?.carePlanId &&
          item.includeBundle === options?.includeBundle
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: 1,
            selectedCapacity: options?.capacity,
            selectedColor: options?.color,
            selectedCarePlanId: options?.carePlanId,
            includeBundle: options?.includeBundle
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (
    product: Product,
    options?: {
      capacity?: string;
      color?: string;
      carePlanId?: string;
      includeBundle?: boolean;
    }
  ) => {
    handleAddToCart(product, options);
    setSelectedProduct(null);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
    } else {
      setCartItems((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Products for Search or Category Page
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategoryFilter ? p.category === selectedCategoryFilter : true;
    const matchesSearch = searchQuery.trim()
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const activeCategoryObj = categories.find((c) => c.id === selectedCategoryFilter);

  // Slices for front-page sections from dynamic store
  const bestDealsProducts = products.filter((p) => p.isDeal || p.discountPercent >= 15).slice(0, 10);
  const recentProducts = products.filter((p) => p.isNewArrival || p.isHot).slice(0, 8);
  const trendingProducts = products.filter((p) => (p.rating || 0) >= 4.7).slice(0, 8);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-400 selection:text-neutral-950">
      {/* 1. Global Header */}
      <Header
        onOpenCategoryDrawer={() => setIsCategoryDrawerOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v);
          setSelectedCategoryFilter(null);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* 2. Main Body Content Switcher */}
      <main className="flex-1 bg-white">
        {/* VIEW: Offers Page */}
        {activeView === 'offers' && (
          <OffersView
            onBackToHome={() => setActiveView('home')}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {/* VIEW: Pre-Order Page */}
        {activeView === 'pre-order' && (
          <PreOrderView onBackToHome={() => setActiveView('home')} />
        )}

        {/* VIEW: Store Locations Page */}
        {activeView === 'locations' && (
          <StoreLocationsView onBackToHome={() => setActiveView('home')} />
        )}

        {/* VIEW: Home or Category/Search Filtered Grid */}
        {activeView === 'home' && (
          <>
            {/* If searching or filtering by category, show dedicated filtered catalog */}
            {(selectedCategoryFilter || searchQuery.trim()) ? (
              <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6">
                {/* Active Filter Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-200 mb-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedCategoryFilter(null);
                        setSearchQuery('');
                      }}
                      className="p-2 rounded-xl bg-white border border-neutral-200 hover:bg-amber-100 text-neutral-800 transition-colors flex items-center gap-1.5 text-xs font-bold shadow-2xs"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Full Store</span>
                    </button>
                    <div>
                      <h1 className="text-base sm:text-xl font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
                        {searchQuery.trim()
                          ? `Search Results for "${searchQuery}"`
                          : activeCategoryObj?.name || 'Category Products'}
                      </h1>
                      <p className="text-xs text-neutral-500">
                        Showing {filteredProducts.length} certified solar equipment items
                      </p>
                    </div>
                  </div>

                  {selectedCategoryFilter && (
                    <button
                      onClick={() => setSelectedCategoryFilter(null)}
                      className="text-xs font-bold text-amber-700 bg-amber-100/80 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition-colors"
                    >
                      Clear Category Filter ×
                    </button>
                  )}
                </div>

                {/* Filtered Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
                    <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Filter className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      No products found matching your search.
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-4">
                      Try searching with different keywords like "Growatt", "5kW", "LiFePO4", or "Bifacial".
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategoryFilter(null);
                        setSearchQuery('');
                      }}
                      className="bg-amber-400 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onViewDetails={(p) => setSelectedProduct(p)}
                        onAddToCart={(p) => handleAddToCart(p)}
                        isWishlisted={wishlist.includes(product.id)}
                        onToggleWishlist={toggleWishlist}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Full Landing Page */
              <>
                {/* 1. Main Hero 4-Collab Fixed Corner Cards at the top */}
                <HeroSlider
                  onSelectProduct={(id) => {
                    const prod = products.find((p) => p.id === id);
                    if (prod) setSelectedProduct(prod);
                  }}
                  onExploreCategory={handleSelectCategory}
                />

                {/* 2. Shop by Category with Realistic Rendered Equipment Icons */}
                <CategoryGrid
                  onSelectCategory={handleSelectCategory}
                  onOpenAllCategories={() => setIsCategoryDrawerOpen(true)}
                />

                {/* 3. Flash Sale with Live Countdown */}
                <FlashSaleSection
                  onViewDetails={(p) => setSelectedProduct(p)}
                  onAddToCart={handleAddToCart}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                />

                {/* 4. Upgraded Trust & Guarantee Section */}
                <TrustBar />

                {/* 5. Middle Dual Promo Cards */}
                <MiddlePromoBanners
                  onSelectCategory={handleSelectCategory}
                />

                {/* 6. Best Deals Grid */}
                <BestDealsSection
                  products={bestDealsProducts}
                  onViewDetails={(p) => setSelectedProduct(p)}
                  onAddToCart={handleAddToCart}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                />

                {/* 7. Why Solarstock is #1 in Bangladesh */}
                <WhySolarstockBanner
                  onOpenTradeIn={() => setActiveView('pre-order')}
                  onOpenLocations={() => setActiveView('locations')}
                />

                {/* 8. Recently Added Section */}
                <RecentlyAddedSection
                  products={recentProducts}
                  onViewDetails={(p) => setSelectedProduct(p)}
                  onAddToCart={handleAddToCart}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                />

                {/* 9. Trending Products Section */}
                <TrendingProductsSection
                  products={trendingProducts}
                  onViewDetails={(p) => setSelectedProduct(p)}
                  onAddToCart={handleAddToCart}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                />

                {/* 10. Official Global Brands Slider */}
                <BrandsSection />

                {/* 11. Solar Engineering Blogs */}
                <BlogSection />

                {/* 12. Store Narrative Articles & FAQ Accordions */}
                <StoreNarrativeSeo />
              </>
            )}
          </>
        )}
      </main>

      {/* 3. Global Footer with 5-Click Admin Trigger on Logo */}
      <Footer
        onOpenLocations={() => {
          setActiveView('locations');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={handleSelectCategory}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* 4. Mobile Fixed Bottom Navigation Bar */}
      <BottomNav
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v as any);
          setSelectedCategoryFilter(null);
        }}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 5. Drawers & Modals */}
      {/* Category Drawer Sidebar */}
      <CategoryDrawer
        isOpen={isCategoryDrawerOpen}
        onClose={() => setIsCategoryDrawerOpen(false)}
        categories={categories}
        onSelectCategory={(id) => {
          handleSelectCategory(id);
          setIsCategoryDrawerOpen(false);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        allProducts={products}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onContinueShopping={() => {
          setIsCartOpen(false);
          setActiveView('home');
        }}
      />

      {/* Auth / Profile Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Solar & IPS Load Calculator Modal */}
      <SolarCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsCalculatorOpen(false);
        }}
        allProducts={products}
      />

      {/* Admin Dashboard Modal (Opens on 5 clicks of footer logo) */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={closeAdmin}
      />

      {/* Floating Right "Message" Tab & Contact Drawer */}
      <MessageDrawer />

      {/* Floating Periodic Recent Purchase Notification */}
      <LivePurchaseToast />
    </div>
  );
}

export function App() {
  return (
    <StoreProvider>
      <StoreMainApp />
    </StoreProvider>
  );
}

export default App;
