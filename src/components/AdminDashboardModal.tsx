import React, { useState, useRef } from 'react';
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
  LogOut,
  Building2,
  Menu,
  ChevronRight,
  SlidersHorizontal,
  ArrowLeft,
  Upload,
  FolderPlus,
  Image as ImageIcon
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Category, BranchLocation } from '../types';
import { AdminHeroSlidesTab } from './admin/AdminHeroSlidesTab';
import { AdminSubCategoriesTab } from './admin/AdminSubCategoriesTab';
import { AdminBrandsTab } from './admin/AdminBrandsTab';
import { AdminContentSectionsTab } from './admin/AdminContentSectionsTab';
import { AdminSecurityTab } from './admin/AdminSecurityTab';
import { AdminCustomersTab } from './admin/AdminCustomersTab';
import { ProductFormPage } from './admin/ProductFormPage';
import { CategoryFormPage } from './admin/CategoryFormPage';
import { BranchFormPage } from './admin/BranchFormPage';

export type AdminTabId =
  | 'overview'
  | 'hero_slides'
  | 'subcategories'
  | 'brands'
  | 'content_sections'
  | 'products'
  | 'add_product'
  | 'edit_product'
  | 'categories'
  | 'add_category'
  | 'edit_category'
  | 'customers'
  | 'flashsale'
  | 'billboard'
  | 'branches'
  | 'add_branch'
  | 'edit_branch'
  | 'footer'
  | 'branding'
  | 'security';

export interface NavItem {
  id: AdminTabId;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeAlert?: boolean;
  desc: string;
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

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
    customerAccounts,
    customerSignupRequests,
    resetToDefaults
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTabId>('overview');

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [sidebarFilter, setSidebarFilter] = useState('');

