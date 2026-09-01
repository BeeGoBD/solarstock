import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  BranchLocation,
  HeroBillboardConfig,
  SubBannerConfig,
  FlashSaleConfig,
  FooterConfig,
  BrandConfig,
  SitePolicy
} from '../types';
import {
  PRODUCTS as INITIAL_PRODUCTS,
  CATEGORIES as INITIAL_CATEGORIES,
  BRANCHES as INITIAL_BRANCHES,
  DEFAULT_HERO_BILLBOARD,
  DEFAULT_SUB_BANNERS,
  DEFAULT_FLASH_SALE_CONFIG,
  DEFAULT_FOOTER_CONFIG,
  DEFAULT_BRAND_CONFIG,
  DEFAULT_POLICIES
} from '../data/mockData';

interface StoreState {
  products: Product[];
  categories: Category[];
  branches: BranchLocation[];
  heroBillboard: HeroBillboardConfig;
  subBanners: SubBannerConfig;
  flashSaleConfig: FlashSaleConfig;
  footerConfig: FooterConfig;
  brandConfig: BrandConfig;
  policies: SitePolicy[];
  isAdminOpen: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
  
  // Product Actions
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductFlashSale: (id: string) => void;
  toggleProductStock: (id: string) => void;
  
  // Category Actions
  addCategory: (category: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Branch Actions
  addBranch: (branch: Omit<BranchLocation, 'id'>) => BranchLocation;
  updateBranch: (id: string, updates: Partial<BranchLocation>) => void;
  deleteBranch: (id: string) => void;
  
  // Billboard & Banner Actions
  updateHeroBillboard: (updates: Partial<HeroBillboardConfig>) => void;
  updateSubBanners: (updates: Partial<SubBannerConfig>) => void;
  
  // Flash Sale Actions
  updateFlashSaleConfig: (updates: Partial<FlashSaleConfig>) => void;
  
  // Footer & Brand Actions
  updateFooterConfig: (updates: Partial<FooterConfig>) => void;
  updateBrandConfig: (updates: Partial<BrandConfig>) => void;
  
  // Policies Actions
  updatePolicy: (id: string, content: string) => void;
  
  // Reset
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'solarstock_full_store_v1';

const StoreContext = createContext<StoreState | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or defaults
  const loadSavedState = () => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        return JSON.parse(item);
      }
    } catch (e) {
      console.warn('Could not load saved store state, using defaults', e);
    }
    return null;
  };

  const saved = loadSavedState();

  const [products, setProducts] = useState<Product[]>(saved?.products || INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(saved?.categories || INITIAL_CATEGORIES);
  const [branches, setBranches] = useState<BranchLocation[]>(saved?.branches || INITIAL_BRANCHES);
  const [heroBillboard, setHeroBillboard] = useState<HeroBillboardConfig>(
    saved?.heroBillboard || DEFAULT_HERO_BILLBOARD
  );
  const [subBanners, setSubBanners] = useState<SubBannerConfig>(
    saved?.subBanners || DEFAULT_SUB_BANNERS
  );
  const [flashSaleConfig, setFlashSaleConfig] = useState<FlashSaleConfig>(
    saved?.flashSaleConfig || DEFAULT_FLASH_SALE_CONFIG
  );
  const [footerConfig, setFooterConfig] = useState<FooterConfig>(
    saved?.footerConfig || DEFAULT_FOOTER_CONFIG
  );
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(
    saved?.brandConfig || DEFAULT_BRAND_CONFIG
  );
  const [policies, setPolicies] = useState<SitePolicy[]>(
    saved?.policies || DEFAULT_POLICIES
  );
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Save to localStorage whenever core data changes
  useEffect(() => {
    try {
      const stateToSave = {
        products,
        categories,
        branches,
        heroBillboard,
        subBanners,
        flashSaleConfig,
        footerConfig,
        brandConfig,
        policies
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to save store state to localStorage', e);
    }
  }, [
    products,
    categories,
    branches,
    heroBillboard,
    subBanners,
    flashSaleConfig,
    footerConfig,
    brandConfig,
    policies
  ]);

  const openAdmin = () => setIsAdminOpen(true);
  const closeAdmin = () => setIsAdminOpen(false);

  // Product Methods
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const id = `prod-custom-${Date.now()}`;
    const fullProduct: Product = {
      ...newProdData,
      id
    };
    setProducts((prev) => [fullProduct, ...prev]);
    return fullProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // Also remove from flash sale if present
    setFlashSaleConfig((prev) => ({
      ...prev,
      activeProductIds: prev.activeProductIds.filter((pid) => pid !== id)
    }));
  };

  const toggleProductFlashSale = (id: string) => {
    setFlashSaleConfig((prev) => {
      const isAlreadyIn = prev.activeProductIds.includes(id);
      const newIds = isAlreadyIn
        ? prev.activeProductIds.filter((pid) => pid !== id)
        : [...prev.activeProductIds, id];
      return { ...prev, activeProductIds: newIds };
    });
  };

  const toggleProductStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const isCurrentlyOut = p.isOutOfStock || p.tag === 'Out of Stock';
          return {
            ...p,
            isOutOfStock: !isCurrentlyOut,
            tag: !isCurrentlyOut ? 'Out of Stock' : (p.isHot ? 'Hot Product' : 'In Stock')
          };
        }
        return p;
      })
    );
  };

  // Category Methods
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const slug = catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = slug || `cat-${Date.now()}`;
    const newCat: Category = { ...catData, id };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Branch Methods
  const addBranch = (branchData: Omit<BranchLocation, 'id'>) => {
    const id = `branch-${Date.now()}`;
    const newBranch: BranchLocation = { ...branchData, id };
    setBranches((prev) => [...prev, newBranch]);
    return newBranch;
  };

  const updateBranch = (id: string, updates: Partial<BranchLocation>) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const deleteBranch = (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  // Billboard & Banner Updates
  const updateHeroBillboard = (updates: Partial<HeroBillboardConfig>) => {
    setHeroBillboard((prev) => ({ ...prev, ...updates }));
  };

  const updateSubBanners = (updates: Partial<SubBannerConfig>) => {
    setSubBanners((prev) => ({ ...prev, ...updates }));
  };

  // Flash Sale Updates
  const updateFlashSaleConfig = (updates: Partial<FlashSaleConfig>) => {
    setFlashSaleConfig((prev) => ({ ...prev, ...updates }));
  };

  // Footer & Brand Updates
  const updateFooterConfig = (updates: Partial<FooterConfig>) => {
    setFooterConfig((prev) => ({ ...prev, ...updates }));
  };

  const updateBrandConfig = (updates: Partial<BrandConfig>) => {
    setBrandConfig((prev) => ({ ...prev, ...updates }));
  };

  // Policies Updates
  const updatePolicy = (id: string, content: string) => {
    setPolicies((prev) =>
      prev.map((pol) => (pol.id === id ? { ...pol, content } : pol))
    );
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setBranches(INITIAL_BRANCHES);
    setHeroBillboard(DEFAULT_HERO_BILLBOARD);
    setSubBanners(DEFAULT_SUB_BANNERS);
    setFlashSaleConfig(DEFAULT_FLASH_SALE_CONFIG);
    setFooterConfig(DEFAULT_FOOTER_CONFIG);
    setBrandConfig(DEFAULT_BRAND_CONFIG);
    setPolicies(DEFAULT_POLICIES);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        branches,
        heroBillboard,
        subBanners,
        flashSaleConfig,
        footerConfig,
        brandConfig,
        policies,
        isAdminOpen,
        openAdmin,
        closeAdmin,
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
