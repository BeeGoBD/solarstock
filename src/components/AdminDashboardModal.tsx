import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Search,
  Package,
  Layers,
  Zap,
  Layout,
  MapPin,
  FileText,
  Settings,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  ExternalLink,
  Sliders,
  DollarSign,
  Tag,
  ShieldCheck,
  Phone,
  Mail,
  Globe,
  Check,
  ChevronDown,
  Crown,
  LogOut
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Category, BranchLocation } from '../types';
import { AdminHeroSlidesTab } from './admin/AdminHeroSlidesTab';
import { AdminSubCategoriesTab } from './admin/AdminSubCategoriesTab';
import { AdminBrandsTab } from './admin/AdminBrandsTab';
import { AdminContentSectionsTab } from './admin/AdminContentSectionsTab';
import { AdminSecurityTab } from './admin/AdminSecurityTab';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory
}) => {
  const {
    adminRole,
    logoutAdmin,
    products,
    categories,
    branches,
    heroBillboard,
    subBanners,
    flashSaleConfig,
    footerConfig,
    brandConfig,
    policies,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductFlashSale,
    toggleProductStock,
    addCategory,
    updateCategory,
    deleteCategory,
    addBranch,
    updateBranch,
    deleteBranch,
    updateHeroBillboard,
    updateSubBanners,
    updateFlashSaleConfig,
    updateFooterConfig,
    updateBrandConfig,
    updatePolicy,
    resetToDefaults
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'hero_slides'
    | 'subcategories'
    | 'brands'
    | 'content_sections'
    | 'products'
    | 'categories'
    | 'flashsale'
    | 'billboard'
    | 'branches'
    | 'footer'
    | 'branding'
    | 'security'
  >('overview');

  const [notification, setNotification] = useState<string | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  // Product Edit / Create Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  // Category Edit / Create Modal State
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);

  // Branch Edit / Create Modal State
  const [editingBranch, setEditingBranch] = useState<BranchLocation | null>(null);
  const [isNewBranchModalOpen, setIsNewBranchModalOpen] = useState(false);

  // Reset Confirmation State
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  if (!isOpen) return null;

  // Filtered Products for Product Tab (with null-safe fallbacks)
  const filteredProductsList = (products || []).filter((p) => {
    if (!p) return false;
    const pName = (p.name || '').toLowerCase();
    const pBrand = (p.brand || '').toLowerCase();
    const search = (productSearch || '').toLowerCase();
    const matchesSearch = pName.includes(search) || pBrand.includes(search);
    const matchesCategory =
      productCategoryFilter === 'all' ? true : p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-[100] bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-neutral-950 px-4 sm:px-6 py-3.5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20">
              <Zap className="w-5 h-5 fill-neutral-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white font-['Outfit',sans-serif] tracking-tight">
                  Solarstock Admin Master Panel
                </h2>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync Active
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  adminRole === 'boss'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {adminRole === 'boss' ? '👑 Master Admin (Boss)' : '⚡ Store Manager'}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Manage hero carousel, slide 3 showcase, sub-categories, brands, guarantees, products & store security
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Factory Reset */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="bg-neutral-800 hover:bg-rose-950 hover:text-rose-300 hover:border-rose-700 text-neutral-300 border border-neutral-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Reset all store data to factory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            {/* Admin Logout */}
            <button
              id="admin-logout-btn"
              onClick={() => {
                logoutAdmin();
                onClose();
              }}
              className="bg-neutral-800 hover:bg-rose-950 text-rose-400 hover:text-rose-300 border border-neutral-700 hover:border-rose-600/50 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              title="Log out of Admin Panel and return to store profile"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>

            {/* Exit & Return to Store */}
            <button
              onClick={onClose}
              className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md hover:scale-105"
            >
              <Eye className="w-4 h-4" />
              <span>Exit & View Live Store</span>
              <X className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Global Toast Notification */}
        {notification && (
          <div className="bg-amber-400 text-neutral-950 px-4 py-2 text-xs font-bold flex items-center justify-between shadow-sm animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 fill-neutral-950 text-amber-400" />
              <span>{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="p-0.5">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Navigation Tabs Header */}
        <div className="bg-neutral-900/90 border-b border-neutral-800 px-4 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0 text-xs">
          {[
            { id: 'overview', label: 'Dashboard', icon: Layout },
            { id: 'hero_slides', label: 'Hero & Slide 3', icon: Zap },
            { id: 'subcategories', label: 'Sub-Categories & SDG', icon: Layers },
            { id: 'brands', label: 'Brand Partners', icon: Tag },
            { id: 'content_sections', label: 'Guarantees & FAQs', icon: ShieldCheck },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'categories', label: `Categories (${categories.length})`, icon: Layers },
            { id: 'flashsale', label: 'Flash Sale', icon: Flame },
            { id: 'branches', label: `Store Branches (${branches.length})`, icon: MapPin },
            { id: 'footer', label: 'Footer & Policies', icon: FileText },
            { id: 'security', label: 'Security & Access', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-3 font-bold border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-amber-400 text-amber-400 bg-neutral-800/50'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Custom Editable Modules */}
          {activeTab === 'hero_slides' && <AdminHeroSlidesTab />}
          {activeTab === 'subcategories' && <AdminSubCategoriesTab />}
          {activeTab === 'brands' && <AdminBrandsTab />}
          {activeTab === 'content_sections' && <AdminContentSectionsTab />}
          {activeTab === 'security' && <AdminSecurityTab />}
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs font-semibold text-neutral-400 block mb-1">Total Live Products</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white">{products.length}</span>
                    <span className="text-xs text-amber-400 font-bold">Catalog</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs font-semibold text-neutral-400 block mb-1">Shop Categories</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-amber-400">{categories.length}</span>
                    <span className="text-xs text-neutral-400">Sections</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs font-semibold text-neutral-400 block mb-1">Flash Sale Items</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-rose-400">
                      {(flashSaleConfig?.activeProductIds || []).length}
                    </span>
                    <span className="text-xs text-rose-400/80 font-bold">Active Promo</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs font-semibold text-neutral-400 block mb-1">Store Branches</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-sky-400">{branches.length}</span>
                    <span className="text-xs text-sky-400 font-bold">Outlets</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Shortcuts */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800">
                <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider mb-3">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('products');
                      setIsNewProductModalOpen(true);
                    }}
                    className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-400/50 flex items-center gap-3 text-left transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-400 text-neutral-950 flex items-center justify-center shrink-0">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-amber-400">Add New Product</span>
                      <span className="text-[11px] text-neutral-400">Create new solar equipment</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('flashsale')}
                    className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-rose-400/50 flex items-center gap-3 text-left transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-rose-400">Manage Flash Sale</span>
                      <span className="text-[11px] text-neutral-400">Edit Beat The Clock timing</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('billboard')}
                    className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-sky-400/50 flex items-center gap-3 text-left transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-sky-400">Edit Billboard</span>
                      <span className="text-[11px] text-neutral-400">Change hero mega sale banners</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Products Snapshot */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-neutral-200">Catalog Preview</h3>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="text-xs text-amber-400 hover:underline font-semibold"
                  >
                    View & Edit All {products.length} Products →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {products.slice(0, 6).map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-3"
                    >
                      <img
                        src={p.images?.[0] || p.image || ''}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-lg bg-neutral-800 border border-neutral-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{p.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-black text-amber-400">৳ {(p.price || 0).toLocaleString()}</span>
                          <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.2 rounded">
                            {p.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGER */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              {/* Product Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <div className="flex flex-wrap items-center gap-2 flex-1 max-w-xl">
                  <div className="relative flex-1 min-w-[180px]">
                    <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search products by title or brand..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 text-xs rounded-lg pl-9 pr-3 py-2 text-white outline-none focus:border-amber-400"
                    />
                  </div>

                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="bg-neutral-900 border border-neutral-700 text-xs text-neutral-200 rounded-lg px-3 py-2 outline-none focus:border-amber-400"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setIsNewProductModalOpen(true)}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-900/80 text-neutral-400 uppercase font-mono text-[10px] border-b border-neutral-800">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price (BDT)</th>
                      <th className="p-3">Flash Sale</th>
                      <th className="p-3">Stock Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-850">
                    {filteredProductsList.map((prod) => {
                      const isInFlash = (flashSaleConfig?.activeProductIds || []).includes(prod.id);
                      const isOutOfStock = prod.isOutOfStock || prod.tag === 'Out of Stock';
                      return (
                        <tr key={prod.id} className="hover:bg-neutral-900/50 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.images?.[0] || prod.image || ''}
                                alt={prod.name}
                                className="w-10 h-10 object-cover rounded-lg bg-neutral-900 border border-neutral-800 shrink-0"
                              />
                              <div className="max-w-xs">
                                <span className="font-bold text-white block line-clamp-1">
                                  {prod.name}
                                </span>
                                <span className="text-[10px] text-neutral-400">
                                  Brand: <strong className="text-amber-400">{prod.brand}</strong>
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3">
                            <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-[11px] text-neutral-300 font-medium">
                              {categories.find((c) => c.id === prod.category)?.name || prod.category}
                            </span>
                          </td>

                          <td className="p-3">
                            <div className="font-mono">
                              <span className="font-black text-amber-400 block">
                                ৳ {prod.price.toLocaleString()}
                              </span>
                              {prod.originalPrice > prod.price && (
                                <span className="text-[10px] line-through text-neutral-500">
                                  ৳ {prod.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="p-3">
                            <button
                              onClick={() => {
                                toggleProductFlashSale(prod.id);
                                showToast(`Flash sale status updated for ${prod.name}`);
                              }}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-colors ${
                                isInFlash
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                                  : 'bg-neutral-900 text-neutral-500 border border-neutral-800 hover:text-neutral-300'
                              }`}
                            >
                              <Flame className="w-3 h-3" />
                              <span>{isInFlash ? 'In Flash Sale' : 'Add to Flash'}</span>
                            </button>
                          </td>

                          <td className="p-3">
                            <button
                              onClick={() => {
                                toggleProductStock(prod.id);
                                showToast(`Stock status updated for ${prod.name}`);
                              }}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                                !isOutOfStock
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                              }`}
                            >
                              {!isOutOfStock ? '● In Stock' : '✕ Out of Stock'}
                            </button>
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setEditingProduct(prod)}
                                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-neutral-800 hover:border-amber-400/40 transition-colors"
                                title="Edit Product"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${prod.name}" permanently?`)) {
                                    deleteProduct(prod.id);
                                    showToast(`Deleted ${prod.name}`);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-rose-950 text-rose-400 border border-neutral-800 hover:border-rose-600 transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES MANAGER */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <div>
                  <h3 className="text-sm font-bold text-white">Shop by Category Configuration</h3>
                  <p className="text-xs text-neutral-400">
                    Add, edit, rename, and manage subcategories for the main storefront
                  </p>
                </div>
                <button
                  onClick={() => setIsNewCategoryModalOpen(true)}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-3 group hover:border-amber-400/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono bg-neutral-900 text-amber-400 px-2 py-0.5 rounded border border-neutral-800">
                            {cat.id}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-medium">
                            {cat.itemCount}+ items
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingCategory(cat)}
                            className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-amber-400"
                            title="Edit Category"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete category "${cat.name}"?`)) {
                                deleteCategory(cat.id);
                                showToast(`Deleted category ${cat.name}`);
                              }
                            }}
                            className="p-1 rounded bg-neutral-900 hover:bg-rose-950 text-rose-400"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white">{cat.name}</h4>

                      {/* Subcategories tags */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {cat.subCategories?.map((sub, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded border border-neutral-800/80"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (onSelectCategory) onSelectCategory(cat.id);
                        onClose();
                      }}
                      className="w-full text-center text-xs text-amber-400 hover:text-amber-300 font-bold bg-neutral-900 hover:bg-neutral-850 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <span>View Products in Store</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FLASH SALE MANAGER */}
          {activeTab === 'flashsale' && (
            <div className="space-y-6">
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-rose-400">
                  <Flame className="w-5 h-5 fill-rose-400" />
                  <h3 className="text-base font-black uppercase tracking-tight font-['Outfit',sans-serif]">
                    Flash Sale Campaign & Countdown Timer
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1.5">
                      Flash Sale Banner Title
                    </label>
                    <input
                      type="text"
                      value={flashSaleConfig.title}
                      onChange={(e) => updateFlashSaleConfig({ title: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 text-xs rounded-lg p-2.5 text-white outline-none focus:border-amber-400 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1.5">
                      Flash Sale Subtitle Tag
                    </label>
                    <input
                      type="text"
                      value={flashSaleConfig.subtitle}
                      onChange={(e) => updateFlashSaleConfig({ subtitle: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 text-xs rounded-lg p-2.5 text-white outline-none focus:border-amber-400 font-medium"
                    />
                  </div>
                </div>

                {/* Countdown Settings */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-2">
                    Countdown Timer Duration (Hours : Minutes : Seconds)
                  </label>
                  <div className="flex items-center gap-3 max-w-sm">
                    <div className="flex-1">
                      <span className="text-[10px] text-neutral-400 block mb-1">Hours</span>
                      <input
                        type="number"
                        min="0"
                        max="99"
                        value={flashSaleConfig.countdownHours}
                        onChange={(e) =>
                          updateFlashSaleConfig({ countdownHours: parseInt(e.target.value) || 0 })
                        }
                        className="w-full bg-neutral-900 border border-neutral-700 text-xs rounded-lg p-2 text-white font-mono text-center"
                      />
                    </div>
                    <span className="text-neutral-500 font-black mt-4">:</span>
                    <div className="flex-1">
                      <span className="text-[10px] text-neutral-400 block mb-1">Minutes</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={flashSaleConfig.countdownMinutes}
                        onChange={(e) =>
                          updateFlashSaleConfig({ countdownMinutes: parseInt(e.target.value) || 0 })
                        }
                        className="w-full bg-neutral-900 border border-neutral-700 text-xs rounded-lg p-2 text-white font-mono text-center"
                      />
                    </div>
                    <span className="text-neutral-500 font-black mt-4">:</span>
                    <div className="flex-1">
                      <span className="text-[10px] text-neutral-400 block mb-1">Seconds</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={flashSaleConfig.countdownSeconds}
                        onChange={(e) =>
                          updateFlashSaleConfig({ countdownSeconds: parseInt(e.target.value) || 0 })
                        }
                        className="w-full bg-neutral-900 border border-neutral-700 text-xs rounded-lg p-2 text-white font-mono text-center"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast('Flash Sale settings updated successfully!')}
                    className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Flash Sale Settings</span>
                  </button>
                </div>
              </div>

              {/* Flash Sale Product Selector */}
              <div>
                <h4 className="text-sm font-bold text-white mb-2">
                  Select Products to Showcase in Flash Sale Grid
                </h4>
                <p className="text-xs text-neutral-400 mb-3">
                  Check or uncheck products to immediately add or remove them from the Flash Sale section
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {products.map((p) => {
                    const isChecked = (flashSaleConfig?.activeProductIds || []).includes(p.id);
                    return (
                      <div
                        key={p.id}
                        onClick={() => toggleProductFlashSale(p.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isChecked
                            ? 'bg-rose-950/30 border-rose-500/60 text-white'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={p.images?.[0] || p.image || ''}
                            alt={p.name}
                            className="w-9 h-9 object-cover rounded-md bg-neutral-900 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate">{p.name}</p>
                            <span className="text-[11px] text-amber-400 font-black">
                              ৳ {(p.price || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                            isChecked
                              ? 'bg-rose-500 border-rose-400 text-white'
                              : 'border-neutral-700 bg-neutral-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MEGA SALE BILLBOARD & BANNERS */}
          {activeTab === 'billboard' && (
            <div className="space-y-6">
              {/* Main Top Billboard */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Sliders className="w-5 h-5" />
                  <h3 className="text-base font-black uppercase tracking-tight font-['Outfit',sans-serif]">
                    Top Hero Mega Sale Billboard
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-neutral-300 block mb-1">Ribbon Top Tag</label>
                    <input
                      type="text"
                      value={heroBillboard.megaSaleRibbon}
                      onChange={(e) => updateHeroBillboard({ megaSaleRibbon: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white font-medium outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-300 block mb-1">Mega Sale Title</label>
                    <input
                      type="text"
                      value={heroBillboard.megaSaleTitle}
                      onChange={(e) => updateHeroBillboard({ megaSaleTitle: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white font-medium outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-300 block mb-1">Lowest Price Tag</label>
                    <input
                      type="text"
                      value={heroBillboard.lowestPriceTag}
                      onChange={(e) => updateHeroBillboard({ lowestPriceTag: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white font-medium outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-300 block mb-1">Guarantee Badge Title</label>
                    <input
                      type="text"
                      value={heroBillboard.guaranteeBadgeTitle}
                      onChange={(e) => updateHeroBillboard({ guaranteeBadgeTitle: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white font-medium outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-300 block mb-1">Guarantee Subtitle</label>
                    <input
                      type="text"
                      value={heroBillboard.guaranteeBadgeSubtitle}
                      onChange={(e) => updateHeroBillboard({ guaranteeBadgeSubtitle: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white font-medium outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-300 block mb-1">Free Delivery Label</label>
                    <input
                      type="text"
                      value={heroBillboard.freeDeliverySubtitle}
                      onChange={(e) => updateHeroBillboard({ freeDeliverySubtitle: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white font-medium outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast('Hero Billboard updated successfully!')}
                    className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Billboard Changes</span>
                  </button>
                </div>
              </div>

              {/* Sub Banners (Dual Promo Cards) */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Layout className="w-5 h-5" />
                  <h3 className="text-base font-black uppercase tracking-tight font-['Outfit',sans-serif]">
                    Dual Promo Cards Under Hero
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Left Banner */}
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2.5">
                    <h4 className="font-bold text-amber-400">Left Promo Card</h4>
                    <div>
                      <label className="text-neutral-400 block mb-1">Top Tag</label>
                      <input
                        type="text"
                        value={subBanners.leftBanner.topTag}
                        onChange={(e) =>
                          updateSubBanners({
                            leftBanner: { ...subBanners.leftBanner, topTag: e.target.value }
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Title</label>
                      <input
                        type="text"
                        value={subBanners.leftBanner.title}
                        onChange={(e) =>
                          updateSubBanners({
                            leftBanner: { ...subBanners.leftBanner, title: e.target.value }
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Guarantee Badge</label>
                      <input
                        type="text"
                        value={subBanners.leftBanner.guaranteeText}
                        onChange={(e) =>
                          updateSubBanners({
                            leftBanner: { ...subBanners.leftBanner, guaranteeText: e.target.value }
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white"
                      />
                    </div>
                  </div>

                  {/* Right Banner */}
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2.5">
                    <h4 className="font-bold text-cyan-400">Right Promo Card</h4>
                    <div>
                      <label className="text-neutral-400 block mb-1">Top Italic Script</label>
                      <input
                        type="text"
                        value={subBanners.rightBanner.topScript}
                        onChange={(e) =>
                          updateSubBanners({
                            rightBanner: { ...subBanners.rightBanner, topScript: e.target.value }
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Discount Tag</label>
                      <input
                        type="text"
                        value={subBanners.rightBanner.discountBadge}
                        onChange={(e) =>
                          updateSubBanners({
                            rightBanner: { ...subBanners.rightBanner, discountBadge: e.target.value }
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Store Locations Highlight</label>
                      <input
                        type="text"
                        value={subBanners.rightBanner.locationText}
                        onChange={(e) =>
                          updateSubBanners({
                            rightBanner: { ...subBanners.rightBanner, locationText: e.target.value }
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: STORE BRANCHES */}
          {activeTab === 'branches' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                <div>
                  <h3 className="text-sm font-bold text-white">Experience Center Outlets</h3>
                  <p className="text-xs text-neutral-400">
                    Physical stores displayed in header, footer, and locations view
                  </p>
                </div>
                <button
                  onClick={() => setIsNewBranchModalOpen(true)}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Store Branch</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {branches.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded">
                          {b.badge || 'Store Outlet'}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingBranch(b)}
                            className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-amber-400"
                            title="Edit Branch"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete branch "${b.name}"?`)) {
                                deleteBranch(b.id);
                                showToast(`Deleted ${b.name}`);
                              }
                            }}
                            className="p-1 rounded bg-neutral-900 hover:bg-rose-950 text-rose-400"
                            title="Delete Branch"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {b.image && (
                        <div className="w-full h-24 rounded-lg overflow-hidden mb-2.5 border border-neutral-800 bg-neutral-900">
                          <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <h4 className="text-sm font-bold text-white mb-1">{b.name}</h4>
                      <p className="text-xs text-neutral-400">{b.address}</p>
                      <p className="text-xs text-amber-400 font-mono mt-1.5">Hotline: {b.phone}</p>

                      {b.googleMapUrl && (
                        <div className="mt-2 pt-2 border-t border-neutral-900">
                          <a
                            href={b.googleMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-400 hover:text-sky-300 hover:underline"
                          >
                            <Globe className="w-3 h-3 text-sky-400" />
                            <span>View on Google Map</span>
                            <ExternalLink className="w-3 h-3 text-neutral-500" />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-neutral-500">
                      Weekly Off-day: <strong className="text-neutral-300">{b.offDay || 'None'}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: FOOTER & SITE POLICIES */}
          {activeTab === 'footer' && (
            <div className="space-y-6">
              {/* Footer Contact & Socials */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-4">
                <h3 className="text-base font-black text-amber-400 uppercase tracking-tight font-['Outfit',sans-serif]">
                  Footer Contact & Social Media
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-neutral-300 block mb-1">Customer Support Email</label>
                    <input
                      type="email"
                      value={footerConfig.email}
                      onChange={(e) => updateFooterConfig({ email: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-300 block mb-1">Hotline Phone Number</label>
                    <input
                      type="text"
                      value={footerConfig.hotline}
                      onChange={(e) => updateFooterConfig({ hotline: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-300 block mb-1">ISO Certification Tag</label>
                    <input
                      type="text"
                      value={footerConfig.isoText}
                      onChange={(e) => updateFooterConfig({ isoText: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-300 block mb-1">Facebook Page URL</label>
                    <input
                      type="text"
                      value={footerConfig.socialLinks.facebook}
                      onChange={(e) =>
                        updateFooterConfig({
                          socialLinks: { ...footerConfig.socialLinks, facebook: e.target.value }
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-300 block mb-1">WhatsApp Hotline URL</label>
                    <input
                      type="text"
                      value={footerConfig.socialLinks.whatsapp}
                      onChange={(e) =>
                        updateFooterConfig({
                          socialLinks: { ...footerConfig.socialLinks, whatsapp: e.target.value }
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-300 block mb-1">YouTube Channel URL</label>
                    <input
                      type="text"
                      value={footerConfig.socialLinks.youtube}
                      onChange={(e) =>
                        updateFooterConfig({
                          socialLinks: { ...footerConfig.socialLinks, youtube: e.target.value }
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast('Footer information updated!')}
                    className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Footer Settings</span>
                  </button>
                </div>
              </div>

              {/* Site Policies Editor */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-4">
                <h3 className="text-base font-black text-amber-400 uppercase tracking-tight font-['Outfit',sans-serif]">
                  Terms & Site Policies Content
                </h3>

                <div className="space-y-3">
                  {policies.map((pol) => (
                    <div key={pol.id} className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{pol.title}</span>
                        <span className="text-[10px] font-mono text-neutral-500">ID: {pol.id}</span>
                      </div>
                      <textarea
                        rows={3}
                        value={pol.content}
                        onChange={(e) => updatePolicy(pol.id, e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 text-xs rounded-lg p-2 text-neutral-200 outline-none focus:border-amber-400 font-sans"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: BRAND & GLOBAL SETTINGS */}
          {activeTab === 'branding' && (
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-4">
              <h3 className="text-base font-black text-amber-400 uppercase tracking-tight font-['Outfit',sans-serif]">
                Global Branding & Header Announcement
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="font-bold text-neutral-300 block mb-1">Logo Main Text</label>
                  <input
                    type="text"
                    value={brandConfig.logoMain}
                    onChange={(e) => updateBrandConfig({ logoMain: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-300 block mb-1">Logo Accent Text</label>
                  <input
                    type="text"
                    value={brandConfig.logoAccent}
                    onChange={(e) => updateBrandConfig({ logoAccent: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-300 block mb-1">Trademark Symbol</label>
                  <input
                    type="text"
                    value={brandConfig.logoSymbol}
                    onChange={(e) => updateBrandConfig({ logoSymbol: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-300 block mb-1">Top Announcement Bar Text</label>
                  <input
                    type="text"
                    value={brandConfig.announcementText}
                    onChange={(e) => updateBrandConfig({ announcementText: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-300 block mb-1">Currency Symbol</label>
                  <input
                    type="text"
                    value={brandConfig.currencySymbol}
                    onChange={(e) => updateBrandConfig({ currencySymbol: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => showToast('Brand configuration saved!')}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Branding Changes</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {(isNewProductModalOpen || editingProduct) && (
        <ProductFormModal
          product={editingProduct}
          categories={categories}
          onClose={() => {
            setIsNewProductModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={(prodData) => {
            if (editingProduct) {
              updateProduct(editingProduct.id, prodData);
              showToast(`Updated "${prodData.name}"`);
            } else {
              const created = addProduct(prodData as any);
              showToast(`Created new product "${created.name}"`);
            }
            setIsNewProductModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* MODAL: ADD / EDIT CATEGORY */}
      {(isNewCategoryModalOpen || editingCategory) && (
        <CategoryFormModal
          category={editingCategory}
          onClose={() => {
            setIsNewCategoryModalOpen(false);
            setEditingCategory(null);
          }}
          onSave={(catData) => {
            if (editingCategory) {
              updateCategory(editingCategory.id, catData);
              showToast(`Updated category "${catData.name}"`);
            } else {
              addCategory(catData as any);
              showToast(`Created category "${catData.name}"`);
            }
            setIsNewCategoryModalOpen(false);
            setEditingCategory(null);
          }}
        />
      )}

      {/* MODAL: ADD / EDIT BRANCH */}
      {(isNewBranchModalOpen || editingBranch) && (
        <BranchFormModal
          branch={editingBranch}
          onClose={() => {
            setIsNewBranchModalOpen(false);
            setEditingBranch(null);
          }}
          onSave={(branchData) => {
            if (editingBranch) {
              updateBranch(editingBranch.id, branchData);
              showToast(`Updated branch "${branchData.name}"`);
            } else {
              addBranch(branchData as any);
              showToast(`Created branch "${branchData.name}"`);
            }
            setIsNewBranchModalOpen(false);
            setEditingBranch(null);
          }}
        />
      )}

      {/* MODAL: RESET CONFIRMATION */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-md w-full p-6 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/40 text-rose-400 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Reset to Factory Defaults?</h3>
            <p className="text-xs text-neutral-400">
              This will restore all default products, categories, hero billboards, and store locations.
              Any custom products or edits created in this session will be replaced.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToDefaults();
                  setShowResetConfirm(false);
                  showToast('Store reset to factory defaults.');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Yes, Reset All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// SUB-COMPONENT: Product Add/Edit Modal Form
const ProductFormModal: React.FC<{
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: (prod: Partial<Product>) => void;
}> = ({ product, categories, onClose, onSave }) => {
  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || categories[0]?.id || 'ips-systems');
  const [subCategory, setSubCategory] = useState(product?.subCategory || '');
  const [brand, setBrand] = useState(product?.brand || 'SolarStock BD');
  const [price, setPrice] = useState(product?.price || 19990);
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice || 24990);
  const [warranty, setWarranty] = useState(product?.warranty || '2 Years SolarCare+ Replacement Guarantee');
  const [tag, setTag] = useState(product?.tag || 'Hot Product');
  const [image, setImage] = useState(
    product?.images[0] ||
      'https://images.unsplash.com/photo-1558441719-8b489c652790?auto=format&fit=crop&w=800&q=80'
  );
  const [shortDesc, setShortDesc] = useState(product?.shortDesc || '');
  const [description, setDescription] = useState(product?.description || '');
  const [isHot, setIsHot] = useState(product?.isHot ?? true);
  const [isOutOfStock, setIsOutOfStock] = useState(product?.isOutOfStock ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const discountPercent =
      originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    onSave({
      name,
      category,
      subCategory,
      brand,
      price: Number(price),
      originalPrice: Number(originalPrice),
      discountPercent,
      warranty,
      tag,
      images: [image, ...(product?.images.slice(1) || [])],
      shortDesc,
      description,
      isHot,
      isOutOfStock,
      rating: product?.rating || 4.9,
      reviewsCount: product?.reviewsCount || 1,
      specs: product?.specs || {
        'Warranty Support': warranty,
        'Brand': brand
      },
      highlights: product?.highlights || [
        'Official factory direct certified solar equipment',
        warranty
      ]
    });
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-700 text-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-base font-bold text-white">
            {product ? `Edit "${product.name}"` : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="p-1 rounded bg-neutral-800 text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-neutral-300 block mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400 font-medium"
              placeholder="e.g. SolarStock NEO 600L Smart Power Station"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-neutral-300 block mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400 font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-neutral-300 block mb-1">Subcategory</label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400"
                placeholder="e.g. Portable Power Station"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-neutral-300 block mb-1">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="font-bold text-neutral-300 block mb-1">Selling Price (৳)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-amber-400 font-bold outline-none focus:border-amber-400 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-neutral-300 block mb-1">Original / MRP Price (৳)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-neutral-300 outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-neutral-300 block mb-1">Product Tag / Badge</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400"
              >
                <option value="Hot Product">Hot Product</option>
                <option value="Beat The Clock">Beat The Clock</option>
                <option value="Top Selling">Top Selling</option>
                <option value="Best Deal">Best Deal</option>
                <option value="New Arrival">New Arrival</option>
                <option value="Limited Time Offer">Limited Time Offer</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-neutral-300 block mb-1">Warranty Term</label>
              <input
                type="text"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400"
                placeholder="e.g. 5 Years SolarCare+ Replacement"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-neutral-300 block mb-1">Primary Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-neutral-300 outline-none focus:border-amber-400 font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="font-bold text-neutral-300 block mb-1">Short Description</label>
            <textarea
              rows={2}
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-white outline-none focus:border-amber-400"
              placeholder="Brief summary displayed on listings..."
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isHot}
                onChange={(e) => setIsHot(e.target.checked)}
                className="w-4 h-4 accent-amber-400"
              />
              <span className="font-bold text-neutral-200">Highlight as Featured / Hot</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isOutOfStock}
                onChange={(e) => setIsOutOfStock(e.target.checked)}
                className="w-4 h-4 accent-rose-500"
              />
              <span className="font-bold text-rose-400">Mark as Out of Stock</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// SUB-COMPONENT: Category Add/Edit Modal Form
const CategoryFormModal: React.FC<{
  category: Category | null;
  onClose: () => void;
  onSave: (cat: Partial<Category>) => void;
}> = ({ category, onClose, onSave }) => {
  const [name, setName] = useState(category?.name || '');
  const [itemCount, setItemCount] = useState(category?.itemCount || 25);
  const [subCategoriesText, setSubCategoriesText] = useState(
    category?.subCategories?.join(', ') || 'Solar Equipment, Accessories, Inverters'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const subCategories = subCategoriesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      name,
      itemCount: Number(itemCount),
      subCategories,
      icon: category?.icon || 'Zap',
      image: ''
    });
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-700 text-white rounded-2xl max-w-md w-full p-5 space-y-4 animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-base font-bold text-white">
            {category ? `Edit "${category.name}"` : 'Add New Category'}
          </h3>
          <button onClick={onClose} className="p-1 rounded bg-neutral-800 text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-neutral-300 block mb-1">Category Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400 font-medium"
              placeholder="e.g. Lithium Phosphate"
            />
          </div>

          <div>
            <label className="font-bold text-neutral-300 block mb-1">Estimated Item Count</label>
            <input
              type="number"
              value={itemCount}
              onChange={(e) => setItemCount(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="font-bold text-neutral-300 block mb-1">
              Subcategories (comma separated)
            </label>
            <textarea
              rows={3}
              value={subCategoriesText}
              onChange={(e) => setSubCategoriesText(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-white outline-none focus:border-amber-400"
              placeholder="e.g. 48V 100Ah LiFePO4, 51.2V Powerwall, Portable Solar Pack"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Category</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// SUB-COMPONENT: Branch Add/Edit Modal Form
const BranchFormModal: React.FC<{
  branch: BranchLocation | null;
  onClose: () => void;
  onSave: (b: Partial<BranchLocation>) => void;
}> = ({ branch, onClose, onSave }) => {
  const [name, setName] = useState(branch?.name || '');
  const [badge, setBadge] = useState(branch?.badge || 'Store Outlet');
  const [address, setAddress] = useState(branch?.address || '');
  const [landmark, setLandmark] = useState(branch?.landmark || '');
  const [phone, setPhone] = useState(branch?.phone || '09638001122');
  const [offDay, setOffDay] = useState(branch?.offDay || 'Friday');
  const [googleMapUrl, setGoogleMapUrl] = useState(
    branch?.googleMapUrl || (branch?.address ? `https://maps.google.com/?q=${encodeURIComponent(branch.address)}` : '')
  );
  const [image, setImage] = useState(
    branch?.image ||
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return;

    const finalMapUrl =
      googleMapUrl.trim() || `https://maps.google.com/?q=${encodeURIComponent(address + (landmark ? ' ' + landmark : ''))}`;

    onSave({
      name,
      badge,
      address,
      landmark,
      phone,
      offDay,
      googleMapUrl: finalMapUrl,
      image
    });
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-700 text-white rounded-2xl max-w-lg w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-base font-bold text-white">
            {branch ? `Edit "${branch.name}"` : 'Add New Branch Outlet'}
          </h3>
          <button onClick={onClose} className="p-1 rounded bg-neutral-800 text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-bold text-neutral-300 block mb-1">Branch Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400 font-medium"
              placeholder="e.g. Solarstock Flagship - Bashundhara City"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-neutral-300 block mb-1">Badge / Tag</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400"
                placeholder="e.g. Flagship Store"
              />
            </div>
            <div>
              <label className="font-bold text-neutral-300 block mb-1">Weekly Off-Day</label>
              <input
                type="text"
                value={offDay}
                onChange={(e) => setOffDay(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400"
                placeholder="e.g. Tuesday"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-neutral-300 block mb-1">Full Address *</label>
            <textarea
              rows={2}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-white outline-none focus:border-amber-400"
              placeholder="Shop No, Level, Mall name, Area, City"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-neutral-300 block mb-1">Landmark</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400"
                placeholder="e.g. Panthapath, Dhaka"
              />
            </div>
            <div>
              <label className="font-bold text-neutral-300 block mb-1">Hotline Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400"
                placeholder="e.g. 09638001122"
              />
            </div>
          </div>

          {/* Google Map Link Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-neutral-300 block">Google Map Link / Location URL *</label>
              {address && (
                <button
                  type="button"
                  onClick={() => setGoogleMapUrl(`https://maps.google.com/?q=${encodeURIComponent(address + (landmark ? ' ' + landmark : ''))}`)}
                  className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Globe className="w-3 h-3" />
                  Auto-generate from Address
                </button>
              )}
            </div>
            <input
              type="text"
              value={googleMapUrl}
              onChange={(e) => setGoogleMapUrl(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400 font-mono text-[11px]"
              placeholder="https://maps.google.com/?q=..."
            />
            <p className="text-[10px] text-neutral-400 mt-1">
              Customers can tap this link on the Store Locations page to view your shop on Google Maps directly.
            </p>
          </div>

          {/* Shop Photo Upload / URL */}
          <div>
            <label className="font-bold text-neutral-300 block mb-1">Store / Shop Photo</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-white outline-none focus:border-amber-400 text-xs"
                placeholder="Image URL or upload below"
              />
              <label className="shrink-0 bg-neutral-800 hover:bg-neutral-700 text-amber-400 px-3 py-2 rounded-lg font-bold cursor-pointer transition-colors border border-neutral-700">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (typeof reader.result === 'string') setImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
            {image && (
              <div className="mt-2 w-full h-24 rounded-lg overflow-hidden border border-neutral-800 relative bg-neutral-950">
                <img src={image} alt="Shop preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-2 text-[9px] bg-black/75 px-1.5 py-0.5 rounded text-neutral-300">
                  Shop Photo Preview
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Branch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