  const [notification, setNotification] = useState<string | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  // Product / Category / Branch Edit State for Dedicated Page Views
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingBranch, setEditingBranch] = useState<BranchLocation | null>(null);

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

  const pendingCustomerCount = customerSignupRequests.filter((r) => r.status === 'pending').length;

  const navigationGroups: NavGroup[] = [
    {
      group: 'Core',
      items: [
        {
          id: 'overview' as const,
          label: 'Dashboard Overview',
          shortLabel: 'Overview',
          icon: Layout,
          desc: 'Key metrics, catalog preview & quick actions'
        }
      ]
    },
    {
      group: 'Catalog & Inventory',
      items: [
        {
          id: 'products' as const,
          label: 'Products Catalog',
          shortLabel: 'Catalog',
          icon: Package,
          badge: products.length,
          desc: 'Equipment pricing, stock & specs'
        },
        {
          id: 'add_product' as const,
          label: 'Upload New Product',
          shortLabel: 'Upload Product',
          icon: Plus,
          desc: 'Upload images from gallery & publish'
        },
        {
          id: 'categories' as const,
          label: 'Main Categories',
          shortLabel: 'Categories',
          icon: Layers,
          badge: categories.length,
          desc: 'Solar store category taxonomy'
        },
        {
          id: 'subcategories' as const,
          label: 'Sub-Categories & SDG',
          shortLabel: 'Sub-Categories',
          icon: SlidersHorizontal,
          desc: 'Product tags & clean energy SDG goals'
        },
        {
          id: 'brands' as const,
          label: 'Brand Partners',
          shortLabel: 'Brands',
          icon: Tag,
          desc: 'Inverter & panel manufacturers'
        }
      ]
    },
    {
      group: 'Merchandising & Storefront',
      items: [
        {
          id: 'hero_slides' as const,
          label: 'Hero & Slide 3',
          shortLabel: 'Hero Showcase',
          icon: Zap,
          desc: 'Homepage billboard slides & cards'
        },
        {
          id: 'flashsale' as const,
          label: 'Flash Sale Promo',
          shortLabel: 'Flash Sale',
          icon: Flame,
          badge: (flashSaleConfig?.activeProductIds || []).length > 0 ? `${(flashSaleConfig?.activeProductIds || []).length} Active` : undefined,
          badgeAlert: (flashSaleConfig?.activeProductIds || []).length > 0,
          desc: 'Beat the Clock countdown & deals'
        },
        {
          id: 'content_sections' as const,
          label: 'Guarantees & FAQs',
          shortLabel: 'Guarantees / FAQ',
          icon: ShieldCheck,
          desc: 'Why SolarStock, trust seals & help'
        }
      ]
    },
    {
      group: 'Operations & Outlets',
      items: [
        {
          id: 'customers' as const,
          label: 'Customer Approvals',
          shortLabel: 'Customer Accounts',
          icon: Building2,
          badge: pendingCustomerCount > 0 ? `${pendingCustomerCount} New` : `${customerAccounts.length}`,
          badgeAlert: pendingCustomerCount > 0,
          desc: 'B2B/Dealer verification & approval'
        },
        {
          id: 'branches' as const,
          label: 'Store Branches',
          shortLabel: 'Branches',
          icon: MapPin,
          badge: branches.length,
          desc: 'Showrooms, hubs & Google Maps'
        }
      ]
    },
    {
      group: 'System & Configuration',
      items: [
        {
          id: 'footer' as const,
          label: 'Footer & Policies',
          shortLabel: 'Footer / Policy',
          icon: FileText,
          desc: 'Hotlines, social links, terms & warranty'
        },
        {
          id: 'branding' as const,
          label: 'Store Branding',
          shortLabel: 'Branding',
          icon: Sliders,
          desc: 'Store brand name, hotline & tagline'
        },
        {
          id: 'security' as const,
          label: 'Security & Access',
          shortLabel: 'Security',
          icon: Settings,
          desc: 'Admin passwords, PINs & role guards'
        }
      ]
    }
  ];

  const allNavItems: NavItem[] = navigationGroups.flatMap((g) => g.items);
  const fallbackItem: NavItem =
    activeTab === 'edit_product'
      ? {
          id: 'edit_product',
          label: `Edit Product${editingProduct ? `: ${editingProduct.name}` : ''}`,
          shortLabel: 'Edit Product',
          icon: Edit2,
          desc: 'Modify specifications, prices, and gallery photos'
        }
      : activeTab === 'add_category'
      ? {
          id: 'add_category',
          label: 'Add New Category',
          shortLabel: 'New Category',
          icon: Plus,
          desc: 'Create category taxonomy and subcategories'
        }
      : activeTab === 'edit_category'
      ? {
          id: 'edit_category',
          label: `Edit Category${editingCategory ? `: ${editingCategory.name}` : ''}`,
          shortLabel: 'Edit Category',
          icon: Edit2,
          desc: 'Update category taxonomy and subcategories'
        }
      : activeTab === 'add_branch'
      ? {
          id: 'add_branch',
          label: 'Add Store Branch',
          shortLabel: 'New Branch',
          icon: Plus,
          desc: 'Add retail showroom outlet'
        }
      : activeTab === 'edit_branch'
      ? {
          id: 'edit_branch',
          label: `Edit Branch${editingBranch ? `: ${editingBranch.name}` : ''}`,
          shortLabel: 'Edit Branch',
          icon: Edit2,
          desc: 'Update outlet address and photo'
        }
      : allNavItems[0];

  const activeItemInfo: NavItem = allNavItems.find((item) => item.id === activeTab) || fallbackItem;
  const activeGroup = navigationGroups.find((g) => g.items.some((item) => item.id === activeTab)) || {
    group: activeTab.includes('product')
      ? 'Catalog & Inventory'
      : activeTab.includes('category')
      ? 'Catalog & Inventory'
      : activeTab.includes('branch')
      ? 'Operations & Outlets'
      : 'Management',
    items: []
  };

  const filteredGroups = navigationGroups.map((g) => ({
    ...g,
    items: g.items.filter((item) => {
      if (!sidebarFilter.trim()) return true;
      const q = sidebarFilter.toLowerCase();
      return (
        item.label.toLowerCase().includes(q) ||
        item.shortLabel.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        g.group.toLowerCase().includes(q)
      );
    })
  })).filter((g) => g.items.length > 0);

  return (
    <div className="h-screen w-full bg-neutral-950 flex flex-col text-neutral-900 antialiased overflow-hidden selection:bg-amber-400 selection:text-neutral-950">
      {/* Top Header Bar */}
      <header className="bg-neutral-950 text-white px-3 sm:px-6 py-2.5 sm:py-3 border-b border-neutral-800 flex items-center justify-between gap-3 shrink-0 shadow-md z-40">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Sidebar Toggle Button */}
          <button
            onClick={() => setIsMobileSidebarOpen((prev) => !prev)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-xl hover:bg-neutral-850 transition-colors cursor-pointer border border-neutral-800"
            title="Toggle Navigation Menu"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Brand Mark & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20 shrink-0">
              <Zap className="w-5 h-5 fill-neutral-950 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm sm:text-base font-black text-white font-['Outfit',sans-serif] tracking-tight truncate">
                  Solarstock Operations
                </h1>
                <span className="hidden sm:inline-flex bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
                <span className="hidden lg:inline-flex bg-neutral-900 border border-neutral-800 text-[10px] font-mono px-2 py-0.5 rounded-full text-amber-400 items-center gap-1">
                  <span className="text-neutral-500">domain:</span>
                  <span>solarstock.bd/admin</span>
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full hidden md:inline-flex items-center gap-1 border ${
                    adminRole === 'boss'
                      ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                      : 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40'
                  }`}
                >
                  {adminRole === 'boss' ? '👑 Master Admin' : '⚡ Store Manager'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Factory Reset Defaults */}
          <button
            onClick={() => setShowResetConfirm(true)}
            className="bg-neutral-900 hover:bg-rose-950/40 text-neutral-400 hover:text-rose-300 hover:border-rose-500/40 border border-neutral-800 px-3 py-1.5 rounded-xl text-xs font-semibold hidden sm:flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset all store data to factory defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          {/* Admin Logout */}
          <button
            id="admin-logout-btn"
            onClick={() => {
              logoutAdmin();
              onClose();
            }}
            className="bg-neutral-900 hover:bg-rose-900/40 text-neutral-300 hover:text-rose-200 border border-neutral-800 hover:border-rose-600/60 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Log out of Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* Exit & Return to Live Store */}
          <button
            onClick={onClose}
            className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-3.5 sm:px-4 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md hover:scale-102 cursor-pointer shrink-0"
            title="Return to SolarStock Public Storefront"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Exit to Store</span>
            <X className="w-3.5 h-3.5 ml-0.5 text-neutral-900" />
          </button>
        </div>
      </header>

      {/* Global Toast Notification */}
      {notification && (
        <div className="bg-amber-400 text-neutral-950 px-6 py-2 text-xs font-bold flex items-center justify-between shadow-md shrink-0 z-45">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 fill-neutral-950 text-amber-400" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="p-0.5 hover:opacity-75">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Workspace Layout (Left Sidebar + Right Content) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Backdrop Overlay */}
        {isMobileSidebarOpen && (
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-45 lg:hidden animate-in fade-in"
          />
        )}

        {/* LEFT NAVIGATION SIDEBAR */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-72 sm:w-80 lg:w-72 xl:w-76 shrink-0 bg-neutral-950 border-r border-neutral-800 text-neutral-300 flex flex-col h-full transition-transform duration-200 ease-in-out shadow-2xl lg:shadow-none ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Mobile Drawer Header */}
          <div className="p-3.5 border-b border-neutral-800/80 flex items-center justify-between lg:hidden bg-neutral-900">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-400 text-neutral-950 flex items-center justify-center font-black">
                <Zap className="w-4 h-4 fill-neutral-950" />
              </div>
              <span className="font-bold text-xs text-white uppercase tracking-wider">
                Admin Menu
              </span>
            </div>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Option Filter Search Bar */}
          <div className="p-3 border-b border-neutral-900 shrink-0 bg-neutral-950">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter menu options..."
                value={sidebarFilter}
                onChange={(e) => setSidebarFilter(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 text-xs rounded-xl pl-8.5 pr-8 py-2 text-neutral-200 placeholder-neutral-500 outline-none focus:border-amber-400 focus:bg-neutral-850 transition-colors"
              />
              {sidebarFilter && (
                <button
                  onClick={() => setSidebarFilter('')}
                  className="absolute right-2.5 top-2 text-neutral-400 hover:text-white p-0.5"
                  title="Clear filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Grouped Options Navigation List */}
          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5 scrollbar-thin scrollbar-thumb-neutral-800">
            {filteredGroups.map((group) => (
              <div key={group.group} className="space-y-1">
                <span className="px-3 text-[10px] font-black uppercase tracking-wider text-neutral-500 block">
                  {group.group}
                </span>

                <div className="space-y-1 mt-1.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(item.id as any);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all text-left group cursor-pointer ${
                          isActive
                            ? 'bg-amber-400 text-neutral-950 font-black shadow-md shadow-amber-400/10'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-900 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? 'bg-neutral-950 text-amber-400 shadow-2xs'
                                : 'bg-neutral-900 text-neutral-400 group-hover:text-white group-hover:bg-neutral-800'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="block truncate font-semibold leading-tight">
                              {item.label}
                            </span>
                            <span
                              className={`block truncate text-[10px] ${
                                isActive ? 'text-neutral-900/80' : 'text-neutral-500 group-hover:text-neutral-400'
                              }`}
                            >
                              {item.shortLabel}
                            </span>
                          </div>
                        </div>

                        {/* Badges / Active Arrow */}
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {item.badge !== undefined && (
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isActive
                                  ? 'bg-neutral-950 text-amber-400'
                                  : item.badgeAlert
                                  ? 'bg-amber-400 text-neutral-950 font-black animate-pulse'
                                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-transform ${
                              isActive ? 'text-neutral-950 translate-x-0.5' : 'text-neutral-600 group-hover:text-neutral-400'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredGroups.length === 0 && (
              <div className="text-center py-8 px-4 text-neutral-500 text-xs">
                <p>No options match "{sidebarFilter}"</p>
                <button
                  onClick={() => setSidebarFilter('')}
                  className="mt-2 text-amber-400 hover:underline font-bold text-xs"
                >
                  Clear filter
                </button>
              </div>
            )}
          </nav>

          {/* Sidebar Footer: Active Admin Profile Card */}
          <div className="p-3 border-t border-neutral-800/80 bg-neutral-950/80 shrink-0">
            <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center font-black shrink-0">
                  <Crown className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block truncate">
                    {adminRole === 'boss' ? 'Master Admin' : 'Store Manager'}
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Authorized Access
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  logoutAdmin();
                  onClose();
                }}
                className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 rounded-lg transition-colors shrink-0"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT VIEWPORT */}
        <main className="flex-1 min-w-0 bg-neutral-100 flex flex-col h-full overflow-y-auto">
          {/* Active View Top Banner */}
          <div className="bg-white border-b border-neutral-200 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs shrink-0 sticky top-0 z-20">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-0.5">
                <span>Console</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                <span>{activeGroup?.group || 'Section'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                <span className="font-bold text-neutral-900 truncate">{activeItemInfo.label}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-neutral-900 font-['Outfit',sans-serif] tracking-tight">
                {activeItemInfo.label}
              </h2>
            </div>

            {/* Contextual Action Buttons in View Top Banner */}
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {activeTab === 'products' && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setActiveTab('add_product');
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Product</span>
                </button>
              )}
              {activeTab === 'categories' && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCategory(null);
                    setActiveTab('add_category');
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              )}
              {activeTab === 'branches' && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingBranch(null);
                    setActiveTab('add_branch');
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Branch</span>
                </button>
              )}
              {activeTab === 'customers' && pendingCustomerCount > 0 && (
                <span className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>{pendingCustomerCount} Pending Approval</span>
                </span>
              )}
            </div>
          </div>

          {/* Inline Reset Defaults Confirmation Banner (No Hovering Modal) */}
          {showResetConfirm && (
            <div className="bg-rose-50 border-b border-rose-300 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 animate-in fade-in shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Reset Entire Store to Factory Defaults?</h4>
                  <p className="text-[11px] text-neutral-600">
                    This will restore all default equipment, hero slides, and branches. Custom edits will be replaced.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-bold border border-neutral-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetToDefaults();
                    setShowResetConfirm(false);
                    showToast('Store reset to factory defaults.');
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Yes, Reset All Data
                </button>
              </div>
            </div>
          )}

          {/* Tab Content Body */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
            {/* Custom Editable Modules */}
            {activeTab === 'hero_slides' && <AdminHeroSlidesTab />}
            {activeTab === 'subcategories' && <AdminSubCategoriesTab />}
            {activeTab === 'brands' && <AdminBrandsTab />}
            {activeTab === 'content_sections' && <AdminContentSectionsTab />}
            {activeTab === 'security' && <AdminSecurityTab />}
            {activeTab === 'customers' && <AdminCustomersTab showToast={showToast} />}

            {/* Dedicated Product Add/Edit Full-Page Views (No Hovering Modal) */}
            {activeTab === 'add_product' && (
              <ProductFormPage
                product={null}
                categories={categories}
                onClose={() => setActiveTab('products')}
                onSave={(prodData) => {
                  const created = addProduct(prodData as any);
                  showToast(`Created new product "${created.name}"`);
                  setActiveTab('products');
                }}
              />
            )}
            {activeTab === 'edit_product' && editingProduct && (
              <ProductFormPage
                product={editingProduct}
                categories={categories}
                onClose={() => {
                  setEditingProduct(null);
                  setActiveTab('products');
                }}
                onSave={(prodData) => {
                  updateProduct(editingProduct.id, prodData);
                  showToast(`Updated "${prodData.name}"`);
                  setEditingProduct(null);
                  setActiveTab('products');
                }}
              />
            )}

            {/* Dedicated Category Add/Edit Full-Page Views (No Hovering Modal) */}
            {activeTab === 'add_category' && (
              <CategoryFormPage
                category={null}
                onClose={() => setActiveTab('categories')}
                onSave={(catData) => {
                  addCategory(catData as any);
                  showToast(`Created category "${catData.name}"`);
                  setActiveTab('categories');
                }}
              />
            )}
            {activeTab === 'edit_category' && editingCategory && (
              <CategoryFormPage
                category={editingCategory}
                onClose={() => {
                  setEditingCategory(null);
                  setActiveTab('categories');
                }}
                onSave={(catData) => {
                  updateCategory(editingCategory.id, catData);
                  showToast(`Updated category "${catData.name}"`);
                  setEditingCategory(null);
                  setActiveTab('categories');
                }}
              />
            )}

            {/* Dedicated Branch Add/Edit Full-Page Views (No Hovering Modal) */}
            {activeTab === 'add_branch' && (
              <BranchFormPage
                branch={null}
                onClose={() => setActiveTab('branches')}
                onSave={(branchData) => {
                  addBranch(branchData as any);
                  showToast(`Created branch "${branchData.name}"`);
                  setActiveTab('branches');
                }}
              />
            )}
            {activeTab === 'edit_branch' && editingBranch && (
              <BranchFormPage
                branch={editingBranch}
                onClose={() => {
                  setEditingBranch(null);
                  setActiveTab('branches');
                }}
                onSave={(branchData) => {
                  updateBranch(editingBranch.id, branchData);
                  showToast(`Updated branch "${branchData.name}"`);
                  setEditingBranch(null);
                  setActiveTab('branches');
                }}
              />
            )}
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                  <span className="text-xs font-semibold text-neutral-500 block mb-1">Total Live Products</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-neutral-900">{products.length}</span>
                    <span className="text-xs text-amber-600 font-bold">Catalog</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                  <span className="text-xs font-semibold text-neutral-500 block mb-1">Shop Categories</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-amber-600">{categories.length}</span>
                    <span className="text-xs text-neutral-500">Sections</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                  <span className="text-xs font-semibold text-neutral-500 block mb-1">Flash Sale Items</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-rose-600">
                      {(flashSaleConfig?.activeProductIds || []).length}
                    </span>
                    <span className="text-xs text-rose-600/80 font-bold">Active Promo</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                  <span className="text-xs font-semibold text-neutral-500 block mb-1">Store Branches</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-sky-600">{branches.length}</span>
                    <span className="text-xs text-sky-600 font-bold">Outlets</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Shortcuts */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
                <h3 className="text-sm font-black text-amber-600 uppercase tracking-wider mb-3">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setActiveTab('add_product');
                    }}
                    className="p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 hover:border-amber-400 flex items-center gap-3 text-left transition-all group shadow-2xs cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-400 text-neutral-950 flex items-center justify-center shrink-0 shadow-xs">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block group-hover:text-amber-700">Upload New Product</span>
                      <span className="text-[11px] text-neutral-500">Upload photos from gallery & publish</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('flashsale')}
                    className="p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 hover:border-rose-400 flex items-center gap-3 text-left transition-all group shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block group-hover:text-rose-600">Manage Flash Sale</span>
                      <span className="text-[11px] text-neutral-500">Edit Beat The Clock timing</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('hero_slides')}
                    className="p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 hover:border-sky-400 flex items-center gap-3 text-left transition-all group shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block group-hover:text-sky-600">Hero & Banners</span>
                      <span className="text-[11px] text-neutral-500">Change hero slides & showcase</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Products Snapshot */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-neutral-800">Catalog Preview</h3>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="text-xs text-amber-700 hover:text-amber-800 hover:underline font-semibold"
                  >
                    View & Edit All {products.length} Products →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {products.slice(0, 6).map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl bg-white border border-neutral-200 flex items-center gap-3 shadow-2xs"
                    >
                      <img
                        src={p.images?.[0] || p.image || ''}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-lg bg-neutral-100 border border-neutral-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-neutral-900 truncate">{p.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-black text-amber-600">৳ {(p.price || 0).toLocaleString()}</span>
                          <span className="text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-medium">
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
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-neutral-200 shadow-2xs">
                <div className="flex flex-wrap items-center gap-2 flex-1 max-w-xl">
                  <div className="relative flex-1 min-w-[180px]">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search products by title or brand..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-lg pl-9 pr-3 py-2 text-neutral-900 outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>

                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 rounded-lg px-3 py-2 outline-none focus:border-amber-400 focus:bg-white"
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
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setActiveTab('add_product');
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl border border-neutral-200 overflow-x-auto shadow-2xs">
                <table className="w-full text-left text-xs text-neutral-700">
                  <thead className="bg-neutral-100 text-neutral-600 uppercase font-mono text-[10px] border-b border-neutral-200">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price (BDT)</th>
                      <th className="p-3">Flash Sale</th>
                      <th className="p-3">Stock Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {filteredProductsList.map((prod) => {
                      const isInFlash = (flashSaleConfig?.activeProductIds || []).includes(prod.id);
                      const isOutOfStock = prod.isOutOfStock || prod.tag === 'Out of Stock';
                      return (
                        <tr key={prod.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.images?.[0] || prod.image || ''}
                                alt={prod.name}
                                className="w-10 h-10 object-cover rounded-lg bg-neutral-100 border border-neutral-200 shrink-0"
                              />
                              <div className="max-w-xs">
                                <span className="font-bold text-neutral-900 block line-clamp-1">
                                  {prod.name}
                                </span>
                                <span className="text-[10px] text-neutral-500">
                                  Brand: <strong className="text-amber-700">{prod.brand}</strong>
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3">
                            <span className="bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded text-[11px] text-neutral-700 font-medium">
                              {categories.find((c) => c.id === prod.category)?.name || prod.category}
                            </span>
                          </td>

                          <td className="p-3">
                            <div className="font-mono">
                              <span className="font-black text-amber-700 block">
                                ৳ {prod.price.toLocaleString()}
                              </span>
                              {prod.originalPrice > prod.price && (
                                <span className="text-[10px] line-through text-neutral-400">
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
                                  ? 'bg-rose-100 text-rose-700 border border-rose-300'
                                  : 'bg-neutral-100 text-neutral-500 border border-neutral-200 hover:text-neutral-800'
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
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-rose-100 text-rose-700 border border-rose-300'
                              }`}
                            >
                              {!isOutOfStock ? '● In Stock' : '✕ Out of Stock'}
                            </button>
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProduct(prod);
                                  setActiveTab('edit_product');
                                }}
                                className="p-1.5 rounded-lg bg-neutral-100 hover:bg-amber-100 text-amber-700 border border-neutral-200 hover:border-amber-300 transition-colors cursor-pointer"
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
                                className="p-1.5 rounded-lg bg-neutral-100 hover:bg-rose-100 text-rose-600 border border-neutral-200 hover:border-rose-300 transition-colors"
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
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-neutral-200 shadow-2xs">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Shop by Category Configuration</h3>
                  <p className="text-xs text-neutral-500">
                    Add, edit, rename, and manage subcategories for the main storefront
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingCategory(null);
                    setActiveTab('add_category');
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl bg-white border border-neutral-200 flex flex-col justify-between space-y-3 group hover:border-amber-400 shadow-2xs transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono bg-neutral-100 text-amber-700 px-2 py-0.5 rounded border border-neutral-200 font-semibold">
                            {cat.id}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-medium">
                            {cat.itemCount}+ items
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCategory(cat);
                              setActiveTab('edit_category');
                            }}
                            className="p-1.5 rounded-lg bg-neutral-100 hover:bg-amber-100 text-amber-700 border border-neutral-200 cursor-pointer"
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
                            className="p-1 rounded bg-neutral-100 hover:bg-rose-100 text-rose-600 border border-neutral-200"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-neutral-900">{cat.name}</h4>

                      {/* Subcategories tags */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {cat.subCategories?.map((sub, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded border border-neutral-200"
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
                      className="w-full text-center text-xs text-amber-800 hover:text-amber-900 font-bold bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs"
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
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-rose-600">
                  <Flame className="w-5 h-5 fill-rose-600" />
                  <h3 className="text-base font-black uppercase tracking-tight font-['Outfit',sans-serif]">
                    Flash Sale Campaign & Countdown Timer
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1.5">
                      Flash Sale Banner Title
                    </label>
                    <input
                      type="text"
                      value={flashSaleConfig.title}
                      onChange={(e) => updateFlashSaleConfig({ title: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 text-xs rounded-lg p-2.5 text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1.5">
                      Flash Sale Subtitle Tag
                    </label>
                    <input
                      type="text"
                      value={flashSaleConfig.subtitle}
                      onChange={(e) => updateFlashSaleConfig({ subtitle: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 text-xs rounded-lg p-2.5 text-neutral-900 outline-none focus:border-amber-400 focus:bg-white font-medium"
                    />
                  </div>
                </div>

                {/* Countdown Settings */}
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-2">
                    Countdown Timer Duration (Hours : Minutes : Seconds)
                  </label>
                  <div className="flex items-center gap-3 max-w-sm">
                    <div className="flex-1">
                      <span className="text-[10px] text-neutral-500 block mb-1">Hours</span>
                      <input
                        type="number"
                        min="0"
                        max="99"
                        value={flashSaleConfig.countdownHours}
                        onChange={(e) =>
                          updateFlashSaleConfig({ countdownHours: parseInt(e.target.value) || 0 })
                        }
                        className="w-full bg-neutral-50 border border-neutral-300 text-xs rounded-lg p-2 text-neutral-900 font-mono text-center focus:bg-white focus:border-amber-400"
                      />
                    </div>
                    <span className="text-neutral-400 font-black mt-4">:</span>
                    <div className="flex-1">
                      <span className="text-[10px] text-neutral-500 block mb-1">Minutes</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={flashSaleConfig.countdownMinutes}
                        onChange={(e) =>
                          updateFlashSaleConfig({ countdownMinutes: parseInt(e.target.value) || 0 })
                        }
                        className="w-full bg-neutral-50 border border-neutral-300 text-xs rounded-lg p-2 text-neutral-900 font-mono text-center focus:bg-white focus:border-amber-400"
                      />
                    </div>
                    <span className="text-neutral-400 font-black mt-4">:</span>
                    <div className="flex-1">
                      <span className="text-[10px] text-neutral-500 block mb-1">Seconds</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={flashSaleConfig.countdownSeconds}
                        onChange={(e) =>
                          updateFlashSaleConfig({ countdownSeconds: parseInt(e.target.value) || 0 })
                        }
                        className="w-full bg-neutral-50 border border-neutral-300 text-xs rounded-lg p-2 text-neutral-900 font-mono text-center focus:bg-white focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast('Flash Sale settings updated successfully!')}
                    className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Flash Sale Settings</span>
                  </button>
                </div>
              </div>

              {/* Flash Sale Product Selector */}
              <div>
                <h4 className="text-sm font-bold text-neutral-900 mb-2">
                  Select Products to Showcase in Flash Sale Grid
                </h4>
                <p className="text-xs text-neutral-500 mb-3">
                  Check or uncheck products to immediately add or remove them from the Flash Sale section
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {products.map((p) => {
                    const isChecked = (flashSaleConfig?.activeProductIds || []).includes(p.id);
                    return (
                      <div
                        key={p.id}
                        onClick={() => toggleProductFlashSale(p.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 shadow-2xs ${
                          isChecked
                            ? 'bg-rose-50 border-rose-400 text-neutral-900'
                            : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={p.images?.[0] || p.image || ''}
                            alt={p.name}
                            className="w-9 h-9 object-cover rounded-md bg-neutral-100 border border-neutral-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-neutral-900 truncate">{p.name}</p>
                            <span className="text-[11px] text-amber-700 font-black">
                              ৳ {(p.price || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                            isChecked
                              ? 'bg-rose-500 border-rose-500 text-white'
                              : 'border-neutral-300 bg-neutral-100'
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
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <Sliders className="w-5 h-5" />
                  <h3 className="text-base font-black uppercase tracking-tight font-['Outfit',sans-serif]">
                    Top Hero Mega Sale Billboard
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">Ribbon Top Tag</label>
                    <input
                      type="text"
                      value={heroBillboard.megaSaleRibbon}
                      onChange={(e) => updateHeroBillboard({ megaSaleRibbon: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">Mega Sale Title</label>
                    <input
                      type="text"
                      value={heroBillboard.megaSaleTitle}
                      onChange={(e) => updateHeroBillboard({ megaSaleTitle: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">Lowest Price Tag</label>
                    <input
                      type="text"
                      value={heroBillboard.lowestPriceTag}
                      onChange={(e) => updateHeroBillboard({ lowestPriceTag: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">Guarantee Badge Title</label>
                    <input
                      type="text"
                      value={heroBillboard.guaranteeBadgeTitle}
                      onChange={(e) => updateHeroBillboard({ guaranteeBadgeTitle: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">Guarantee Subtitle</label>
                    <input
                      type="text"
                      value={heroBillboard.guaranteeBadgeSubtitle}
                      onChange={(e) => updateHeroBillboard({ guaranteeBadgeSubtitle: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">Free Delivery Label</label>
                    <input
                      type="text"
                      value={heroBillboard.freeDeliverySubtitle}
                      onChange={(e) => updateHeroBillboard({ freeDeliverySubtitle: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast('Hero Billboard updated successfully!')}
                    className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Billboard Changes</span>
                  </button>
                </div>
              </div>

              {/* Sub Banners (Dual Promo Cards) */}
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <Layout className="w-5 h-5" />
                  <h3 className="text-base font-black uppercase tracking-tight font-['Outfit',sans-serif]">
                    Dual Promo Cards Under Hero
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Left Banner */}
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2.5">
                    <h4 className="font-bold text-amber-700">Left Promo Card</h4>
                    <div>
                      <label className="text-neutral-600 block mb-1">Top Tag</label>
                      <input
                        type="text"
                        value={subBanners.leftBanner.topTag}
                        onChange={(e) =>
                          updateSubBanners({
                            leftBanner: { ...subBanners.leftBanner, topTag: e.target.value }
                          })
                        }
                        className="w-full bg-white border border-neutral-300 rounded p-2 text-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-600 block mb-1">Title</label>
                      <input
                        type="text"
                        value={subBanners.leftBanner.title}
                        onChange={(e) =>
                          updateSubBanners({
                            leftBanner: { ...subBanners.leftBanner, title: e.target.value }
                          })
                        }
                        className="w-full bg-white border border-neutral-300 rounded p-2 text-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-600 block mb-1">Guarantee Badge</label>
                      <input
                        type="text"
                        value={subBanners.leftBanner.guaranteeText}
                        onChange={(e) =>
                          updateSubBanners({
                            leftBanner: { ...subBanners.leftBanner, guaranteeText: e.target.value }
                          })
                        }
                        className="w-full bg-white border border-neutral-300 rounded p-2 text-neutral-900"
                      />
                    </div>
                  </div>

                  {/* Right Banner */}
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2.5">
                    <h4 className="font-bold text-cyan-700">Right Promo Card</h4>
                    <div>
                      <label className="text-neutral-600 block mb-1">Top Italic Script</label>
                      <input
                        type="text"
                        value={subBanners.rightBanner.topScript}
                        onChange={(e) =>
                          updateSubBanners({
                            rightBanner: { ...subBanners.rightBanner, topScript: e.target.value }
                          })
                        }
                        className="w-full bg-white border border-neutral-300 rounded p-2 text-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-600 block mb-1">Discount Tag</label>
                      <input
                        type="text"
                        value={subBanners.rightBanner.discountBadge}
                        onChange={(e) =>
                          updateSubBanners({
                            rightBanner: { ...subBanners.rightBanner, discountBadge: e.target.value }
                          })
                        }
                        className="w-full bg-white border border-neutral-300 rounded p-2 text-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-600 block mb-1">Store Locations Highlight</label>
                      <input
                        type="text"
                        value={subBanners.rightBanner.locationText}
                        onChange={(e) =>
                          updateSubBanners({
                            rightBanner: { ...subBanners.rightBanner, locationText: e.target.value }
                          })
                        }
                        className="w-full bg-white border border-neutral-300 rounded p-2 text-neutral-900"
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
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-neutral-200 shadow-2xs">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Experience Center Outlets</h3>
                  <p className="text-xs text-neutral-500">
                    Physical stores displayed in header, footer, and locations view
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingBranch(null);
                    setActiveTab('add_branch');
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Store Branch</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {branches.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-xl bg-white border border-neutral-200 flex flex-col justify-between space-y-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.5 rounded">
                          {b.badge || 'Store Outlet'}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingBranch(b);
                              setActiveTab('edit_branch');
                            }}
                            className="p-1.5 rounded-lg bg-neutral-100 hover:bg-amber-100 text-amber-700 border border-neutral-200 cursor-pointer"
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
                            className="p-1 rounded bg-neutral-100 hover:bg-rose-100 text-rose-600 border border-neutral-200"
                            title="Delete Branch"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {b.image && (
                        <div className="w-full h-24 rounded-lg overflow-hidden mb-2.5 border border-neutral-200 bg-neutral-100">
                          <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <h4 className="text-sm font-bold text-neutral-900 mb-1">{b.name}</h4>
                      <p className="text-xs text-neutral-600">{b.address}</p>
                      <p className="text-xs text-amber-700 font-mono mt-1.5 font-bold">Hotline: {b.phone}</p>

                      {b.googleMapUrl && (
                        <div className="mt-2 pt-2 border-t border-neutral-100">
                          <a
                            href={b.googleMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-700 hover:text-sky-800 hover:underline"
                          >
                            <Globe className="w-3 h-3 text-sky-600" />
                            <span>View on Google Map</span>
                            <ExternalLink className="w-3 h-3 text-neutral-400" />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-neutral-500">
                      Weekly Off-day: <strong className="text-neutral-700">{b.offDay || 'None'}</strong>
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
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
                <h3 className="text-base font-black text-amber-600 uppercase tracking-tight font-['Outfit',sans-serif]">
                  Footer Contact & Social Media
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">Customer Support Email</label>
                    <input
                      type="email"
                      value={footerConfig.email}
                      onChange={(e) => updateFooterConfig({ email: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">Hotline Phone Number</label>
                    <input
                      type="text"
                      value={footerConfig.hotline}
                      onChange={(e) => updateFooterConfig({ hotline: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">ISO Certification Tag</label>
                    <input
                      type="text"
                      value={footerConfig.isoText}
                      onChange={(e) => updateFooterConfig({ isoText: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">Facebook Page URL</label>
                    <input
                      type="text"
                      value={footerConfig.socialLinks.facebook}
                      onChange={(e) =>
                        updateFooterConfig({
                          socialLinks: { ...footerConfig.socialLinks, facebook: e.target.value }
                        })
                      }
                      className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-900 outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">WhatsApp Hotline URL</label>
                    <input
                      type="text"
                      value={footerConfig.socialLinks.whatsapp}
                      onChange={(e) =>
                        updateFooterConfig({
                          socialLinks: { ...footerConfig.socialLinks, whatsapp: e.target.value }
                        })
                      }
                      className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-900 outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1">YouTube Channel URL</label>
                    <input
                      type="text"
                      value={footerConfig.socialLinks.youtube}
                      onChange={(e) =>
                        updateFooterConfig({
                          socialLinks: { ...footerConfig.socialLinks, youtube: e.target.value }
                        })
                      }
                      className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-900 outline-none focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast('Footer information updated!')}
                    className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Footer Settings</span>
                  </button>
                </div>
              </div>

              {/* Site Policies Editor */}
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
                <h3 className="text-base font-black text-amber-600 uppercase tracking-tight font-['Outfit',sans-serif]">
                  Terms & Site Policies Content
                </h3>

                <div className="space-y-3">
                  {policies.map((pol) => (
                    <div key={pol.id} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900">{pol.title}</span>
                        <span className="text-[10px] font-mono text-neutral-500">ID: {pol.id}</span>
                      </div>
                      <textarea
                        rows={3}
                        value={pol.content}
                        onChange={(e) => updatePolicy(pol.id, e.target.value)}
                        className="w-full bg-white border border-neutral-300 text-xs rounded-lg p-2 text-neutral-900 outline-none focus:border-amber-400 font-sans"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: BRAND & GLOBAL SETTINGS */}
          {activeTab === 'branding' && (
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
              <h3 className="text-base font-black text-amber-600 uppercase tracking-tight font-['Outfit',sans-serif]">
                Global Branding & Header Announcement
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Logo Main Text</label>
                  <input
                    type="text"
                    value={brandConfig.logoMain}
                    onChange={(e) => updateBrandConfig({ logoMain: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Logo Accent Text</label>
                  <input
                    type="text"
                    value={brandConfig.logoAccent}
                    onChange={(e) => updateBrandConfig({ logoAccent: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Trademark Symbol</label>
                  <input
                    type="text"
                    value={brandConfig.logoSymbol}
                    onChange={(e) => updateBrandConfig({ logoSymbol: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-neutral-700 block mb-1">Top Announcement Bar Text</label>
                  <input
                    type="text"
                    value={brandConfig.announcementText}
                    onChange={(e) => updateBrandConfig({ announcementText: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-900 font-medium outline-none focus:border-amber-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Currency Symbol</label>
                  <input
                    type="text"
                    value={brandConfig.currencySymbol}
                    onChange={(e) => updateBrandConfig({ currencySymbol: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-900 font-mono font-bold outline-none focus:border-amber-400 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => showToast('Brand configuration saved!')}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Branding Changes</span>
                </button>
              </div>
            </div>
          )}
          </div>
        </main>
      </div>
    </div>
  );
};


